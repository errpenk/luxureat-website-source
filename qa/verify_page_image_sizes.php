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
$images = array(
    array('src' => 'https://example.test/assets/media/new-arrivals/feature-olive-oil.webp?v=1', 'loading' => 'eager', 'fetchpriority' => 'high', 'srcset' => 'small.webp 720w, full.webp 2000w', 'sizes' => '100vw', 'alt' => 'Original copy'),
    array('src' => 'logo.webp', 'loading' => 'eager', 'srcset' => 'logo.webp 64w', 'sizes' => '64px'),
    array('src' => 'thumb.webp', 'loading' => 'lazy', 'srcset' => 'thumb.webp 720w', 'sizes' => '120px'),
    array('src' => 'plain.webp', 'loading' => 'lazy'),
);
$result = json_decode(luxureat_page_image_sizes(json_encode($images)), true);
if ($result[0]['loading'] !== 'lazy' || isset($result[0]['fetchpriority']) || $result[0]['sizes'] !== 'auto, 100vw' || $result[0]['alt'] !== 'Original copy' || $result[0]['srcset'] !== $images[0]['srcset']) throw new RuntimeException('Offscreen feature must defer without losing content or candidates.');
if ($result[1] !== $images[1] || $result[2]['sizes'] !== 'auto, 120px' || $result[3] !== $images[3]) throw new RuntimeException('Eager logo, fallback widths and non-responsive images must remain intact.');
if (luxureat_page_image_sizes(json_encode($result)) !== json_encode($result)) throw new RuntimeException('Auto sizes must not be duplicated.');
echo "Card image sizing and offscreen feature priority passed.\n";
