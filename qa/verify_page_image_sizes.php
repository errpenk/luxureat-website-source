<?php
// Test attribute decisions through the WordPress tag-processor API; WordPress owns HTML parsing.
class WP_HTML_Tag_Processor {
    private $images;
    private $index = -1;
    function __construct($content) { $this->images = json_decode($content, true); }
    function next_tag($tag) { return isset($this->images[++$this->index]); }
    function get_attribute($name) { return $this->images[$this->index][$name] ?? null; }
    function set_attribute($name, $value) { $this->images[$this->index][$name] = $value; }
    function remove_attribute($name) { unset($this->images[$this->index][$name]); }
    function get_updated_html() { return json_encode($this->images); }
}
$source = file_get_contents(__DIR__ . '/../scripts/templates/page-migration.php');
preg_match('/function luxureat_page_image_sizes\(\$content\) \{.*?\n\}/s', $source, $match);
if (!$match) throw new RuntimeException('Image size integration is missing.');
eval($match[0]);
function get_template_directory_uri() { return 'https://example.test/theme'; }
function get_template_directory() { return dirname(__DIR__); }
$images = array(
    array('src' => 'https://example.test/assets/media/new-arrivals/feature-olive-oil.webp?v=1', 'loading' => 'eager', 'fetchpriority' => 'high', 'srcset' => 'small.webp 720w, full.webp 2000w', 'sizes' => '100vw', 'alt' => 'Original copy'),
    array('src' => 'logo.webp', 'loading' => 'eager', 'srcset' => 'logo.webp 64w', 'sizes' => '64px'),
    array('src' => 'thumb.webp', 'loading' => 'lazy', 'srcset' => 'thumb.webp 720w', 'sizes' => '120px'),
    array('src' => 'plain.webp', 'loading' => 'lazy'),
    array('data-lux-src' => 'https://example.test/theme/assets/media/brand/home-service-selection-420.webp', 'data-lux-mobile-src' => 'https://example.test/theme/assets/media/brand/home-service-selection-mobile.webp?v=current', 'loading' => 'lazy'),
);
$result = json_decode(luxureat_page_image_sizes(json_encode($images)), true);
if ($result[0]['loading'] !== 'lazy' || isset($result[0]['fetchpriority']) || $result[0]['sizes'] !== 'auto, 100vw' || $result[0]['alt'] !== 'Original copy' || $result[0]['srcset'] !== $images[0]['srcset']) throw new RuntimeException('Offscreen feature must defer without losing content or candidates.');
if ($result[1] !== $images[1] || $result[2]['sizes'] !== 'auto, 120px' || $result[3] !== $images[3]) throw new RuntimeException('Eager logo, fallback widths and non-responsive images must remain intact.');
if (isset($result[4]['data-lux-src']) || $result[4]['src'] !== $images[4]['data-lux-src'] || $result[4]['sizes'] !== 'auto, 100vw' || strpos($result[4]['srcset'], '420w') === false || strpos($result[4]['srcset'], '?v=current ') === false) throw new RuntimeException('Homepage cards must offer native candidates before JavaScript, with original query versions.');
if (luxureat_page_image_sizes(json_encode($result)) !== json_encode($result)) throw new RuntimeException('Auto sizes must not be duplicated.');
echo "Card image sizing and offscreen feature priority passed.\n";
