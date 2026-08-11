(() => {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const academyImage = (file) => new URL(`media/academy/${file}`, assetBase).href;
  const baseArticles = [
    {
      "slug": "baerii-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Baerii Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("baerii-caviar-cover-page-bg.png"),
      "intro": "Baerii caviar, obtained from the Acipenser baerii sturgeon, is appreciated for its small grey-brown eggs and delicate flavor with light iodine notes.",
      "opening": [
        "The Baerii sturgeon is one of the fastest-maturing sturgeon species, reaching maturity around 7–8 years, and producing smaller eggs compared to other varieties.",
        "This is the most affordable caviar in our catalog, yet it remains highly appreciated by both chefs and enthusiasts for its quality and distinctive flavor."
      ],
      "sections": [
        [
          "Sensory Characteristics of Baerii Caviar",
          [
            "Species: Acipenser baerii",
            "Color: Shades ranging from light grey to grey-brown",
            "Egg size: approx. 2.9 – 3.0 mm",
            "Sturgeon age: 8 years",
            "Aroma: No strong scents",
            "Texture: Compact eggs with good firmness",
            "Flavor: Delicate aroma with light briny notes"
          ]
        ]
      ],
      "sectionMedia": [
        []
      ],
      "relatedSlugs": [
        "beluga-caviar",
        "kaluga-amur-caviar",
        "caviar-processing"
      ]
    },
    {
      "slug": "beluga-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Beluga Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("beluga-caviar-cover-new-page-bg.png"),
      "intro": "Beluga caviar, considered the most luxurious and rare, comes from the Huso huso sturgeon and is known for its large grey eggs and delicate, buttery taste.",
      "opening": [
        "Beluga caviar is considered the most prestigious and expensive of all caviars. Wallis Simpson, wife of Edward VIII, was a great admirer, making it a symbol of her luxury and social status. The dinners hosted at Windsor residences — such as Villa Windsor in Paris, Château de la Croe in Cap d’Antibes, and Moulin de la Tuilerie in Gif-sur-Yvette — were famous for their abundance of Beluga caviar, served to illustrious guests including Winston Churchill and Marlene Dietrich.",
        "Long regarded as a rare and highly sought-after delicacy, Russia was traditionally one of the main sources of Beluga caviar."
      ],
      "sections": [
        [
          "Sensory Characteristics of Beluga Caviar",
          [
            "Species: Huso huso",
            "Color: from dark grey to light grey",
            "Egg size: 3.3 – 3.5 mm, uniform in tone with good oiliness",
            "Sturgeon age: 18–20 years",
            "Aroma: none",
            "Texture: soft, buttery, and delicate eggs",
            "Flavor: fresh fish taste with marine and buttery notes, followed by a slightly sweet finish"
          ]
        ],
        [
          "How to Identify Beluga Caviar",
          [
            "Beluga caviar can be identified by checking the label on the sealed tin. Traditionally, Beluga labels and tins are marked in blue or light blue. The eggs must measure between 3 and 3.5 mm with a uniform color. CaviarEat guarantees its Beluga as 100% pure, as clearly indicated on the label."
          ]
        ],
        [
          "Hybrid Beluga",
          [
            "There is also a hybrid variety, often called “Beluga Siberian,” obtained from crossing a Baerii female with a Beluga male. This type of caviar requires only 7–8 years of production, compared to the 18–20 years needed for pure Beluga."
          ]
        ],
        [
          "Pairings for Beluga Caviar",
          [
            "The ideal pairing is with Champagne or high-quality sparkling wines, which balance the natural oiliness of the caviar. A traditional choice is with chilled vodka. Other recommended wines include Muscadet-Coteaux-de-la-Loire, Vermentino di Gallura DOCG, Cassis AOC from Provence, white Muscadel from Cape Verde, or Prosecco di Valdobbiadene for a modern pairing. As for food, Beluga caviar shines on thin slices of boiled potato, buttered blinis, soft-boiled eggs, or toasted bread with a drizzle of hazelnut or walnut oil."
          ]
        ]
      ],
      "sectionMedia": [
        [],
        [
          {
            "src": academyImage("beluga-caviar-02.png"),
            "alt": "Beluga Caviar"
          }
        ],
        [],
        []
      ],
      "relatedSlugs": [
        "kaluga-amur-caviar",
        "oscetra-caviar",
        "baerii-caviar"
      ]
    },
    {
      "slug": "kaluga-amur-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Kaluga and Amur Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("kaluga-amur-caviar-cover-page-bg.png"),
      "intro": "Kaluga and Amur caviar is considered a fine alternative to the prestigious Beluga, distinguished mainly by its lower cost. The Kaluga sturgeon inhabits only the Amur River and its tributaries, located between Russia and China.",
      "opening": [
        "The main farms for this sturgeon are in Yidu, China. While its caviar is very similar to Beluga, it has a slightly less delicate flavor. Kaluga eggs are notable for their shades ranging from brown to golden."
      ],
      "sections": [
        [
          "Sensory Characteristics of Kaluga and Amur Caviar",
          [
            "Species: Acipenser dauricus x Schrenki",
            "Color: Shades from brown to golden",
            "Egg size: approx. 3.0 – 3.1 mm",
            "Sturgeon age: 10–11 years",
            "Aroma: No strong odors",
            "Texture: Firm, compact eggs",
            "Flavor: Balanced and harmonious"
          ]
        ],
        [
          "Royal Kaluga vs. Amur",
          [
            "Within the CaviarEat catalog, two Kaluga caviar variants are available, differing in egg size, sturgeon age, and quality level:",
            "Royal Kaluga: sturgeon aged 10–12 years, eggs measuring 3.0 – 3.3 mm",
            "Amur: sturgeon aged 10 years, eggs around 3.0 mm"
          ]
        ]
      ],
      "sectionMedia": [
        [],
        []
      ],
      "relatedSlugs": [
        "oscetra-caviar",
        "sevruga-caviar",
        "beluga-caviar"
      ]
    },
    {
      "slug": "oscetra-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Oscetra Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("oscetra-caviar-cover.png"),
      "intro": "Oscetra caviar is distinguished by its eggs ranging in color from grey to golden, with a silky texture and an elegant flavor featuring notes of hazelnut and butter.",
      "opening": [],
      "sections": [
        [
          "Various Names",
          [
            "On the market, this type of caviar may appear under different names — Asetra, Oscietra, or Osetra — but they all refer to the same product."
          ]
        ],
        [
          "Sensory Characteristics of Oscietra Caviar",
          [
            "Species: Acipenser gueldenstaedtii",
            "Color: shades ranging from dark grey to light grey, with golden tones in older specimens.",
            "Egg size: 3.0 – 3.3 mm, uniform color, firm texture.",
            "Sturgeon age: 10–12 years.",
            "Texture: Silky, with compact eggs and a slightly firmer membrane compared to Beluga.",
            "Flavor: Dominant notes of hazelnut and butter, with a delicate sweetness reminiscent of lobster and fresh butter."
          ]
        ],
        [
          "Royal Oscietra vs. Oscietra",
          [
            "The CaviarEat catalog offers two main types of Oscietra caviar, which differ in egg size, sturgeon age, and overall quality:",
            "Royal Oscietra: sturgeon aged 12–13 years, with eggs 3.2 – 3.3 mm.",
            "Oscietra: sturgeon aged 10–12 years, with eggs 3.0 – 3.1 mm."
          ]
        ],
        [
          "Additional Sensory Traits",
          [
            "Color: from dark grey to light grey, up to golden (more prized, as it requires longer production times).",
            "Appearance: eggs around 2.5 mm, compact and homogeneous in color.",
            "Aroma: subtle fruity and hazelnut notes, with gentler sweetness compared to other caviars.",
            "Texture: smooth and silky, with a slightly thicker membrane than Beluga.",
            "Flavor: hazelnut, buttery richness, with light earthy and marine undertones.",
            "Hybrid Oscietra varieties, obtained from cross-breeding different sturgeon species, offer unique sensory nuances."
          ]
        ],
        [
          "Recommended Pairings",
          [
            "Oscietra caviar pairs beautifully with champagne or other premium sparkling wines. For still wines, excellent choices include Puligny-Montrachet Premier Cru, Chablis Grand Cru, or dry Zibibbo. Ideal dishes range from blinis and thinly sliced boiled potatoes to gourmet pairings such as lobster medallions with browned butter and Oscietra caviar, or flambéed scallops with Armagnac, foie gras, and a spoonful of Oscietra."
          ]
        ],
        [
          "Oscietra Caviar and Famous Figures",
          [
            "Oscietra caviar has always been synonymous with luxury and refinement. Silent film diva Gloria Swanson loved preparing canapés with toasted bread, Oscietra caviar, crumbled hard-boiled yolk, finely chopped onion, a lemon slice, and a thin slice of tomato. Cary Grant, renowned for his elegance, was known to enjoy Oscietra at five in the afternoon while staying in Monaco for the filming of To Catch a Thief (1955). In 1956, at the wedding of Grace Kelly and Prince Rainier III, Oscietra caviar was served to guests alongside champagne. Monte Carlo, a symbol of luxury and glamour, remains an emblematic location for caviar consumption, carrying on the Riviera’s and the Principality’s historic tradition of elegance and sophistication."
          ]
        ]
      ],
      "sectionMedia": [
        [],
        [],
        [],
        [],
        [],
        []
      ],
      "relatedSlugs": [
        "sevruga-caviar",
        "white-sturgeon-caviar",
        "kaluga-amur-caviar"
      ]
    },
    {
      "slug": "sevruga-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Sevruga Caviar (Acipenser stellatus)",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("sevruga-caviar-cover-page-bg.png"),
      "intro": "Sevruga sturgeon roe are the smallest among all caviar varieties, with a diameter of about 2 mm. They feature a uniform color, compact texture, and intense flavor.",
      "opening": [
        "The taste is characterized by notes of sea, iodine, hazelnut, and vegetal hints, with a marked freshness. It is the boldest type of caviar, much appreciated by those who favor strong, distinctive aromas."
      ],
      "sections": [
        [
          "History of Sevruga Caviar",
          [
            "During the first half of the 20th century, the great transatlantic liners connecting the United States and Europe — such as the Queen Mary, Normandie, Rex, Caronia, Lusitania, and the famous Titanic — epitomized luxury and comfort. On board these ships, frequented by celebrities and high society, restaurants offered exquisite dishes, with Sevruga caviar among the highlights of first-class menus. It was traditionally served in refined porcelain shells with gilded rims, accompanied by finely chopped onion, crumbled hard-boiled egg, and toasted bread."
          ]
        ],
        [
          "Characteristics of Sevruga Caviar",
          [
            "Color: from dark grey to light grey, with rare golden hues in albino specimens.",
            "Appearance: small eggs (approx. 2 mm), compact and uniformly colored.",
            "Aroma: delicate marine notes with light hazelnut and herbal hints.",
            "Texture: compact eggs with a perfect balance between softness and crispness.",
            "Flavor: bold and rich, with notes of sea, iodine, hazelnut, and vegetal nuances, accompanied by refreshing brightness."
          ]
        ],
        [
          "Recommended Pairings",
          [
            "Sevruga caviar pairs beautifully with both dishes and select wines. Ideal wines include a white vin de sable from Cap Breton, or sweet wines such as Sauternes and Tokaji Aszú Eszencia. As for dishes, it can be served on baked potatoes with sour cream and onion, boiled asparagus with melted butter, or oven-baked fish — enhancing its unique, rich taste."
          ]
        ]
      ],
      "sectionMedia": [
        [],
        [],
        []
      ],
      "relatedSlugs": [
        "white-sturgeon-caviar",
        "history-of-caviar",
        "oscetra-caviar"
      ]
    },
    {
      "slug": "white-sturgeon-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "White Sturgeon Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("white-sturgeon-caviar-cover-page-bg.png"),
      "intro": "White sturgeon caviar, native to the west coast of North America, is prized for its large eggs, creamy texture, and delicate flavor.",
      "opening": [
        "Thanks to its high yield and ease of farming, White Sturgeon caviar is now among the most widely available and sought-after on the international market."
      ],
      "sections": [
        [
          "Main Characteristics of White Sturgeon Caviar:",
          [
            "Color: ranges from dark grey to deep black, with glossy reflections indicating freshness.",
            "Egg size: larger than other varieties, with a compact yet creamy texture.",
            "Flavor: delicate and slightly buttery, with marine notes and a smooth finish — ideal for those who prefer elegant, less intense flavors.",
            "Origin: predominantly farmed in the United States and Canada, synonymous with high quality and consistent production."
          ]
        ],
        [
          "Recommended Pairings",
          [
            "White Sturgeon caviar pairs beautifully with brut champagne, dry white wines, and delicate dishes such as buttered crostini, fish tartare, or new potatoes. Its versatility makes it perfect both for gourmet recipes and for simple yet refined tastings."
          ]
        ]
      ],
      "sectionMedia": [
        [],
        []
      ],
      "relatedSlugs": [
        "history-of-caviar",
        "main-types-of-caviar",
        "sevruga-caviar"
      ]
    },
    {
      "slug": "history-of-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "History of Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("history-of-caviar-cover.webp"),
      "intro": "The history of caviar traces back to ancient Persia and Russia. The word “caviar” comes from the Persian “khavyar”, meaning “egg.”",
      "opening": [
        "The Persians were the first to collect and salt sturgeon roe, giving birth to what we know today as caviar."
      ],
      "sections": [
        [
          "Spread in Russia",
          [
            "As early as the 8th century, Slavic fishermen harvested large quantities of sturgeon from the Volga, making use of every part of the fish. By the 12th century, caviar in Russia was an accessible food, even used as a source of energy during wartime. Over time, it evolved from a common staple into a symbol of luxury, becoming a hallmark of Russian aristocratic tradition."
          ]
        ],
        [
          "From the Russian Revolution to the Petrossian Brothers",
          [
            "In the 20th century, caviar conquered France, aided by Russian nobles who fled after the October Revolution of 1917. The Petrossian brothers, originally from Baku, were among the first to import it into France, striking agreements with the communist government. In the United States during the same period, caviar became an emblem of wealth and sophistication."
          ]
        ],
        [
          "The Rise of Fish Farms",
          [
            "Overfishing and the construction of dams on the Danube and Volga caused a dramatic reduction (about 80%) in sturgeon populations. In 1998, sturgeon was declared a protected species and fishing was banned worldwide, paving the way for aquaculture. In Italy, where caviar was known as early as the Renaissance (notably in Ferrara), many trout farmers shifted to sturgeon farming, making the country for years the world leader in production — today second only to China."
          ]
        ],
        [
          "Caviar Culture Today",
          [
            "China is currently the world’s leading producer, exporting caviar globally and supplying even France’s most prestigious restaurants. In France, Emile Prunier pioneered local caviar production between 1918 and 1920, and today domestic consumption remains predominant. Belgium, Spain, the UK, Hungary, and Bulgaria also contribute to Europe’s production."
          ]
        ],
        [
          "Historical Evolution",
          [
            "Persian Origins: The Persians were the first to salt sturgeon roe, creating caviar.",
            "Russia: In the 8th century, caviar was a common food, later becoming a luxury symbol.",
            "International Trade: By the 12th century, the scarcity of Caspian sturgeon led to conflicts over caviar trade.",
            "Expansion in the USA: After the Civil War, caviar was so common it was given away in saloons.",
            "Golden Age: In the 20th century, it became an elite product with rising prices.",
            "Sustainability: With the decline of wild sturgeon, sustainable aquaculture made caviar more accessible.",
            "Innovation: Today the market offers a wide variety of hybrids and techniques that ensure quality and environmental responsibility."
          ]
        ]
      ],
      "sectionMedia": [
        [],
        [],
        [
          {
            "src": academyImage("history-of-caviar-02.webp"),
            "alt": "History of Caviar"
          }
        ],
        [],
        []
      ],
      "relatedSlugs": [
        "main-types-of-caviar",
        "caviar-processing",
        "white-sturgeon-caviar"
      ]
    },
    {
      "slug": "main-types-of-caviar",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Main Types of Caviar",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("main-types-of-caviar-cover.webp"),
      "intro": "The main types of caviar include Beluga, Oscetra, Baerii, Kaluga, Sevruga, and White Sturgeon, each with distinct characteristics and origins.",
      "opening": [
        "Here are the most renowned and appreciated caviar varieties:",
        "Beluga (Huso huso): originally from the Black Sea and the Caspian Sea.",
        "Oscietra or Asetra (Acipenser gueldenstaedtii): of Russian origin.",
        "Baerii (Acipenser baerii): from Siberia.",
        "Kaluga or Amur (Acipenser dauricus x Schrenki): river sturgeon found in the Amur River basin.",
        "Sevruga (Acipenser stellatus): characterized by small eggs, once common in the Caspian and Black Seas.",
        "White Sturgeon (Acipenser transmontanus): native to the Pacific Ocean and North American rivers."
      ],
      "sections": [
        [
          "CaviarEat Varieties",
          [
            "CaviarEat offers the following caviar types in its catalog:",
            "Beluga (Huso huso): once widespread in the Black Sea and Caspian Sea.",
            "Oscietra or Asetra (Acipenser gueldenstaedtii): rooted in Russian tradition.",
            "Baerii (Acipenser baerii): of Siberian origin.",
            "Kaluga or Amur (Acipenser dauricus x Schrenki): native to the Amur River.",
            "The value and price of each variety mainly depend on the waiting time required for the female sturgeon to reach maturity and produce roe."
          ]
        ],
        [
          "Our Labels",
          [
            "All our product labels feature the signature Tiffany color — a highly fashionable shade also used by luxury brands such as Patek Philippe and Rolex.",
            "On the labels, alongside the commercial name of the caviar, you will always find:",
            "the age of the sturgeon at the time of processing,",
            "the egg size.",
            "On the legal labels, placed on the back of the tins, all mandatory information required by current regulations is provided."
          ]
        ],
        [
          "Comparison of Our Caviar Types",
          [
            {
              "type": "table",
              "rows": [
                [
                  "Attributes",
                  "Schrenkii Imperial",
                  "Royal Oscietra",
                  "Royal Baerii",
                  "Beluga Huso Huso",
                  "Huso Dauricus",
                  "Royal Kaluga"
                ],
                [
                  "Origin and Habitat",
                  "China, from Amur Sturgeon (Acipenser schrenckii)",
                  "From Russian Sturgeon (Acipenser gueldenstaedtii)",
                  "From Siberian Sturgeon (Acipenser baerii)",
                  "Caspian Sea, from Beluga Sturgeon (Huso huso)",
                  "Amur River basin, from Huso Dauricus Sturgeon",
                  "Amur River basin, from Kaluga Sturgeon (Huso dauricus)"
                ],
                [
                  "Fish Age",
                  "At least 12 years",
                  "9–11 years",
                  "6–8 years",
                  "Up to 20 years to maturity",
                  "Not specified",
                  "Not specified"
                ],
                [
                  "Production",
                  "Aquafarm in China",
                  "Traditionally Russia",
                  "Farmed worldwide",
                  "Limited for conservation",
                  "Controlled farming",
                  "Controlled farming"
                ],
                [
                  "Egg Size and Texture",
                  "3.1–3.3 mm, semi-firm to firm",
                  "2.7–3.0 mm, semi-firm",
                  "Large, firm",
                  "The largest, ranging from dark to light grey",
                  "Large, dark-colored",
                  "Large, 3.0–3.5 mm, firm"
                ],
                [
                  "Color",
                  "Bright brown to golden yellow",
                  "Dark brown to beige",
                  "Smoky grey to pure black",
                  "Dark grey to light grey",
                  "Golden brown",
                  "Variable, from amber to black"
                ],
                [
                  "Flavor",
                  "Nutty, fruity, creamy",
                  "Rich, nutty, buttery",
                  "Buttery, nutty",
                  "Buttery, delicate",
                  "Buttery, nutty, sweet",
                  "Buttery, nutty"
                ],
                [
                  "Salting",
                  "Malossol (lightly salted)",
                  "Malossol",
                  "Malossol",
                  "Malossol",
                  "Not specified",
                  "Not specified"
                ],
                [
                  "Harvesting Methods",
                  "Sustainable aquaculture",
                  "Traditional",
                  "Aquaculture",
                  "Limited for conservation",
                  "Controlled farming",
                  "Controlled farming"
                ],
                [
                  "Sustainability Aspects",
                  "Yes",
                  "Yes",
                  "Yes",
                  "Conservation efforts",
                  "Yes",
                  "Yes"
                ],
                [
                  "Price and Accessibility",
                  "Expensive",
                  "Expensive",
                  "Accessible",
                  "Very expensive",
                  "Expensive",
                  "Very expensive"
                ]
              ]
            }
          ]
        ]
      ],
      "sectionMedia": [
        [
          {
            "src": academyImage("main-types-of-caviar-02.png"),
            "alt": "Main Types of Caviar"
          }
        ],
        [
          {
            "src": academyImage("main-types-of-caviar-03.webp"),
            "alt": "Main Types of Caviar"
          }
        ],
        []
      ],
      "relatedSlugs": [
        "caviar-processing",
        "baerii-caviar",
        "history-of-caviar"
      ]
    },
    {
      "slug": "caviar-processing",
      "lang": "en",
      "eyebrow": "Caviar Academy",
      "title": "Caviar Processing",
      "meta": "CAVIAR ACADEMY · 2026",
      "image": academyImage("caviar-processing-cover.webp"),
      "intro": "Caviar processing is carried out by hand — from the selection of roe to the Malossol salting method, followed by packaging and maturation.",
      "opening": [
        "Sturgeons are processed only when their roe reaches natural maturity, a period that generally falls between the colder months of October and April. To determine the exact moment of maturity, each sturgeon undergoes ultrasound checks.",
        "The eggs must be harvested when they are not fully mature, retaining good resistance to the osmotic pressure of salt."
      ],
      "sections": [
        [
          "Evisceration",
          [
            "Processing is carried out entirely by hand. The ovarian sac is carefully removed, while the sturgeon meat is used to produce fillets or cuts, processed separately."
          ]
        ],
        [
          "Sieving",
          [
            "The roe is gently separated from the ovarian membrane using sieves with the right mesh size to avoid damaging the eggs."
          ]
        ],
        [
          "Washing and Selection",
          [
            "The eggs are then washed with cold water and sorted. Depending on the sturgeon species, the roe is classified by color, size, and flavor."
          ]
        ],
        [
          "Salting",
          [
            "Salting is an essential step in caviar preparation. In Europe, all caviars are Malossol (a Russian term meaning “lightly salted”), with about 40 g of salt per kilo of caviar — around 3.5% of the total weight. Salting is done manually with great care. The “Malossol” label is a guarantee of high quality."
          ]
        ],
        [
          "Packaging",
          [
            "After salting, the caviar is placed into original tins of about 1.8 kg, where it matures for 2 to 4 months. During this period, the tins are periodically turned to allow the salt to distribute evenly. Stored at a constant temperature between –2°C and –4°C, caviar in this form can last about 18 months."
          ]
        ],
        [
          "Packaging",
          [
            "After salting, the caviar is placed into original tins of about 1.8 kg, where it matures for 2 to 4 months. During this period, the tins are periodically turned to allow the salt to distribute evenly. Stored at a constant temperature between –2°C and –4°C, caviar in this form can last about 18 months."
          ]
        ],
        [
          "Repackaging",
          [
            "Subsequently, the caviar is divided into retail tins of 30 g, 50 g, 100 g, 250 g, and 500 g."
          ]
        ],
        [
          "Caviar Shelf Life",
          [
            "Once repackaged, caviar has a shelf life of about 6 months. After opening, it must be consumed within a maximum of 3 days. All preservation times refer to a product kept refrigerated between 0°C and 4°C; higher temperatures significantly reduce its shelf life."
          ]
        ],
        [
          "Can Caviar Be Cooked?",
          [
            "Caviar should never be cooked. It must be served with cold or lukewarm dishes to preserve its unique characteristics."
          ]
        ]
      ],
      "sectionMedia": [
        [
          {
            "src": academyImage("caviar-processing-02.webp"),
            "alt": "Caviar Processing"
          },
          {
            "src": academyImage("caviar-processing-03.webp"),
            "alt": "Caviar Processing"
          }
        ],
        [
          {
            "src": academyImage("caviar-processing-04.webp"),
            "alt": "Caviar Processing"
          }
        ],
        [],
        [
          {
            "src": academyImage("caviar-processing-05.webp"),
            "alt": "Caviar Processing"
          }
        ],
        [
          {
            "src": academyImage("main-types-of-caviar-cover.webp"),
            "alt": "Caviar Processing"
          }
        ],
        [],
        [
          {
            "src": academyImage("caviar-processing-07.webp"),
            "alt": "Caviar Processing"
          }
        ],
        [],
        []
      ],
      "relatedSlugs": [
        "baerii-caviar",
        "beluga-caviar",
        "main-types-of-caviar"
      ]
    }
  ];
  const enSummaries = {
    "baerii-caviar": "A practical introduction to Baerii caviar, from its fast maturation and accessible price to its compact grey-brown eggs and delicate briny character.",
    "beluga-caviar": "An overview of pure and hybrid Beluga, explaining its rarity, sensory profile, identification, history of luxury, and classic pairings.",
    "kaluga-amur-caviar": "A guide to Kaluga and Amur caviar, comparing their origins, maturity, egg size, golden-brown colour, and value as Beluga alternatives.",
    "oscetra-caviar": "A complete portrait of Oscetra caviar, covering its names, sensory qualities, grades, celebrated history, and refined food and wine pairings.",
    "sevruga-caviar": "A look at Sevruga’s small eggs, bold marine flavour, transatlantic heritage, defining characteristics, and recommended pairings.",
    "white-sturgeon-caviar": "An introduction to White Sturgeon caviar, its North American origin, creamy large eggs, consistent production, and versatile pairings.",
    "history-of-caviar": "A journey from Persian origins and Russian tradition to European luxury, aquaculture, conservation, and today’s global caviar culture.",
    "main-types-of-caviar": "A structured guide to the principal caviar varieties, their origins, labels, maturity, flavour, sustainability, price, and accessibility.",
    "caviar-processing": "A step-by-step overview of hand processing, from roe maturity and sieving to Malossol salting, maturation, repackaging, storage, and serving.",
  };
  const archives = {
    en: {
      "baerii-caviar": "Baerii",
      "beluga-caviar": "Beluga",
      "kaluga-amur-caviar": "Kaluga",
      "oscetra-caviar": "Oscetra",
      "sevruga-caviar": "Sevruga",
      "white-sturgeon-caviar": "White Sturgeon",
      "history-of-caviar": "History",
      "main-types-of-caviar": "Varieties",
      "caviar-processing": "Processing",
    },
    zh: {
      "baerii-caviar": "贝氏鲟",
      "beluga-caviar": "欧鳇",
      "kaluga-amur-caviar": "卡露伽",
      "oscetra-caviar": "奥西特拉",
      "sevruga-caviar": "闪光鲟",
      "white-sturgeon-caviar": "白鲟",
      "history-of-caviar": "历史",
      "main-types-of-caviar": "品种",
      "caviar-processing": "加工",
    },
  };
  const zhArticles = {
    "baerii-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "贝氏鲟鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "贝氏鲟鱼子酱取自西伯利亚鲟（Acipenser baerii），以灰棕色小颗粒和带有轻柔碘感的细腻风味著称。",
      opening: [
        "贝氏鲟是成熟速度较快的鲟鱼品种之一，约 7–8 年即可成熟，产出的鱼卵也比其他品种更小。",
        "这是我们产品目录中价格最亲民的鱼子酱，但凭借稳定品质和鲜明风味，依然深受厨师与美食爱好者喜爱。",
      ],
      sections: [["贝氏鲟鱼子酱的感官特征", [
        "品种：西伯利亚鲟（Acipenser baerii）",
        "色泽：从浅灰色到灰棕色",
        "颗粒尺寸：约2.9–3.0毫米",
        "鲟鱼年龄：8年",
        "香气：无强烈气味",
        "质地：颗粒紧实，弹性良好",
        "风味：香气细腻，带有轻柔咸鲜气息",
      ]]],
      asideSummary: "从较快的成熟周期和亲民价格，到紧实的灰棕色颗粒与细腻咸鲜风味，本文完整介绍贝氏鲟鱼子酱的核心特点。",
    },
    "beluga-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "贝鲁迦鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "贝鲁迦鱼子酱（Beluga caviar）被视为最奢华、最稀有的鱼子酱之一，取自欧鳇（Beluga sturgeon，Huso huso），以硕大的灰色颗粒和细腻、奶油般的口感闻名。",
      opening: [
        "贝鲁迦鱼子酱长期被视为最负盛名、价格最高昂的鱼子酱。爱德华八世的妻子华里丝·辛普森十分喜爱它，使其成为奢华生活与社会地位的象征。温莎夫妇在巴黎温莎别墅、昂蒂布角克罗城堡和伊夫林地区日夫的磨坊庄园举行的晚宴，以大量供应贝鲁迦鱼子酱闻名，宾客包括温斯顿·丘吉尔和玛琳·黛德丽等名流。",
        "作为稀有且备受追捧的珍馐，俄罗斯传统上曾是贝鲁迦鱼子酱的主要来源之一。",
      ],
      sections: [
        ["贝鲁迦鱼子酱的感官特征", [
          "品种：欧鳇",
          "色泽：从深灰色到浅灰色",
          "颗粒尺寸：3.3–3.5毫米，色泽均匀、油脂感良好",
          "鲟鱼年龄：18–20年",
          "香气：无明显气味",
          "质地：柔软、细腻，带有奶油感",
          "风味：清新的鱼鲜味与海洋、奶油气息，尾韵略带甜感",
        ]],
        ["如何辨别贝鲁迦鱼子酱", [
          "可通过密封罐上的标签辨别贝鲁迦鱼子酱。传统上，贝鲁迦标签和罐身使用蓝色或浅蓝色标识。鱼卵直径应在3–3.5毫米之间，色泽均匀。CaviarEat会在标签上明确标注纯种贝鲁迦，保证其纯度。",
        ]],
        ["杂交贝鲁迦", [
          "市场上也有常被称为“西伯利亚贝鲁迦”的杂交品种，由贝氏鲟雌鱼与欧鳇雄鱼杂交而成。其生产周期只需7–8年，而纯种欧鳇通常需要18–20年。",
        ]],
        ["贝鲁迦鱼子酱的搭配", [
          "理想搭配是香槟或优质起泡酒，可平衡鱼子酱天然的油脂感；冰镇伏特加也是经典选择。其他适合的酒款包括卢瓦尔河坡慕斯卡黛、加卢拉维蒙蒂诺DOCG、普罗旺斯卡西斯AOC、佛得角白麝香葡萄酒，或更现代的瓦尔多比亚德内普罗塞克。食物方面，可搭配薄切水煮土豆、黄油布里尼、溏心蛋，或淋有榛子油、核桃油的烤面包。",
        ]],
      ],
      asideSummary: "本文从稀有性、感官特征和标签辨别，到杂交品种、奢华历史与经典搭配，系统认识贝鲁迦鱼子酱。",
    },
    "kaluga-amur-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "卡露伽与阿穆尔鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "卡露伽与阿穆尔鱼子酱被视为珍贵贝鲁迦鱼子酱（Beluga caviar）的优质替代选择，主要优势在于价格更亲民。卡露伽鲟仅栖息于中俄之间的黑龙江及其支流。",
      opening: ["该鲟鱼的主要养殖场位于中国宜都。其鱼子酱与贝鲁迦鱼子酱十分相似，但风味略为浓郁；鱼卵色泽从棕色延伸至金色，是其鲜明特征。"],
      sections: [
        ["卡露伽与阿穆尔鱼子酱的感官特征", [
          "品种：达氏鳇×施氏鲟（Acipenser dauricus x Schrenki）",
          "色泽：从棕色到金色",
          "颗粒尺寸：约3.0–3.1毫米",
          "鲟鱼年龄：10–11年",
          "香气：无强烈气味",
          "质地：颗粒紧实、饱满",
          "风味：平衡而协调",
        ]],
        ["皇家卡露伽与阿穆尔的区别", [
          "CaviarEat产品目录提供两种卡露伽鱼子酱，主要区别在于颗粒尺寸、鲟鱼年龄与品质等级：",
          "皇家卡露伽：鲟鱼年龄10–12年，颗粒直径3.0–3.3毫米。",
          "阿穆尔：鲟鱼年龄约10年，颗粒直径约3.0毫米。",
        ]],
      ],
      asideSummary: "本文比较卡露伽与阿穆尔鱼子酱的产地、成熟周期、颗粒尺寸、金棕色泽，以及它们作为贝鲁迦替代选择的价值。",
    },
    "oscetra-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "奥西特拉鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "奥西特拉鱼子酱的颗粒色泽从灰色延伸至金色，质地丝滑，风味优雅，并带有榛子与黄油气息。",
      opening: [],
      sections: [
        ["不同名称", ["市场上常见Asetra、Oscietra或Osetra等不同拼写，但它们指的是同一种鱼子酱。"]],
        ["奥西特拉鱼子酱的感官特征", [
          "品种：俄罗斯鲟（Acipenser gueldenstaedtii）",
          "色泽：从深灰色到浅灰色，年龄较大的鲟鱼可呈现金色调。",
          "颗粒尺寸：3.0–3.3毫米，色泽均匀，质地紧实。",
          "鲟鱼年龄：10–12年。",
          "质地：丝滑、颗粒紧实，卵膜比贝鲁迦鱼子酱（Beluga caviar）略厚。",
          "风味：以榛子和黄油为主调，并带有类似龙虾与新鲜黄油的细腻甜感。",
        ]],
        ["皇家奥西特拉与奥西特拉", [
          "CaviarEat提供两种主要奥西特拉鱼子酱，它们在颗粒尺寸、鲟鱼年龄和整体品质上有所不同：",
          "皇家奥西特拉：鲟鱼年龄12–13年，颗粒直径3.2–3.3毫米。",
          "奥西特拉：鲟鱼年龄10–12年，颗粒直径3.0–3.1毫米。",
        ]],
        ["更多感官特征", [
          "色泽：从深灰色、浅灰色到金色；金色通常更珍贵，因为生产周期更长。",
          "外观：颗粒约2.5毫米，紧实且色泽均匀。",
          "香气：细微的果香与榛子气息，甜感比其他鱼子酱更柔和。",
          "质地：顺滑丝润，卵膜比贝鲁迦鱼子酱略厚。",
          "风味：榛子、黄油的丰润感，并伴有轻微泥土与海洋气息。",
          "不同鲟鱼品种杂交形成的奥西特拉，也会展现独特的感官层次。",
        ]],
        ["推荐搭配", [
          "奥西特拉适合搭配香槟或其他优质起泡酒。静止葡萄酒可选择普里尼-蒙哈榭一级园、夏布利特级园或干型泽比波。食物可从布里尼、薄切水煮土豆，延伸至焦化黄油龙虾配奥西特拉鱼子酱，或雅文邑火焰扇贝、鹅肝与奥西特拉鱼子酱等精致组合。",
        ]],
        ["奥西特拉与名人", [
          "奥西特拉始终是奢华与精致的象征。默片女星葛洛丽亚·斯旺森喜欢用烤面包、奥西特拉鱼子酱、碎熟蛋黄、细切洋葱、柠檬片与薄番茄片制作小食。以优雅著称的加里·格兰特在摩纳哥拍摄《捉贼记》（1955）期间，常在下午五点享用奥西特拉。1956年格蕾丝·凯利与兰尼埃三世亲王的婚礼上，奥西特拉也与香槟一同款待宾客。蒙特卡洛至今仍延续着里维埃拉与摩纳哥公国关于鱼子酱、优雅和精致生活的传统。",
        ]],
      ],
      asideSummary: "从名称、感官特征和等级差异，到名人轶事及精致餐酒搭配，本文完整呈现奥西特拉鱼子酱。",
    },
    "sevruga-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "闪光鲟鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "闪光鲟鱼子酱（Sevruga caviar）取自闪光鲟（stellate sturgeon，Acipenser stellatus），其鱼卵是主要鱼子酱品种中最小的，直径约2毫米，色泽均匀、质地紧实、风味浓郁。",
      opening: ["其风味带有海洋、碘、榛子与植物气息，并具有鲜明的清新感。它是风格最强烈的鱼子酱之一，尤其受到偏爱浓郁香气者的欣赏。"],
      sections: [
        ["闪光鲟鱼子酱的历史", [
          "20世纪上半叶，连接美国与欧洲的远洋客轮——如玛丽王后号、诺曼底号、雷克斯号、卡罗尼亚号、卢西塔尼亚号和著名的泰坦尼克号——象征着奢华与舒适。名流与上流社会聚集的船上餐厅供应精美菜肴，闪光鲟鱼子酱是头等舱菜单的亮点之一。传统上，它会盛放在带有镀金边缘的精致瓷贝壳中，并搭配细切洋葱、碎熟鸡蛋和烤面包。",
        ]],
        ["闪光鲟鱼子酱的特征", [
          "色泽：从深灰色到浅灰色，白化个体偶见金色。",
          "外观：颗粒较小，约2毫米，紧实且色泽均匀。",
          "香气：细腻海洋气息，伴有轻微榛子与草本香。",
          "质地：颗粒紧实，在柔软与爽脆之间取得平衡。",
          "风味：浓郁饱满，带有海洋、碘、榛子和植物层次，并有清新的明亮感。",
        ]],
        ["推荐搭配", [
          "闪光鲟鱼子酱既适合搭配菜肴，也适合精选酒款。可选择来自Cap Breton的白色沙地葡萄酒，或苏玳、托卡伊阿苏精华等甜酒。菜肴方面，可搭配酸奶油和洋葱烤土豆、融化黄油煮芦笋或烤鱼，以衬托其独特而浓郁的风味。",
        ]],
      ],
      asideSummary: "本文介绍闪光鲟鱼子酱的小颗粒、强烈海洋风味、远洋客轮时代的历史，以及其感官特征和推荐搭配。",
    },
    "white-sturgeon-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "白鲟鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "白鲟原生于北美西海岸，其鱼子酱以较大颗粒、奶油般质地和细腻风味受到珍视。",
      opening: ["得益于较高产量和易于养殖的特点，白鲟鱼子酱如今已成为国际市场上供应广泛、需求旺盛的品种之一。"],
      sections: [
        ["白鲟鱼子酱的主要特征", [
          "色泽：从深灰色到深黑色，具有体现新鲜度的明亮光泽。",
          "颗粒尺寸：比许多品种更大，质地紧实而带有奶油感。",
          "风味：细腻、略带黄油感，伴有海洋气息和顺滑尾韵，适合偏爱优雅、低强度风味的人。",
          "产地：主要养殖于美国和加拿大，以稳定产量和高品质著称。",
        ]],
        ["推荐搭配", [
          "白鲟鱼子酱适合搭配干型香槟、干白葡萄酒，以及黄油烤面包、鱼肉塔塔或新土豆等细腻菜肴。它用途广泛，既适合美食创作，也适合简洁而精致的直接品鉴。",
        ]],
      ],
      asideSummary: "本文从北美产地、较大而绵密的颗粒、稳定生产，到多样餐酒搭配，介绍白鲟鱼子酱的核心价值。",
    },
    "history-of-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "鱼子酱的历史",
      meta: "鱼子酱知识科普 · 2026",
      intro: "鱼子酱的历史可追溯至古代波斯与俄罗斯。“caviar”一词源自波斯语“khavyar”，意为“鱼卵”。",
      opening: ["波斯人最早采集并盐渍鲟鱼卵，由此孕育了今天所熟知的鱼子酱。"],
      sections: [
        ["在俄罗斯的传播", [
          "早在8世纪，斯拉夫渔民便从伏尔加河捕获大量鲟鱼，并充分利用鱼身各个部分。到12世纪，鱼子酱在俄罗斯仍是较易获得的食物，战争期间甚至被用作能量来源。随着时间推移，它由日常食品逐渐转变为奢华象征，并成为俄罗斯贵族传统的重要标志。",
        ]],
        ["从俄国革命到Petrossian兄弟", [
          "20世纪，鱼子酱随着1917年十月革命后流亡法国的俄罗斯贵族进入法国市场。来自巴库的Petrossian兄弟是最早将其进口到法国的人之一，并与当时政府达成贸易协议。同一时期，在美国，鱼子酱也成为财富与精致生活的象征。",
        ]],
        ["养殖场的兴起", [
          "过度捕捞以及多瑙河、伏尔加河水坝建设，使鲟鱼数量锐减约80%。1998年，鲟鱼被列为受保护物种，全球范围内的野生捕捞受到禁止，推动水产养殖发展。在意大利，鱼子酱早在文艺复兴时期便已出现，尤其与费拉拉有关；许多鳟鱼养殖户后来转向鲟鱼养殖，使意大利长期位居世界产量首位，如今仅次于中国。",
        ]],
        ["当代鱼子酱文化", [
          "中国目前是世界最大的鱼子酱生产国，产品出口全球，并供应法国多家著名餐厅。法国的Emile Prunier在1918至1920年间率先开展本土生产，如今法国市场仍以国内消费为主。比利时、西班牙、英国、匈牙利和保加利亚也共同构成欧洲产区。",
        ]],
        ["历史演变", [
          "波斯起源：波斯人最早盐渍鲟鱼卵，创造了鱼子酱。",
          "俄罗斯：8世纪时鱼子酱仍是普通食物，后来逐渐成为奢华象征。",
          "国际贸易：到12世纪，里海鲟鱼资源减少，引发围绕鱼子酱贸易的竞争。",
          "美国扩张：南北战争后，鱼子酱一度常见到在酒馆中免费供应。",
          "黄金时代：20世纪，鱼子酱成为价格不断攀升的精英食品。",
          "可持续发展：野生鲟鱼减少后，可持续水产养殖让鱼子酱更易获得。",
          "创新：如今市场拥有多种杂交品种与加工技术，在保障品质的同时兼顾环境责任。",
        ]],
      ],
      asideSummary: "本文沿着波斯起源、俄罗斯传统、欧洲奢华文化、养殖兴起与物种保护，梳理鱼子酱的全球历史。",
    },
    "main-types-of-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "鱼子酱的主要种类",
      meta: "鱼子酱知识科普 · 2026",
      intro: "主要鱼子酱品种包括欧鳇、奥西特拉、贝氏鲟、卡露伽、闪光鲟与白鲟，它们各自拥有不同的产地与感官特点。",
      opening: [
        "以下是最知名、最受欢迎的鱼子酱品种：",
        "欧鳇（Beluga sturgeon，Huso huso）：原产于黑海与里海。",
        "奥西特拉或Asetra（Acipenser gueldenstaedtii）：源自俄罗斯传统。",
        "贝氏鲟（Acipenser baerii）：源自西伯利亚。",
        "卡露伽或阿穆尔（Acipenser dauricus x Schrenki）：生活在黑龙江流域的河流鲟鱼。",
        "闪光鲟（Sevruga sturgeon，Acipenser stellatus）：以小颗粒著称，过去常见于里海和黑海。",
        "白鲟（Acipenser transmontanus）：原生于太平洋及北美河流。",
      ],
      sections: [
        ["CaviarEat鱼子酱品种", [
          "CaviarEat产品目录提供以下鱼子酱：",
          "欧鳇：过去广泛分布于黑海和里海。",
          "奥西特拉或Asetra（Acipenser gueldenstaedtii）：根植于俄罗斯传统。",
          "贝氏鲟（Acipenser baerii）：源自西伯利亚。",
          "卡露伽或阿穆尔（Acipenser dauricus x Schrenki）：原生于黑龙江流域。",
          "每个品种的价值与价格，主要取决于雌性鲟鱼成熟并产卵所需的等待时间。",
        ]],
        ["我们的标签", [
          "所有产品标签都采用标志性的蒂芙尼色，这种流行色调也被百达翡丽、劳力士等奢侈品牌使用。",
          "标签除标注鱼子酱商品名称外，还会注明：",
          "加工时的鲟鱼年龄；",
          "鱼卵颗粒尺寸。",
          "罐身背面的法定标签会提供现行法规要求的全部强制信息。",
        ]],
        ["鱼子酱品种对比", [{
          type: "table",
          rows: [
            ["属性", "施氏鲟帝王", "皇家奥西特拉", "皇家贝氏鲟", "欧鳇", "达氏鳇", "皇家卡露伽"],
            ["产地与栖息地", "中国，源自施氏鲟（Acipenser schrenckii）", "源自俄罗斯鲟（Acipenser gueldenstaedtii）", "源自西伯利亚鲟（Acipenser baerii）", "里海，源自欧鳇（Huso huso）", "黑龙江流域，源自Huso Dauricus", "黑龙江流域，源自达氏鳇（Huso dauricus）"],
            ["鱼龄", "至少12年", "9–11年", "6–8年", "最长需20年成熟", "未注明", "未注明"],
            ["生产方式", "中国水产养殖场", "传统产地为俄罗斯", "全球多地养殖", "因物种保护而限量", "可控养殖", "可控养殖"],
            ["颗粒尺寸与质地", "3.1–3.3毫米，半紧实至紧实", "2.7–3.0毫米，半紧实", "大颗粒、紧实", "颗粒最大，色泽从深灰到浅灰", "大颗粒、深色", "大颗粒，3.0–3.5毫米，紧实"],
            ["色泽", "亮棕色至金黄色", "深棕色至米色", "烟灰色至纯黑色", "深灰色至浅灰色", "金棕色", "从琥珀色到黑色不等"],
            ["风味", "坚果、果香、奶油感", "浓郁、坚果、黄油感", "黄油感、坚果", "黄油感、细腻", "黄油感、坚果、甜感", "黄油感、坚果"],
            ["盐渍方式", "Malossol轻盐法", "Malossol", "Malossol", "Malossol", "未注明", "未注明"],
            ["采收方式", "可持续水产养殖", "传统方式", "水产养殖", "因物种保护而限量", "可控养殖", "可控养殖"],
            ["可持续性", "是", "是", "是", "实施物种保护", "是", "是"],
            ["价格与可得性", "昂贵", "昂贵", "较易获得", "非常昂贵", "昂贵", "非常昂贵"],
          ],
        }]],
      ],
      asideSummary: "本文以结构化方式比较主要鱼子酱的产地、标签、成熟时间、风味、可持续性、价格与市场可得性。",
    },
    "caviar-processing": {
      eyebrow: "鱼子酱知识科普",
      title: "鱼子酱加工工艺",
      meta: "鱼子酱知识科普 · 2026",
      intro: "鱼子酱加工全程以手工完成，从鱼卵甄选、Malossol轻盐法，到装罐与熟成都需要精确控制。",
      opening: [
        "只有当鱼卵自然成熟时才会处理鲟鱼，这一时期通常位于10月至次年4月的寒冷月份。为了判断准确成熟时机，每条鲟鱼都会接受超声检查。",
        "鱼卵应在尚未完全成熟时采收，以保留承受盐分渗透压所需的良好韧性。",
      ],
      sections: [
        ["取卵", ["加工完全以手工进行。卵巢囊会被小心取出，鲟鱼肉则用于制作鱼柳或分切产品，并单独加工。"]],
        ["过筛", ["使用网孔尺寸合适的筛网，将鱼卵轻柔地从卵巢膜中分离，避免损伤颗粒。"]],
        ["清洗与分选", ["随后用冷水清洗并分选鱼卵。根据鲟鱼品种，鱼卵会按色泽、尺寸与风味分类。"]],
        ["盐渍", ["盐渍是鱼子酱制作的关键步骤。在欧洲，鱼子酱普遍采用Malossol轻盐法，每公斤鱼子酱约使用40克盐，约占总重量的3.5%。整个过程由人工谨慎完成；“Malossol”标识也代表高品质。"]],
        ["装罐与熟成", ["盐渍后，鱼子酱会装入约1.8公斤的原装罐中熟成2至4个月。期间定期翻转罐身，使盐分均匀分布。在–2°C至–4°C恒温保存时，原装状态可保存约18个月。"]],
        ["装罐与熟成", ["盐渍后，鱼子酱会装入约1.8公斤的原装罐中熟成2至4个月。期间定期翻转罐身，使盐分均匀分布。在–2°C至–4°C恒温保存时，原装状态可保存约18个月。"]],
        ["分装", ["随后将鱼子酱分装为30克、50克、100克、250克和500克的零售罐。"]],
        ["鱼子酱保质期", ["完成分装后，鱼子酱保质期约为6个月；开封后最多应在3天内食用。所有保存时间均以0°C至4°C冷藏为前提，更高温度会显著缩短保质期。"]],
        ["鱼子酱可以烹煮吗？", ["鱼子酱不应直接加热烹煮。应搭配冷食或温热菜肴，以保留其独特的质地与风味。"]],
      ],
      asideSummary: "本文逐步说明鱼卵成熟判断、手工取卵与过筛、Malossol盐渍、熟成、分装、冷藏和食用要求。",
    },
  };
  const topicArticles = [
    {
      lang: "zh", slug: "olive-oil-basics", topic: "olive", topicLabel: "橄榄油学院", artClass: "is-olive",
      eyebrow: "橄榄油学院", title: "什么是特级初榨橄榄油？", meta: "橄榄油学院 · 2026", archive: "基础认识",
      intro: "从橄榄果实、机械萃取到风味表达，认识特级初榨橄榄油的基本判断标准。",
      opening: ["特级初榨橄榄油不是单一风味的调味品，而是由橄榄品种、产区、采收时间、加工方式和保存条件共同决定的食材。"],
      sections: [["从果实到油品", ["优质橄榄油通常以新鲜橄榄果为原料，通过物理方式完成压榨或离心分离，不依靠化学精炼来掩盖原料缺陷。具体等级、产地和批次信息应以产品标签与技术资料为准。"]], ["风味不是越强越好", ["青草、番茄叶、杏仁、洋蓟或温和辛香，都可能成为橄榄油的感官线索。强烈或温和并不直接等于高低，关键在于风味是否干净、平衡且适合使用场景。"]], ["阅读标签", ["购买时可以关注等级名称、原产地、采收年份或日期、净含量、保存方式和生产者信息。对营养与健康的理解，应放在均衡饮食的整体框架中。"]]],
      asideSummary: "一篇适合初学者的特级初榨橄榄油入门，从原料、加工、风味到标签阅读建立基本判断。",
      relatedSlugs: ["olive-regions", "olive-tasting"],
    },
    {
      lang: "zh", slug: "olive-regions", topic: "olive", topicLabel: "橄榄油学院", artClass: "is-olive",
      eyebrow: "橄榄油学院", title: "从产区到风味：意大利橄榄油的区域差异", meta: "橄榄油学院 · 2026", archive: "产区与品种",
      intro: "意大利不同大区拥有不同的气候、土壤、海拔与橄榄品种，风味也因此呈现丰富的地域性。",
      opening: ["意大利橄榄油没有一种统一的‘标准味道’。北部、中部与南部的产区，以及岛屿地区，都在香气、苦味、辛辣感和质地上形成自己的表达。"],
      sections: [["北部与湖区", ["较凉爽的气候和湖区环境，常带来更细致、平衡的香气表达。适合搭配鱼类、蔬菜和清淡前菜的油品，需要在清新感与圆润度之间取得平衡。"]], ["中部丘陵", ["托斯卡纳、翁布里亚等中部地区常见青草、朝鲜蓟和更清晰的辛香感，适合豆类、烤蔬菜、汤品以及需要油品承担主要风味的菜肴。"]], ["南部与岛屿", ["地中海日照、海风与本地品种共同塑造了南部及岛屿油品的丰润、果香或辛香层次。具体风味仍应以品种、年份和生产者的技术资料为依据。"]]],
      asideSummary: "把意大利橄榄油放回产区、气候和品种中理解，而不是用单一口味评价所有油品。",
      relatedSlugs: ["olive-oil-basics", "olive-tasting"],
    },
    {
      lang: "zh", slug: "olive-tasting", topic: "olive", topicLabel: "橄榄油学院", artClass: "is-olive",
      eyebrow: "橄榄油学院", title: "如何品鉴、保存和使用橄榄油", meta: "橄榄油学院 · 2026", archive: "品鉴与日常",
      intro: "用简单、可复现的方法观察橄榄油的香气、口感和使用场景，让油品真正进入日常餐桌。",
      opening: ["品鉴橄榄油不需要复杂器具。干净的小杯、适宜的温度和不受干扰的环境，就足以帮助我们区分香气、苦味、辛辣感与余韵。"],
      sections: [["三步品鉴", ["先观察香气，再小口含住并感受果香与质地，最后注意喉部的辛辣感和回味。苦味与辛辣感可以是新鲜橄榄油的自然特征，但应与整体风味保持平衡。"]], ["保存比想象中重要", ["橄榄油应避光、密封并远离高温。开封后尽量在合理时间内使用，避免长期放在灶台旁或透明容器中。具体保质期和保存要求以产品标签为准。"]], ["从冷用到烹饪", ["风味细致的油品适合沙拉、面包和完成菜肴；风味更饱满的油品适合豆类、烤蔬菜、意面和汤品。选择合适的油，是让食材更清晰，而不是掩盖食材。"]]],
      asideSummary: "从闻香、入口到保存和烹饪，建立一套适合家庭与专业厨房的橄榄油使用方法。",
      relatedSlugs: ["olive-oil-basics", "olive-regions"],
    },
    {
      lang: "zh", slug: "gelato-vs-ice-cream", topic: "gelato", topicLabel: "意式手工冰淇淋学院", artClass: "is-gelato",
      eyebrow: "意式手工冰淇淋学院", title: "意式手工冰淇淋与普通冰淇淋：从名字到口感的区别", meta: "意式手工冰淇淋学院 · 2026", archive: "基础认识",
      intro: "意式手工冰淇淋不是简单换一种说法，而是一套与配方、温度、空气含量和服务方式相关的意大利甜品传统。",
      opening: ["在中国市场，意式手工冰淇淋常与普通冰淇淋混称，但它拥有自己的制作逻辑和文化背景。不同配方和生产者会形成差异，因此不能只用一个指标定义所有意式手工冰淇淋。"],
      sections: [["服务温度与香气", ["意式手工冰淇淋通常在较柔软的状态下呈现，香气释放也更直接。实际温度需要根据配方、设备和门店操作进行控制。"]], ["空气与质地", ["意式手工冰淇淋强调细腻、紧密和顺滑的口感。搅拌过程中引入的空气量、乳脂与固形物比例，都会影响最终的质地和融化速度。"]], ["意大利的日常文化", ["意式手工冰淇淋不仅是一种甜品，也是一种城市生活方式。LuxurEat（露意膳）将以意大利工艺和真实风味为主线，持续介绍它的历史与制作。"]]],
      asideSummary: "用清晰的语言区分意式手工冰淇淋与普通冰淇淋，同时保留不同配方和工艺的真实差异。",
      relatedSlugs: ["gelato-history", "ugolini-gelato-mix"],
    },
    {
      lang: "zh", slug: "gelato-history", topic: "gelato", topicLabel: "意式手工冰淇淋学院", artClass: "is-gelato",
      eyebrow: "意式手工冰淇淋学院", title: "意式手工冰淇淋：从城市传统到现代工艺", meta: "意式手工冰淇淋学院 · 2026", archive: "历史与工艺",
      intro: "了解意式手工冰淇淋如何从意大利城市文化发展为兼具传统、创意与专业技术的现代甜品。",
      opening: ["意式手工冰淇淋的魅力在于它能把地方食材、季节风味和即时制作结合起来。每一家手工冰淇淋店都有自己的配方节奏，但对新鲜、平衡与口感的追求始终贯穿其中。"],
      sections: [["从季节食材开始", ["坚果、可可、咖啡、水果和香草都可以成为意式手工冰淇淋的风味基础。优秀的配方不会用过度甜度覆盖原料，而是让香气在低温中保持清晰。"]], ["工艺决定稳定性", ["配方设计、巴氏处理、熟化、冷冻和展示温度共同决定意式手工冰淇淋的稳定性。对于家庭、手工门店和食品业客户，设备与流程不同，配方也需相应调整。"]], ["面向中国餐桌的表达", ["未来内容会介绍适合中国消费者的经典口味、搭配方式和门店应用，并区分知识内容、家庭制作和专业生产的实际需求。"]]],
      asideSummary: "从季节原料、配方设计到展示温度，认识意式手工冰淇淋背后的传统和现代工艺。",
      relatedSlugs: ["gelato-vs-ice-cream", "ugolini-gelato-mix"],
    },
    {
      lang: "zh", slug: "ugolini-gelato-mix", topic: "gelato", topicLabel: "意式手工冰淇淋学院", artClass: "is-gelato",
      eyebrow: "新品前瞻", title: "新品：Luxureat（露意膳）意式手工冰淇淋粉末基底即将上线", meta: "意式手工冰淇淋 · 即将上线", archive: "产品前瞻",
      intro: "Luxureat（露意膳）全新意式手工冰淇淋粉末基底系列即将推出，面向家庭、店铺及食品业客户，提供更灵活、便捷的意式冰淇淋制作选择。具体口味、规格及上市信息，请以最终产品资料为准。",
      opening: ["这是一项产品前瞻内容，而不是已经完成的销售承诺。现阶段只介绍产品方向，不预先承诺未经确认的口味、规格、配方或上市时间。"],
      sections: [["面向不同使用场景", ["家庭用户、专业门店和食品业客户的设备、产量与操作条件不同，正式资料将按不同使用场景说明适用范围。"]], ["从便利到稳定", ["粉末基底的价值不仅是简化步骤，还应帮助使用者理解称量、混合、温度和设备条件。最终表现仍需以正式配方和操作说明为准。"]], ["上市前的信息准备", ["正式上市前，产品页面将提供配料、过敏原、营养、建议用量、操作步骤、包装规格和保存条件等可核对信息。"]]],
      asideSummary: "新品方向已经明确，具体口味、规格、配方与上市时间仍以最终产品资料为准。",
      relatedSlugs: ["gelato-vs-ice-cream", "gelato-history"],
    },
    {
      lang: "en", slug: "olive-oil-basics", topic: "olive", topicLabel: "Olive Oil Academy", artClass: "is-olive",
      eyebrow: "Olive Oil Academy", title: "What is extra virgin olive oil?", meta: "Olive Oil Academy · 2026", archive: "Foundations",
      intro: "A clear introduction to fruit, mechanical extraction and the basic signals that shape extra virgin olive oil.",
      opening: ["Extra virgin olive oil is not one fixed flavour. Variety, territory, harvest timing, processing and storage all shape the ingredient that reaches the table."],
      sections: [["From fruit to oil", ["Good olive oil is made from fresh olives through physical processes such as pressing or centrifugation, without chemical refining to hide defects. Grade, origin and lot information should always be checked on the final product documentation."]], ["Flavour is not a volume contest", ["Green grass, tomato leaf, almond, artichoke and gentle spice can all be part of an olive oil's sensory profile. Intensity is not the same as quality; balance, cleanliness and suitability for the dish matter more."]], ["Reading the label", ["Look for grade, origin, harvest information, net quantity, storage guidance and producer details. Nutrition should be understood as part of a balanced diet, not as a medical promise."]]],
      asideSummary: "A practical first guide to extra virgin olive oil, from raw material and processing to flavour and label reading.",
      relatedSlugs: ["olive-regions", "olive-tasting"],
    },
    {
      lang: "en", slug: "olive-regions", topic: "olive", topicLabel: "Olive Oil Academy", artClass: "is-olive",
      eyebrow: "Olive Oil Academy", title: "From territory to flavour: regional Italy", meta: "Olive Oil Academy · 2026", archive: "Origins & cultivars",
      intro: "Italy's climates, soils, elevations and cultivars create a rich regional vocabulary of olive oil flavour.",
      opening: ["There is no single standard taste for Italian olive oil. Northern, central and southern regions, together with the islands, each create different expressions of aroma, bitterness, spice and texture."],
      sections: [["Northern and lake regions", ["Cooler climates and lake territories often bring delicate, balanced aromatic profiles, suited to fish, vegetables and lighter starters."]], ["Central hills", ["Central regions such as Tuscany and Umbria often show green, artichoke-like and more clearly peppery notes, working well with beans, roasted vegetables, soups and pasta."]], ["The south and islands", ["Mediterranean light, sea air and local cultivars shape fuller, fruitier or more peppery southern and island oils. Exact flavour depends on variety, harvest and producer technique."]]],
      asideSummary: "A regional way to understand Italian olive oil, linking climate, cultivar and kitchen use rather than judging every oil by one taste.",
      relatedSlugs: ["olive-oil-basics", "olive-tasting"],
    },
    {
      lang: "en", slug: "olive-tasting", topic: "olive", topicLabel: "Olive Oil Academy", artClass: "is-olive",
      eyebrow: "Olive Oil Academy", title: "How to taste, store and use olive oil", meta: "Olive Oil Academy · 2026", archive: "Tasting & daily use",
      intro: "A simple, repeatable approach to aroma, texture, storage and the right use for each oil.",
      opening: ["Olive oil tasting does not require complicated equipment. A clean cup, a suitable temperature and a quiet moment are enough to notice aroma, bitterness, spice and finish."],
      sections: [["Three steps", ["Smell first, then take a small sip and notice fruit, texture and finish. Bitterness and peppery sensation can be natural signs of fresh oil, but they should remain balanced with the whole profile."]], ["Storage matters", ["Keep olive oil away from light and heat, sealed after use. Avoid leaving it beside a cooker or in a transparent container. Shelf life and storage instructions should follow the product label."]], ["From finishing to cooking", ["Delicate oils can finish salads, bread and plated dishes; fuller oils can support beans, roasted vegetables, pasta and soups. The right oil clarifies the ingredient rather than hiding it."]]],
      asideSummary: "A practical guide to tasting and using olive oil at home or in a professional kitchen.",
      relatedSlugs: ["olive-oil-basics", "olive-regions"],
    },
    {
      lang: "en", slug: "gelato-vs-ice-cream", topic: "gelato", topicLabel: "Italian Gelato Academy", artClass: "is-gelato",
      eyebrow: "Italian Gelato Academy", title: "Gelato and ice cream: from name to texture", meta: "Italian Gelato Academy · 2026", archive: "Foundations",
      intro: "Gelato is not simply another English word for ice cream; it is an Italian tradition shaped by recipe, temperature, air and service.",
      opening: ["Gelato is often translated as ice cream, but its production logic and cultural setting deserve their own explanation. Recipes and producers differ, so no single number defines every gelato."],
      sections: [["A warmer service temperature", ["Gelato is commonly served at a warmer temperature than traditional ice cream, making it softer and allowing aroma to open more directly. Exact temperature depends on recipe, equipment and service practice."]], ["Air and texture", ["Gelato aims for a dense, smooth and supple texture. Air incorporation, fat and solids all influence the final mouthfeel and melting rate."]], ["A daily Italian culture", ["Gelato is part of everyday Italian life, enjoyed in streets, squares and family gatherings. LuxurEat will introduce its history and craft through real Italian flavours and methods."]]],
      asideSummary: "A clear distinction between Italian Gelato and ice cream, while respecting the real differences between recipes and producers.",
      relatedSlugs: ["gelato-history", "ugolini-gelato-mix"],
    },
    {
      lang: "en", slug: "gelato-history", topic: "gelato", topicLabel: "Italian Gelato Academy", artClass: "is-gelato",
      eyebrow: "Italian Gelato Academy", title: "Italian Gelato: from city tradition to modern craft", meta: "Italian Gelato Academy · 2026", archive: "History & craft",
      intro: "How Gelato connects local ingredients, seasonal flavour and professional technique in modern Italy.",
      opening: ["Gelato combines regional ingredients, seasonal rhythm and immediate service. Every gelateria has its own pace and recipe, but freshness, balance and texture remain central ambitions."],
      sections: [["Start with the season", ["Nuts, cocoa, coffee, fruit and herbs can all become a gelato base. A thoughtful recipe does not hide the ingredient beneath excess sweetness; it keeps aroma clear at low temperature."]], ["Process creates consistency", ["Recipe design, pasteurisation, maturation, freezing and display temperature all shape stability. Home, artisanal and industrial production require different technical decisions."]], ["A Chinese table perspective", ["Future articles will explore Italian Gelato flavours, pairings and shop applications for Chinese visitors, while keeping education, home preparation and professional production clearly separate."]]],
      asideSummary: "A grounded introduction to the seasonal ingredients, recipe design and process behind Italian Gelato.",
      relatedSlugs: ["gelato-vs-ice-cream", "ugolini-gelato-mix"],
    },
    {
      lang: "en", slug: "ugolini-gelato-mix", topic: "gelato", topicLabel: "Ugolini Gelato", artClass: "is-gelato",
      eyebrow: "Ugolini Gelato", title: "Ugolini Gelato mix: a professional direction in development", meta: "Ugolini Gelato · Planned launch", archive: "Product outlook",
      intro: "Ugolini is exploring Gelato powder bases for family, artisanal and industrial gelaterias; final flavours, formats and launch information will follow the confirmed product file.",
      opening: ["This is a product outlook, not a completed sales promise. Future formats may include single portions and 1 kg packs, with distinctive directions such as truffle or caviar subject to development, compliance and tasting validation."],
      sections: [["For different production scales", ["A family gelateria needs clear preparation steps; an artisanal shop needs stable batch performance; an industrial customer needs specification, supply, labelling and process fit. Final materials will explain each use case separately."]], ["From flavour idea to workable recipe", ["Truffle or caviar flavour requires balance between aroma, sweetness, fat, storage stability and real consumption occasions. Final flavour and formula must follow research, regulation and sensory testing."]], ["Information before launch", ["Before launch, the product file should cover ingredients, allergens, nutrition, dosage, preparation, pack sizes, storage and B2B cooperation, so every gelateria can assess production fit with confidence."]]],
      asideSummary: "A careful pre-launch direction for Ugolini Gelato mixes: clear use cases and information first, final formula and launch details later.",
      relatedSlugs: ["gelato-vs-ice-cream", "gelato-history"],
    },
  ];
  const supplementalTopicSpecs = [
    {
      slug: "italian-food-culture", topic: "culture", artClass: "is-culture", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "探索意大利", en: "Explore Italy" }, title: { zh: "意大利美食，不止一种味道", en: "Italian food is more than one flavour" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "文化地图", en: "Culture map" },
      intro: { zh: "从气候、地貌、历史和家庭餐桌出发，理解意大利饮食文化的多样性。", en: "A starting point for understanding Italy through climate, landscape, history and the family table." },
      opening: { zh: ["意大利没有一张可以概括全部地区的菜单。每个地方都把当地的谷物、蔬菜、奶酪、鱼肉、橄榄油和保存方法，写进自己的日常饮食。"], en: ["Italy cannot be reduced to one menu. Every place writes its grains, vegetables, cheeses, fish, olive oil and preservation methods into everyday food." ] },
      sections: { zh: [["土地决定食材", ["阿尔卑斯山、亚平宁山脉、平原、海岸和岛屿带来不同的农业节奏。理解食物，先理解它从哪里来。"]], ["传统并不等于停留", ["意大利家庭菜谱会随季节、家庭规模和城市生活变化。传统的核心是尊重食材与方法，而不是机械复制一个固定答案。"]], ["从知识走到餐桌", ["LuxurEat 的内容会把产地、风味、制作、搭配和实际使用连起来，再把产品放回真实的餐桌场景中。"]]], en: [["Land shapes ingredients", ["Alpine valleys, the Apennines, plains, coastlines and islands create different agricultural rhythms. To understand a dish, begin with its territory."]], ["Tradition can move forward", ["Italian family recipes change with seasons, household size and urban life. Tradition is respect for ingredients and method, not a frozen answer."]], ["From knowledge to the table", ["LuxurEat connects origin, flavour, technique, pairing and use, then places products back into real table occasions."]]] },
      asideSummary: { zh: "一篇进入意大利饮食文化的总览，帮助读者理解后续产区、食材、食谱与产品专题。", en: "A broad entry to Italian food culture, linking the regional, ingredient, recipe and product stories that follow." }, relatedSlugs: ["italy-regions", "regional-traditions", "ingredients-territory"],
    },
    {
      slug: "italy-regions", topic: "culture", artClass: "is-culture", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "产区地图", en: "Territory Map" }, title: { zh: "意大利二十个大区：一张餐桌地图", en: "Italy's twenty regions: a map of the table" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "二十个大区", en: "Twenty regions" },
      intro: { zh: "从皮埃蒙特到西西里，二十个大区各有气候、物产、传统与餐桌语言。", en: "From Piedmont to Sicily, twenty regions carry distinct climates, ingredients, traditions and table languages." },
      opening: { zh: ["区域差异不是简单的‘北方’与‘南方’二分。城市、山谷、海岸、岛屿和历史贸易路线，都会改变一个地方的味道。"], en: ["Regional difference is not simply a north-versus-south split. Cities, valleys, coastlines, islands and historic trade routes all change the way a place tastes."] },
      sections: { zh: [["北部", ["皮埃蒙特、伦巴第、威尼托、利古里亚等地常见山地、湖区与海岸的交汇，奶酪、米饭、玉米、坚果、鱼类与细腻酱汁形成多样表达。"]], ["中部", ["托斯卡纳、翁布里亚、拉齐奥、马尔凯等地区重视谷物、豆类、橄榄油、野味和烤制风味，乡村传统与城市餐桌彼此影响。"]], ["南部与岛屿", ["坎帕尼亚、普利亚、卡拉布里亚、西西里、撒丁岛等地以日照、海风、番茄、柑橘、麦类、鱼类和辛香表达地中海性格。"]], ["如何使用这张地图", ["产区不是品质排名。它提供的是风味线索，最终仍应结合具体品种、年份、生产者和产品资料判断。"]]], en: [["The north", ["Piedmont, Lombardy, Veneto and Liguria bring together mountains, lakes and coastlines, with cheeses, rice, corn, nuts, fish and delicate sauces. "]], ["The centre", ["Tuscany, Umbria, Lazio and the Marche value grains, beans, olive oil, game and roasting, where rural and urban tables meet."]], ["The south and islands", ["Campania, Puglia, Calabria, Sicily and Sardinia express Mediterranean light through tomatoes, citrus, wheat, fish and spice."]], ["How to use the map", ["A region is not a ranking. It is a flavour clue; final judgement still depends on cultivar, harvest, producer and product information."]]] },
      asideSummary: { zh: "用二十个大区建立产区认知，后续可继续扩展每个大区的食材、食谱与生产者档案。", en: "A regional index for future ingredient, recipe and producer profiles across all twenty Italian regions." }, relatedSlugs: ["italian-food-culture", "regional-traditions", "olive-regions"],
    },
    {
      slug: "regional-traditions", topic: "culture", artClass: "is-culture", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "地方风味与传统", en: "Regional Flavours & Traditions" }, title: { zh: "地方风味：传统如何留在日常餐桌", en: "Regional flavour: how tradition stays on the table" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "传统与日常", en: "Tradition & daily life" },
      intro: { zh: "认识意大利菜，不只是记住菜名，更要理解节庆、季节和家庭分工如何塑造味道。", en: "Italian food is not only a list of dishes; festivals, seasons and family habits shape how flavour is made and shared." },
      opening: { zh: ["同一个食材，在不同地方可能有完全不同的处理方式。差异来自保存技术、气候、可得性和一代代人的经验。"], en: ["The same ingredient can be handled in entirely different ways from one place to another. Preservation, climate, availability and inherited experience all matter."] },
      sections: { zh: [["季节是第一种调味", ["春季嫩菜、夏季番茄、秋季菌菇与冬季炖煮，都让餐桌与土地保持联系。"]], ["节庆与共享", ["许多地方菜肴在节庆和家庭聚会中被重复制作，食物同时承担记忆、礼仪与社群关系。"]], ["现代生活中的传承", ["今天的意大利家庭也会使用现代设备和新渠道，但仍通过清晰的风味、适量和尊重原料保留传统精神。"]]], en: [["Season is the first seasoning", ["Tender spring vegetables, summer tomatoes, autumn mushrooms and winter stews keep the table connected to the land."]], ["Festivals and sharing", ["Many regional dishes are repeated at festivals and family gatherings, carrying memory, ritual and community at once."]], ["Tradition in modern life", ["Italian homes use modern equipment and new channels, while preserving tradition through clarity of flavour, proportion and respect for ingredients."]]] },
      asideSummary: { zh: "从季节、节庆和家庭餐桌理解地方传统，而不是把意大利美食简化成几个固定符号。", en: "A practical way to read regional tradition through season, celebration and the family table." }, relatedSlugs: ["italy-regions", "ingredients-territory", "table-etiquette"],
    },
    {
      slug: "ingredients-territory", topic: "culture", artClass: "is-culture", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "从产地到餐桌", en: "From Territory to Table" }, title: { zh: "从产地到餐桌：读懂一份意大利食材", en: "From territory to table: reading an Italian ingredient" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "产地与应用", en: "Origin & use" },
      intro: { zh: "一份好的食材说明，应该连接产地、品种、加工、保存、风味和使用方式。", en: "A useful ingredient profile connects origin, variety, processing, storage, flavour and use." },
      opening: { zh: ["消费者看到的不应只有一个产品名称。清晰的资料让人知道它来自哪里、如何制作、适合什么场景，以及哪些信息仍需以标签为准。"], en: ["A product name is not enough. Clear information shows where an ingredient comes from, how it is made, where it fits, and which details must still be checked on the label."] },
      sections: { zh: [["六个问题", ["它来自哪里？使用什么品种？何时采收或制作？经过怎样的加工？如何保存？最适合如何使用？"]], ["把专业信息说清楚", ["技术指标、过敏原、营养和认证应以具体产品文件为依据，内容教育不代替标签、法规或专业意见。"]], ["连接产品与食谱", ["当读者理解食材的性格，就能更自然地选择搭配、份量与烹饪方式。"]]], en: [["Six questions", ["Where does it come from? Which variety? When was it harvested or made? How was it processed? How should it be stored? Where does it work best?"]], ["Make technical information clear", ["Specifications, allergens, nutrition and certifications must follow the product file; education does not replace a label, regulation or professional advice."]], ["Connect product and recipe", ["Once readers understand an ingredient's character, they can choose pairings, portions and methods more naturally."]]] },
      asideSummary: { zh: "建立统一的食材阅读框架，为橄榄油、鱼子酱、松露和 Gelato 产品资料提供共同语言。", en: "A shared reading framework for olive oil, caviar, truffles and future Gelato product files." }, relatedSlugs: ["italian-food-culture", "nutrition-labels", "clean-label"],
    },
    {
      slug: "table-etiquette", topic: "culture", artClass: "is-culture", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "意大利餐桌礼仪", en: "Italian Table Culture" }, title: { zh: "意大利餐桌礼仪：慢下来，分享风味", en: "Italian table culture: slow down and share flavour" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "餐桌文化", en: "Table culture" },
      intro: { zh: "餐桌礼仪不是距离感，而是让食物、时间和人与人之间的交流被认真对待。", en: "Table etiquette is not about distance; it gives food, time and conversation the attention they deserve." },
      opening: { zh: ["意大利餐桌通常重视节奏、分享与适量。每一道菜都有自己的位置，但最重要的是让人能够一起吃饭、交谈和感受食物。"], en: ["Italian tables often value rhythm, sharing and proportion. Each course has a place, but the essential point is to eat, talk and experience food together."] },
      sections: { zh: [["从前菜到甜点", ["多道菜的结构让不同风味逐层展开。份量不必过大，节奏比堆叠更重要。"]], ["尊重食材", ["优质橄榄油、鱼子酱和松露应以合适温度、器具和份量呈现，不需要过度装饰。"]], ["适合中国家庭的表达", ["家庭用餐可以保留分享和从容的精神，同时根据人数、时间与可获得的食材灵活调整。"]]], en: [["From antipasto to dessert", ["A multi-course structure lets flavour unfold gradually. Portions need not be large; rhythm matters more than excess."]], ["Respect the ingredient", ["Good olive oil, caviar and truffles need the right temperature, tools and portion, not unnecessary decoration."]], ["A Chinese home expression", ["A family meal can keep the spirit of sharing and ease while adapting to local ingredients, time and household size."]]] },
      asideSummary: { zh: "把餐桌礼仪转化为可实践的节奏、份量和分享方式。", en: "A practical view of rhythm, proportion and sharing at the Italian table." }, relatedSlugs: ["italian-food-culture", "regional-traditions", "pairings-class"],
    },
    {
      slug: "cooking-techniques", topic: "culture", artClass: "is-academy", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "基础烹饪课程", en: "Fundamental Cooking Techniques" }, title: { zh: "意大利料理的基础技法", en: "Fundamental techniques of Italian cooking" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "基础技法", en: "Core techniques" },
      intro: { zh: "从控温、乳化、收汁到熟成，基础技法决定食材能否保持清晰风味。", en: "Temperature, emulsion, reduction and resting determine whether an ingredient keeps a clear flavour." },
      opening: { zh: ["意大利料理看似简单，真正的难点在于让少量原料保持平衡。技法应服务于食材，而不是掩盖食材。"], en: ["Italian cooking can look simple, but its challenge is keeping a small number of ingredients in balance. Technique should serve the ingredient, not hide it."] },
      sections: { zh: [["控温", ["低温融化黄油、保持烩饭流动性、控制 Gelato 的展示温度，都会直接改变口感。"]], ["乳化与收汁", ["面水、油脂、奶酪或高汤通过搅拌形成连续的酱汁，关键是逐步加入液体并观察质地。"]], ["最后一步", ["橄榄油、松露、奶酪或香草往往在出锅后完成风味收束，份量与时机同样重要。"]]], en: [["Temperature", ["Low heat for butter, a fluid risotto texture and the right Gelato display temperature all directly change mouthfeel."]], ["Emulsion and reduction", ["Pasta water, fat, cheese or stock can form a continuous sauce when liquid is added gradually and texture is watched."]], ["The final step", ["Olive oil, truffle, cheese or herbs often finish a dish after cooking; timing and proportion matter equally."]]] },
      asideSummary: { zh: "用少量、可复现的基础技法，帮助家庭和专业厨房稳定表达食材风味。", en: "A compact set of repeatable techniques for clearer flavour in home and professional kitchens." }, relatedSlugs: ["pasta-academy", "pairings-class", "olive-tasting"],
    },
    {
      slug: "pasta-academy", topic: "culture", artClass: "is-academy", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "意大利面学院", en: "Pasta Academy" }, title: { zh: "意大利面：形状、酱汁与火候", en: "Pasta: shape, sauce and timing" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "意面基础", en: "Pasta basics" },
      intro: { zh: "意大利面不是单一产品，形状、面团、酱汁和烹煮方式共同决定最终口感。", en: "Pasta is not one product; shape, dough, sauce and cooking method together define the final bite." },
      opening: { zh: ["选择意大利面时，不只看名称。粗细、表面纹理和形状会影响酱汁附着与入口节奏。"], en: ["Choosing pasta is not only about the name. Thickness, surface and shape affect sauce adhesion and the rhythm of the bite."] },
      sections: { zh: [["形状与酱汁", ["细面适合轻盈、顺滑的酱汁；管状或纹理明显的形状更适合承托肉酱、奶酪和蔬菜颗粒。"]], ["面水是风味的一部分", ["带有淀粉的面水可帮助油脂与奶酪形成更顺滑的酱汁，加入时应少量多次。"]], ["出锅仍会继续变化", ["面条离火后仍会吸收酱汁，因此应在略有弹性时完成翻拌与装盘。"]]], en: [["Shape and sauce", ["Thin pasta suits light, fluid sauces; tubes and ridged shapes carry meat, cheese and vegetable pieces."]], ["Pasta water is part of the flavour", ["Starchy pasta water helps fat and cheese form a smoother sauce when added gradually."]], ["The dish keeps changing", ["Pasta continues to absorb sauce off the heat, so finish tossing and plating while it still has a little bite."]]] },
      asideSummary: { zh: "把意面形状、酱汁和火候放在同一张判断表里，适合家庭和餐饮厨房继续扩展。", en: "A simple framework for matching pasta shape, sauce and timing in home and professional kitchens." }, relatedSlugs: ["cooking-techniques", "pairings-class", "olive-recipes-guide"],
    },
    {
      slug: "pairings-class", topic: "culture", artClass: "is-academy", topicLabel: { zh: "探索意大利", en: "Explore Italy" },
      eyebrow: { zh: "风味搭配课堂", en: "Pairing Class" }, title: { zh: "风味搭配：先看质地，再谈浓淡", en: "Pairing: start with texture, then intensity" }, meta: { zh: "探索意大利 · 2026", en: "Explore Italy · 2026" }, archive: { zh: "搭配方法", en: "Pairing method" },
      intro: { zh: "好的搭配不是把昂贵食材叠在一起，而是让香气、质地、酸度、盐度和温度彼此成就。", en: "Good pairing is not stacking expensive ingredients; it balances aroma, texture, acidity, salt, sweetness and temperature." },
      opening: { zh: ["先确认主角，再决定搭配。风味越清晰，越需要克制的陪衬。"], en: ["Choose the main character first, then decide the supporting notes. The clearer the flavour, the more restraint the pairing needs."] },
      sections: { zh: [["轻与重", ["清新的橄榄油适合鱼类、蔬菜和面包；更强的果香与辛香可以支撑豆类、肉类和浓汤。"]], ["温度与质地", ["冷盘、温热菜和 Gelato 对油脂释放速度不同，搭配时要考虑入口温度与融化节奏。"]], ["留出余味", ["搭配的目的不是制造更大的声音，而是让主要食材在咽下后仍留下清晰、干净的余韵。"]]], en: [["Light and full", ["Fresh olive oils suit fish, vegetables and bread; fuller fruit and pepper can support beans, meat and rich soups."]], ["Temperature and texture", ["Cold dishes, warm plates and Gelato release fat at different speeds, so serving temperature changes the pairing."]], ["Leave a finish", ["The aim is not a louder flavour but a clean, recognisable finish after the main ingredient has been tasted."]]] },
      asideSummary: { zh: "一套可以应用到橄榄油、鱼子酱、松露和 Gelato 的搭配原则。", en: "A pairing method that can be applied to olive oil, caviar, truffles and Gelato." }, relatedSlugs: ["olive-tasting", "gelato-flavours", "table-etiquette"],
    },
    {
      slug: "olive-nutrition", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "橄榄油营养价值", en: "Olive Oil Nutrition" }, title: { zh: "橄榄油的营养：把数字放回饮食整体", en: "Olive oil nutrition: put the numbers in context" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "营养基础", en: "Nutrition basics" },
      intro: { zh: "橄榄油提供脂肪和风味，营养信息应结合份量、饮食结构和具体产品标签阅读。", en: "Olive oil provides fat and flavour; nutrition should be read with portion, diet pattern and the specific product label." },
      opening: { zh: ["橄榄油是高能量食材，健康饮食并不意味着可以无限量使用。更重要的是选择适合的油品，并把份量放进整体饮食中。"], en: ["Olive oil is energy-dense, so a balanced diet does not mean unlimited use. Choose an oil that suits the dish and keep the portion within the wider eating pattern."] },
      sections: { zh: [["看懂脂肪信息", ["标签通常会列出总脂肪、饱和脂肪和能量。不同产品的营养数值应以实际标签为准。"]], ["风味与份量", ["香气清晰的油品可以用较少份量完成收尾；是否适合，仍取决于菜肴、口味与个人饮食需要。"]], ["不替代医疗建议", ["橄榄油内容不承诺治病、减重或改善具体疾病。如有健康问题，应咨询合资格的医疗或营养专业人士。"]]], en: [["Read the fat panel", ["Labels usually list total fat, saturated fat and energy. The actual package label remains the source for each product's values."]], ["Flavour and portion", ["A clear, aromatic oil can finish a dish with a modest amount; suitability still depends on the dish, taste and personal needs."]], ["Not medical advice", ["Olive oil content does not promise cures, weight loss or treatment of a disease. Health questions belong with a qualified professional."]]] },
      asideSummary: { zh: "以克制、可核对的方式讲清橄榄油营养，避免把食材教育写成医疗承诺。", en: "A careful, verifiable explanation of olive oil nutrition without turning food education into a medical promise." }, relatedSlugs: ["olive-oil-basics", "olive-fasting", "nutrition-myths"],
    },
    {
      slug: "olive-cultivars", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "橄榄品种与香气", en: "Cultivars & Aromas" }, title: { zh: "品种如何改变橄榄油的香气", en: "How cultivars change olive oil aroma" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "品种与风味", en: "Cultivar & flavour" },
      intro: { zh: "同样是意大利橄榄油，不同品种会带来青草、番茄叶、杏仁、洋蓟或辛香等不同线索。", en: "Italian olive oils can show grass, tomato leaf, almond, artichoke or peppery notes depending on cultivar." },
      opening: { zh: ["品种是风味的起点，但不是唯一答案。产地、采收成熟度、研磨时间和储存条件同样重要。"], en: ["Cultivar is a starting point, not the whole answer. Territory, maturity, milling time and storage matter too." ] },
      sections: { zh: [["品种与成熟度", ["较早采收往往保留更多绿色香气与辛香线索；成熟度提高后，果香与口感可能出现不同表达。具体表现取决于品种与年份。"]], ["把描述当作线索", ["品鉴词不是绝对标准。应结合香气、入口质地、苦味、辛辣感和余味整体判断。"]], ["与菜肴匹配", ["清新型油品适合鱼类、蔬菜与面包；结构更强的油品可支持豆类、肉类、汤品与烤制食材。"]]], en: [["Cultivar and maturity", ["Earlier harvests often keep greener aromas and pepper; later maturity can express fruit and texture differently. The variety and year always matter."]], ["Treat descriptors as clues", ["Tasting vocabulary is not an absolute score. Judge aroma, texture, bitterness, pepper and finish together."]], ["Match the dish", ["Fresh styles suit fish, vegetables and bread; structured oils can support beans, meat, soups and roasted ingredients."]]] },
      asideSummary: { zh: "帮助读者把品种、成熟度与搭配场景连起来，建立更准确的橄榄油风味地图。", en: "A clearer flavour map connecting cultivar, maturity and kitchen use." }, relatedSlugs: ["olive-regions", "olive-oil-basics", "pairings-class"],
    },
    {
      slug: "olive-how-to-choose", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "如何选择优质橄榄油", en: "How to Choose Olive Oil" }, title: { zh: "买橄榄油时，先看这些信息", en: "What to check when choosing olive oil" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "购买指南", en: "Buying guide" },
      intro: { zh: "从等级、原产地、采收信息到包装和保存方式，建立一份不被营销词带偏的购买清单。", en: "Use grade, origin, harvest information, packaging and storage to build a buying checklist beyond marketing language." },
      opening: { zh: ["优质不是一个单独的形容词。购买前应先确认产品类别、用途、包装完整性和标签信息是否清晰。"], en: ["Quality is not one adjective. Check category, intended use, package integrity and label clarity before buying." ] },
      sections: { zh: [["标签清单", ["关注产品等级、原产地、净含量、批次或采收信息、生产者、保存方式和保质期。"]], ["包装与光线", ["深色玻璃、金属罐或其他避光包装有助于降低光线影响，但仍应按照标签保存。"]], ["不要只看颜色", ["颜色不能单独判断品质，真正的判断需要结合香气、口感、标签和生产者资料。"]]], en: [["Label checklist", ["Look for grade, origin, net quantity, lot or harvest information, producer, storage guidance and best-before date."]], ["Package and light", ["Dark glass, metal tins or other light-protective packaging can reduce light exposure, but storage should still follow the label."]], ["Do not judge by colour alone", ["Colour is not a stand-alone quality test; combine aroma, taste, label and producer information."]]] },
      asideSummary: { zh: "一份适合中国消费者的橄榄油购买清单，帮助区分真实信息与泛化宣传。", en: "A practical buying checklist for clear information rather than generic claims." }, relatedSlugs: ["olive-storage", "olive-oil-basics", "olive-myths"],
    },
    {
      slug: "olive-storage", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "保存方法与保质期", en: "Storage & Shelf Life" }, title: { zh: "让橄榄油保持风味：光、热与时间", en: "Protect olive oil from light, heat and time" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "保存指南", en: "Storage guide" },
      intro: { zh: "正确保存不能让油品永远不变，但能减少光线、热量和氧气带来的风味损失。", en: "Good storage cannot stop time, but it can reduce the flavour loss caused by light, heat and oxygen." },
      opening: { zh: ["橄榄油开封后会逐渐变化。最简单的原则是避光、避热、密封，并按产品标签建议使用。"], en: ["Olive oil changes after opening. The simple rule is to protect it from light and heat, keep it sealed, and follow the product label." ] },
      sections: { zh: [["放在哪里", ["远离炉灶、窗边和高温设备，选择阴凉稳定的位置。透明容器不适合长时间暴露在光线下。"]], ["如何使用", ["倒取后及时盖紧瓶盖，避免瓶口残留油液长期接触空气。小规格包装适合使用频率较低的家庭。"]], ["保质期怎么看", ["保质期、开封后的建议和储存温度以具体产品资料为准。出现明显哈喇味或异常气味时，不应继续使用。"]]], en: [["Where to keep it", ["Keep it away from the cooker, windows and heat. A clear bottle should not sit in strong light for long periods."]], ["How to use it", ["Close the cap after pouring and avoid oil residue around the neck. Smaller formats can suit low-frequency use."]], ["How to read shelf life", ["Best-before dates, after-opening guidance and storage temperatures belong to the product file. Do not use oil with a clearly rancid or abnormal aroma."]]] },
      asideSummary: { zh: "把橄榄油的保存方法变成家庭可以执行的三个动作：避光、避热、密封。", en: "Three actions a household can follow: protect from light, protect from heat and seal after use." }, relatedSlugs: ["olive-how-to-choose", "olive-tasting", "olive-nutrition"],
    },
    {
      slug: "olive-fasting", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "营养与误区", en: "Nutrition & Myths" }, title: { zh: "空腹喝橄榄油：营养价值、正确方法与常见误区", en: "Olive oil on an empty stomach: value, method and myths" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "理性饮食", en: "Balanced eating" },
      intro: { zh: "讨论中国消费者关注的空腹饮用趋势，区分食材营养、个人耐受与未经证实的健康承诺。", en: "A balanced look at the empty-stomach trend, separating food value, personal tolerance and unsupported health promises." },
      opening: { zh: ["橄榄油可以作为饮食的一部分，但没有可靠依据证明空腹饮用能够治病、快速减重或替代均衡饮食。"], en: ["Olive oil can be part of a diet, but there is no reliable basis for saying that taking it on an empty stomach cures disease, causes rapid weight loss or replaces a balanced diet." ] },
      sections: { zh: [["如果仍想尝试", ["从少量开始，选择有清晰标签的产品，观察个人耐受，并把总摄入量纳入当天饮食。出现不适应停止并咨询专业人士。"]], ["更实际的使用方式", ["将橄榄油用于蔬菜、豆类、面包、鱼类或意面，更容易把风味与饮食结构结合起来。"]], ["哪些说法需要警惕", ["‘排毒’‘燃脂’‘治疗慢性病’等绝对表述缺乏通用依据。健康问题应交给合资格的医疗或营养专业人士。"]]], en: [["If you still want to try it", ["Start with a small amount, choose a clearly labelled product, monitor tolerance and count it within the day's total intake. Stop if it causes discomfort and seek professional advice."]], ["A more practical use", ["Use olive oil with vegetables, beans, bread, fish or pasta so flavour and eating pattern work together."]], ["Claims to question", ["Absolute claims such as detox, fat-burning or disease treatment lack general support. Health questions belong with a qualified medical or nutrition professional."]]] },
      asideSummary: { zh: "以科学、克制的方式回应空腹饮用话题，不制造医疗或减重承诺。", en: "A careful answer to a popular trend without medical or weight-loss promises." }, relatedSlugs: ["olive-nutrition", "olive-myths", "olive-tasting"],
    },
    {
      slug: "olive-myths", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "常见问题与误区", en: "Questions & Myths" }, title: { zh: "关于橄榄油，先放下这几种误区", en: "Olive oil: a few myths to leave behind" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "误区澄清", en: "Myth check" },
      intro: { zh: "颜色、烟点、价格和‘纯天然’等词汇，都不能单独代表一瓶油的全部品质。", en: "Colour, smoke point, price and words such as natural cannot represent the full quality of an oil on their own." },
      opening: { zh: ["理解橄榄油需要把标签、感官、用途和保存条件放在一起，而不是寻找一个万能指标。"], en: ["Understanding olive oil means reading label, sensory profile, use and storage together rather than searching for one magic indicator." ] },
      sections: { zh: [["颜色越绿越好？", ["不一定。颜色会受到品种、成熟度和加工影响，专业品鉴也常使用遮光杯避免颜色干扰。"]], ["只能凉拌？", ["合适的橄榄油可以用于煎、炒、烘烤或出锅点香，关键是遵循产品特性、温度和菜肴需求。"]], ["贵就一定更好？", ["价格受产地、年份、包装、供应链与品牌影响。品质判断仍需要结合标签和感官表现。"]]], en: [["Greener means better?", ["Not necessarily. Colour changes with cultivar, maturity and processing; professional tasting often uses dark cups to remove that bias."]], ["Only for salads?", ["A suitable olive oil can be used for frying, roasting or finishing. Follow the product's character, temperature and dish."]], ["More expensive means better?", ["Price reflects origin, harvest, packaging, supply chain and brand. Quality still requires label and sensory judgement."]]] },
      asideSummary: { zh: "用可验证的标签和感官原则，替代‘越绿越好’等单一判断。", en: "A myth check based on label and sensory evidence rather than one-dimensional rules." }, relatedSlugs: ["olive-how-to-choose", "olive-nutrition", "olive-storage"],
    },
    {
      slug: "olive-recipes-guide", topic: "olive", artClass: "is-olive", topicLabel: { zh: "橄榄油学院", en: "Olive Oil Academy" },
      eyebrow: { zh: "橄榄油食谱", en: "Olive Oil Recipes" }, title: { zh: "橄榄油进入日常：从面包到意面", en: "Olive oil in daily cooking: from bread to pasta" }, meta: { zh: "橄榄油学院 · 2026", en: "Olive Oil Academy · 2026" }, archive: { zh: "厨房应用", en: "Kitchen use" },
      intro: { zh: "把橄榄油放回真实的菜肴：面包、蔬菜、豆类、意面和海鲜都可以成为清晰的练习场。", en: "Bring olive oil back to real dishes: bread, vegetables, beans, pasta and seafood are clear places to practise." },
      opening: { zh: ["油品不是为了覆盖食材，而是帮助食材更完整地表达。先确定菜肴主味，再决定用量和出锅时机。"], en: ["Oil should not cover the ingredient; it should help it speak. Choose the main flavour first, then decide amount and finish." ] },
      sections: { zh: [["三种简单用法", ["面包蘸食、番茄或烤蔬菜出锅点香、意面用面水与油脂乳化，都能感受油品差异。"]], ["适合中国家庭", ["西兰花、菌菇、豆腐、鱼类和面条都可以成为练习对象，食材可按市场供应替换。"]], ["食谱卡片标准", ["完整食谱会标注份量、时间、难度、热量、过敏原、替代食材、产区、推荐油品和相关产品。"]]], en: [["Three simple uses", ["Dip bread, finish tomatoes or roasted vegetables, and emulsify pasta with starchy water and fat to notice oil differences."]], ["For Chinese homes", ["Broccoli, mushrooms, tofu, fish and noodles are useful practice ingredients and can be adapted to local supply."]], ["Recipe card standard", ["Complete recipes will include portions, time, difficulty, calories, allergens, substitutions, region, suggested oil and related products."]]] },
      asideSummary: { zh: "连接橄榄油知识与食谱页面，并明确后续食谱资料的统一字段。", en: "A bridge between olive-oil education and a consistent recipe-card standard." }, relatedSlugs: ["olive-tasting", "pasta-academy", "italian-food-culture"],
    },
    {
      slug: "pizza-fundamentals", topic: "pizza", artClass: "is-pizza", topicLabel: { zh: "披萨学院", en: "Pizza Academy" },
      eyebrow: { zh: "披萨基础课", en: "Pizza Fundamentals" }, title: { zh: "一张意式披萨，从面团开始", en: "Italian pizza begins with the dough" }, meta: { zh: "披萨学院 · 2026", en: "Pizza Academy · 2026" }, archive: { zh: "面团与烘烤", en: "Dough & baking" },
      intro: { zh: "从面粉、含水量、发酵到炉温，认识意式披萨轻盈、焦香与弹性的来源。", en: "Flour, hydration, fermentation and oven heat explain the lightness, char and elasticity of Italian pizza." },
      opening: { zh: ["好的披萨不是配料的堆叠。面团的成熟度、拉伸方式、酱汁水分和烘烤节奏，共同决定入口时的平衡。"], en: ["Good pizza is not a pile of toppings. Dough maturity, stretching, sauce moisture and baking rhythm create balance together."] },
      sections: { zh: [["面团的四个变量", ["面粉、含水量、酵母与时间需要彼此配合。更长发酵并不自动代表更好，关键是温度与配方是否匹配。"]], ["高温与焦斑", ["炉温让饼边迅速膨胀并形成焦香；焦斑应带来香气与结构，而不是苦味。"]], ["从玛格丽特开始", ["番茄、奶酪、罗勒与橄榄油构成清晰的基础练习，也让面团本身保持主角位置。"]]], en: [["Four dough variables", ["Flour, hydration, yeast and time must work together. A longer ferment is not automatically better; temperature and formula must match."]], ["Heat and char", ["Oven heat lifts the rim and creates aroma. Char should add structure and fragrance, not bitterness."]], ["Begin with Margherita", ["Tomato, cheese, basil and olive oil make a clear exercise while keeping the dough in the foreground."]]] },
      asideSummary: { zh: "披萨学院的第一课：用可观察的面团、发酵与烘烤原则建立基础判断。", en: "The first Pizza Academy lesson: practical principles for dough, fermentation and baking." }, relatedSlugs: ["cooking-techniques", "olive-recipes-guide", "italian-food-culture"],
    },
    {
      slug: "gelato-flavours", topic: "gelato", artClass: "is-gelato", topicLabel: { zh: "意式手工冰淇淋学院", en: "Italian Gelato Academy" },
      eyebrow: { zh: "意式手工冰淇淋风味", en: "Gelato Flavours" }, title: { zh: "经典口味：意式手工冰淇淋如何表达原料", en: "From pistachio to truffle: how Gelato expresses an ingredient" }, meta: { zh: "意式手工冰淇淋 · 2026", en: "Italian Gelato · 2026" }, archive: { zh: "风味实验室", en: "Flavour lab" },
      intro: { zh: "从牛奶、香草、巧克力、咖啡、榛子、开心果和水果出发，理解不同原料如何改变甜度、质地与香气。", en: "Nuts, cocoa, fruit, coffee and future truffle or caviar directions all begin with respect for the ingredient, then balance sweetness and texture." },
      opening: { zh: ["意式手工冰淇淋的风味在低温下会更安静，因此配方需要让香气保持清晰，而不是简单提高甜度。"], en: ["Flavour becomes quieter at low temperature, so a Gelato recipe must keep aroma clear rather than simply increasing sweetness." ] },
      sections: { zh: [["乳香与香草", ["基础乳香与香草看似简单，却会清楚呈现奶源、甜度和质地是否协调。"]], ["巧克力、咖啡与坚果", ["可可、咖啡、榛子和开心果各有不同的脂肪与香气强度，不能用同一套比例处理。"]], ["水果与季节", ["水果口味需要根据成熟度、酸度、含水量和季节调整，让清新感与甜度保持平衡。"]]], en: [["Let the ingredient speak", ["Pistachio, hazelnut, chocolate and fruit differ in fat, acidity and water, so they cannot share one ratio."]], ["Boundaries for unusual flavours", ["Truffle or caviar directions need aromatic balance and real occasions; final formulas require development, compliance and sensory testing."]], ["For Chinese visitors", ["The topic will use a flavour glossary, pairing ideas, shop display and home experiences while keeping Gelato distinct from generic ice cream."]]] },
      asideSummary: { zh: "从经典乳香、巧克力、咖啡、坚果与水果口味理解原料、甜度和质地的关系。", en: "A Gelato flavour vocabulary and development boundary, ready for real photography, video and technical files." }, relatedSlugs: ["gelato-vs-ice-cream", "gelato-history", "ugolini-gelato-mix"],
    },
    {
      slug: "nutrition-labels", topic: "nutrition", artClass: "is-nutrition", topicLabel: { zh: "营养与配料指南", en: "Nutrition & Ingredients" },
      eyebrow: { zh: "认识食品配料表", en: "Reading Ingredient Lists" }, title: { zh: "读懂一张食品配料表", en: "How to read an ingredient list" }, meta: { zh: "营养与配料指南 · 2026", en: "Nutrition & Ingredients · 2026" }, archive: { zh: "标签阅读", en: "Label reading" },
      intro: { zh: "成分表、营养成分表、净含量、日期、储存方式和生产者信息，共同构成产品的基本事实。", en: "Ingredients, nutrition, net quantity, date, storage and producer information together form a product's basic facts." },
      opening: { zh: ["内容文章负责解释阅读方法，具体配方和数值仍应以每个产品的中文标签、技术资料和适用法规为准。"], en: ["Editorial content can explain how to read a label, while the product's own label, technical file and applicable regulation remain authoritative." ] },
      sections: { zh: [["先看配料顺序", ["配料通常按使用量排序。复合配料、添加物和过敏原提示需要结合完整标签阅读。"]], ["再看营养成分", ["能量、脂肪、碳水化合物、蛋白质、盐等数据应关注每100克与每份的区别。"]], ["最后核对储存与日期", ["开封后、冷藏、避光、冷冻或运输要求，都会影响产品的安全与体验。"]]], en: [["Start with order", ["Ingredients are generally listed by amount. Compound ingredients, additives and allergen statements need the full label."]], ["Then read nutrition", ["Energy, fat, carbohydrate, protein and salt should be read with the difference between per 100 g and per serving."]], ["Check storage and dates", ["After-opening, refrigeration, light, freezing and transport instructions affect both safety and experience."]]] },
      asideSummary: { zh: "建立清晰的标签阅读顺序，帮助消费者和合作伙伴做出更准确的选择。", en: "A clear reading order for consumers and partners making better-informed choices." }, relatedSlugs: ["allergens-guide", "clean-label", "ingredients-territory"],
    },
    {
      slug: "allergens-guide", topic: "nutrition", artClass: "is-nutrition", topicLabel: { zh: "营养与配料指南", en: "Nutrition & Ingredients" },
      eyebrow: { zh: "过敏原信息", en: "Allergen Information" }, title: { zh: "过敏原信息：按产品逐项确认", en: "Allergens: verify product by product" }, meta: { zh: "营养与配料指南 · 2026", en: "Nutrition & Ingredients · 2026" }, archive: { zh: "食品安全", en: "Food safety" },
      intro: { zh: "不同产品的配方和生产环境不同，不能用一句‘不含过敏原’概括全系列。", en: "Formulas and production environments differ, so one blanket 'allergen-free' claim cannot cover a whole range." },
      opening: { zh: ["网站会按具体产品说明哪些过敏原不存在、哪些可能存在或需要注意，并提醒消费者以包装和技术资料为准。"], en: ["The site will state, product by product, which allergens are absent, present or relevant, while directing readers to packaging and technical files." ] },
      sections: { zh: [["配方过敏原", ["牛奶、蛋、坚果、鱼类、甲壳类、小麦、大豆等信息，需要根据实际配方确认。"]], ["交叉接触", ["即使配方本身没有某种成分，共线生产或设施环境也可能影响标签表述，必须以生产者文件为准。"]], ["有过敏风险怎么办", ["如有过敏史，应在购买和食用前咨询医生或专业人士，不要仅凭网站文章判断。"]]], en: [["Formula allergens", ["Milk, egg, nuts, fish, shellfish, wheat and soy must be checked against the actual formula."]], ["Cross-contact", ["A formula may not contain an ingredient while shared lines or facilities still affect labelling; the producer file is decisive."]], ["If you have an allergy", ["Anyone with an allergy history should consult a doctor or qualified professional before purchase or consumption."]]] },
      asideSummary: { zh: "把过敏原表达从泛化口号改成逐产品、逐标签、逐场景确认。", en: "A product-by-product, label-by-label approach instead of a generic safety slogan." }, relatedSlugs: ["nutrition-labels", "clean-label", "ugolini-gelato-mix"],
    },
    {
      slug: "clean-label", topic: "nutrition", artClass: "is-nutrition", topicLabel: { zh: "营养与配料指南", en: "Nutrition & Ingredients" },
      eyebrow: { zh: "清洁标签理念", en: "Clean Label" }, title: { zh: "清洁标签不是一句空话", en: "Clean label needs a clear definition" }, meta: { zh: "营养与配料指南 · 2026", en: "Nutrition & Ingredients · 2026" }, archive: { zh: "配料理念", en: "Ingredient philosophy" },
      intro: { zh: "清洁标签应指向清晰、可读、可核对的配料和生产信息，而不是绝对化的健康承诺。", en: "Clean label should mean clear, readable and verifiable ingredient and production information, not an absolute health promise." },
      opening: { zh: ["‘天然’‘无添加’‘清洁’等词汇需要具体语境。消费者更需要知道产品实际使用了什么、为什么使用，以及如何验证。"], en: ["Words such as natural, no additives and clean need context. Consumers need to know what is used, why it is used and how to verify it." ] },
      sections: { zh: [["信息透明", ["配料名称、过敏原、营养、规格、来源和保存方式，应该以易读方式呈现。"]], ["功能先于口号", ["配料是否必要，应结合产品结构、稳定性、食品安全和法规，而不是只追求一个营销标签。"]], ["每款产品单独说明", ["Ugolini Gelato 粉等未来产品需在上市前提供完整产品文件，再决定对外宣传用语。"]]], en: [["Transparency", ["Ingredient names, allergens, nutrition, format, origin and storage should be presented in readable form."]], ["Function before slogan", ["Whether an ingredient is needed depends on product structure, stability, safety and regulation, not a marketing label alone."]], ["Explain each product", ["Future products such as Ugolini Gelato mixes need a complete product file before external claims are chosen."]]] },
      asideSummary: { zh: "将清洁标签落实为可核对的信息标准，而不是把它当作万能背书。", en: "A verifiable information standard rather than a catch-all endorsement." }, relatedSlugs: ["nutrition-labels", "allergens-guide", "ugolini-gelato-mix"],
    },
    {
      slug: "nutrition-myths", topic: "nutrition", artClass: "is-nutrition", topicLabel: { zh: "营养与配料指南", en: "Nutrition & Ingredients" },
      eyebrow: { zh: "食品真相与误区", en: "Food Truths & Myths" }, title: { zh: "营养信息：把事实、个人感受和宣传分开", en: "Nutrition: separate facts, experience and promotion" }, meta: { zh: "营养与配料指南 · 2026", en: "Nutrition & Ingredients · 2026" }, archive: { zh: "误区澄清", en: "Myth check" },
      intro: { zh: "食品内容最重要的不是制造惊人的结论，而是把事实、适用范围和不确定性说清楚。", en: "The most useful food content does not manufacture dramatic conclusions; it states facts, scope and uncertainty clearly." },
      opening: { zh: ["营养知识需要看份量、频率、饮食整体和个人情况。单一食材通常无法承担复杂的健康结果。"], en: ["Nutrition depends on portion, frequency, the whole diet and the individual. A single ingredient rarely carries a complex health outcome." ] },
      sections: { zh: [["避免绝对化", ["‘排毒’‘抗癌’‘零负担’‘完全无害’等表述通常需要特别谨慎，不能替代正规医学信息。"]], ["把数据说完整", ["每100克、每份、烹饪前后和实际食用量可能不同，阅读数字时必须确认单位和场景。"]], ["内容的责任边界", ["网站提供饮食教育，不提供诊断和治疗建议；需要个性化指导时，应咨询专业人士。"]]], en: [["Avoid absolutes", ["Claims such as detox, anti-cancer, guilt-free or completely harmless need caution and cannot replace medical information."]], ["Give the whole number", ["Per 100 g, per serving, before or after cooking and actual intake can differ; units and context matter."]], ["Keep the boundary", ["The site provides food education, not diagnosis or treatment. Personal guidance belongs with a qualified professional."]]] },
      asideSummary: { zh: "建立负责任的营养内容基线，让读者知道什么能说、什么不能过度承诺。", en: "A responsible baseline for nutrition content: what can be said and what must not be overpromised." }, relatedSlugs: ["olive-nutrition", "olive-fasting", "allergens-guide"],
    },
  ];
  const supplementalTopicArticles = supplementalTopicSpecs.flatMap((spec) => ["zh", "en"].map((lang) => ({
    lang, slug: spec.slug, topic: spec.topic, topicLabel: spec.topicLabel[lang], artClass: spec.artClass,
    eyebrow: spec.eyebrow[lang], title: spec.title[lang], meta: spec.meta[lang], archive: spec.archive[lang], intro: spec.intro[lang],
    opening: spec.opening[lang], sections: spec.sections[lang], asideSummary: spec.asideSummary[lang], relatedSlugs: spec.relatedSlugs,
  })));
  const allTopicArticles = [...topicArticles, ...supplementalTopicArticles];
  const topicCoverBySlug = Object.fromEntries([
    ["olive-oil-basics", "olive-cover-01.webp"], ["olive-regions", "olive-cover-02.webp"],
    ["olive-tasting", "olive-cover-03.webp"], ["olive-nutrition", "olive-cover-04.webp"],
    ["olive-cultivars", "olive-cover-05.webp"], ["olive-how-to-choose", "olive-cover-06.webp"],
    ["olive-storage", "olive-cover-07.webp"], ["olive-fasting", "olive-cover-08.webp"],
    ["olive-myths", "olive-cover-09.webp"], ["olive-recipes-guide", "choose-use-store-evo.webp"],
    ["pizza-fundamentals", "pizza-cover-01.webp"],
    ["gelato-vs-ice-cream", "gelato-cover-01.webp"], ["gelato-history", "gelato-cover-02.webp"],
    ["ugolini-gelato-mix", "gelato-cover-03.webp"], ["gelato-flavours", "gelato-cover-04.webp"],
    ["nutrition-labels", "nutrition-cover-01.webp"], ["allergens-guide", "nutrition-cover-02.webp"],
    ["clean-label", "nutrition-cover-03.webp"], ["nutrition-myths", "nutrition-cover-04.webp"],
    ["italian-food-culture", "culture-cover-01.webp"], ["italy-regions", "culture-cover-02.webp"],
    ["regional-traditions", "culture-cover-03.webp"], ["ingredients-territory", "culture-cover-04.webp"],
    ["table-etiquette", "culture-cover-05.webp"], ["cooking-techniques", "culture-cover-06.webp"],
    ["pasta-academy", "culture-cover-07.webp"], ["pairings-class", "culture-cover-08.webp"],
  ].map(([slug, file]) => [slug, academyImage(file)]));
  const wideCoverSlugs = new Set([
    "baerii-caviar",
    "beluga-caviar",
    "kaluga-amur-caviar",
    "oscetra-caviar",
    "sevruga-caviar",
    "white-sturgeon-caviar",
  ]);
  const articles = {};

  for (const article of baseArticles) {
    for (const lang of ["zh", "en"]) {
      const localized = lang === "zh" ? zhArticles[article.slug] : {};
      articles[`${lang}-academy-${article.slug}`] = {
        ...article,
        lang,
        ...localized,
        topic: "caviar",
        topicLabel: lang === "zh" ? "鱼子酱学院" : "Caviar Academy",
        column: lang === "zh" ? "鱼子酱学院" : "Caviar Academy",
        archive: archives[lang][article.slug],
        asideSummary: localized.asideSummary || enSummaries[article.slug],
        wideCover: wideCoverSlugs.has(article.slug),
        sectionMedia: article.sectionMedia.map((group) => group.map((item) => ({
          ...item,
          alt: localized.title || article.title,
        }))),
        related: article.relatedSlugs.map((slug) => `${lang}-academy-${slug}`),
      };
    }
  }

  for (const article of allTopicArticles) {
    articles[`${article.lang}-academy-${article.slug}`] = {
      ...article,
      ...(topicCoverBySlug[article.slug] ? { image: topicCoverBySlug[article.slug] } : {}),
      column: article.topicLabel,
      related: article.relatedSlugs.map((slug) => `${article.lang}-academy-${slug}`),
      sectionMedia: article.sectionMedia || [],
    };
  }

  const zhLongformArticles = {
    "olive-oil-basics": {
      intro: "从法定等级、机械加工、感官评价到日常使用，建立判断特级初榨橄榄油的完整基础。",
      opening: [
        "特级初榨橄榄油首先是一个受到标准约束的等级，而不是泛指颜色金黄、包装精美或价格较高的橄榄油。它来自橄榄果实，只通过机械或其他物理方式取得，并需同时满足理化指标和感官要求。欧盟现行规则把理化分析、果香以及是否存在感官缺陷放在一起判断，因此只看酸度数字并不足以确认品质。",
        "对消费者而言，理解这个等级的意义，不是背诵一组实验室参数，而是知道果实状态、加工速度、温度管理、卫生和储存如何共同影响一瓶油。品牌故事可以帮助理解产区，但最终仍应回到标签、批次文件与开瓶后的真实感官表现。",
      ],
      sections: [
        ["从橄榄果到油", ["橄榄在采收后仍会继续发生生化变化。果实受伤、堆放过久或温度过高，都可能加快发酵和氧化，形成霉味、酒醋味或哈败气息。因此，成熟度合适的果实、尽快运输与及时加工，是保持新鲜风味的重要前提。", "现代生产通常包括清理、清洗、破碎、搅拌和离心分离。所谓冷提取不是把果实冻起来，而是在加工中控制温度，减少香气损失和不必要的氧化。过滤与否会影响外观和保存管理，但浑浊本身不等于更天然，也不自动代表更高品质。"]],
        ["等级需要两类证据", ["理化分析可观察游离脂肪酸、过氧化值及其他组成指标，感官评价则由受训评审员识别果香、苦味、辛辣感和缺陷。优质特级初榨橄榄油应有可感知的果香，并且没有规定中的感官缺陷。酸度是实验室指标，无法靠舌头直接尝出，也不能单独说明全部新鲜度。", "苦味和喉部辛辣感常与新鲜橄榄中的酚类物质相关，可以是正常而积极的特征，但强度并非越高越好。品种、成熟度与菜肴需要不同，真正值得关注的是香气是否清晰，入口是否平衡，余味是否干净。"]],
        ["标签能告诉你什么", ["先确认正面的法定品名，再查看原产信息、净含量、日期、储存要求、生产者或进口商。采收年份、橄榄品种和庄园信息能增加判断依据，但并非所有市场都强制标示。若包装只写“橄榄油”，其类别可能与特级初榨不同，应继续阅读完整名称。", "深色玻璃、金属罐或阻光包装有助于减少光照，但包装不能替代正确储运。到货时检查封口、标签与批次，开瓶后闻香并记录使用时间。任何健康或品质表述，都应与产品文件和适用法规一致。"]],
        ["把油用在正确位置", ["清新细致的油适合生食、面包、海鲜、沙拉和起锅后的点缀；果香饱满、苦辣更明显的油可配豆类、烤蔬菜、肉类、汤和意面。烹饪会改变香气层次，因此不必把同一瓶油用于所有步骤。", "LuxurEat（露意膳）在选品时更关注产地证明、品种、采收与加工信息、储存和批次稳定性。对家庭用户而言，最有效的判断仍然简单：购买合适容量，避光密封保存，在风味仍然鲜明时用完。"]],
      ],
      asideSummary: "特级初榨是一套由原料、机械加工、理化指标和感官评价共同构成的等级；标签与开瓶后的真实风味同样重要。",
    },
    "olive-regions": {
      intro: "从气候、地形与本地品种出发，理解意大利橄榄油为何不存在一种统一的“标准味道”。",
      opening: [
        "意大利南北跨度大，湖区、丘陵、沿海平原和岛屿拥有不同的温度、降雨、土壤与风。再加上数量众多的本地橄榄品种，同为特级初榨橄榄油，也会呈现从柔和杏仁、鲜草到番茄叶、朝鲜蓟和明显辛香的多种风格。",
        "产区不是味道的快捷标签。相邻庄园可能因品种比例、采收时间、果实健康和加工选择而表现不同；同一庄园也会随年份变化。学习区域差异的意义，是建立更宽的风味坐标，而不是用几个地名替代实际品鉴。",
      ],
      sections: [
        ["北部与湖区的细致表达", ["意大利北部能种植橄榄的区域常受到湖泊缓和气候的影响。这里的油品常被描述为清新、细致、苦辣较柔和，但这只是常见倾向，并不是所有北部油的固定答案。轻盈香气适合观察鱼类、白肉、蒸煮蔬菜和豆泥中的细微层次。", "购买时仍要看具体品种、产地保护标识和生产者资料。湖区产量相对有限，年份差异和储存尤其值得重视；温和不应被误解为没有果香或已经氧化。"]],
        ["中部丘陵的绿色骨架", ["托斯卡纳、翁布里亚及周边丘陵经常出现青草、叶片、朝鲜蓟、青杏仁等联想，并伴随清晰的苦味与喉部辛辣感。较早采收常有助于形成鲜明绿色风格，同时也可能降低出油率，对生产者的采收和加工管理提出更高要求。", "这类油可用于白豆、烤面包、汤、烤肉和根茎蔬菜。搭配时不是追求油味盖过食物，而是利用苦辣结构连接淀粉、蛋白质与蔬菜的甜味。"]],
        ["南部与岛屿的多样性", ["普利亚、卡拉布里亚、西西里和撒丁岛等地区并非只有浓重一种风格。当地品种、海拔与采收成熟度可带来番茄、香草、果仁、成熟水果或更有力度的辛香。大面积种植与小型庄园并存，更需要通过产地和批次资料识别具体来源。", "饱满型油品常适合番茄、豆类、烤蔬菜、炖菜与结构更强的鱼肉菜肴；偏清新的岛屿油也能很好地用于生食。菜肴选择应以实际品鉴为准，而不是仅凭南北地理位置。"]],
        ["如何把产区信息用于选择", ["先确定用途，再比较同类油：生食需要香气清楚，烹饪需要结构稳定，礼赠则还要关注可追溯文件和包装保护。若标签带有PDO、PGI等地理标志，它说明产品遵循相应产区规范，但不能代替个人口味判断。", "建议以小容量建立品鉴记录，写下开瓶日期、香气、苦辣强度和适合菜肴。LuxurEat（露意膳）在介绍产区时，会把地名、品种、年份和生产方式放在一起说明，避免把地域故事写成无法验证的品质保证。"]],
      ],
      asideSummary: "区域为风味提供背景，品种、年份、采收和加工决定最终表达；地名应与批次资料和实际品鉴一起阅读。",
    },
    "olive-tasting": {
      intro: "用可重复的闻香、入口与记录方法品鉴橄榄油，并把保存和烹饪纳入同一套判断。",
      opening: [
        "橄榄油品鉴的目的不是表演专业术语，而是把闻到、尝到和使用后的感受分开记录。专业感官评价有严格的杯具、温度与评审流程；家庭和餐饮场景虽然不等同于官方分级，也可以通过统一步骤减少包装、颜色和价格带来的先入为主。",
        "颜色并不是特级初榨橄榄油等级的决定因素。叶绿素、类胡萝卜素、品种与成熟度都会影响色泽，因此专业品鉴常使用有色杯遮挡颜色。普通品鉴时不必追求器材，重要的是杯子干净、环境无强烈气味，并让不同样品处于相近条件。",
      ],
      sections: [
        ["第一步：闻香", ["倒入少量油，用手掌轻轻包住杯底，让油温缓慢接近体温附近，再覆盖杯口短暂聚香。先记录香气是否清晰，然后描述联想到的青草、番茄叶、香草、苹果、杏仁或成熟水果。描述是感官联想，不代表油中真的加入了这些成分。", "若出现明显哈败、霉湿、酒醋或陈旧气息，应保持谨慎。单次闻香可能受杯具和环境影响，可以休息后复核；正式等级仍需由合格实验室和受训感官小组判断。"]],
        ["第二步：入口与回味", ["小口含住油，让其覆盖口腔，再轻轻吸入少量空气帮助香气上行。记录果香是否延续、苦味出现的位置、质地是轻盈还是圆润，以及吞咽后喉部辛辣感和余味长度。苦与辣可以是积极特征，关键在于是否干净、协调。", "连续品鉴多款时，用水和气味温和的食物清洁口腔，并控制样品数量。不要用面包蘸取来做第一轮判断，因为面包本身的香气、盐和质地会改变感受；完成单独品鉴后，再进入搭配测试。"]],
        ["第三步：建立使用记录", ["同一款油可分别尝试在番茄、绿叶菜、豆类、烤面包、鱼类和汤品上少量使用。记录它是增强食材、提供苦辣结构，还是掩盖了原味。餐饮团队可把结果转化为冷菜、烹饪和出餐点缀三类使用建议。", "品鉴词不需要越多越好。采用香气、强度、平衡、缺陷、余味和适配菜肴几个固定维度，更容易在不同批次之间比较，也能避免把个人偏好误写成绝对品质结论。"]],
        ["保存决定下一次品鉴", ["光、热、氧和时间会持续改变油品。把瓶子密封，远离灶台、窗边和温度波动大的位置；不要长期分装在敞口油壶或透明容器里。购买大包装时，应评估实际消耗速度，分装也要使用洁净、避光且密封的容器。", "开瓶日期比记忆更可靠。若香气逐渐变平、出现蜡笔或旧坚果般的陈味，即使仍在标示期限内，也说明感官状态已经变化。产品安全和保质期以标签为准，风味最佳期则需要结合开封与储存情况判断。"]],
      ],
      asideSummary: "先闻香、再入口、后搭配，并把开瓶日期与储存条件记录下来，才能让品鉴真正服务于购买和烹饪。",
    },
    "olive-nutrition": {
      title: "橄榄油的营养价值：从份量到饮食搭配",
      eyebrow: "橄榄油营养价值",
      intro: "认识橄榄油中的脂肪类型与能量密度，把营养数字放回份量、替代关系和整体饮食。",
      opening: [
        "橄榄油的主要营养贡献来自脂肪和能量，其中以单不饱和脂肪酸为主。世界卫生组织强调，饮食中脂肪的质量很重要，以不饱和脂肪替代较多饱和脂肪和反式脂肪的来源，是理解橄榄油价值的合理框架；这并不意味着添加越多越健康。",
        "油脂能量密度高，因此“有益的脂肪类型”和“适量使用”需要同时成立。营养判断应关注一天或一周的饮食结构、实际份量、烹饪方式与被替代的食材，而不是把一勺油视作独立的保健方案。",
      ],
      sections: [
        ["先看一份到底是多少", ["标签常以每100克或每100毫升表示营养数据，但家庭一次使用量远小于这个数。阅读时要把标示单位换算成自己的淋油、拌沙拉或烹饪份量，并把锅中剩余、多人分食等实际情况考虑进去。不同产品密度和标签规则可能不同，应以包装数值为准。", "用量控制不等于拒绝脂肪。脂肪参与细胞功能，也帮助饮食获得满足感；重点是让用量与总能量需求相匹配，并避免在已经含有大量奶油、肥肉或油炸食物的餐食中无意识叠加。"]],
        ["理解脂肪的替代关系", ["橄榄油富含不饱和脂肪，但只有当它替代部分黄油、动物油或其他饱和脂肪来源时，脂肪结构的变化才有明确意义。如果只是额外加入而其他用量不变，总能量仍会增加。", "在实际餐桌上，可以用橄榄油拌蔬菜、豆类和全谷物，用于烤制或炒制，并减少重油酱汁。这样的价值不仅来自一项营养素，也来自它帮助蔬菜、豆类等食物更容易进入日常饮食。"]],
        ["微量成分不等于疗效", ["特级初榨橄榄油可含有多酚等微量成分，其含量会受到品种、成熟度、加工、储存和时间影响。不能仅凭颜色、辛辣感或营销词推断具体含量，更不能把研究结果直接改写成对某一瓶油的治疗承诺。", "若产品对营养成分或特定物质作出声明，应查看检测、标签和适用法规。普通食品内容应提供饮食教育，不替代针对疾病、药物或个体健康状况的医学建议。"]],
        ["建立可执行的搭配", ["一餐中先安排蔬菜、豆类、全谷物与适量蛋白质，再决定橄榄油的角色。清新油可用于沙拉和完成菜，结构较强的油可与豆汤、烤蔬菜和番茄菜肴搭配。用量可以通过量勺或固定油嘴逐步建立直觉。", "对需要控制体重、血脂、血糖或有消化系统问题的人，合适份量应结合专业建议。LuxurEat（露意膳）提供的是原料与使用知识，不把单一食材包装成适合所有人的健康答案。"]],
      ],
      asideSummary: "橄榄油的营养价值来自脂肪质量、合理替代和整体搭配；份量、总能量与个人情况同样不可忽略。",
    },
    "olive-cultivars": {
      intro: "从品种差异理解青草、番茄、果仁与辛香的来源，同时避免把品种名称当成固定风味公式。",
      opening: [
        "葡萄酒会谈葡萄品种，橄榄油同样可以从橄榄品种进入。意大利拥有丰富的本地品种，它们在果实大小、成熟节奏、出油率、抗逆性和典型香气上各有差异。单一品种油强调一种橄榄的表达，混合油则可通过不同品种建立平衡与稳定。",
        "品种提供的是倾向，不是保证。气候、土壤、树龄、采收成熟度、果实健康、加工设备和储存都会改变最终结果。即使标签写着相同品种，不同年份和生产者也可能呈现明显差异。",
      ],
      sections: [
        ["品种如何进入香气", ["橄榄果中的挥发性物质在破碎与搅拌过程中形成和释放，带来鲜草、叶片、番茄、苹果、杏仁或香草等联想。某些品种更容易表现绿色与辛香，另一些则偏柔和、果仁或成熟果感，但感官描述应以具体样品为准。", "苦味和辛辣感与酚类组成相关，也受采收成熟度和加工影响。不能仅凭品种名推断强弱，更不能把辛辣等同于酸度；酸度是实验室测量的游离脂肪酸指标。"]],
        ["单一品种与调和", ["单一品种油便于观察地域和品种个性，也能帮助厨师建立明确的搭配语言。调和油并非低一等级：有经验的生产者可把不同香气、苦辣和稳定性组合起来，获得目标风格。关键是原料质量、工艺和标示是否真实。", "比较时应选择相近新鲜度和保存状态的样品。若一瓶油因光热或开封过久失去香气，再典型的品种特征也难以辨认。"]],
        ["成熟度改变表达", ["较早采收的果实通常出油率较低，常见绿色香气和更清楚的苦辣；随着成熟推进，风味可能变得圆润，果香方向也会变化。这是一般趋势，并不意味着越早越高级，生产者需要在风味、产量和果实状态之间判断。", "同一果园分批采收，或将不同成熟度油品调和，都可能形成稳定风格。了解采收日期和批次，有助于解释为何同一品种在不同瓶中表现不同。"]],
        ["从品鉴到餐桌", ["建立品种认识最有效的方法，是盲品两到三款并记录香气、苦辣、质地与搭配。柔和型可测试鱼类、乳酪和清淡蔬菜；绿色与辛香型可尝试豆类、烤肉、番茄和根茎菜。", "LuxurEat（露意膳）在介绍品种时会同时提供产区、采收、加工与用途，不把品种名称当作营销捷径。对消费者来说，记住自己喜欢的风味组合，比追逐一个被神化的品种更有用。"]],
      ],
      asideSummary: "品种决定风味潜力，年份、成熟度、加工与储存决定它如何被呈现；单一品种和调和都可能拥有高品质。",
    },
    "olive-how-to-choose": {
      intro: "把等级、产地、日期、包装与用途放进同一张检查清单，减少只看价格和营销词的误判。",
      opening: [
        "买橄榄油时，最醒目的词往往不是最重要的信息。先确认完整法定名称，再看原产、日期、规格、储存方式和责任主体，可以排除许多概念混淆。随后再根据生食、烹饪、餐饮用量或礼赠需求选择风味和容量。",
        "价格能反映果实、采收、加工、产量、包装和流通成本的一部分，却不能单独证明品质。低价不必然等于不合格，高价也不能替代理化与感官证据。可追溯、保存良好并适合实际用途，才是更可靠的组合。",
      ],
      sections: [
        ["第一行先看等级", ["“特级初榨橄榄油”“初榨橄榄油”“橄榄油”等名称对应不同类别，不能只看到“橄榄”二字就视为同一种产品。混合、风味浸渍或复合调味产品也应按其实际名称理解。", "酸度若被突出标示，应与其他规定指标一起阅读。消费者无法用味觉直接尝出酸度，单一的低数字也不能说明产地、香气、储存和全部品质。"]],
        ["原产与日期要具体", ["查看橄榄采收地、压榨或装瓶地及生产者信息，区分明确产区与宽泛来源。地理标志能说明遵循相应规范，但仍要看年份和批次。若标有采收季，通常比只看灌装日期更有助于理解新鲜度。", "保质期是在标示储存条件下的品质期限，不等于开瓶后始终保持最佳香气。购买前观察货架是否暴晒或靠近热源，到家后也要延续避光、密封和适温保存。"]],
        ["包装与容量服务于使用", ["深色玻璃和金属容器能减少光照，袋盒等阻氧设计也可能有帮助；透明瓶若长期受光，风险更高。包装外观不是等级，但会影响油品在流通和使用中的保护。", "家庭应按消耗速度选择容量，餐饮大包装则要考虑开封频率、分装卫生与后厨温度。买得便宜却用得太慢，最终风味损失可能抵消容量优势。"]],
        ["到家后的快速复核", ["开瓶后先单独闻香和小口品尝，再用于食物。记录果香是否清晰、是否有平衡的苦辣、是否出现陈旧或霉湿气息。如怀疑产品问题，应保留包装、批次和购买凭证，并联系销售方。", "LuxurEat（露意膳）的选品说明会尽量提供可验证资料与明确用途，同时避免把“天然”“手工”或奖项当作万能背书。最好的选择，是信息清楚、状态新鲜、风格适合并能在合理时间内用完的那一瓶。"]],
      ],
      asideSummary: "先确认法定等级和来源，再比较日期、包装、容量与用途；价格和宣传词只能作为辅助信息。",
    },
    "olive-storage": {
      intro: "理解光、热、氧与时间如何削弱橄榄油风味，并为家庭和餐饮场景建立可执行的保存方法。",
      opening: [
        "橄榄油离开榨油厂后仍会缓慢氧化。光照、较高温度、空气接触和时间都会加速香气消退与哈败发展。优质原料和先进加工无法抵消错误储存，因此保存不是购买之后的小事，而是品质链条的一部分。",
        "氧化速度受包装、剩余空间、环境温度与开关频率影响，无法用一个开封天数概括所有产品。标签给出安全和品质期限，开瓶后的最佳风味则需要结合实际条件观察。",
      ],
      sections: [
        ["避开光与持续高温", ["把油放在阴凉橱柜，而不是窗台、射灯下或灶台边。短时间烹饪加热与整瓶长期处在高温环境是两件事；后者会在每次使用前就持续消耗风味。", "深色玻璃或金属罐能提供保护，但不是绝对屏障。店铺陈列、运输和家庭储藏都应减少日照与温度波动，尤其不要把库存放在车辆或热源附近。"]],
        ["减少不必要的空气接触", ["每次使用后立即盖紧，保持瓶口清洁。随着油量下降，容器内空气比例增加，频繁开合也会带入新空气，因此超大包装未必适合低频家庭使用。", "若需分装，选择干燥、无异味、可密封并能避光的食品接触容器。不要把新油不断倒进残留旧油的油壶，旧油和水分会影响风味与卫生。"]],
        ["冰箱不是通用答案", ["低温可能使橄榄油出现浑浊或结晶，回温后通常可恢复，但这种现象不能用来鉴别真伪。家庭频繁进出冰箱还会带来温度变化和冷凝风险，除非标签或生产者有明确建议，否则稳定的阴凉环境通常更实用。", "判断真伪和等级需要来源文件、理化检测与感官评价，不能依靠“冷藏是否凝固”之类的网络测试。不同脂肪酸和微量成分组成会让低温表现不同。"]],
        ["建立库存和开瓶制度", ["家庭可以在瓶身记录开封日期，餐饮端则应标注入库、开封和分装信息，执行先进先出。定期闻香，发现果香变平或出现陈旧、蜡笔、旧坚果般气息时，说明风味已明显衰退。", "购买量应与使用频率匹配。LuxurEat（露意膳）在供应与应用建议中，会把包装规格、储运条件和预计消耗一起考虑，让产品从仓库到餐桌都保持可追溯和稳定。"]],
      ],
      asideSummary: "避光、避热、密封并按消耗速度购买；记录开瓶和批次，比用颜色或冷藏凝固判断品质更可靠。",
    },
    "olive-fasting": {
      intro: "从能量、耐受性与饮食结构解释空腹喝橄榄油，区分个人习惯、营养事实和未经证实的功效。",
      opening: [
        "空腹喝橄榄油在网络上常被描述为排毒、护胃或快速减重方法，但单一食材不能承担这些复杂结果。橄榄油仍是高能量油脂，空腹摄入不会把它变成药物，也不会自动优于把适量油用于蔬菜、豆类和正餐。",
        "有些人能接受直接饮用，有些人会出现恶心、反酸、腹部不适或排便变化。个体感受可以被记录，却不能直接推导普遍健康结论；持续症状或有基础疾病时，应咨询合格医疗专业人员。",
      ],
      sections: [
        ["营养价值不会因空腹放大", ["橄榄油以不饱和脂肪为主，这一组成不会因为饮用时间发生神奇变化。更重要的是它在全天饮食中替代了什么、用了多少，以及整体是否包含足够蔬菜、水果、全谷物、豆类和适量蛋白质。", "若直接喝油只是额外增加，而正餐中的黄油、肥肉和油炸食物不变，总能量会随之上升。把油用于改善健康食物的可口性，往往比单独吞服更有实际意义。"]],
        ["为什么有人感觉不同", ["油脂进入消化道会影响胃排空和胆囊收缩，个人耐受差异较大。短期的饱腹、润滑感或排便变化不等于“排出毒素”，也不能证明长期效果。", "饮用量、是否同时喝咖啡、睡眠、前一餐内容和心理预期都可能影响体验。若要观察，应保持份量小且记录变量，不要快速增加用量。"]],
        ["哪些情况需要谨慎", ["有胆囊、胰腺、胃食管反流或其他消化系统问题，正在服药，处于孕期或需要严格控制能量的人，不应仅依靠网络文章决定做法。儿童和老年人的需求也不同。", "出现持续疼痛、呕吐、严重腹泻或其他异常时，应停止尝试并寻求医疗帮助。本文只提供一般饮食信息，不提供诊断或治疗。"]],
        ["更稳妥的日常方式", ["把少量特级初榨橄榄油用于番茄、绿叶菜、豆汤、全谷物、鱼类或烤蔬菜，既能观察风味，也能明确份量与搭配。用量勺比凭感觉直接倒入口中更容易管理。", "如果喜欢清晨食用，可以把它放进早餐或正餐，而不必赋予空腹时点特殊功效。LuxurEat（露意膳）建议把橄榄油视为优质食材，在多样、平衡和适量的饮食中使用。"]],
      ],
      asideSummary: "空腹不会放大橄榄油的营养价值；份量、替代关系、个人耐受与整体饮食比饮用时点更重要。",
    },
    "olive-myths": {
      intro: "澄清酸度、颜色、加热、苦辣和产地等常见误区，用可验证信息替代简单口号。",
      opening: [
        "橄榄油知识里最常见的问题，不是完全没有信息，而是把一个线索夸大成万能结论。颜色深、酸度低、喉咙辣、冷藏凝固或来自某个国家，都不能单独证明一瓶油的全部品质。",
        "可靠判断通常需要多项证据：法定名称与标签、可追溯文件、理化分析、受训感官评价、包装储存和实际品鉴。消费者不必拥有实验室，但可以识别哪些说法越过了证据边界。",
      ],
      sections: [
        ["误区一：颜色越绿越新鲜", ["颜色受品种、成熟度和色素影响，专业感官评价不会把绿色直接当作等级依据。透明瓶在灯光下很漂亮，却可能让油承受更多光照。", "选择时应更重视果香、是否存在缺陷、日期与保存。颜色可作为视觉特征记录，但不宜排序高低。"]],
        ["误区二：酸度可以尝出来", ["标签所说的游离酸度需要化学分析，舌头感受到的酸、苦、辣不是同一概念。低酸度是部分等级要求之一，但还需其他理化和感官条件。", "如果营销只强调一个极低数字，却不说明类别、来源和保存，信息仍然不完整。开瓶后的哈败也不能靠出厂酸度数字排除。"]],
        ["误区三：特级初榨不能加热", ["特级初榨橄榄油可以用于多种家庭烹饪。加热会改变部分香气，实际适用性取决于温度、时间、菜肴和油品状态。把油反复长时间过热，与正常炒、烤或炖并不是一回事。", "风味特别细致的油可以留作完成菜，日常油用于烹饪。这样是管理香气和成本，而不是因为特级初榨一遇热就变成有害物。"]],
        ["误区四：苦辣代表刺激或越强越好", ["新鲜初榨油的苦味与辛辣感可以是积极特征，与酚类物质和果实状态有关；但强度应与果香、质地和用途平衡。对清淡鱼类合适的油，未必适合用同样强度处理豆汤和烤肉。", "LuxurEat（露意膳）会把感官词写成可比较的描述，而不是功效暗示。遇到“包治”“排毒”“零负担”或仅凭一项家庭测试判真假的说法，应回到标签与权威资料。"]],
      ],
      asideSummary: "颜色、酸度、冷藏、苦辣或产地都只是局部线索；多项证据和实际使用才能构成完整判断。",
    },
    "olive-recipes-guide": {
      intro: "从面包、沙拉、豆类到意面和烤制，理解橄榄油在调味、传热、乳化与完成菜中的不同角色。",
      opening: [
        "橄榄油进入菜谱时，不只是“加一点油”。它可以承载香气、连接酱汁、帮助表面受热，也可以在出餐前提供新鲜果香。把加入时点、温度和用量写清楚，才能让同一瓶油在家庭与专业厨房中稳定复现。",
        "配方应从食材和目标口感出发，而不是为了突出油而过量使用。清淡油、绿色辛香型油与成熟果香型油各有位置；若只有一瓶，也可以通过生用、低温调和与烹饪三个阶段分配用量。",
      ],
      sections: [
        ["面包与生食", ["新鲜面包配橄榄油最能直接观察香气和苦辣。先少量淋油，再决定是否加盐、番茄或香草，避免调味一次盖住油品。番茄烤面包可让酸甜、面包焦香与油的果香形成清楚层次。", "沙拉中先处理盐和酸，再缓慢加入油并搅拌，可获得更均匀的包裹。油与醋不会永久乳化，但芥末、乳酪或食材自身成分可帮助短暂稳定；具体过敏原要随配方标示。"]],
        ["豆类、汤与蔬菜", ["豆类和根茎淀粉能承接橄榄油的苦辣，少量生油可在浓稠口感上增加香气和流动感。汤品适合把一部分油用于炒香基础食材，另一部分留到起锅。", "烤蔬菜用油应薄而均匀，过量会妨碍表面脱水和焦香。先按重量或份量记录用油，再根据烤盘、含水量和温度调整，比笼统写“适量”更易复现。"]],
        ["意面与酱汁", ["橄榄油、煮面水和奶酪或其他酱料成分可以通过搅拌形成暂时乳化，使酱汁附着面条。关键是控制水量、温度和搅拌，而不是依赖大量油制造光泽。", "蒜香、辣椒和香草可在适度温度下释放风味，避免把蒜或香草烧焦。最后补入更具果香的油，能够保留挥发性香气，并减少长时间加热造成的损失。"]],
        ["建立自己的用油表", ["为常做菜记录油品、用量、加入时点和结果，例如“烤前每份多少、出餐再加多少”。餐饮端还可记录批次和开瓶日期，便于成本与风味一致性管理。", "LuxurEat（露意膳）的食谱会把橄榄油与相关产品链接、份量、过敏原和替代方案一起呈现。替代油品时，应重新判断风味和加热表现，而不是假设所有植物油完全相同。"]],
      ],
      asideSummary: "把橄榄油分成生食、烹饪、乳化和完成菜四种角色，并记录用量与时点，菜谱才能稳定复现。",
    },
    "pizza-fundamentals": {
      intro: "从面粉、含水、发酵、整形到炉温，理解一张意式披萨如何获得轻盈饼边、柔韧中心与清晰配料。",
      opening: [
        "意式披萨的基础不是堆满配料，而是让面团、酱汁、乳酪与烘烤在短时间内完成平衡。以那不勒斯披萨为例，行业规范会对原料、面团制作、发酵、手工整形与烘烤提出明确要求；其他意大利流派则可能采用不同厚度、含水量和炉具。",
        "因此，所谓“正宗”不应只靠圆形、焦斑或高温几个视觉符号判断。面粉强度是否适合发酵时间，面团温度是否可控，酱汁含水量与配料重量是否匹配，才决定入口时是轻盈有弹性，还是湿软、干硬或难以消化。",
      ],
      sections: [
        ["面粉、含水与盐", ["面粉需要具备与目标发酵时长相匹配的吸水和面筋能力。并非蛋白质越高越好：过强可能让面团难以拉伸，过弱则可能支撑不足。含水量同样没有万能数字，它受面粉、设备、环境湿度、操作经验和成品风格共同影响。", "盐不仅提供味道，也影响面筋和发酵节奏。水温则帮助控制和面后的面团温度。家庭制作应先固定面粉、室温和配方，再一次只调整一个变量；餐饮端还应记录批次和实际出缸温度。"]],
        ["耐心精筛发酵状态", ["发酵时间本身不是品质勋章。酵母用量、面团温度、室温或冷藏条件要一起看。发酵不足时面团紧、香气单薄；过度发酵则可能结构变弱、酸味或酒精气息突出，并在整形时难以保留气体。", "判断应结合体积、表面状态、延展性和气味，而不是只看计时器。分割滚圆后，面团还需要足够松弛，才能在不使用擀面杖强压饼边的情况下从中心向外手工展开。"]],
        ["酱汁、乳酪与配料", ["番茄酱的水分、酸甜和用量会影响中心是否湿软；乳酪的含水量和切法会影响融化与出水。罗勒与橄榄油可在烘烤前后承担不同香气角色，具体顺序取决于炉温与菜谱。", "每增加一种配料，都要重新考虑重量、含水和熟成时间。薄片蔬菜、腌制肉类或预熟食材的处理不同，不能靠延长烘烤弥补过重配料，否则饼边可能先干或烧焦。过敏原信息也应随面粉、乳制品和加工肉制品逐项确认。"]],
        ["高温烘烤与成品判断", ["高温让面团中的水迅速转化为蒸汽，推动饼边膨胀并形成烘烤香气。家庭烤箱温度较低时，可借助预热充分的烤石或烤钢改善底部传热，但时间和结果不会完全复制专业炉。", "好的焦斑带来香气，不应成为大面积苦味或生面团的掩饰。切开后观察底部是否熟成、中心能否承托配料、饼边是否轻盈而有弹性。LuxurEat（露意膳）把专业面粉、稳定原料和可执行工艺放在一起，帮助用户理解意大利披萨久负盛名的理由。"]],
      ],
      asideSummary: "披萨的核心是变量配合：面粉、含水、发酵、配料水分和炉温共同决定结构，而非单一的长发酵或高温标签。",
    },
    "gelato-vs-ice-cream": {
      title: "意式手工冰淇淋与普通冰淇淋：从名字到口感的区别",
      intro: "从配方、空气、冻结、服务温度与门店文化，理解意式手工冰淇淋和普通冰淇淋的常见差异。",
      opening: [
        "意式手工冰淇淋与普通冰淇淋都属于冷冻甜品，但两个名称背后常见的配方目标和服务方式不同。意式手工冰淇淋通常追求更紧密、柔滑和直接的风味表达，普通冰淇淋则覆盖更宽广的法规类别、脂肪含量、空气量和硬化储存方式。",
        "这些差异不是全球统一的绝对边界。不同国家对普通冰淇淋有自己的产品标准，而“意式手工冰淇淋”也会随门店、配方、设备和地区传统变化。可靠的比较应说明具体样品与工艺，避免用一个脂肪数字或一句“空气更少”概括所有产品。",
      ],
      sections: [
        ["配方服务于目标质地", ["乳、奶油、糖、蛋、坚果、水果、可可和其他固形物都会影响冻结点、黏度、冰晶与风味。意式手工冰淇淋可以是乳基，也可以是水果和水为主的雪葩方向；普通冰淇淋同样有丰富配方，不能只用是否含奶区分。", "糖不仅提供甜味，也参与控制冻结状态；脂肪能携带香气并改变润滑感；乳蛋白和其他固形物影响结构。减少某一成分时，配方需要整体重算，不能简单等量删除。"]],
        ["空气量会改变感受", ["冷冻搅拌时引入的空气会增加体积，形成空气泡并影响硬度、融化和香气强度。意式手工冰淇淋常以较低空气量呈现更紧密的质地，但实际数值取决于设备与配方。", "空气并非越少越高级。过少可能使成品过重或难以舀取，过多则可能显得松散并削弱风味。判断应回到细腻度、稳定性、融化节奏和真实原料表达。"]],
        ["温度改变香气与柔软度", ["较低温度会让更多水冻结，成品更硬，香气释放也更慢。意式手工冰淇淋常以相对柔软的状态在门店现挖服务，因此入口和香气显得直接；普通冰淇淋常经历更充分硬化，并适应包装、运输和家庭冷冻。", "服务温度不能脱离食品安全和配方稳定性。展示柜、储存柜和运输冷链承担不同任务，门店需要根据产品文件和设备校准，而不是为了柔软随意升温。"]],
        ["选择时看事实而非标签", ["阅读配料、过敏原、净含量、储存和生产信息，观察颜色是否自然、质地是否细腻、风味是否清楚。亮丽颜色或巨大堆高不是品质证明，过度融化后反复冻结也会损害冰晶结构。", "LuxurEat（露意膳）将意式手工冰淇淋视为一套原料、配方和服务系统，不把它简单说成普通冰淇淋的高级版本。真正的区别需要在一口中的密度、香气、温度和制作透明度里被看见。"]],
      ],
      asideSummary: "两类冷冻甜品没有一个全球通用分界；配方、空气量、温度和服务方式共同塑造常见差异。",
    },
    "gelato-history": {
      title: "意式手工冰淇淋：从城市传统到现代工艺",
      intro: "从意大利冷冻甜品传统、城市门店到现代设备，理解意式手工冰淇淋如何成为日常文化与专业工艺。",
      opening: [
        "冷冻甜品的历史并非由某一天、某一个人突然发明。冰雪保存、糖浆、乳制品和制冷技术在欧洲及更广阔地区长期演变，意大利城市的宫廷厨房、咖啡馆和手工门店逐步发展出今天熟悉的冷冻甜品文化。",
        "现代意式手工冰淇淋既继承地方风味，也依赖食品科学与设备。巴氏处理、熟化、动态冷冻、硬化或展示、清洁消毒和冷链都决定产品能否安全、细腻且稳定。传统与技术不是对立面，可靠工艺让原料表达可以重复。",
      ],
      sections: [
        ["从稀缺冰雪到机械制冷", ["早期冷冻甜品受季节冰雪和储冰条件限制，制作与消费并不普及。糖、盐与冰的使用帮助降低温度，但真正改变行业规模的是机械制冷、卫生控制和可重复的冷冻设备。", "当制作不再完全依赖自然冰，门店可以更稳定地生产和展示，配方也能针对冰晶、空气与融化进行精细调整。今天对“手工”的理解，应包含对温度和流程的专业控制。"]],
        ["城市中的日常仪式", ["意大利的冰淇淋店与街道、广场、晚间散步和家庭聚会相连。消费者在柜台选择口味、杯或甜筒，并在短时间内享用，这种服务节奏塑造了柔软度、展示方式和口味轮换。", "地方文化也进入口味：西西里的柑橘与坚果、北部的乳制品和山地风味、各地咖啡与巧克力传统，都能成为灵感。但具体产品仍取决于当季原料和门店配方。"]],
        ["现代工艺的关键节点", ["乳基配方通常经历混合、加热处理、冷却熟化与动态冷冻；水果雪葩的流程和配方重点不同。每一步都影响水分、脂肪、蛋白质、糖和固形物之间的平衡。", "温度波动会促进冰晶变大，降低细腻度，因此从生产到展示和运输都要保持稳定。设备无法弥补失衡配方，配方也不能弥补卫生和冷链缺失。"]],
        ["传统如何走向中国餐桌", ["跨市场表达首先要翻译清楚名称、口味、配料和过敏原，再考虑甜度、份量与消费场景。尊重中国消费者不等于随意改变工艺，也不等于把意大利口味固定成少数符号。", "LuxurEat（露意膳）会从原料产地、基础配方、操作建议与专业供应入手，让家庭、店铺和食品业客户理解每种选择的理由。历史提供文化坐标，最终体验仍由真实原料与稳定制作完成。"]],
      ],
      asideSummary: "意式手工冰淇淋从冷冻甜品传统走向现代门店，制冷、卫生、配方和城市生活共同塑造了今天的样貌。",
    },
    "ugolini-gelato-mix": {
      topicLabel: "意式手工冰淇淋",
      column: "意式手工冰淇淋",
      eyebrow: "新品预告",
      title: "新品：Luxureat（露意膳）意式手工冰淇淋粉末基底即将上线",
      meta: "意式手工冰淇淋 · 即将上线",
      archive: "新品前瞻",
      intro: "Luxureat（露意膳）全新意式手工冰淇淋粉末基底系列即将推出，面向家庭、店铺及食品业客户，提供更灵活、便捷的意式冰淇淋制作选择。具体口味、规格及上市信息，请以最终产品资料为准。",
      opening: [
        "这是一篇新品前瞻，而不是已经完成的规格或功效承诺。当前可以确认的是产品方向与服务对象；口味、配方、包装、建议用量、营养和过敏原等信息，必须等待研发、合规审核和最终产品文件后再发布。",
        "粉末基底的价值不在于替代所有专业判断，而在于把部分固形物、甜味体系与结构需求转化为更容易执行的操作起点。家庭、店铺和食品业的设备、批量、服务温度与合规责任不同，最终资料需要分别说明。",
      ],
      sections: [
        ["为什么开发粉末基底", ["意式手工冰淇淋需要平衡水、糖、脂肪、蛋白质与其他固形物。对不具备完整研发条件的用户，经过验证的基底有助于减少称量项目和批次波动，但仍需按说明加入指定液体或原料并遵守温度流程。", "便捷不应以模糊信息为代价。Luxureat（露意膳）会在上市前说明配料、适用设备、操作步骤、储存和成品建议，避免把“只需加水”之类口号用于并不符合该操作的产品。"]],
        ["面向三类使用场景", ["家庭用户需要清楚份量、常见器具和失败排查；店铺更关注连续出品、展示稳定、口味轮换与员工培训；食品业客户还要评估规格、供应、生产适配、标签、过敏原和质量文件。", "同一系列可以提供不同包装或操作方案，但具体形式尚未最终确认。网站不会提前写入未经核准的口味、重量、保质期或产能信息。"]],
        ["上市资料应该包含什么", ["完整资料至少应帮助用户识别产品名称、配料、致敏物质、营养、净含量、批次、保存条件、使用方法和责任主体。针对餐饮和食品业，还应提供可追溯文件、质量标准与技术支持范围。", "中文标签和线上信息需要符合中国适用规定。任何“无添加”“低糖”或其他营养声称，都必须基于最终配方和法规条件，不能在研发阶段先作为宣传结论。"]],
        ["从关注新品到实际评估", ["感兴趣的用户可以先了解意式手工冰淇淋的配方、温度和风味基础，再在产品上线后对照自己的设备与服务方式。购买前应以正式页面和包装信息为准，专业客户可进一步索取技术资料。", "Luxureat（露意膳）将通过热门新品和系列产品页面更新进度，所有购买与应用判断都以届时发布的正式资料为准。" ]],
      ],
      asideSummary: "新品方向已经明确，具体口味、规格、配方与上市时间仍以最终产品资料为准；面向不同用户提供透明、可执行的信息。",
      cta: { label: "了解新品 →", href: "new.html#gelato" },
    },
    "gelato-flavours": {
      eyebrow: "意式手工冰淇淋风味",
      title: "经典口味：意式手工冰淇淋如何表达原料",
      meta: "意式手工冰淇淋 · 2026",
      intro: "从牛奶、香草、巧克力、咖啡、榛子、开心果和水果出发，理解不同原料如何改变甜度、质地与香气。",
      opening: [
        "低温会减慢香气释放，也会改变甜味感受，因此一款好的意式手工冰淇淋不能只靠增加糖或香精让味道更响亮。配方需要尊重原料自身的脂肪、含水量、酸度、纤维和可可或坚果固形物，再调整冻结和服务状态。",
        "经典口味之所以经久不衰，是因为它们能清楚展示制作能力：牛奶味考验干净与平衡，巧克力考验可可与甜度，坚果考验烘焙和油脂，水果则考验成熟度、酸度与季节。",
      ],
      sections: [
        ["牛奶与香草：看似简单的基准", ["牛奶口味没有浓烈配料遮挡，乳香、甜度、冰晶和余味都很直接。原料品质、加热处理和冷链稍有问题，异味或粗糙感就容易被发现。", "香草来源与形态不同，香荚、提取物和天然香料的标示及使用方式应以产品资料为准。好的香草风味应与乳基融合，而不是只留下单一甜香。"]],
        ["巧克力与咖啡：苦甜结构", ["巧克力口味要平衡可可固形物、可可脂、其他脂肪与糖。深色不必然意味着可可含量更高，名称和配料才是依据。苦味、酸感、烘焙香与甜度需要在低温下仍然清楚。", "咖啡的烘焙度、萃取方式和加入量会影响香气与水分。过度烘焙或过量可能只剩焦苦，过弱则在冷冻后失去辨识度。"]],
        ["榛子与开心果：坚果的真实感", ["坚果含有较多脂肪和固形物，会显著改变黏度、冻结与融化。烘焙能发展香气，但过度会带来焦苦；储存不当还可能出现氧化陈味。", "开心果并不天然呈现荧光绿色，颜色会随品种、烘焙和配方变化。选择时更应关注配料、香气、细腻度与是否存在油腻或香精感，而不是追求夸张色泽。"]],
        ["水果与季节：水分和酸度的挑战", ["草莓、柠檬、桃、莓果等含水、糖和酸差异明显，不能共用一套比例。成熟度改变风味，也改变需要补充的糖与固形物。水果雪葩通常不以乳为主体，但具体配方仍需确认过敏原和交叉接触。", "LuxurEat（露意膳）介绍口味时，会区分原料事实、感官描述和产品信息。常见口味已经足以展示意式手工冰淇淋的专业：真实、清晰、不过度遮盖，并在每一口保持细腻层次。"]],
      ],
      asideSummary: "经典口味不是保守选择，而是最直接的工艺测试：每种原料都需要独立处理水分、脂肪、酸度和香气。",
    },
    "nutrition-labels": {
      intro: "按食品名称、配料、营养、致敏物质、日期、储存与责任主体的顺序，读懂一张预包装食品标签。",
      opening: [
        "食品标签是产品事实的入口，但需要按顺序阅读。正面图片和广告语负责吸引注意，法定名称、配料表、营养成分、净含量、日期、储存方式、生产者和进口商等信息，才帮助消费者判断产品究竟是什么。",
        "中国已发布GB 7718-2025等新版标准，具体实施与过渡要求应以国家卫生健康部门和市场监管部门的正式文件为准。网站文章只能解释阅读方法，任何具体产品都应以实际中文标签和当期适用法规为最终依据。",
      ],
      sections: [
        ["先确认食品名称", ["品牌名、系列名和风味名不一定是食品的法定或真实属性。先寻找能说明类别的名称，例如调味品、酱、橄榄油或冷冻甜品，再判断正面图片是否与实际配料一致。", "若强调加入某种配料或特定成分，相关含量可能需要按适用规则标示。不要只因包装出现橄榄、松露或水果图片，就假设它们是主要成分。"]],
        ["再读配料顺序", ["配料通常按加入量递减排列，复合配料可能需要展开标示其组成。食品添加剂应按规定名称或功能类别呈现，不能仅凭配料名称长短判断产品优劣。", "同一类产品可能为结构、酸度、乳化、保存或风味使用不同成分。关键是名称清楚、用途合法、信息可核对，并符合消费者的饮食和过敏需求。"]],
        ["营养数字要换算到份量", ["营养成分可能按每100克、每100毫升或每份标示。比较产品时先统一单位，再根据实际一次食用量换算。能量、蛋白质、脂肪、碳水化合物和钠等数字不能脱离总饮食解释。", "“低”“无”“高”等营养声称受到条件约束，不是日常语言中的模糊形容词。遇到声称时应同时看数值、份量和适用标准。"]],
        ["最后检查安全与使用信息", ["过敏原、生产日期、保质期、开封后要求和储存温度直接影响选择。保质期建立在标示储存条件上，冷链产品离开规定温度后不能只看日期判断。", "进口产品还应查看境内责任主体与中文信息。LuxurEat（露意膳）会把线上介绍与最终产品文件对应，若网页和包装存在差异，应以合法标签与最新技术资料为准并及时核实。"]],
      ],
      asideSummary: "从食品名称到配料、营养、过敏原和储存逐层阅读，正面营销信息不能替代完整中文标签。",
    },
    "allergens-guide": {
      intro: "区分配方含有、交叉接触与个人风险，按产品和批次核对致敏物质，而不是用全系列口号代替标签。",
      opening: [
        "食物过敏是免疫系统对特定食物蛋白的反应，严重程度因人而异。乳糖不耐受、一般消化不适和食物过敏并不是同一概念，处理建议也不同。对已知过敏者而言，最重要的是阅读具体产品标签并遵循医疗建议。",
        "一家品牌拥有多条产品线时，不能用一句“无过敏原”覆盖全部。鱼子酱、含乳冷冻甜品、坚果口味、含麸质披萨和酱料的风险来源不同，配方与生产环境也可能随规格和批次变化。",
      ],
      sections: [
        ["配方中明确存在的致敏物质", ["先从配料表和过敏原提示确认乳、蛋、含麸质谷物、坚果、大豆、鱼类、甲壳类等与自身相关的成分。复合配料中的组成也需要展开阅读，不能只看主名称。", "名称相似或翻译不熟悉时，不应凭经验猜测。联系生产者或销售方索取最新中文标签和技术资料，在无法确认时选择不食用。"]],
        ["理解交叉接触", ["产品配方没有主动加入某种致敏物质，不代表生产环境一定不存在接触可能。共用设备、储存、运输、工具和门店操作都需要风险评估与清洁管理。", "预防性提示应依据生产者文件和适用法规，不宜由经销商自行扩大或删除。对高风险人群而言，“可能含有”需要按个人医疗方案认真对待。"]],
        ["餐饮和家庭的二次确认", ["餐厅使用原包装原料后，还会加入其他酱汁、乳酪、坚果或装饰，并可能使用共用炉具和器皿。点餐时应明确告知过敏情况，让餐厅评估是否能安全提供。", "家庭分装时保留原标签和批次，不要只把粉末或酱料装入无标识罐。为不同成员准备食物时，清洁台面、工具和双手，避免同一刀具或勺子交叉使用。"]],
        ["出现风险时怎么办", ["有过敏史者应与医生制定个人管理方案，并按建议携带所需急救药物。出现呼吸困难、喉咙紧、全身反应或其他严重症状，应立即寻求紧急医疗帮助。", "LuxurEat（露意膳）会按产品发布配料和致敏信息，不把知识文章作为医疗或购买保证。任何配方更新都应同步到标签与销售资料，让消费者和专业客户能在使用前核对。"]],
      ],
      asideSummary: "过敏原管理必须逐产品核对配方、生产环境和标签；网站教育不能替代包装信息与个人医疗方案。",
    },
    "clean-label": {
      eyebrow: "无添加标签",
      title: "无添加标签：先问清楚没有添加什么",
      archive: "配料与声明",
      intro: "“无添加”只有在对象、范围和证据明确时才有意义，它不自动等于更天然、更安全或营养更好。",
      opening: [
        "“无添加”容易让人产生完整、绝对的印象，但食品配方和标签需要更精确的问题：没有添加哪一种成分，是配方中未使用，还是最终产品未检出；这一说法是否符合适用法规；同类产品本来是否就不需要该成分。",
        "一款食品是否值得选择，仍要看食品名称、完整配料、营养、致敏物质、生产卫生、储存和可追溯信息。减少不必要成分可以是清晰的产品原则，却不能替代安全控制，也不能把合法且具有技术作用的食品添加剂一概描述为有害。",
      ],
      sections: [
        ["把声明写完整", ["比起只写“无添加”，更负责任的表达会指出具体对象和适用范围，并能由配方、供应商文件和生产记录支持。若产品从未需要该成分，用醒目声明制造特殊优势，也可能造成误导。", "“无防腐剂”“无人工色素”“无蔗糖”等表述涉及不同定义，不能相互替代。是否可以使用、如何标示和是否需要说明其他糖来源，应按产品和市场逐项审核。"]],
        ["添加剂有明确功能", ["食品添加剂可能用于安全、抗氧化、酸度、乳化、稳定、膨松、着色或其他工艺目的，并受到品种、使用范围和用量规则约束。配料表可帮助消费者识别实际使用情况。", "删除一种稳定剂或乳化剂可能改变质地、融化、保质和冷链要求。若要简化配方，必须通过研发和验证重新建立安全与品质，而不是仅在文案中删掉名称。"]],
        ["天然来源也要评估", ["天然成分同样可能含致敏物质、糖、盐或天然毒素，来源天然不代表适合所有人。香料、浓缩汁、蜂蜜和植物提取物也需要准确标示和合理使用。", "消费者可结合饮食目标选择配料更简洁的产品，但不必把配料数量当作唯一评分。功能清楚、用量合规、来源可追溯，往往比单纯追求短名单更重要。"]],
        ["LuxurEat（露意膳）的信息原则", ["产品上线前应完成配料、营养、过敏原、规格、保存和使用文件，再决定哪些声明能够被证据支持。尚未定稿的意式手工冰淇淋粉末基底不会提前承诺“无添加”或其他营养属性。", "网站会把品牌原则与产品事实分开：前者说明我们重视透明、可靠和可追溯，后者必须由每款产品的最终标签和技术资料证明。这样，“无添加”才不是空泛的健康光环。"]],
      ],
      asideSummary: "无添加需要明确对象、范围和证据；完整配料、安全控制与可追溯信息比一个笼统标签更重要。",
    },
    "nutrition-myths": {
      intro: "用份量、证据等级、适用人群和整体饮食审视营养信息，避免把个人体验或营销语言当成普遍事实。",
      opening: [
        "营养内容常把复杂问题压缩成一个食材、一个数字或一句禁令。真实饮食却由份量、频率、替代关系、烹饪方式、生活习惯和个人健康状况共同构成。单一食品通常不能独立带来“排毒”“抗癌”或快速减重等结果。",
        "负责任的文章应说明信息来自哪里、适用于谁、测量单位是什么，以及哪些结论仍然不确定。观察研究、临床试验、法规标准、产品检测和个人感受各有用途，不能互相替代。",
      ],
      sections: [
        ["误区一：某种食物越多越好", ["即使一种食物含有不饱和脂肪、蛋白质或其他有价值成分，过量仍可能让总能量、钠或糖超出需要。营养价值与适量并不冲突。", "判断应看它替代了什么。如果橄榄油替代部分饱和脂肪来源，意义与在原有饮食上额外大量添加不同；坚果、乳制品和冷冻甜品也要结合份量。"]],
        ["误区二：一项研究就是定论", ["研究对象、样本量、干预时间、对照方式和结果指标都会影响结论。细胞或动物研究不能直接等同于人体日常食用效果，相关性也不自动证明因果。", "网站引用研究时应避免只摘取最惊人的数字，并说明研究层级。产品层面的具体声称还需要符合检测与法规条件。"]],
        ["误区三：个人有效就适合所有人", ["口味、饱腹、消化和血糖反应可能因年龄、疾病、药物、过敏、活动量和饮食背景而不同。个人体验可以启发问题，却不能替代系统证据。", "需要控制体重、血脂、血糖、肾功能或有食物过敏的人，应寻求合格专业人士的个体建议。社交媒体建议不应改变处方或治疗。"]],
        ["建立三步核对法", ["第一看来源：是否为卫生部门、法规、专业机构或完整研究；第二看单位和份量：每100克、每份和实际摄入是否一致；第三看边界：这是一般建议、产品数据还是医疗结论。", "LuxurEat（露意膳）的营养与配料内容坚持把事实、解释和品牌立场分开。我们可以说明如何阅读和搭配，但不借单一食材制造恐惧，也不把普通食品包装成治疗方案。"]],
      ],
      asideSummary: "营养判断需要来源、份量、替代关系和适用边界；个人感受与营销口号不能代替完整证据。",
    },
  };

  for (const [slug, content] of Object.entries(zhLongformArticles)) {
    const id = `zh-academy-${slug}`;
    if (articles[id]) Object.assign(articles[id], content);
  }

  const zhCultureLongformArticles = {
    "italian-food-culture": {
      title: "意大利美食，不止一种味道",
      intro: "从山地、平原、海岸与岛屿出发，理解意大利饮食为何始终与地域、季节、家庭和地方生产相连。",
      opening: [
        "谈到意大利美食，人们很容易先想到披萨和意大利面，但这两类食物并不能概括整个国家。意大利由二十个大区组成，各地的海拔、气候、农业、历史贸易与城市生活不同，因而形成了彼此有联系、又各具个性的餐桌。",
        "认识这种多样性，不需要背诵一长串菜名。更有效的方法，是观察当地主要种植什么、如何保存食物、常用哪种脂肪、面食或谷物怎样处理，以及一顿饭如何围绕家庭和社群展开。",
      ],
      sections: [
        ["地理不是背景，而是食物的一部分", ["北部山地与湖区、中部丘陵、南部海岸以及西西里和撒丁等岛屿，拥有不同的耕作条件与食材组合。高山乳制品、平原稻米、沿海鱼类、南部硬质小麦和广泛分布的橄榄种植，都是理解地方餐桌的入口。", "这些线索不是绝对边界。同一种食材会跨越多个地区，同一道菜也可能存在家庭版本。地域知识的作用，是帮助我们提出更准确的问题，而不是把复杂传统压缩成刻板印象。"]],
        ["季节与保存塑造味道", ["在现代冷链普及以前，晒干、盐渍、腌制、发酵、熬煮和油封等方法帮助家庭延长食材的可用时间。许多今天被视为经典的风味，其实来自对季节和储存条件的实际回应。", "尊重季节并不意味着只能复制旧生活。今天的厨房可以使用现代设备和稳定供应，但仍可通过成熟度、温度、份量与适当加工，让原料保留清晰个性。"]],
        ["家庭食谱为何没有唯一答案", ["家庭菜谱往往通过观察和重复传递：面团看状态、酱汁看浓度、汤品看季节，份量也随人数改变。因此，同名菜肴在不同城市、村镇甚至家庭之间出现差异，是传统持续生活的表现。", "判断一道做法是否可信，应查看它是否说明地区背景、原料条件与关键步骤，而不是只看是否宣称“最正宗”。能够解释为何这样做，比给出一个无法变化的答案更有价值。"]],
        ["从地方知识回到日常餐桌", ["了解产区和传统，最终是为了更好地选择、保存与使用食材。读懂一瓶油、一袋面粉或一块奶酪的来源与特点，能帮助我们决定它适合冷用、烘烤、慢煮，还是只需简单收尾。", "LuxurEat（露意膳）将地域文化、食材知识和实际应用放在同一条线上：先说明可以核对的事实，再提供风味与使用线索，让意大利饮食文化进入中国餐桌时仍保留背景与分寸。"]],
        ["阅读意大利美食的三个问题", ["面对任何一道菜或一种产品，可以先问：它来自怎样的地方？关键原料为何适合这种做法？今天的版本与地方传统之间是什么关系？这三个问题比单独追逐一个菜名更接近文化本身。", "意大利美食的共同点并非味道完全一致，而是对原料、时令、方法和共享时刻的重视。理解差异之后，披萨、意面、橄榄油或甜品才会从符号变成真正可感受的餐桌语言。"]],
      ],
      asideSummary: "从地域、季节、保存方法与家庭传承理解意大利饮食的多样性，并把文化背景转化为选择和使用食材的方法。",
    },
    "italy-regions": {
      title: "意大利二十个大区：一张餐桌地图",
      intro: "从阿尔卑斯山到地中海岛屿，用二十个大区建立餐桌坐标，而不是用简单的南北二分概括意大利。",
      opening: [
        "意大利共有二十个大区，但行政边界只是理解饮食的第一层。山谷、河流、平原、海岸、岛屿与城市市场会在一个大区内部继续制造差异，历史上的交通与贸易也让香料、稻米、玉米、番茄和不同制面方法逐渐进入地方生活。",
        "因此，一张餐桌地图不应把地区排成高低，而应显示食材如何随环境变化。它帮助读者理解为什么有些地方依赖乳制品和稻米，有些地方重视橄榄油、豆类和硬质小麦，也帮助我们辨认产品标签中的产地信息。",
      ],
      sections: [
        ["西北：山地、平原与城市传统", ["瓦莱达奥斯塔、皮埃蒙特、伦巴第和利古里亚横跨阿尔卑斯山、波河平原与狭长海岸。乳制品、稻米、玉米、榛子、葡萄与海岸香草在这里形成多种组合，不能只用“北方偏浓郁”来概括。", "皮埃蒙特的丘陵、伦巴第的稻作区与利古里亚的海岸环境指向完全不同的风味路径。阅读产品时，应继续确认具体省份、品种、生产方式与季节。"]],
        ["东北：高山、潟湖与边境交流", ["特伦蒂诺—上阿迪杰、威尼托、弗留利—威尼斯朱利亚和艾米利亚—罗马涅连接高山、亚得里亚海和重要平原。奶酪、腌制肉类、玉米、米饭、鲜面与海鲜共同出现，反映地理与历史交流。", "即使相邻地区，也可能在面食形态、脂肪选择和调味方式上不同。把菜名放回具体城市与家庭，比套用统一的北方模板更准确。"]],
        ["中部：丘陵、牧区与城市餐桌", ["托斯卡纳、翁布里亚、马尔凯和拉齐奥以丘陵、谷地、牧区和海岸交织。面包、豆类、橄榄油、羊奶制品、手工面食与烤制方法，经常随地方物产组合。", "中部并非只有所谓乡村菜。佛罗伦萨、罗马等城市也不断吸收周边供应与社会变化，使街头小食、家庭菜和正式餐饮保持各自节奏。"]],
        ["南部：日照、火山土与硬质小麦", ["阿布鲁佐、莫利塞、坎帕尼亚、普利亚、巴西利卡塔和卡拉布里亚拥有山地、长海岸、火山环境与广阔农区。番茄、蔬菜、豆类、硬质小麦、乳酪、鱼类与橄榄油构成多样基础。", "披萨与干意面虽然享誉世界，却仍只是南部饮食的一部分。不同地方对辣椒、香草、奶酪、海鲜和保存食品的使用，体现的是可得性与生活经验。"]],
        ["岛屿：独立而开放的风味系统", ["西西里和撒丁岛都拥有强烈的地方认同，却不能被合并为一种岛屿风味。西西里的历史交流、柑橘与多样甜点，撒丁岛的牧业、谷物与海陆资源，各自形成复杂传统。", "使用这张地图时，应把大区看成下一步查证的入口。具体产品仍要核对标签、地理标志、生产者资料和适用法规；大区名称本身既不是品质保证，也不能替代感官判断。"]],
      ],
      asideSummary: "以二十个大区为入口，理解山地、平原、海岸、岛屿与城市如何共同形成意大利的食材和餐桌差异。",
    },
    "regional-traditions": {
      title: "地方风味：传统如何留在日常餐桌",
      intro: "从季节、保存、节庆和家庭实践出发，理解地方传统为何会变化，却仍能保持清晰的文化连续性。",
      opening: [
        "传统不是陈列柜里的固定配方，而是一套在真实生活中反复使用、调整和传递的方法。同一种面食、汤或节庆点心，可能因地区、家庭人数、可得食材和制作人的经验而不同。",
        "这种差异并不削弱传统。相反，它说明食物仍在服务日常生活。判断一项地方做法时，重要的是理解哪些部分承载身份和记忆，哪些部分可以随季节、设备与生活节奏变化。",
      ],
      sections: [
        ["季节是第一套菜单", ["春季嫩菜、夏季番茄与水果、秋季坚果和菌菇、冬季豆类与慢煮菜肴，让餐桌与生产周期保持联系。今天的供应更稳定，但成熟度与季节仍会影响香气、含水量和烹饪方法。", "顺应季节不是追求稀缺，而是理解食材在什么状态下最适合简单处理，什么时候需要保存、浓缩或与其他原料平衡。"]],
        ["保存方法留下地方口音", ["晒干、盐渍、腌制、发酵、烟熏和油封等方法，最初回应储存与运输需要，后来逐渐成为地方风味。保存会改变水分、盐度、酸度和质地，因此使用时也需要重新考虑份量与搭配。", "现代产品应以标签和生产资料说明工艺、保存条件与食用方式。文化故事可以解释来源，但不能替代食品安全要求。"]],
        ["节庆食物连接人与时间", ["许多菜肴在宗教节日、收获季、婚礼或家庭团聚中反复出现。它们的意义不仅来自配料，也来自谁来制作、何时端上桌、如何分食以及与谁共同享用。", "当节庆食物进入日常或跨文化场景时，可以调整份量和呈现方式，但应说明它原来的语境，避免只留下装饰性的名称。"]],
        ["口述经验如何变成可学习的方法", ["家庭烹饪常用手感、声音、气味和状态判断火候，例如面团弹性、酱汁附着或油温变化。把这些经验写成文章，需要描述可观察信号，而不能只写“适量”“凭感觉”。", "可靠的教学会同时给出范围和判断：说明原料差异会怎样影响结果，也提醒读者根据设备、海拔、环境温度和产品说明调整。"]],
        ["在中国餐桌上尊重传统", ["引入意大利食材并不要求复制某个家庭的全部条件。更现实的做法，是保留关键原理，再根据本地季节、厨房设备和用餐习惯调整配菜与份量。", "LuxurEat（露意膳）关注的不是把“传统”变成营销标签，而是提供产地、工艺和使用背景，让消费者知道哪些部分可以灵活，哪些信息必须以真实产品和可靠资料为准。"]],
      ],
      asideSummary: "地方传统通过季节、保存方法、节庆和家庭经验持续变化；理解关键原理，才能在新的餐桌环境中保持尊重。",
    },
    "ingredients-territory": {
      title: "从产地到餐桌：读懂一份意大利食材",
      intro: "用产地、品种、生产、标签、保存和使用六组信息，建立一套可核对的意大利食材阅读方法。",
      opening: [
        "一个意大利名称或一张产地照片，并不足以说明食材品质。真正有用的产品资料，应让读者知道原料来自哪里、使用什么品种或配方、经过怎样的加工、如何储运，以及在厨房中适合怎样使用。",
        "这套方法既适用于橄榄油、奶酪和面食，也适用于鱼子酱、调味品与未来新品。不同品类的技术指标不同，但透明信息、批次意识和正确保存是共同基础。",
      ],
      sections: [
        ["第一步：识别名称与类别", ["先区分产品通用名称、商品名、等级和风味描述。一个富有吸引力的名称不一定代表法定等级；“传统”“手工”或“天然”等词也需要具体定义和证据。", "阅读时应优先查看标签上的正式名称、配料、净含量、生产者或责任主体，再把宣传语作为辅助信息。"]],
        ["第二步：理解产地与品种", ["产地能够提示气候、农业和地方方法，但不能单独决定品质。品种、成熟度、年份、原料批次和生产者选择，都会让同一地区的产品呈现差异。", "若产品带有受保护的地理标志，应核对标识和适用规范。地理标志说明名称与产地、知识或方法之间的联系，不等于所有产品味道完全相同。"]],
        ["第三步：把加工写清楚", ["机械萃取、研磨、发酵、熟成、干燥、盐渍或巴氏处理会改变产品结构和保存方式。专业内容应解释工艺目的及其对风味、质地和使用的影响。", "不应根据一张图片推断全部生产过程。涉及温度、时间、认证或等级时，应以生产者技术文件、正式标签和适用法规为准。"]],
        ["第四步：保存与运输也是品质的一部分", ["光、热、氧气、湿度和时间会影响许多食材。冷链产品还需要连续的温度管理。消费者应同时阅读未开封与开封后的保存条件，而不是只看保质期日期。", "购买后延续正确保存，才能让产地与工艺带来的特征抵达餐桌。若包装破损、冷链中断或气味异常，应优先考虑安全，而不是勉强使用。"]],
        ["第五步：从风味线索走向实际应用", ["产品说明可以提供香气、质地、酸度、盐度或辛香线索，但搭配仍需考虑菜肴强度、温度和份量。好的建议应解释为什么适合，而不是只列出昂贵食材。", "LuxurEat（露意膳）的内容将知识文章、食谱和产品页面相互连接：文章解释判断框架，食谱示范使用，产品页则承担具体配料、规格、过敏原与储存信息。"]],
      ],
      asideSummary: "以六组可核对信息读懂食材，让产地故事、技术资料、保存要求和厨房应用彼此衔接。",
    },
    "table-etiquette": {
      title: "意大利餐桌礼仪：慢下来，分享风味",
      intro: "餐桌礼仪不是僵硬规则，而是通过节奏、份量、分享和交谈，让食物与共同用餐得到应有的注意。",
      opening: [
        "意大利不同地区、家庭和餐厅的用餐方式并不完全相同，因此不存在一套适用于所有场合的固定程序。更稳定的共同点，是重视用餐节奏、尊重同桌的人，并让每一道食物在合适状态下被品尝。",
        "理解餐桌文化时，可以把正式宴席与家庭日常分开。多道式结构是一种组织风味的方法，但普通家庭并不需要每餐完整复制；分享、从容和适量比形式数量更重要。",
      ],
      sections: [
        ["一道一道，让风味有次序", ["前菜、第一道、第二道、配菜和甜点等次序，可以让温度、质地和强度逐步变化。实际餐次会因地区、场合与家庭习惯缩减或调整。", "在家实践时，可以只保留两三道，并控制单份体量。让热菜及时上桌、冷食保持适宜温度，比追求复杂摆盘更能改善体验。"]],
        ["面包、油与共享方式", ["面包在许多餐桌上用于配合菜肴和酱汁，但具体习惯并不处处相同。橄榄油的使用也应结合地区和菜式，不必把餐厅里看到的一个动作视为全国规则。", "共享食物时，使用公共餐具、留意过敏原并尊重他人份量，是现代餐桌上更重要的礼貌。涉及生食和冷藏产品，还应遵循食品安全与产品说明。"]],
        ["让主角食材保持清晰", ["高品质食材不等于越多越好。橄榄油、奶酪、鱼子酱或香气集中的调味品，需要合适温度和克制份量，让质地与余味能够被辨认。", "如果多种强烈原料同时出现，容易造成盐度、脂肪感和香气拥挤。先确定一道菜的主角，再选择提供酸度、清新感或口感对比的配角。"]],
        ["交谈也是用餐的一部分", ["共同用餐提供的不只是能量，也包括交流、记忆和社群关系。联合国教科文组织对地中海饮食文化的描述，同样强调分享、款待与共同生活，而不只是某一份食物清单。", "放慢速度并不意味着拖延，而是给咀嚼、交谈和菜肴转换留出空间。对家庭来说，减少屏幕干扰、让所有人都能参与，比模仿正式礼仪更有意义。"]],
        ["适合中国家庭的表达", ["中国家庭常以共享菜肴为中心，可以保留这种结构，同时借鉴意大利餐桌对顺序、温度和份量的关注。例如先上清爽小食，再安排主食与热菜，最后以水果或少量甜点收尾。", "跨文化餐桌不需要证明谁更正宗。明确食材来源、尊重同桌需求、照顾过敏与饮食限制，并让每个人舒适参与，就是礼仪真正发挥作用的地方。"]],
      ],
      asideSummary: "从餐次节奏、分享方式、食材份量与共同交流理解意大利餐桌，并转化为适合中国家庭的实践。",
    },
    "cooking-techniques": {
      title: "意大利料理的基础技法",
      intro: "从火候、乳化、烘烤和静置理解基础技法：少依赖堆叠调味，多观察原料在温度与时间中的变化。",
      opening: [
        "意大利料理常给人“简单”的印象，但配料少并不代表技术要求低。当一道菜只有面、番茄、橄榄油或少量奶酪时，水分、盐度、火候和加入顺序的误差会更加明显。",
        "学习基础技法，不是记住所有菜谱，而是建立可迁移的判断：什么时候需要高温上色，什么时候应该小火提取，怎样让水与油形成稳定口感，以及食物离火后为何仍会继续变化。",
      ],
      sections: [
        ["先处理水分", ["蔬菜、番茄、菌菇和肉类的含水量不同。锅中水分过多会降低表面温度，影响上色；水分不足又可能让酱汁过早浓缩。切配大小、锅具容量和分批操作都很重要。", "盐会影响出水和味觉，应根据食材与步骤加入，而不是机械地只在最后调味。含盐奶酪、腌制品或高汤也要计入整体盐度。"]],
        ["高温与低温承担不同任务", ["高温适合快速上色、形成烘烤香气或让披萨饼边迅速膨胀；较低温度和更长时间则适合软化组织、融合汤汁。两者不是优劣关系，而是目标不同。", "家庭灶具和烤箱与专业设备差异很大，不能只照搬时间。更可靠的是同时观察颜色、香气、内部温度或质地，并根据设备调整。"]],
        ["乳化让酱汁与主食连接", ["乳化是让水相与油脂形成细腻分散的过程。意面淀粉水、橄榄油、奶酪或其他脂肪，在适当温度与搅动下可以形成包裹面条的酱汁。", "温度过高可能让奶酪结块或蛋类凝固，液体过多则会稀薄。离火调整、分次加液和持续翻拌，往往比一次加入所有材料更容易控制。"]],
        ["烘烤需要预热与空间", ["披萨、面包和烤蔬菜需要稳定热源。充分预热烤箱与烤盘或烤石，能减少食物进入后温度骤降；食材摆放过密则会积聚蒸汽，削弱表面上色。", "焦斑应带来香气与结构，而不是明显苦味。颜色只是信号之一，还要结合内部熟度、底部状态和食物安全判断。"]],
        ["静置与收尾也是烹饪", ["肉类、烘焙品、面团和某些酱汁在离火后仍会重新分布水分或继续凝固。适当静置能改善切面与口感，但具体时间取决于体积和配方。", "最后加入香草、橄榄油、柑橘皮或奶酪，是为了保留易挥发香气。收尾应少量、逐步品尝，使主料更清晰，而不是掩盖前面的火候工作。"]],
      ],
      asideSummary: "以水分、温度、乳化、烘烤和静置建立可观察、可调整的意大利料理基础，而不是死记时间。",
    },
    "pasta-academy": {
      title: "意大利面：形状、酱汁与火候",
      intro: "从原料与形状出发，理解煮面水、酱汁浓度和锅中收尾如何共同决定一盘意大利面的完整度。",
      opening: [
        "意大利面不是一种固定食物。干面与鲜面、长面与短面、光滑表面与带纹理表面，在含水量、结构和适配酱汁上各不相同。地区传统提供了许多经典组合，但理解原理比机械照搬更重要。",
        "一盘完整的意面，重点不是把煮好的面放在酱汁旁边，而是让面条在最后阶段与液体、脂肪和调味结合。火候、酱汁附着和入口温度需要同时到位。",
      ],
      sections: [
        ["先认识干面与鲜面", ["干意面通常以硬质小麦粗粒粉和水制成，结构适合储存并能保留清晰咬感；鲜面可能含普通小麦粉、硬质小麦粉、鸡蛋或水，配方与地区做法不同。", "不能用“鲜面一定更高级”判断品质。应根据菜式、形状、厚度、酱汁与个人偏好选择，并查看实际产品配料和烹煮说明。"]],
        ["形状为何影响搭配", ["细长面适合与流动或乳化型酱汁缠绕，管状和凹槽面能容纳颗粒与浓稠酱汁，宽面则提供更明显的面体口感。这些是实用线索，不是不可改变的禁令。", "观察酱汁的颗粒大小、黏度与脂肪感，再选择能够承接它的形状，通常比只按菜名购买更容易成功。"]],
        ["煮面水的作用", ["充足沸水有助于面条均匀受热，但锅具大小、面量和是否频繁搅动同样重要。加盐量应结合酱汁中的奶酪、腌制品或其他含盐材料调整。", "煮面水中的淀粉可帮助酱汁乳化和附着。保留一部分、分次加入，比一次倒入大量液体更容易控制最终浓度。"]],
        ["火候不是包装时间的机械答案", ["包装建议时间是有价值的起点，但面条厚度、锅中水量、海拔和后续收汁时间都会改变结果。如果还要在酱汁中加热，应略早捞出并通过品尝判断。", "所谓有咬感，应是中心仍有结构但不生硬，也不应留下明显粉芯。不同面型与个人偏好会有差异，关键是口感均匀。"]],
        ["在锅中完成一盘面", ["将面与酱汁在锅中短暂结合，通过翻拌让水、油脂与淀粉形成连续口感。必要时少量加煮面水，过稀则继续收汁，避免只把浓酱堆在表面。", "奶酪、鸡蛋或易挥发香草常需要降温或离火加入，以避免结块并保留香气。上桌前再检查盐度、酸度、油脂和份量，让面本身仍是主角。"]],
      ],
      asideSummary: "把面型、煮面水、火候与锅中收尾连接起来，建立比固定时间和固定搭配更可靠的意面方法。",
    },
    "pairings-class": {
      eyebrow: "风味搭配课堂",
      title: "风味搭配：从质地到味觉的平衡",
      intro: "真正出色的搭配，不在于堆叠昂贵食材，而在于让香气、质地、酸度、盐度与温度彼此协调，相互成就。",
      opening: [
        "搭配可以从一个简单问题开始：这道菜最需要补充什么？如果主体浓郁而柔软，可能需要酸度或脆感；如果主体清淡细腻，过强的盐度和香气就会遮盖细节。",
        "价格、稀有度和配料数量都不能自动保证协调。先确定主角，再选择能够提供连接、对比或收尾作用的元素，通常会得到更清晰的结果。",
      ],
      sections: [
        ["先看质地", ["柔软、酥脆、黏稠、颗粒感和多汁程度，决定入口节奏。柔软食物可以借助烤面包、坚果或新鲜蔬菜增加对比；干燥食物则可能需要油脂或水分连接。", "质地对比应服务于舒适，而不是制造困难。过硬、过黏或尺寸失衡的搭配，会让香气还未被感受，入口体验就已经中断。"]],
        ["再看酸、甜、咸、苦与鲜", ["酸度可以提亮油脂与甜味，盐度能够增强感知，但两者过量都会压缩其他味道。轻微苦味和辛香可带来长度，甜味则需要考虑成熟度与整体份量。", "调味应逐步进行，并把奶酪、腌制品、酱料和加工食材自带的盐、糖与酸计算在内。最后一次品尝应接近实际上桌温度。"]],
        ["香气强度需要留白", ["橄榄油、香草、咖啡、可可、熟成奶酪和某些调味品都可能具有集中香气。两种强烈元素相遇时，应减少份量或增加中性载体，避免彼此竞争。", "香气清晰不等于越浓越好。好的搭配能让人辨认主要原料，并在咽下后留下干净余韵，而不是只剩一种压倒性的味道。"]],
        ["温度改变我们对味道的感受", ["低温会减慢香气释放，也会改变甜味、脂肪感和质地；热食则可能放大香气与辛香。冷盘、温热菜和意式手工冰淇淋不能使用完全相同的调味逻辑。", "因此应在接近服务温度时完成最后判断。过早调好一份冷甜品或让热菜久置，都可能使最初的平衡在上桌时发生变化。"]],
        ["用份量完成平衡", ["高品质食材适合被准确使用，而不是无限增加。一滴香气鲜明的橄榄油、少量熟成奶酪或一小勺浓缩酱料，有时比堆叠更多配料更有效。", "在家庭或餐厅测试搭配时，可以先做小份并记录变化：减少一种元素、改变温度或更换质地，再比较结果。可重复的观察，比“高级食材一定相配”的想象更可靠。"]],
      ],
      asideSummary: "从质地、基本味、香气、温度和份量五个维度建立搭配方法，让每一种食材都保留清晰位置。",
    },
  };

  for (const [slug, content] of Object.entries(zhCultureLongformArticles)) {
    const id = `zh-academy-${slug}`;
    if (articles[id]) Object.assign(articles[id], content);
  }

  const zhCultureReadingExtensions = {
    "regional-traditions": ["判断传统内容是否可靠", ["可靠的地方饮食内容应说明具体地区、季节与使用场景，并承认同名菜肴可能存在多个家庭版本。若文章只用“意大利人都这样做”概括复杂习惯，却没有交代来源和条件，就需要保持谨慎。", "对产品与食谱而言，传统故事应与当代标签、过敏原和保存要求并列呈现。文化背景能够解释风味为什么形成，却不能替代今天的安全标准与可追溯资料。"]],
    "ingredients-territory": ["第六步：检查证据与更新日期", ["网站、包装和技术资料可能承担不同功能。包装提供法定信息，技术文件补充规格和操作条件，文章则帮助理解背景。三者出现差异时，应优先核对最新正式文件并联系责任主体。", "批次、配方、法规和供应范围可能变化，因此重要结论应带有日期或版本。能够说明资料从何而来、何时更新，以及哪些内容仍待确认，是可信任产品沟通的一部分。"]],
    "table-etiquette": ["面对不同场合保持弹性", ["商务餐、家庭聚会和朋友简餐需要不同程度的正式感。提前了解用餐时间、座位安排、分享方式与饮食限制，可以减少临场压力，也让主人更从容地安排菜肴。", "礼仪的底线不是展示知识，而是不让他人感到被忽视。对不熟悉的食物先询问、对服务人员保持尊重、不过度评论他人的选择，往往比掌握繁复规则更重要。"]],
    "cooking-techniques": ["建立自己的厨房记录", ["同一配方在不同炉具、锅具和室温下会有差异。记录原料重量、实际温度、时间与观察到的状态，可以帮助下一次调整，也能区分偶然成功与可重复方法。", "记录不必复杂：写下起始条件、关键转折和最终结果即可。长期比较后，就能知道自己的烤箱偏热还是偏冷、常用锅具蒸发多快，以及哪种面粉或油品最适合特定做法。"]],
    "pasta-academy": ["份量、保存与重新加热", ["干面份量应结合菜序、酱汁和用餐者需求，不必把一个固定克数当作所有场合的标准。鲜面和含馅面还需考虑水分、鸡蛋或乳制品等配料，并按产品说明冷藏或冷冻。", "刚完成的意面通常最能呈现理想质地。若需要提前准备，可将酱汁与面分别管理，并保留适量液体在上桌前重新结合；反复长时间加热容易让面体过软、酱汁分离。"]],
    "pairings-class": ["搭配还要考虑人和场景", ["同一组合在品鉴会、家庭晚餐和连续多道菜中需要不同强度。前后菜肴、饮品、用餐时间以及个人对盐、酸、甜和苦味的敏感度，都会改变所谓平衡。", "涉及过敏、乳糖不耐受或其他饮食限制时，应先保证信息透明和食用安全，再讨论风味替代。好的替代方案不是模仿原料名称，而是重新补足它原本承担的质地、香气或酸度功能。"]],
  };
  for (const [slug, section] of Object.entries(zhCultureReadingExtensions)) {
    articles[`zh-academy-${slug}`]?.sections.push(section);
  }

  const enCultureReadingExtensions = {
    "italian-food-culture": [
      ["Geography belongs to the recipe", ["Italy's mountains, plains, lakes, long coastlines and islands create very different growing and eating conditions. Alpine dairy traditions, rice from the northern plains, coastal fish, durum wheat in the south and olive cultivation across many regions are useful starting points, but they are not rigid borders.", "The same ingredient may appear in several regions and the same dish may have many household versions. Regional knowledge should help us ask better questions about origin, season and method, rather than reduce a living food culture to a list of stereotypes."]],
      ["Season and preservation shape flavour", ["Before modern refrigeration, drying, salting, fermenting, preserving in oil and slow cooking helped families extend the life of seasonal food. Many flavours now described as traditional developed through practical responses to harvest cycles, transport and storage, not through a single national recipe.", "Modern kitchens can use safer equipment and reliable supply while still respecting maturity, temperature and proportion. Tradition does not require recreating past hardship; it asks us to understand why a method developed and what sensory or practical role it still performs."]],
      ["Why family recipes have no single answer", ["Household recipes are often transmitted through observation: dough is judged by elasticity, sauce by consistency and soup by what the season provides. Portions change with the number of people at the table. Variation between towns and families is therefore evidence that a tradition remains in use, not proof that one version is false.", "A reliable explanation identifies the region, ingredient conditions and decisive steps. It tells readers what can change and what the method is trying to achieve. That is more useful than declaring one formula universally authentic without explaining its context."]],
      ["Bring local knowledge back to the table", ["Learning about territory ultimately improves selection, storage and use. The origin and structure of an oil, flour, cheese or preserved ingredient can suggest whether it suits dressing, baking, slow cooking or a final aromatic finish. Product labels and current technical information remain essential.", "LuxurEat (露意膳) connects cultural background with practical application: verifiable facts first, then sensory and kitchen guidance. Italian food is united less by identical flavours than by attention to ingredients, timing, craft and the social value of sharing a meal."]],
    ],
    "italy-regions": [
      ["The northwest: mountains, plains and ports", ["Valle d'Aosta, Piedmont, Lombardy and Liguria span Alpine valleys, the Po plain and a narrow Mediterranean coast. Dairy products, rice, maize, hazelnuts, wine grapes, seafood and aromatic herbs appear in different combinations. Calling all northern food rich or heavy hides these important contrasts.", "Even within one region, altitude, province and local economy matter. A Piedmontese hill town, a Lombard rice area and the Ligurian coast lead to different ingredients and cooking choices. A regional name should be the beginning of research, not the end."]],
      ["The northeast: borders, lagoons and fertile land", ["Trentino-Alto Adige, Veneto, Friuli-Venezia Giulia and Emilia-Romagna connect mountains, the Adriatic and major agricultural plains. Polenta, rice, fresh pasta, cured foods, cheese and fish reflect both geography and long histories of exchange across political and linguistic borders.", "Neighbouring places may use different fats, pasta shapes and seasoning traditions. It is more accurate to connect a dish to a particular city, valley or household than to assume that one template describes the entire northeast."]],
      ["Central and southern Italy", ["Tuscany, Umbria, Marche and Lazio combine hills, pasture, valleys, coast and powerful urban traditions. Bread, pulses, olive oil, sheep's-milk cheese and handmade pasta vary with local supply. Rome and Florence also show how city markets continually reshape food from their surrounding territories.", "Abruzzo, Molise, Campania, Puglia, Basilicata and Calabria include mountains, long coastlines, volcanic areas and extensive farmland. Durum wheat, vegetables, pulses, tomatoes, dairy products, fish and olive oil form many regional systems. Pizza and dried pasta are famous expressions, but never the whole story."]],
      ["The islands and how to use the map", ["Sicily and Sardinia each have a strong identity, yet they should not be merged into one island cuisine. Sicily reflects layers of Mediterranean exchange alongside citrus, grains and elaborate sweets; Sardinia combines pastoral traditions, cereals and marine resources in its own ways.", "Use the twenty regions as coordinates for further checking. For an actual product, read the label, producer information, geographical-indication rules where relevant and current storage guidance. A regional name can explain context, but it cannot guarantee quality or replace sensory judgement by itself."]],
    ],
    "regional-traditions": [
      ["Season is the first menu", ["Tender spring vegetables, summer tomatoes and fruit, autumn nuts and mushrooms, and winter pulses or slow-cooked dishes connect the table to production cycles. Modern supply is broader, but maturity and season still alter aroma, moisture and the most suitable method of preparation.", "Eating seasonally is not a search for scarcity. It is a way to recognise when an ingredient benefits from simple handling and when preservation, concentration or a balancing ingredient can make better use of it."]],
      ["Preservation leaves a regional accent", ["Drying, salting, fermenting, smoking and preserving in oil originally answered storage and transport needs. Over time they became defining flavours. Because preservation changes moisture, salt, acidity and texture, the ingredient must be used in a proportion that considers those changes.", "Contemporary products still need clear labels, storage instructions and safety controls. A cultural story may explain why a method exists, but it cannot substitute for current product information or responsible handling."]],
      ["Celebrations and oral knowledge", ["Foods repeated at religious holidays, harvests, weddings or reunions carry meaning through the people who prepare them, the moment when they are served and the way they are shared. Moving such a food into everyday life can be thoughtful when its original context is not erased.", "Family cooks often judge sound, smell, touch and appearance rather than a stopwatch alone. Responsible teaching translates that experience into observable signs—dough elasticity, sauce adhesion or surface colour—while explaining how equipment and ingredients may require adjustment."]],
      ["Tradition in a new kitchen", ["Bringing Italian ingredients to a Chinese table does not require copying every condition of one Italian household. The key is to preserve the method's purpose, then adapt side dishes, portions and equipment to local seasons and ways of sharing food.", "A credible account names the place and situation and acknowledges that several family versions may coexist. Tradition should not become a vague marketing badge; it should give readers enough background to distinguish a flexible custom from a product fact that must be verified."]],
    ],
    "ingredients-territory": [
      ["Start with the formal name", ["Separate the generic food name, commercial brand, legal category and sensory description. Words such as traditional, artisan or natural can be meaningful only when their scope is explained. Begin with the official name, ingredient list, net quantity and responsible producer before interpreting promotional language.", "This order prevents an evocative picture or place name from carrying more evidence than it actually contains. A beautiful territory can shape an ingredient, but the finished product is also affected by variety, maturity, processing, batch and storage."]],
      ["Read origin and processing together", ["Origin offers clues about climate, agriculture and local knowledge; it does not make every product from a region taste identical. Where a protected geographical indication is used, check the correct symbol and specification. The scheme links a name to territory and know-how, not to a universal flavour score.", "Extraction, milling, fermentation, maturation, drying, salting and heat treatment can change structure and shelf life. Product education should explain the purpose of the process and its likely effect, while precise temperatures, grades or certifications must come from current labels and technical files."]],
      ["Storage is part of quality", ["Light, heat, oxygen, moisture and time affect foods differently. Chilled products require an uninterrupted temperature chain. Readers should check both unopened and after-opening instructions rather than relying on the date alone, and should stop using a product if packaging or condition suggests a safety problem.", "Correct handling after purchase allows the work of the producer to reach the table. In professional kitchens, batch records and opening dates also make it easier to identify whether a problem arose in supply, storage or service."]],
      ["Move from flavour clues to use", ["A description can suggest aroma, texture, acidity, salinity or pungency, but an application must also consider serving temperature, dish intensity and portion. Good pairing advice explains the role of an ingredient instead of simply listing expensive companions.", "LuxurEat (露意膳) links articles, recipes and product pages for different purposes: articles teach a judgement framework, recipes demonstrate use, and product pages carry current ingredients, allergens, formats and storage facts. When they differ, the latest formal product file takes priority."]],
    ],
    "table-etiquette": [
      ["Courses create rhythm, not obligation", ["Antipasto, first course, second course, side dish and dessert can organise changes in temperature, texture and intensity. Everyday meals often shorten this sequence. At home, two or three well-paced dishes can express the same care without turning dinner into a formal performance.", "Serving hot food promptly and keeping chilled food within safe conditions matter more than elaborate plating. Portions can remain moderate so that each stage is enjoyable and conversation is not interrupted by excess."]],
      ["Sharing and respecting the ingredient", ["Bread and olive oil appear in different ways across Italy; one restaurant habit should not be treated as a national rule. When dishes are shared, common serving utensils, clear allergen information and attention to each guest's portion are practical forms of modern courtesy.", "Concentrated ingredients such as mature cheese, caviar or aromatic oil often benefit from restraint. Establish the main ingredient, then use acidity, freshness or texture as support. Placing several intense, salty or fatty elements together can make every component harder to recognise."]],
      ["Conversation belongs to the meal", ["A shared meal provides more than nutrition. It carries memory, hospitality and community. UNESCO's description of the Mediterranean diet as cultural heritage likewise includes knowledge, hospitality and eating together, rather than presenting only a fixed list of foods.", "Slowing down does not mean prolonging a meal artificially. It means leaving room to taste, speak and move between dishes. Reducing screen distraction and making sure everyone can participate usually matters more than mastering obscure rules."]],
      ["Adapt etiquette to people and place", ["A business lunch, family gathering and casual meal require different levels of formality. Asking about timing, dietary restrictions and sharing arrangements in advance helps hosts plan and allows guests to feel included rather than tested.", "Chinese shared-dish traditions can combine naturally with Italian attention to sequence, temperature and proportion. Good etiquette is not a display of cultural knowledge: it is a way to avoid excluding others, respect service staff and make the table comfortable for everyone."]],
    ],
    "cooking-techniques": [
      ["Manage water before flavour", ["Vegetables, tomatoes, mushrooms and meat release different amounts of moisture. An overcrowded pan lowers surface temperature and limits browning, while excessive evaporation can concentrate a sauce too early. Cut size, pan capacity and cooking in batches are therefore part of seasoning.", "Salt also affects water movement and perception. It should be added according to the ingredient and stage, while salty cheese, cured food or stock must be counted in the total rather than treated as invisible."]],
      ["High and low heat have different jobs", ["High heat can brown a surface, create roasted aromas or expand a pizza rim quickly. Lower heat and more time can soften tissue and integrate a broth or sauce. Neither is inherently superior; the correct choice depends on the result required.", "Home ovens and burners differ greatly from professional equipment, so time alone is not reliable. Colour, aroma, texture and—where food safety requires it—internal temperature should be observed together and adjusted for the actual equipment."]],
      ["Emulsion connects sauce and food", ["Starchy pasta water, olive oil, cheese or stock can form a smooth dispersed sauce when temperature and agitation are controlled. Adding liquid gradually helps the cook watch consistency and stop before the sauce becomes watery.", "Excessive heat can make cheese clump or eggs set; too much liquid weakens adhesion. Finishing off the heat, tossing continuously and reserving some cooking water are practical controls, not decorative gestures."]],
      ["Resting and finishing are still cooking", ["Meat, bread, dough and some sauces continue to change after leaving the heat as moisture and temperature redistribute. A suitable rest can improve texture, but the time depends on size, formula and desired service temperature.", "Herbs, citrus zest, olive oil or cheese are often added late to preserve volatile aroma. A final ingredient should clarify the main food rather than hide earlier work. Recording weights, actual temperatures and visual signs makes the method repeatable in a particular kitchen."]],
    ],
    "pasta-academy": [
      ["Fresh and dried pasta serve different purposes", ["Dried pasta is commonly made from durum-wheat semolina and water, giving it structure and storage stability. Fresh pasta may contain common wheat, durum wheat, egg or water, depending on regional practice. Fresh does not automatically mean better; the dish and sauce determine the useful choice.", "Read the actual ingredient list and cooking instructions, especially for filled pasta or products containing egg. Shape, thickness and moisture all influence timing and the texture achieved at the table."]],
      ["Shape changes how sauce is carried", ["Long strands can wrap around fluid or emulsified sauces; tubes and ridges catch particles and thicker mixtures; broad ribbons give more emphasis to the pasta itself. These are working principles rather than laws that make experimentation impossible.", "Look at particle size, viscosity and richness before choosing a shape. A sauce should connect to the pasta rather than sit as a separate pile, and its intensity should leave the grain flavour and bite perceptible."]],
      ["Cooking water is an ingredient", ["Boiling water must heat pasta evenly, but pot size, quantity and early stirring also matter. Salt should be adjusted for cheese, cured ingredients and the final sauce. A fixed quantity cannot fit every recipe.", "Starch released into the water helps oil and liquid form a sauce that adheres. Reserve some and add it in small amounts; pouring in too much at once makes concentration harder to control."]],
      ["Finish in the pan and taste", ["Package timing is a useful starting point, not a mechanical answer. Thickness, water volume, altitude and time spent in the sauce affect the result. Pasta that will finish in the pan should be removed early enough to retain structure without a raw, floury centre.", "Toss pasta briefly with sauce, adjusting water and heat until the coating is continuous. Cheese, egg or delicate herbs may need lower heat. The finished dish should be served promptly, because repeated or prolonged reheating softens pasta and can split the sauce."]],
    ],
    "pairings-class": [
      ["Begin with texture", ["Softness, crispness, viscosity, juiciness and grain determine the rhythm of a bite. A soft food may benefit from toasted bread or fresh vegetables; a dry food may need moisture or fat to connect it. Contrast should improve comfort rather than create an obstacle.", "Scale also matters. A garnish that is too hard, sticky or large can interrupt eating before aroma is perceived. Test a complete bite, not every component separately."]],
      ["Balance acidity, salt and sweetness", ["Acidity can brighten fat and sweetness, while salt amplifies perception. Too much of either compresses the other tastes. Bitterness and pungency may add length; sweetness must be considered alongside ripeness and the total amount served.", "Season gradually and include salt, sugar and acid already present in cheese, cured food or prepared sauce. Make the final judgement close to the real serving temperature, when the dish will actually be eaten."]],
      ["Leave space around aroma", ["Olive oil, herbs, coffee, cocoa, mature cheese and concentrated condiments can all dominate. When two intense ingredients meet, reduce the portion or introduce a neutral carrier. Clarity is not the same as maximum strength.", "A successful pairing lets the diner recognise the principal ingredient and leaves a clean finish. If only one aggressive aroma remains, the ingredients may be competing rather than supporting one another."]],
      ["Temperature, portion and people", ["Cold reduces aroma release and changes sweetness, fat and texture; heat can magnify aroma and pungency. A chilled dessert and a warm dish therefore need different seasoning. Judge the balance at service temperature and avoid long delays before eating.", "Context changes the ideal intensity: a tasting menu, family dinner and single dish have different needs. Allergies and dietary restrictions come before flavour theory. A useful substitute replaces the original ingredient's function—texture, acidity or aroma—rather than merely copying its name."]],
    ],
  };
  for (const [slug, sections] of Object.entries(enCultureReadingExtensions)) {
    const article = articles[`en-academy-${slug}`];
    if (article) article.sections.push(...sections);
  }

  const enCultureReadingFinishes = {
    "italian-food-culture": ["How to read claims about authenticity", ["Authenticity is most useful when it identifies a place, period, community and method. A statement such as ‘this is the only Italian way’ deserves caution when it does not explain those conditions. Italy's regional and household traditions developed through migration, trade and changing access to ingredients, so continuity and adaptation often exist together.", "For a packaged product, cultural authenticity and product compliance answer different questions. A compelling origin story cannot replace the ingredient list, allergen declaration, storage instructions or responsible operator. Readers should be able to enjoy the story while still checking the current label and technical information.", "When adapting a recipe, preserve the function of its decisive steps. A dough needs enough fermentation to develop structure; an emulsion needs the right relationship between fat and water; a finishing oil needs a moment when its aroma remains perceptible. Local equipment and serving habits can change without erasing that purpose.", "A good cultural article therefore separates documented history, living practice, sensory interpretation and brand-specific facts. This makes room for regional diversity and gives readers practical criteria they can verify in their own kitchen."]],
    "italy-regions": ["From a regional name to a useful choice", ["A region on a map is only the first layer. Province, altitude, distance from the coast, soil, variety, harvest date and producer practice can all change a food. Two oils, cheeses or wines carrying the same broad regional reference may therefore have very different aromas and uses.", "Protected designations can define origin and production requirements for a specific name. They should be read through the official specification and the mark shown on the actual product. They are not a general ranking of every food made in that territory, and they do not remove the need for correct storage and batch control.", "For menu planning, begin with the conditions of the ingredient in front of you. A delicate oil may suit vegetables and final seasoning, while a more assertive one may stand beside pulses or grilled food. A flour's protein and milling information matter more to dough behaviour than a romantic image of its region alone.", "Travellers and home cooks can use regional maps to compare rather than collect stereotypes: note the climate, staple ingredients, common preservation methods and meal structure, then confirm each product through its label. This turns geography into a practical reading tool."]],
    "regional-traditions": ["Documenting a tradition responsibly", ["Oral knowledge is valuable, but it benefits from context. Record who demonstrated a method, where it was used, what season and occasion it belonged to, and which details the cook considered essential. A family memory should not automatically be presented as the rule for an entire region.", "Measurements can support rather than diminish inherited skill. Weighing ingredients, recording temperature and describing texture make a method easier to repeat, especially when it moves to a different flour, oven or climate. The aim is to translate observation, not to replace it with numbers alone.", "Food traditions also change when ingredients become scarce, regulations evolve or families move. Responsible adaptation names the change and explains what function the substitute performs. It does not claim that the new version has always existed, nor does it treat change as proof that the tradition is meaningless.", "For brands and educators, images, dates and quotations should be traceable. Product claims must remain tied to current files, while cultural interpretation should acknowledge multiple versions. This combination protects both the people behind the tradition and the reader making a practical choice. A short source note and review date make later corrections much easier."]],
    "ingredients-territory": ["A six-point check before purchase", ["First identify the product category and responsible operator. Second read the ingredient list and allergen information. Third check origin claims and any protected name. Fourth review the production or quality details that the manufacturer actually documents. Fifth confirm dates, storage and after-opening instructions. Sixth consider whether the format fits the intended use.", "Sensory language becomes more useful after these facts are clear. Fruity, toasted, floral, saline or pungent descriptions are not safety guarantees and may vary by batch, temperature and age. They help anticipate a style, but the opened product must still be judged in the conditions in which it will be served.", "Traceability is also practical after purchase. Keep the lot code when testing a product professionally, record opening dates and avoid decanting without identification. If quality changes unexpectedly, these details help distinguish a production issue from transport, storage or kitchen handling.", "When online copy, an old brochure and the physical label disagree, use the latest authorised product information and ask the responsible company for clarification. A trustworthy supply relationship makes updates visible instead of allowing attractive but obsolete claims to circulate."]],
    "table-etiquette": ["Hospitality includes clear information", ["Modern hospitality begins before the first course. Asking about allergies, intolerances and dietary preferences gives the host time to plan safe alternatives. Guests should receive enough information to decide for themselves; reassurance such as ‘there is only a little’ is not a substitute for knowing the ingredients and cross-contact conditions.", "At the table, serving order can preserve both quality and comfort. Chilled products should not wait unnecessarily at room temperature, and hot dishes should reach guests while their texture is intact. Shared plates need clean utensils and enough space so that portions can be taken without disturbing other food.", "Wine or other alcoholic drinks are optional, not a test of cultural knowledge. Water and non-alcoholic choices should be offered without pressure. Likewise, finishing a large portion is not the only way to show appreciation; attentive tasting and respectful conversation often communicate more.", "The most durable rule is to notice the people present. Explain unfamiliar dishes briefly, avoid correcting someone publicly and adapt the pace when children, older guests or different eating needs are involved. Etiquette succeeds when it supports conviviality rather than drawing attention to itself. Hosts can label shared dishes discreetly so guests do not need to repeat private dietary questions at the table."]],
    "cooking-techniques": ["Test one variable at a time", ["Kitchen improvement is faster when a test changes only one important factor. Compare two fermentation times with the same flour and temperature, or two pan temperatures with the same cut and quantity. If several conditions change together, the result may be memorable but difficult to reproduce.", "Use sensory signs alongside instruments. A thermometer can show internal temperature, while colour, aroma, resistance and moisture show how the food is developing. Neither set of information is sufficient in every situation; together they create a clearer stopping point.", "Carry-over cooking, resting and final seasoning belong to the method. Food continues to change after leaving direct heat, dough relaxes after mixing, and sauces thicken as they cool. Planning these transitions prevents the common mistake of treating the moment the heat stops as the end of the recipe.", "Food safety limits remain separate from preferences about colour or tenderness. Follow current guidance for storage, hygiene and safe cooking, especially with eggs, meat, seafood and chilled preparations. Technique should make flavour repeatable without weakening the controls that keep the food safe. Professional kitchens can connect trials to a batch, operator and equipment setting; at home, a date, photograph and three short notes build the same useful habit. Review the record before the next attempt and change one condition deliberately."]],
    "pasta-academy": ["Choose sauce by behaviour, not prestige", ["A sauce should meet the pasta in a way that can be carried through the bite. Long strands suit sauces that cling in a thin, continuous layer; tubes and ridged shapes can hold thicker or chopped components; filled pasta often needs a restrained dressing that does not hide the filling. These are useful tendencies, not absolute laws.", "The cooking water helps because it contains starch released from the pasta, but more is not automatically better. Add it gradually while tossing and observe whether fat and water form a glossy coating. If the pan is too cool or overloaded, the sauce may remain watery instead of emulsifying.", "Salt should be considered across the whole dish. Cheese, cured ingredients, preserved seafood and prepared sauces may already contribute substantially. Taste near the end before adding more, and remember that reduction concentrates seasoning as water evaporates.", "A successful plate is judged immediately: the pasta retains the intended resistance, the sauce coats rather than pools, and the serving temperature allows aroma to open. Recording shape, brand, cooking time and finishing method makes the next attempt more accurate. When testing a new pasta, keep the first sauce simple so thickness, surface and cooking behaviour remain visible before adding a richer garnish. Compare the result with the package guidance, then keep the timing that works for the actual pan and serving size."]],
    "pairings-class": ["Build a pairing through small trials", ["Start with the principal ingredient alone and describe its intensity, texture and finish. Add one supporting element, taste again, then change only one variable: a little more acidity, a softer texture or a lower serving temperature. This reveals which adjustment actually improves the combination.", "Drinks also alter perception through acidity, sweetness, bitterness, alcohol, carbonation and temperature. A pairing should be judged with the complete bite and sip, not from labels or prestige. Water and neutral foods between trials reduce the carry-over of salt, sugar and fat.", "Write down proportions, not only ingredient names. A successful teaspoon of concentrated condiment does not imply that a tablespoon will be better. Scale, sequence and placement determine whether the diner experiences contrast, continuity or one flavour overwhelming everything else.", "Finally, separate preference from product fact. People vary in sensitivity to bitterness, chilli heat, sweetness and aroma. A useful recommendation explains the intended balance and offers an adjustment, while allergen and dietary information remains precise and non-negotiable. For a group tasting, use the same vessels and comparable temperatures, collect notes before discussion and avoid revealing price first. This will not create an objective ranking, but it reduces obvious bias and explains why one pairing fits a menu better than another. Repeat the strongest combination on another day before treating it as a reliable menu recommendation for guests."]],
  };
  for (const [slug, section] of Object.entries(enCultureReadingFinishes)) {
    articles[`en-academy-${slug}`]?.sections.push(section);
  }
  articles["en-academy-pairings-class"]?.sections.push(["Confirm it in service", ["Repeat the strongest combination on another day and with the intended portion before treating it as a reliable menu recommendation."]]);

  /* Keep the English olive-oil, pizza, gelato and nutrition editions at the
     same editorial depth as their Chinese counterparts. */
  const enTopicReadingExtensions = {
    "olive-oil-basics": ["Use the grade in practice", ["Read the legal name first, then origin, date, storage instructions and the responsible operator. Harvest year and cultivar can add useful context, but neither replaces the required category or the condition of the oil after opening.", "Choose a bottle size that can be finished while its aroma is still clear. Delicate oils work well with seafood, bread and finishing; more assertive bitter and pungent styles can support pulses, grilled vegetables, soups and meat."]],
    "olive-regions": ["Turn a map into a tasting plan", ["Compare oils from different areas in similar formats and from the same harvest period where possible. Record cultivar, producer, opening date, fruitiness, bitterness, pungency and the foods with which each oil feels balanced.", "PDO and PGI names describe compliance with a defined regional specification. They add traceable context, but personal preference and the condition of the individual batch still need to be assessed."]],
    "olive-tasting": ["Make the next tasting comparable", ["Use clean glasses, similar sample temperatures and a neutral-smelling room. Smell first, then take a small sip and note fruitiness, bitterness, pungency, texture, finish and any unwanted stale, musty or vinegary impression.", "Keep light, heat, oxygen and time in the record. An opening date and a short storage note often explain a change more accurately than colour, packaging prestige or price."]],
    "pizza-fundamentals": ["Evaluate the finished pizza", ["A useful result is not defined by a dramatic rim alone. Look at how the base supports the topping, whether the crumb is properly baked, whether moisture has been managed and whether salt, acidity and fat remain balanced through a complete slice.", "Record flour, hydration, dough temperature, fermentation time, portion weight and oven conditions. Changing one variable at a time makes the next bake more informative and easier to reproduce."]],
    "gelato-vs-ice-cream": ["How to judge at the counter", ["Read the product name and ingredient information, then observe serving temperature, surface condition and scooping texture. A well-managed product should be smooth and aromatic rather than relying only on intense sweetness or colour.", "Let a small spoonful melt slowly and note the order of aromas, iciness, airiness and finish. The comparison is not about declaring one format superior, but about understanding the density, sweetness and serving style you prefer."]],
    "gelato-history": ["Professionalism in a modern gelateria", ["A contemporary shop manages ingredient intake, batches, pasteurisation records, equipment cleaning, display temperature and daily turnover. Flavour cards should correspond to current ingredient and allergen information, and staff should know how to answer questions.", "The word artisanal becomes meaningful when visible craft is supported by repeatable process and documentation. Tradition is best protected when modern quality controls allow it to be served consistently."]],
    "ugolini-gelato-mix": ["Updates and commercial boundaries", ["New-product information is updated only after recipe, specification and packaging are confirmed. Subscribing provides release and event news; it does not constitute a preorder or guarantee a final format.", "Professional customers can share expected volume, equipment and application needs, but menu, label and purchasing decisions should wait for final samples, documents, quotations and contracts."]],
    "olive-nutrition": ["Compare fats in context", ["Do not compare fats only through plant or animal labels. Consider fatty-acid composition, portion, cooking use, the whole meal and—most importantly—what the oil replaces. Nutrition panels provide product numbers, while public-health guidance provides the broader dietary frame.", "Olive oil is a food, not a medicine, vitamin supplement or zero-energy seasoning. Using a measured amount for flavour and replacing some sources richer in saturated fat is more useful than simply adding more oil."]],
    "olive-cultivars": ["Build a comparable sample set", ["Choose two single-cultivar oils and one blend from the same harvest period and in similar packaging condition. Taste them with the same vessels and order, then repeat within a week to observe how opening affects their expression.", "Typical aroma descriptions are a starting vocabulary, not a promised result. Record the samples actually in front of you; this is also a practical way to notice batch consistency."]],
    "olive-how-to-choose": ["Checks for online purchases", ["A useful product page shows the full legal name, size, storage information, responsible operator and essential label details rather than only a styled front image. On arrival, compare the physical product with the listing and inspect seals, leakage, dents and signs of heat exposure.", "Transport and warehousing are part of quality. Traceable lots, current documents and a clear after-sales route support a repeat purchase more reliably than unverifiable endorsements."]],
    "olive-storage": ["Service details for restaurants", ["Keep the working bottle away from heat and close it promptly. Fill service vessels only with a realistic quantity for that meal, and never pour exposed leftovers back into the original container where food particles or water may be introduced.", "Connect warehouse, preparation and table-service records to the same lot and opening date. If flavour changes, the team can then distinguish receiving, storage, decanting and service conditions."]],
    "olive-fasting": ["Recognise exaggerated advice", ["Claims of rapid detoxification, cleared arteries, guaranteed weight loss or treatment of constipation need strong evidence, a defined population and a discussion of risks. An ordinary food cannot replace diagnosis or treatment.", "More trustworthy guidance usually discusses portion, substitution, individual differences and uncertainty. It may sound less dramatic, but it is more useful for a sustainable daily diet."]],
    "olive-myths": ["Myth: a country name guarantees everything", ["Italy has important olive-oil traditions, but a national name does not replace the specific origin, producer, lot and storage history. Growing, milling, blending and bottling may occur in different places, so the complete label matters.", "Awards and certifications have a scope and a date. Confirm that they apply to the product being sold, then combine that information with traceability and the sensory condition after opening."]],
    "olive-recipes-guide": ["Review what heat changed", ["Smell the oil before cooking and again in the completed dish. If its character disappears, use less at the beginning and reserve a small amount for finishing; if bitterness or pungency overwhelms the food, reduce the final dose or choose a gentler style.", "A recipe is a repeatable ratio, not an immutable command. Weighing the oil turns ‘as needed’ into a useful range for your pan, portion and particular bottle."]],
    "gelato-flavours": ["Run a four-flavour comparison", ["Choose milk, chocolate, nut and fruit styles and taste small portions in that order. Record colour, first aroma, sweetness, smoothness and finish, drinking water and pausing between samples.", "A focused comparison helps customers understand recipe differences and helps a shop balance its display. A long flavour list is not automatically more professional than clear ingredients, thoughtful rotation and stable batches."]],
    "nutrition-labels": ["Digital pages and the physical label", ["Online listings should provide the information needed to choose, but screenshots can become obsolete after a recipe or pack update. Check the physical product at ordering and delivery, especially ingredients, allergens, size and dates.", "A QR code or digital label can add detail, but it should not obscure information that must appear on the pack. If versions conflict, retain the lot number and ask the responsible operator."]],
    "allergens-guide": ["A document set for professional buyers", ["Restaurants and food businesses should retain the current specification, ingredient and allergen statement, change notifications and supplier contact. Menus and staff training must follow the current version rather than an older recipe.", "Changes of ingredient, factory or shared production line can alter risk. Periodic review is more reliable than treating one historical declaration as permanent."]],
    "clean-label": ["Questions consumers can ask", ["When a pack says ‘no additives’, ask which substance is absent, whether it is normally used in comparable products, how stability is achieved and where the claim can be checked in ingredients or documentation.", "If the actual goal is to reduce sugar, sodium or a specific ingredient, read those values directly. A broad clean-label message does not automatically satisfy a particular dietary need."]],
    "nutrition-myths": ["A publication check for writers and brands", ["Before publishing, ask whether the headline overstates the body, a relative risk has become an absolute one, a narrow study population has been generalised, or a product claim lacks current label or document support.", "Articles should be revised when regulations, recipes or evidence change. Trust does not require pretending that content is timeless; it requires showing the basis, version and corrections clearly."]],
  };
  for (const [slug, section] of Object.entries(enTopicReadingExtensions)) {
    articles[`en-academy-${slug}`]?.sections.push(section);
  }

  const enTopicReadingFinishes = {
    "olive-storage": ["Once the oil leaves the bottle", ["Use oil placed in a dish or seasoning bowl promptly, and do not keep leftovers that have contacted water, salt or food. Clean handling, darkness and limited air exposure should continue through the final serving."]],
    "olive-fasting": ["Conclusion", ["Taking olive oil before breakfast can be a personal habit, but it is not a measure of the oil's value. A steadier approach is to distribute a reasonable amount through varied meals and adjust it to energy needs and individual response."]],
    "olive-myths": ["Myth: cloudiness always means more natural", ["Unfiltered oil may retain tiny amounts of water and olive solids, but these can also affect storage stability. Filtered oil can still be mechanically extracted extra virgin olive oil; filtration is a production choice, not a simple divide between natural and industrial.", "Sediment, flakes and cold crystallisation require context and are not reliable authenticity tests. Stop using a product with an abnormal smell, swollen pack or uncertain source and contact the responsible operator."]],
    "olive-recipes-guide": ["Substitution and allergen notes", ["Replacing butter with olive oil changes dairy flavour, water balance and texture and is not always a one-to-one swap, especially in baking. If a recipe also contains cheese, nuts, fish or gluten-containing bread, list those allergens separately."]],
    "gelato-flavours": ["Colour and naming", ["A flavour name should match its ingredients and applicable labelling rules. Colour may come from the principal ingredient or an authorised colouring, so consumers should confirm it through information provided rather than assuming that muted colour always means natural."]],
    "allergens-guide": ["Do not test safety through substitutes", ["A replacement ingredient may itself be an allergen, and its production environment may differ. A person with an allergy should never infer safety from words such as plant-based or dairy-free without checking the complete label, cross-contact statement and personal medical plan."]],
    "nutrition-myths": ["Ask one more question about social posts", ["Short videos often omit dose, control groups and eligibility criteria. Trace surprising conclusions to their original source and date, and check whether the evidence is only correlation, an animal study or a brand survey before changing a diet or medical plan."]],
  };
  for (const [slug, section] of Object.entries(enTopicReadingFinishes)) {
    articles[`en-academy-${slug}`]?.sections.push(section);
  }

  const zhReadingExtensions = {
    "gelato-vs-ice-cream": ["在柜台前如何判断", ["先看产品名称和配料，再观察展示温度、表面状态与挖取质地。成品应细腻、香气明确，不应仅靠过强甜味或色泽吸引注意。若产品已经明显融化、塌陷或反复结霜，温度管理可能需要关注。", "品尝时让一小口在舌面缓慢融化，记录香气出现顺序、冰晶感、空气感和余味。比较两类产品的意义不是决出绝对胜负，而是找到自己偏好的密度、甜度和服务方式。"]],
    "gelato-history": ["一间现代门店的专业性", ["门店除了展示口味，还要管理原料验收、批次、巴氏处理记录、设备清洁、展示温度与当天周转。口味牌应能对应配料和过敏原信息，员工也要知道如何回答消费者问题。", "当“手工”能够被流程和记录支持，它才不只是视觉印象。LuxurEat（露意膳）关注的正是文化与执行之间的连接：让传统风味通过现代质量管理被稳定呈现。"]],
    "ugolini-gelato-mix": ["订阅与沟通边界", ["新品信息会在配方和包装最终确认后更新，订阅只用于接收正式发布、活动与产品动态，不代表预售或锁定某项规格。专业客户提出需求时，可说明预计产量、设备和应用场景，便于后续资料匹配。", "在产品正式上线前，不建议根据本文安排菜单、标签或采购预算。任何商业决策都应基于最终报价、合同、样品测试和适用文件。"]],
    "olive-nutrition": ["如何比较不同油脂", ["比较时不要只看“植物”或“动物”名称，也要看脂肪酸组成、使用量、烹饪场景和整餐结构。营养标签提供基础数字，卫生机构的膳食建议提供整体方向，两者不能由单一广告语替代。", "橄榄油不是维生素、药品或零能量调料。把它作为食材使用，尊重香气并控制份量，反而更能体现其营养与餐桌价值。"]],
    "olive-cultivars": ["保存一套可比较样品", ["若想系统学习，可选择同一采收季、相近包装状态的两款单一品种油与一款调和油。用相同杯具、温度和顺序品鉴，并在一周内重复一次，观察开瓶后的变化。", "标签或课程中的典型香气只是起点。最终记录应以自己面前的样品为准，这也能帮助识别批次稳定性，而不是机械背诵品种词典。"]],
    "olive-how-to-choose": ["线上购买还要核对这些", ["查看商品页是否展示完整中文标签、规格、储存与责任主体，而不是只有正面效果图。收到产品后核对实物与页面是否一致，并观察包装是否渗漏、凹损或经历异常高温。", "对于进口食品，运输和仓储是品质链的一部分。可追溯的批次与清楚售后，比无法核实的“庄园同款”“大师推荐”等描述更能支持长期选择。"]],
    "olive-storage": ["餐饮端的现场细节", ["后厨应把日常用油放在远离热源且便于盖紧的位置，服务壶只补充当餐合理用量。收餐后不要把敞口剩油直接倒回原包装，以免带入食物残渣和水分。", "仓库、备餐区与餐桌服务应使用同一批次记录。这样即使发现风味异常，也能快速追溯到入库、开封、分装或环境环节。"]],
    "olive-fasting": ["如何识别夸大内容", ["如果一段内容承诺短期排毒、清除血管、治疗便秘或无需调整其他饮食就减重，应先检查是否提供可靠研究、适用人群和风险说明。普通食材的营养作用不能替代诊疗。", "更可信的建议通常语气克制，会讨论份量、替代、个人差异和不确定性。它可能没有戏剧性，却更接近日常可执行的健康选择。"]],
    "olive-myths": ["误区五：一个产地自动保证一切", ["意大利拥有重要橄榄油传统，但国家名称并不能替代具体产区、生产者、批次和储存。橄榄种植地、压榨地、调和与装瓶地可能不同，应按标签准确阅读。", "奖项和认证可以提供额外信息，也有各自范围与年份。消费者仍应确认获奖对象是否为当前产品与批次，认证标识是否真实适用，并结合开瓶后的感官表现。"]],
    "olive-recipes-guide": ["加热之后如何复盘", ["同一道菜可分别记录烹饪前后香气：若起锅时几乎闻不到油品特征，可以减少前段用量，并把一小部分留到完成菜；若苦辣压过食材，则换用更柔和风格或减少最后淋油。", "菜谱不是固定命令，而是一套可以重复验证的比例。通过称量与记录，把“适量”转化为适合自己锅具、份数和油品的范围。"]],
    "gelato-flavours": ["做一场四口味比较", ["选择牛奶、巧克力、坚果和水果四类，每次只取少量，从颜色、第一香气、甜度、细腻度到余味依次记录。中间饮水并稍作停顿，避免前一款的糖和脂肪持续影响判断。", "比较能够帮助消费者理解配方差异，也能帮助门店调整菜单层次。口味数量并非越多越专业，原料清楚、轮换有节奏和批次稳定更重要。"]],
    "nutrition-labels": ["数字标签与线上页面", ["线上销售页面应提供消费者作出选择所需的关键信息，但网页截图可能在产品更新后过期。下单和收货时仍要核对实际包装，尤其是配方、过敏原、规格和日期。", "二维码或数字标签可以承载更详细资料，却不应遮挡或取代依法必须出现在包装上的信息。无法确认版本时，保留批次并向责任主体查询。"]],
    "allergens-guide": ["给专业采购的文件清单", ["餐厅和食品企业采购时，应保存规格书、配料和过敏原声明、生产变更通知与联系人。菜单或培训材料要与当前版本同步，不能沿用旧配方结论。", "供应方发生原料、工厂或共线生产变化时，风险评估也可能变化。定期复核比一次性索取“无过敏原证明”更可靠。"]],
    "clean-label": ["消费者可以如何提问", ["看到无添加声明时，可以询问具体未添加的对象、同类产品是否通常使用、产品通过什么方式保持稳定，以及信息能否在配料和文件中核对。清楚回答比模糊的天然故事更有价值。", "如果个人目标是减少糖、钠或特定成分，应直接查看营养和配料，而不是假设“无添加”自动满足这些目标。"]],
    "nutrition-myths": ["写作者与品牌的自检", ["发布前应检查标题是否夸大正文、相对风险是否被写成绝对风险、研究对象是否被偷换成所有人，以及产品事实是否有标签或文件支持。必要时明确写出“不确定”或“以最终资料为准”。", "更新法规、配方或证据后，旧文章也应修订。可信任不是永不出错，而是能说明依据、版本和修正过程。"]],
  };
  for (const [slug, section] of Object.entries(zhReadingExtensions)) {
    const article = articles[`zh-academy-${slug}`];
    if (article) article.sections.push(section);
  }
  const zhReadingFinishes = {
    "olive-storage": ["离开包装后的原则", ["倒入盘中或调味碗后的油应按菜肴需要及时使用，不把已经接触水分、盐或食物的剩余油长期保存。把清洁、避光和减少空气接触贯穿到最后一次使用，才能真正延续生产端的品质管理。"]],
    "olive-fasting": ["结论", ["是否空腹饮用可以是个人习惯，却不是衡量橄榄油价值的标准。更稳妥的长期做法，是把合理份量分散到多样餐食中，并根据体重、活动量与身体反应调整。"]],
    "olive-myths": ["误区六：浑浊一定更天然", ["未过滤油可能保留微量水分和果肉颗粒，外观更浑浊，但这些物质也可能影响保存稳定。过滤油同样可以是机械取得的特级初榨产品。是否过滤是生产选择，不是天然与工业的简单分界。", "同样地，沉淀、絮状物或低温结晶都需要结合产品说明和储存判断，不能直接作为真假测试。对异常气味、包装膨胀或来源不明的产品，应停止食用并向责任主体核实。"]],
    "olive-recipes-guide": ["替代与过敏提示", ["用橄榄油替代黄油会改变乳香、含水和质地，并不总能一比一替换；烘焙配方尤其需要重新测试。若菜谱同时使用乳酪、坚果、鱼类或含麸质面包，应单独列出相关过敏原，不能因橄榄油本身不含这些成分而省略。"]],
    "gelato-flavours": ["关于颜色和命名", ["口味名应与实际配料和适用标示一致。颜色可以来自原料本身或依法使用的着色成分，消费者应通过标签确认，而不是用“越自然越灰暗”之类经验法判断。门店展示也应避免让装饰物暗示并未使用的主要原料。"]],
    "allergens-guide": ["不要用替代品自行试探", ["对某种坚果、乳或谷物过敏的人，不能仅因产品使用替代原料就推断安全；替代品本身也可能是致敏物，且生产环境可能不同。任何试吃都应建立在标签确认和个人医疗方案之上。"]],
    "nutrition-myths": ["对社交媒体内容多问一句", ["短视频和海报常省略剂量、对照组与适用条件。遇到惊人结论时，先寻找原始来源与发布日期，确认是否只是相关性、动物实验或品牌自有调查。无法核实时，不把它用于医疗或大幅改变饮食。"]],
  };
  for (const [slug, section] of Object.entries(zhReadingFinishes)) {
    const article = articles[`zh-academy-${slug}`];
    if (article) article.sections.push(section);
  }

  /* English academy copy stays structurally aligned with the Chinese long-form source. */
  const enSyncedTopicArticles = {
    "olive-oil-basics": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive Oil Academy",
      "title": "What is extra virgin olive oil?",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Foundations",
      "intro": "From legal grade, mechanical processing, sensory evaluation to daily use, establish a complete basis for judging extra virgin olive oil.",
      "opening": [
        "Extra virgin olive oil is first of all a grade subject to standards, rather than generally referring to olive oil that is golden in colour, beautifully packaged or has a higher price. It comes from olive fruits, is obtained only through mechanical or other physical means, and must meet both physical and chemical indicators and sensory requirements. Current EU rules judge physical and chemical analysis, fruitiness and the presence of sensory defects together, so just looking at the acidity number is not enough to confirm quality.",
        "For the consumer, understanding this grade is not about reciting a set of laboratory parameters, but rather knowing how fruit condition, processing speed, temperature management, hygiene and storage combine to affect a bottle of oil. The brand story can help to understand the origin, but ultimately it still comes back to the label, batch documentation and true sensory performance after opening the bottle."
      ],
      "sections": [
        [
          "From olive fruit to oil",
          [
            "Olives continue to undergo biochemical changes after harvest. If the fruit is injured, stacked for too long or the temperature is too high, fermentation and oxidation may be accelerated, resulting in a musty, winey-vinegary or rancid aroma. Therefore, fruits with appropriate maturity, transportation and processing as soon as possible are important prerequisites for maintaining fresh flavour.",
            "Modern production often includes cleaning, washing, crushing, mixing and centrifugation. The so-called cold extraction does not freeze the fruit, but controls the temperature during processing to reduce aroma loss and unnecessary oxidation. Whether it is filtered or not will affect appearance and storage management, but turbidity itself does not mean more natural, nor does it automatically mean higher quality."
          ]
        ],
        [
          "Level requires two types of evidence",
          [
            "Physical and chemical analysis can observe free fatty acids, peroxide value and other composition indicators, while sensory evaluation involves trained judges to identify fruity aroma, bitterness, pungency and defects. High-quality extra virgin olive oil should have a perceptible fruity aroma and no sensory defects as specified. Acidity is a laboratory indicator and cannot be directly tasted by the tongue, nor can it alone indicate the full freshness.",
            "Bitterness and throat pungency are often associated with the phenolics in fresh olives and can be normal and positive characteristics, but intensity is not always better. Variety, maturity and dish needs are different. What really deserves attention is whether the aroma is clear, whether the palate is balanced, and whether the aftertaste is clean."
          ]
        ],
        [
          "What labels can tell you",
          [
            "First confirm the legal product name on the front, and then check the origin information, net content, date, storage requirements, manufacturer or importer. Harvest year, olive variety and estate information can increase the basis for judgment, but not all markets are mandatory to label. If the package simply says \"olive oil,\" its category may be different from extra virgin, and you should read on for the full name.",
            "Dark glass, metal cans, or light-blocking packaging can help reduce sunlight, but packaging is not a substitute for proper storage and transportation. Check the seal, label and batch upon arrival, smell the fragrance after opening the bottle and record the usage time. Any health or quality claims should be consistent with product documentation and applicable regulations."
          ]
        ],
        [
          "Use oil in the right place",
          [
            "The fresh and delicate oil is suitable for raw food, bread, seafood, salads and garnishing after cooking; the fruity, bitter and spicy oil can be used with beans, roasted vegetables, meat, soup and pasta. Cooking changes the aroma levels, so it’s not necessary to use the same bottle of oil for all steps.",
            "LuxurEat (露意膳) pays more attention to certificate of origin, variety, harvest and processing information, storage and batch stability when selecting products. For home users, the most effective judgment is still simple: buy the appropriate capacity, store it in a sealed container away from light, and use it up while the flavour is still vivid."
          ]
        ]
      ],
      "asideSummary": "Extra virgin is a set of grades composed of raw materials, mechanical processing, physical and chemical indicators and sensory evaluation; the label is as important as the actual flavour after opening the bottle."
    },
    "olive-regions": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive Oil Academy",
      "title": "From Region to Flavour: Italy's Olive-Oil Landscapes",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Origins & Cultivars",
      "intro": "Starting from the climate, topography and local varieties, understand why there is no unified \"standard taste\" for Italian olive oil.",
      "opening": [
        "Italy spans a large area from north to south, with lakes, hills, coastal plains and islands offering different temperatures, rainfall, soils and winds. Coupled with the numerous local olive varieties, the extra virgin olive oil will also present a variety of styles from soft almond and fresh grass to tomato leaf, artichoke and obvious spice.",
        "Origin is not a quick label for taste. Neighboring estates may perform differently due to variety ratios, harvest time, fruit health and processing choices; the same estate may also vary from vintage to vintage. The point of learning regional differences is to establish a broader flavour coordinate, rather than to replace actual tasting with a few place names."
      ],
      "sections": [
        [
          "Delicate expression of the North and Lake District",
          [
            "The areas where olives can be grown in northern Italy are often tempered by lakes. The oils here are often described as fresh, delicate, and mildly bitter, but this is just a common tendency and not a fixed answer for all northern oils. The light aroma is ideal for observing subtle nuances in fish, white meats, steamed vegetables and bean purée.",
            "When purchasing, you still need to look at the specific varieties, protected origin labels and producer information. The production in the Lake District is relatively limited, and vintage differences and storage are particularly worthy of attention; mildness should not be misunderstood as having no fruity aroma or being oxidized."
          ]
        ],
        [
          "The green skeleton of the central hills",
          [
            "Tuscany, Umbria and the surrounding hills are often associated with grass, leaves, artichokes, green almonds and other associations, along with clear bitterness and pungency in the throat. Early harvesting often helps to create a distinctive green style, but it may also reduce the oil yield, putting higher requirements on producers’ harvesting and processing management.",
            "This type of oil can be used on white beans, toast, soups, roasts, and root vegetables. When pairing, we do not pursue the oily flavour to overwhelm the food, but use the bitter and spicy structure to connect the sweetness of starch, protein and vegetables."
          ]
        ],
        [
          "Diversity of the South and Islands",
          [
            "Regions such as Puglia, Calabria, Sicily and Sardinia are not just strong in one style. Local varieties, altitude and harvest ripeness can bring about tomato, vanilla, nutty, ripe fruit or more intense spice. Large-scale plantings coexist with small estates, and it is even more necessary to identify specific sources through origin and batch information.",
            "Full-bodied oils are great for tomatoes, beans, roasted vegetables, stews and more structured fish dishes; fresher island oils also work well in raw foods. The choice of dishes should be based on actual tasting, not just on the geographical location of the north or south."
          ]
        ],
        [
          "How to use region information for selection",
          [
            "Determine the use first, and then compare similar oils: raw food needs clear aroma, cooking needs stable structure, and gifts need to pay attention to traceability documents and packaging protection. If the label contains geographical indications such as PDO and PGI, it indicates that the product follows the specifications of the corresponding production area, but it cannot replace personal taste judgment.",
            "It is recommended to create a tasting record in a small capacity and write down the opening date, aroma, bitterness and spicy intensity and suitable dishes. When LuxurEat (露意膳) introduces the production area, it will explain the place name, variety, year and production method together to avoid writing regional stories into unverifiable quality guarantees."
          ]
        ]
      ],
      "asideSummary": "Region provides context for flavour, and variety, vintage, harvest and processing determine final expression; place names should be read alongside batch information and actual tastings."
    },
    "olive-tasting": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive Oil Academy",
      "title": "How to Taste, Store and Use Olive Oil",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Tasting & Everyday Use",
      "intro": "Taste olive oil with repeatable methods of smelling, tasting and recording, and integrating preservation and cooking into the same set of judgments.",
      "opening": [
        "The purpose of olive oil tasting is not to perform technical terms, but to separately record the feelings after smelling, tasting and using it. Professional sensory evaluation has strict cup, temperature and review processes; although home and catering scenes are not equivalent to official classification, preconceptions caused by packaging, colour and price can be reduced through unified steps.",
        "Colour is not a determining factor in the grade of extra virgin olive oil. Chlorophyll, carotenoids, variety and ripeness all affect colour, so professional tastings often use colored cups to block the colour. There is no need to pursue equipment during ordinary tasting. What is important is that the cup is clean, the environment has no strong smell, and different samples are placed in similar conditions."
      ],
      "sections": [
        [
          "Step one: smell the fragrance",
          [
            "Pour in a small amount of oil, gently wrap the bottom of the cup with your palms, let the oil temperature slowly approach body temperature, and then cover the mouth of the cup for a short time to gather fragrance. First note whether the aroma is clear, then describe the associations that come to mind with grass, tomato leaves, vanilla, apples, almonds or ripe fruit. The description is a sensory association and does not mean that these ingredients are actually added to the oil.",
            "If there is obvious odor, mildew, vinegar or rancid aroma, you should remain cautious. A single scent may be affected by the cup and environment, and can be reviewed after a break; the official grade still needs to be judged by a qualified laboratory and a trained sensory panel."
          ]
        ],
        [
          "Step Two: Entrance and Aftertaste",
          [
            "Hold the oil in a small mouth to cover your mouth, and then gently inhale a small amount of air to help the aroma ascend. Note whether the fruity aroma persists, where the bitterness appears, whether the texture is light or rounded, as well as the pungency in the throat after swallowing and the length of the aftertaste. Bitterness and pungency can be positive characteristics, the key is whether it is clean and harmonious.",
            "When tasting multiple products in a row, clean your mouth with water and mild-smelling food, and control the number of samples. Do not dip the bread into the first round of judgment, because the aroma, salt and texture of the bread itself will change the feeling; complete the individual tasting before entering into the pairing test."
          ]
        ],
        [
          "Step 3: Create usage records",
          [
            "Try using the same oil sparingly on tomatoes, leafy greens, beans, toast, fish and soups. Note whether it enhances the ingredient, provides a bitter-spicy texture, or masks the original flavour. The catering team can translate the results into recommendations for cold dishes, cooking and garnishing.",
            "There is no need to have as many tasting words as possible. Using several fixed dimensions of aroma, strength, balance, imperfections, aftertaste and adaptability to dishes makes it easier to compare between different batches and avoid mistaking personal preferences into absolute quality conclusions."
          ]
        ],
        [
          "Save to decide next tasting",
          [
            "Light, heat, oxygen, and time continue to change oil properties. Seal the bottle and keep it away from stoves, windows and places with large temperature fluctuations; do not store it in open oil bottles or transparent containers for a long time. When purchasing large packages, you should evaluate the actual consumption rate and use clean, light-proof and sealed containers for dispensing.",
            "The date of opening is more reliable than memory. If the aroma gradually flattens out and develops a crayon or old nut smell, it means that the sensory state has changed, even if it is still within the labelled expiration date. Product safety and shelf life are determined by the label, and the best flavour period needs to be determined based on opening and storage conditions."
          ]
        ]
      ],
      "asideSummary": "Only by smelling the aroma first, then eating it, and then pairing it, and recording the opening date and storage conditions, can tasting truly serve purchasing and cooking."
    },
    "gelato-vs-ice-cream": {
      "topicLabel": "Italian Gelato Academy",
      "column": "Italian Gelato Academy",
      "eyebrow": "Italian Gelato Academy",
      "title": "Italian Gelato vs Ice Cream: From Definition to Texture",
      "meta": "Italian gelato academy · 2026",
      "archive": "Foundations",
      "intro": "Understand the common differences between Italian gelato and regular ice cream from recipe, air, freezing, serving temperature and store culture.",
      "opening": [
        "Italian gelato and ordinary ice cream are both frozen desserts, but the common recipe goals and serving methods behind the two names are different. Italian gelato generally pursues a tighter, smoother and more direct flavour expression, while regular ice cream covers a wider range of regulatory categories, fat content, air volume and hardening storage methods.",
        "These differences are not absolute boundaries for global unity. Different countries have their own product standards for regular ice cream, and \"Italian gelato\" will vary depending on the store, recipe, equipment and regional traditions. Reliable comparisons should describe specific samples and processes and avoid generalizing all products with one fat number or the phrase \"less air.\""
      ],
      "sections": [
        [
          "Formulated to serve target texture",
          [
            "Milk, cream, sugar, eggs, nuts, fruit, cocoa and other solids can affect freezing point, viscosity, ice crystals and flavour. Italian gelato can be milk-based or fruit- and water-based sorbet; ordinary ice cream also has rich recipes and cannot be distinguished solely by whether it contains milk or not.",
            "Sugar not only provides sweetness, but also participates in controlling the freezing state; fat can carry aroma and change the lubrication; milk protein and other solids affect the structure. When a certain ingredient is reduced, the formula needs to be recalculated as a whole and cannot simply be deleted in equal amounts."
          ]
        ],
        [
          "The amount of air changes the feel",
          [
            "The air introduced during chilled blending increases volume, forms air bubbles and affects firmness, melting and aroma intensity. Italian gelato often has a tighter texture with lower air volume, but the actual value depends on the equipment and recipe.",
            "Less air is not better. Too little may make the finished product too heavy or difficult to scoop, too much may appear loose and weaken the flavour. Judgment should come back to finesse, stability, melting rhythm and true raw material expression."
          ]
        ],
        [
          "Temperature changes aroma and softness",
          [
            "Lower temperatures allow more water to freeze, resulting in a harder finished product and a slower release of aroma. Italian gelato is often served fresh in stores in a relatively soft state, so the taste and aroma appear immediate; regular ice cream often undergoes more complete hardening and is adapted to packaging, transportation, and home freezing.",
            "Serving temperature cannot be separated from food safety and recipe stability. Display cabinets, storage cabinets and transportation cold chains perform different tasks, and stores need to be calibrated according to product documents and equipment, rather than heating up at will for the sake of softness."
          ]
        ],
        [
          "Choose facts, not labels",
          [
            "Read the ingredients, allergens, net content, storage and production information, and observe whether the colour is natural, the texture is delicate, and the flavour is clear. Bright colours or huge piles are not proof of quality, and repeated freezing after excessive melting can also damage the ice crystal structure.",
            "LuxurEat (露意膳) regards Italian gelato as a set of raw materials, recipes and service systems, not simply as an advanced version of ordinary ice cream. The real difference needs to be seen in the density, aroma, temperature and clarity of preparation in the bite."
          ]
        ],
        [
          "How to judge at the counter",
          [
            "Look at the product name and ingredients first, then observe the display temperature, surface condition and scooping texture. The finished product should be delicate and aromatic, and should not attract attention solely by overpowering sweetness or colour. If the product has significantly melted, collapsed, or repeatedly frosted, temperature management may require attention.",
            "When tasting, let a small mouthful melt slowly on the tongue, and record the order of aroma appearance, ice crystal feeling, air feeling and aftertaste. The point of comparing the two types of products is not to determine the absolute winner, but to find your preferred density, sweetness and serving method."
          ]
        ]
      ],
      "asideSummary": "There is no universal demarcation between the two categories of frozen desserts; recipes, air volumes, temperatures and serving methods all shape common differences."
    },
    "gelato-history": {
      "topicLabel": "Italian Gelato Academy",
      "column": "Italian Gelato Academy",
      "eyebrow": "Italian Gelato Academy",
      "title": "Italian Gelato: From Urban Tradition to Modern Craft",
      "meta": "Italian gelato academy · 2026",
      "archive": "History & Craft",
      "intro": "From Italian frozen dessert traditions to urban stores to modern equipment, understand how Italian gelato has become an everyday culture and a professional craft.",
      "opening": [
        "The history of frozen desserts was not invented suddenly by one day or one person. Ice preservation, syrup, dairy and refrigeration techniques evolved over time across Europe and the wider region, with the palace kitchens, cafes and artisanal shops of Italian cities gradually developing the frozen dessert culture we are familiar with today.",
        "Modern Italian gelato inherits both local flavour and food science and equipment. Pasteurization, maturation, dynamic freezing, hardening or display, cleaning and disinfection and the cold chain all determine whether the product is safe, delicate and stable. Tradition and technology are not opposites. Reliable technology allows the expression of raw materials to be repeated."
      ],
      "sections": [
        [
          "From scarce ice and snow to mechanical refrigeration",
          [
            "Early frozen desserts were limited by seasonal ice, snow and ice storage conditions, and their production and consumption were not popular. The use of sugar, salt and ice helped lower temperatures, but it was mechanical refrigeration, sanitation controls and repeatable freezing equipment that really changed the scale of the industry.",
            "When production no longer relies entirely on natural ice, stores can produce and display more stably, and recipes can be finely tuned for ice crystals, air and melting. Today's understanding of \"handmade\" should include professional control of temperature and process."
          ]
        ],
        [
          "Daily rituals in the city",
          [
            "Gelato shops in Italy are connected to streets, piazzas, evening walks and family gatherings. Consumers select flavours, cups or cones at the counter and enjoy them in short order, and this rhythm of service shapes softness, presentation and flavour rotation.",
            "Local culture also enters the taste: Sicilian citrus and nuts, northern dairy products and mountain flavours, and regional coffee and chocolate traditions can all serve as inspiration. But the specific products still depend on seasonal ingredients and store recipes."
          ]
        ],
        [
          "Key nodes of modern technology",
          [
            "Milk-based formulas usually undergo mixing, heating treatment, cooling and maturation, and dynamic freezing; the process and formula focus of fruit sorbets are different. Each step affects the balance between water, fat, protein, sugar and solids.",
            "Temperature fluctuations can promote larger ice crystals and reduce fineness, so they need to be stable from production to display and shipping. Equipment cannot compensate for an imbalanced recipe, nor can the recipe compensate for lack of hygiene and cold chain."
          ]
        ],
        [
          "How tradition comes to the Chinese dining table",
          [
            "Cross-market expression must first translate the name, taste, ingredients and allergens clearly, and then consider sweetness, portion size and consumption scenarios. Respecting Chinese consumers does not mean changing the process at will, nor does it mean fixing Italian taste into a few symbols.",
            "LuxurEat (露意膳) will start from the origin of raw materials, basic formulas, operating suggestions and professional supply, so that customers in households, stores and food industries can understand the reasons for each choice. History provides cultural coordinates, and the final experience is still completed with real raw materials and stable production."
          ]
        ],
        [
          "The professionalism of a modern store",
          [
            "In addition to displaying flavours, stores also need to manage raw material acceptance, batching, pasteurization records, equipment cleaning, display temperature and same-day turnover. Flavour labels should map ingredients and allergen information, and employees should know how to answer consumer questions.",
            "When \"handwork\" can be supported by processes and records, it becomes more than just a visual impression. LuxurEat (露意膳) focuses on the connection between culture and execution: allowing traditional flavours to be stably presented through modern quality management."
          ]
        ]
      ],
      "asideSummary": "Italian gelato has moved from the tradition of frozen desserts to modern stores. Refrigeration, hygiene, recipes and urban life have jointly shaped what it is today."
    },
    "ugolini-gelato-mix": {
      "topicLabel": "Italian Gelato",
      "column": "Italian Gelato",
      "eyebrow": "New Product Preview",
      "title": "Coming Soon: LuxurEat (露意膳) Italian Gelato Base Mix",
      "meta": "Italian gelato · Coming soon",
      "archive": "New Product Preview",
      "intro": "LuxurEat (露意膳)'s new Italian gelato powder base series will be launched soon, providing more flexible and convenient gelato making options for households, shops and food industry customers. For specific flavours, specifications and listing information, please refer to the final product information.",
      "opening": [
        "This is a preview of a new product, not a completed specification or performance promise. What can currently be confirmed is the product direction and service targets; information such as taste, formula, packaging, recommended dosage, nutrition and allergens must wait for research and development, compliance review and final product documents before release.",
        "The value of a powder base is not to replace all professional judgment, but to transform some of the solids, sweetness system and structural requirements into a more easily executed starting point. Equipment, batch sizes, serving temperatures and compliance responsibilities are different for home, store and food industry and the final information needs to be addressed separately."
      ],
      "sections": [
        [
          "Why develop powder base",
          [
            "Italian gelato requires a balance of water, sugar, fat, protein and other solids. For users who do not have complete R&D conditions, a proven base can help reduce weighing items and batch fluctuations, but they still need to add the specified liquid or raw material according to the instructions and adhere to the temperature process.",
            "Convenience should not come at the expense of ambiguous information. LuxurEat (露意膳) will explain the ingredients, applicable equipment, operating procedures, storage and finished product recommendations before going on the market to avoid using slogans such as \"just add water\" for products that do not comply with this operation."
          ]
        ],
        [
          "For three types of usage scenarios",
          [
            "Household users need to know portion sizes, common utensils and failure troubleshooting; stores pay more attention to continuous production, stable display, flavour rotation and staff training; food industry customers also need to evaluate specifications, supply, production adaptation, labelling, allergens and quality documents.",
            "The same series can be provided with different packaging or operating options, but the specific form has not yet been finalized. The website will not pre-write unapproved flavour, weight, shelf life or capacity information."
          ]
        ],
        [
          "What should listing materials include?",
          [
            "Complete information should at least help users identify the product name, ingredients, allergenic substances, nutrition, net content, batch, storage conditions, usage methods and responsible parties. For the catering and food industry, traceability documents, quality standards and technical support scope should also be provided.",
            "Chinese labels and online information need to comply with applicable Chinese regulations. Any \"no-additives\", \"low sugar\" or other nutritional claims must be based on the final formula and regulatory conditions and cannot be used as a promotional conclusion during the research and development stage."
          ]
        ],
        [
          "From focusing on new products to actual evaluation",
          [
            "Interested users can first understand the formula, temperature and flavour basics of Italian gelato, and then compare their own equipment and service methods after the product is launched. Before purchasing, please refer to the official page and packaging information. Professional customers can request further technical information.",
            "LuxurEat (露意膳) will update the progress through popular new products and series product pages. All purchase and application judgments are subject to the official information released at that time."
          ]
        ],
        [
          "Subscription and communication boundaries",
          [
            "New product information will be updated after the formula and packaging are finalized. Subscription is only used to receive official releases, events and product updates, and does not mean pre-sale or locking in a certain specification. When professional customers make demands, they can describe the expected output, equipment and application scenarios to facilitate subsequent data matching.",
            "It is not recommended to plan menus, labels or purchase budgets based on this article before the product is officially launched. Any business decisions should be based on final quotation, contract, sample testing and applicable documentation."
          ]
        ]
      ],
      "asideSummary": "The direction of new products has been clarified, and the specific flavours, specifications, formulas and time to market are still subject to the final product information; transparent and actionable information is provided to different users.",
      "cta": {
        "label": "Discover the new arrival →",
        "href": "new.html#gelato"
      }
    },
    "olive-nutrition": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive oil nutritional value",
      "title": "Olive-Oil Nutrition: From Portions to a Balanced Diet",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Nutrition Basics",
      "intro": "Understand the fat types and energy density in olive oil, and put the nutritional numbers back into portion sizes, substitution relationships, and the overall diet.",
      "opening": [
        "The main nutritional contribution of olive oil comes from fat and energy, mainly monounsaturated fatty acids. The World Health Organization emphasizes that the quality of fat in the diet is important, and replacing more sources of saturated fat and trans fat with unsaturated fat is a reasonable framework for understanding the value of olive oil; this does not mean that adding more is healthier.",
        "Fats have high energy density, so \"good fat types\" and \"appropriate use\" need to be true at the same time. Nutritional judgment should focus on the day or week's diet structure, actual portion sizes, cooking methods and substituted ingredients, rather than treating a spoonful of oil as an independent health plan."
      ],
      "sections": [
        [
          "Let’s first see how much a portion is",
          [
            "Labels often express nutritional data per 100 grams or per 100 milliliters, but the amount used at home is much less than this number. When reading, you should convert the labelled units into your own servings for drizzling oil, salad dressing, or cooking, and take into account actual situations such as leftovers in the pot and sharing among multiple people. The density and labelling rules of different products may be different, and the packaging value should prevail.",
            "Dosage control does not mean rejecting fat. Fats are involved in cell function and also contribute to feelings of satisfaction when eating; the key is to match the amount to total energy needs and avoid unintentionally adding to meals that already contain a lot of cream, fatty meats or fried foods."
          ]
        ],
        [
          "Understand fat substitution relationships",
          [
            "Olive oil is rich in unsaturated fats, but changes in fat structure are only meaningful if it replaces part of butter, animal oil, or other sources of saturated fat. If only additional amounts are added and other amounts remain unchanged, the total energy will still increase.",
            "For the actual table, vegetables, legumes and whole grains can be tossed with olive oil for roasting or sautéing and reducing heavy oil sauces. This value comes not only from a nutrient, but also from the fact that it helps vegetables, beans and other foods more easily enter the daily diet."
          ]
        ],
        [
          "Trace ingredients do not equal therapeutic effect",
          [
            "Extra virgin olive oil may contain trace components such as polyphenols, and their content will be affected by variety, maturity, processing, storage and time. Specific content cannot be inferred solely from colour, pungency, or marketing words, nor can research results be directly translated into a therapeutic promise for a particular bottle of oil.",
            "If a product makes claims about nutrients or specific substances, check testing, labelling, and applicable regulations. General food content should provide dietary education and is not a substitute for medical advice regarding disease, medications, or individual health conditions."
          ]
        ],
        [
          "Create executable mixes",
          [
            "Arrange vegetables, beans, whole grains and an appropriate amount of protein in a meal first, and then decide on the role of olive oil. Fresh oils can be used in salads and finished dishes, while stronger-structured oils can be paired with bean soups, roasted vegetables and tomato dishes. Dosage can be gradually established intuitively with a measuring spoon or fixed grease nipple.",
            "For people who need to control their weight, blood lipids, blood sugar, or have digestive system problems, appropriate portion sizes should be combined with professional advice. LuxurEat (露意膳) provides raw materials and usage knowledge, and does not package a single ingredient into a healthy answer suitable for everyone."
          ]
        ],
        [
          "How to compare different oils",
          [
            "When comparing, don't just look at the \"plant\" or \"animal\" names, but also the fatty acid composition, amount used, cooking scenario and overall meal structure. Nutrition labels provide basic numbers, and dietary recommendations from health agencies provide overall direction. The two cannot be replaced by a single advertising slogan.",
            "Olive oil is not a vitamin, a medicine, or a zero-energy condiment. Using it as an ingredient, respecting the aroma and controlling the portion size can better reflect its nutrition and table value."
          ]
        ]
      ],
      "asideSummary": "The nutritional value of olive oil comes from fat quality, reasonable substitution and overall combination; portion size, total energy and personal circumstances cannot be ignored."
    },
    "olive-cultivars": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive varieties and aroma",
      "title": "How Cultivars Shape Olive-Oil Aroma",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Cultivars & Flavour",
      "intro": "Understand the origins of grass, tomatoes, nuts and spices from variety differences, and avoid using variety names as fixed flavour formulas.",
      "opening": [
        "Wine talks about grape varieties, and olive oil can likewise come in from olive varieties. Italy is rich in local varieties that differ in fruit size, ripening rhythm, oil yield, stress resistance and typical aroma. While single variety oils emphasize the expression of one olive, blends create balance and stability through different varieties.",
        "Breeds provide tendencies, not guarantees. Climate, soil, tree age, harvest maturity, fruit health, processing equipment and storage all change the final result. Even if the label says the same variety, there may be significant differences between years and producers."
      ],
      "sections": [
        [
          "How varieties enter aroma",
          [
            "Volatile substances in the olive fruit are formed and released during the crushing and stirring process, bringing associations such as fresh grass, leaves, tomatoes, apples, almonds or vanilla. Some varieties are more likely to express green and spicy aromas, while others are more soft, nutty or ripe fruity, but the sensory description should be based on the specific sample.",
            "Bitterness and pungency are related to phenolic composition and are also affected by harvest maturity and processing. The strength cannot be inferred based on the variety name alone, nor can pungency be equated with acidity; acidity is an indicator of free fatty acids measured in the laboratory."
          ]
        ],
        [
          "Single varieties and blends",
          [
            "A single variety of oil makes it easy to observe regional and variety personalities, and can also help chefs establish a clear matching language. Blended oils are not a step below: Experienced producers can combine different aromas, bitterness and stability to achieve the desired style. The key is whether the raw material quality, workmanship and labelling are authentic.",
            "When comparing, samples with similar freshness and storage status should be selected. If a bottle of oil loses its aroma due to light and heat or has been opened for too long, even the typical characteristics of the variety will be difficult to identify."
          ]
        ],
        [
          "Maturity changes expression",
          [
            "Fruits harvested earlier usually have lower oil yield, common green aroma and clearer bitterness and pungency; as they mature, the flavour may become rounder and the direction of the fruity aroma may also change. This is a general trend and does not mean that the earlier, the better. Producers need to judge between flavour, yield and fruit status.",
            "Harvesting in batches from the same orchard, or blending oils with different maturity levels, may result in a stable style. Knowing the harvest dates and batches can help explain why the same variety behaves differently in different bottles."
          ]
        ],
        [
          "From tasting to table",
          [
            "The most effective way to build understanding of varieties is to blindly taste two to three varieties and record the aroma, bitterness, texture, and combinations. For the mild version, try fish, cheese, and light vegetables; for the green and spicy version, try beans, grilled meats, tomatoes, and root vegetables.",
            "When LuxurEat (露意膳) introduces varieties, it will also provide production areas, harvesting, processing and uses, and does not use variety names as marketing shortcuts. It is more useful for consumers to remember their favorite flavour combinations than to chase a deified variety."
          ]
        ],
        [
          "Save a set of comparable samples",
          [
            "If you want to learn systematically, you can choose two single varieties of oil and one blended oil from the same harvest season and similar packaging status. Taste in the same cup, temperature and order and repeat within a week to observe changes after opening.",
            "The typical aroma on the label or course is just the starting point. The final record should be based on the sample in front of you, which can also help identify batch stability, rather than mechanically reciting a variety dictionary."
          ]
        ]
      ],
      "asideSummary": "Variety determines flavour potential, age, maturity, processing and storage determine how it is presented; both single varieties and blends may be of high quality."
    },
    "olive-how-to-choose": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "How to choose high-quality olive oil",
      "title": "Choosing Olive Oil: What to Check First",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Buying Guide",
      "intro": "Put grade, origin, date, packaging and use into the same checklist to reduce misjudgments based only on price and marketing words.",
      "opening": [
        "When buying olive oil, the most eye-catching words are often not the most important information. Confirming the complete legal name first, and then looking at the origin, date, specifications, storage method and responsible party can eliminate many conceptual confusions. Then choose the flavour and size based on your raw food, cooking, catering or gifting needs.",
        "Price can reflect part of the cost of fruit, harvesting, processing, yield, packaging and distribution, but it cannot alone prove quality. Low price does not necessarily mean failure, and high price cannot replace physical, chemical and sensory evidence. Traceable, well preserved and fit for practical use is a more reliable combination."
      ],
      "sections": [
        [
          "The first line looks at the level first",
          [
            "Names such as \"extra virgin olive oil\", \"virgin olive oil\" and \"olive oil\" correspond to different categories. Just seeing the word \"olive\" cannot mean it is the same product. Mixed, flavored infusions or complex flavoring products should also be understood by their actual names.",
            "Acidity, if highlighted, should be read in conjunction with other specified indicators. Consumers cannot directly taste acidity with their taste buds, and a single low number cannot describe the origin, aroma, storage and overall quality."
          ]
        ],
        [
          "The origin and date should be specific.",
          [
            "View information about where the olives were harvested, pressed or bottled, and who produced them, distinguishing between specific origins and broad origins. Geographical indications can show that the corresponding specifications are followed, but it still depends on the year and batch. If it is marked with the season it was harvested, it is often better to understand freshness than just looking at the filling date.",
            "The shelf life is the quality period under the labelled storage conditions, which does not mean that the best aroma will always be maintained after opening the bottle. Before buying, check whether the shelf is exposed to the sun or close to a heat source. Once you get home, keep it away from light, sealed and stored at an appropriate temperature."
          ]
        ],
        [
          "Packaging and capacity serve usage",
          [
            "Dark glass and metal containers can reduce light exposure, and oxygen-blocking designs such as bags and boxes may also help; transparent bottles are at higher risk if they are exposed to light for a long time. The appearance of packaging is not a grade, but it will affect the protection of oil products during circulation and use.",
            "Families should choose the capacity based on consumption speed. For large catering packages, the frequency of opening, packaging hygiene and kitchen temperature should be considered. Buy cheap and use it too slowly, and eventually the flavour loss may negate the capacity advantage."
          ]
        ],
        [
          "Quick review after arriving home",
          [
            "After opening the bottle, smell and taste by itself before using in food. Record whether the fruity aroma is clear, whether there is a balanced bitterness and pungency, and whether there is any stale or musty smell. If you suspect a product problem, you should retain the packaging, batch number, and proof of purchase, and contact the seller.",
            "LuxurEat (露意膳)'s product selection instructions will try to provide verifiable information and clear uses, while avoiding taking \"natural\", \"handmade\" or awards as universal endorsements. The best choice is the one with a clear message, fresh condition, suitable style, and one that can be used up within a reasonable time."
          ]
        ],
        [
          "Please check these before purchasing online",
          [
            "Check whether the product page displays the complete Chinese label, specifications, storage and responsible parties, rather than only the front renderings. After receiving the product, check whether the actual product is consistent with the page, and observe whether the packaging is leaking, dented, or experiencing abnormally high temperatures.",
            "For imported food, transportation and warehousing are part of the quality chain. Traceable batches and clear after-sales support better long-term choices than unverifiable descriptions such as \"same model from the manor\" and \"recommended by the master\"."
          ]
        ]
      ],
      "asideSummary": "First confirm the legal grade and source, and then compare the date, packaging, capacity and use; price and promotional slogans can only be used as auxiliary information."
    },
    "olive-storage": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Storage methods and shelf life",
      "title": "Keeping Olive Oil Fresh: Light, Heat and Time",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Storage Guide",
      "intro": "Understand how light, heat, oxygen, and time weaken olive oil flavour and establish actionable preservation methods for home and restaurant settings.",
      "opening": [
        "Olive oil still oxidizes slowly after it leaves the oil mill. Light, higher temperatures, air exposure and time all accelerate the loss of aroma and the development of staleness. High-quality raw materials and advanced processing cannot offset incorrect storage, so preservation is not a trivial matter after purchase, but part of the chain of quality.",
        "The oxidation rate is affected by packaging, remaining space, ambient temperature and switching frequency. It is impossible to summarize all products with one number of days after opening. The label gives a safety and quality period, and the best flavour after opening the bottle needs to be observed based on actual conditions."
      ],
      "sections": [
        [
          "Avoid light and sustained high temperatures",
          [
            "Put the oil in a cool cupboard, not on the windowsill, under a spotlight or next to the stove. Cooking and heating for a short period of time are two different things than leaving the entire bottle in a high temperature environment for a long time; the latter will continue to deplete the flavour before each use.",
            "Dark glass or metal cans provide protection, but are not an absolute barrier. Store displays, transportation and home storage should reduce sunlight and temperature fluctuations. In particular, inventory should not be placed near vehicles or heat sources."
          ]
        ],
        [
          "Reduce unnecessary air exposure",
          [
            "Cap tightly after each use and keep bottle mouth clean. As the amount of oil decreases, the proportion of air in the container increases, and frequent opening and closing will also bring in new air. Therefore, oversized packaging may not be suitable for low-frequency household use.",
            "If portioning is required, choose food-contact containers that are dry, odorless, sealable, and protected from light. Do not continuously pour new oil into the oil pot with old oil remaining. The old oil and moisture will affect the flavour and hygiene."
          ]
        ],
        [
          "Refrigerators are not the universal answer",
          [
            "Low temperatures may cause turbidity or crystallization of olive oil, which usually recovers after warming, but this phenomenon cannot be used to identify authenticity. Frequent movement of the refrigerator in and out of the home also creates the risk of temperature changes and condensation, and unless explicitly recommended by the label or manufacturer, a stable, cool environment is often more practical.",
            "Judging authenticity and grade requires source documents, physical and chemical testing and sensory evaluation, and cannot rely on online tests such as \"whether it has solidified in refrigeration\". Different fatty acid and trace component compositions will cause different low-temperature behaviors."
          ]
        ],
        [
          "Establish an inventory and opening system",
          [
            "Families can record the date of opening on the bottle, and the catering side should mark the information on warehousing, opening and repacking, and implement first-in, first-out. Smell it regularly and find that the fruity aroma has flattened or has a stale, crayon, or old nut-like smell, which means the flavour has significantly declined.",
            "Amount purchased should match frequency of use. LuxurEat (露意膳) will take packaging specifications, storage and transportation conditions and expected consumption into consideration when supplying and applying recommendations, so that products can remain traceable and stable from warehouse to table."
          ]
        ],
        [
          "On-site details on the catering side",
          [
            "In the kitchen, daily oil should be placed away from heat sources and easily covered tightly, and the serving pot should only be replenished with a reasonable amount for the meal. After receiving the meal, do not pour leftover oil directly back into the original packaging to avoid bringing in food residue and moisture.",
            "The same batch record should be used for warehouse, food preparation areas and table service. In this way, even if an abnormal flavour is found, it can be quickly traced back to the warehousing, unsealing, packaging or environmental links."
          ]
        ],
        [
          "Principles after leaving the packaging",
          [
            "The oil poured into the plate or seasoning bowl should be used promptly according to the needs of the dishes. Do not store the remaining oil that has been exposed to moisture, salt or food for a long time. Only by cleaning, avoiding light and reducing air contact until the last use can we truly continue the quality management at the production end."
          ]
        ]
      ],
      "asideSummary": "Avoid light, heat, seal, and buy according to the consumption rate; record the opening and batch of bottles, which is more reliable than judging the quality by colour or refrigerated solidification."
    },
    "olive-fasting": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Nutrition and misunderstandings",
      "title": "Olive Oil on an Empty Stomach: Nutrition, Tolerance and Myths",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Balanced Eating",
      "intro": "Explain drinking olive oil on an empty stomach from the perspective of energy, tolerance and dietary structure, distinguishing personal habits, nutritional facts and unproven effects.",
      "opening": [
        "Drinking olive oil on an empty stomach is often described on the Internet as a way to detoxify, protect the stomach, or lose weight quickly, but a single ingredient cannot bear these complex results. Olive oil is still a high-energy fat, and consuming it on an empty stomach does not turn it into a drug, nor is it automatically better than adding moderate amounts of oil to vegetables, legumes, and meals.",
        "Some people tolerate drinking it as is, while others experience nausea, acid reflux, abdominal discomfort, or changes in bowel movements. Individual feelings can be recorded, but general health conclusions cannot be directly derived; qualified medical professionals should be consulted if symptoms persist or if there are underlying medical conditions."
      ],
      "sections": [
        [
          "Nutritional value will not be magnified by fasting",
          [
            "Olive oil is mainly composed of unsaturated fats, and this composition does not magically change over time. What’s more important is what it replaces in your diet throughout the day, how much is used, and whether the overall diet contains enough vegetables, fruits, whole grains, legumes, and the right amount of protein.",
            "If you drink oil directly, it will only increase the amount, but the butter, fat meat and fried food in the meal will not change, and the total energy will increase accordingly. Using oils to improve the palatability of healthy foods is often more practical than swallowing them alone."
          ]
        ],
        [
          "why some people feel different",
          [
            "Oil entering the digestive tract will affect gastric emptying and gallbladder contraction, and individual tolerance varies greatly. Short-term changes in feelings of fullness, lubrication, or bowel movements do not equate to “eliminating toxins” and do not demonstrate long-term effects.",
            "The amount you drink, whether you drink coffee at the same time, sleep, content of the previous meal and psychological expectations can all affect the experience. To observe, keep portion sizes small and record variables, and don't increase dosage quickly."
          ]
        ],
        [
          "What situations require caution",
          [
            "People who have gallbladder, pancreatic, gastroesophageal reflux or other digestive system problems, are taking medication, are pregnant, or need to strictly control energy should not rely solely on online articles to make decisions. Children and older adults also have different needs.",
            "If you experience persistent pain, vomiting, severe diarrhea, or other abnormalities, stop trying and seek medical help. This article provides general dietary information only and does not provide diagnosis or treatment."
          ]
        ],
        [
          "A more secure daily approach",
          [
            "Use a small amount of extra virgin olive oil on tomatoes, leafy greens, bean soup, whole grains, fish, or grilled vegetables to observe flavour and portion sizes. It's easier to manage with a measuring spoon than pouring directly into your mouth by feel.",
            "If you like to eat it early in the morning, you can include it in your breakfast or meal without giving it special effects when you’re fasting. LuxurEat (露意膳) recommends considering olive oil as a quality ingredient, used in a varied, balanced and moderate diet."
          ]
        ],
        [
          "How to spot exaggeration",
          [
            "If a piece of content promises short-term detoxification, clearing of blood vessels, treatment of constipation, or weight loss without other dietary changes, check first to see if reliable research, appropriate populations, and risk statements are provided. The nutritional effects of ordinary food cannot replace diagnosis and treatment.",
            "More credible recommendations tend to be restrained in tone and discuss portion size, substitutions, personal differences, and uncertainty. It may be less dramatic, but it's closer to an everyday, actionable healthy choice."
          ]
        ],
        [
          "in conclusion",
          [
            "Whether to drink it on an empty stomach can be a personal habit, but it is not a criterion for measuring the value of olive oil. A safer long-term approach is to spread reasonable portions across a variety of meals and adjust based on body weight, activity level and body response."
          ]
        ]
      ],
      "asideSummary": "Fasting will not magnify the nutritional value of olive oil; portion size, substitution relationships, personal tolerance and overall diet are more important than the timing of consumption."
    },
    "olive-myths": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Frequently Asked Questions and Misunderstandings",
      "title": "Olive Oil: Six Myths to Leave Behind",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Myth Check",
      "intro": "Clarify common myths about acidity, colour, heating, bitterness and origin, and replace simple slogans with verifiable information.",
      "opening": [
        "The most common problem in olive oil knowledge is not that there is no information at all, but that a clue is exaggerated into a universal conclusion. Dark colour, low acidity, throatiness, refrigerated solidification, or origin from a certain country alone do not attest to the full quality of an oil.",
        "Reliable judgment usually requires multiple pieces of evidence: legal name and labelling, traceability documentation, physical and chemical analysis, trained sensory evaluation, packaging storage and actual tasting. Consumers do not have to own a lab, but can identify which claims cross evidentiary boundaries."
      ],
      "sections": [
        [
          "Myth 1: The greener the colour, the fresher it is",
          [
            "Colour is affected by variety, maturity and pigments, and professional sensory evaluation will not directly use green as a basis for grade. Clear bottles look great in the light, but may expose the oil to more light.",
            "When selecting, more attention should be paid to fruity aroma, presence of defects, date and preservation. Colour can be recorded as a visual feature, but it should not be ranked higher or lower."
          ]
        ],
        [
          "Myth 2: You can taste the acidity",
          [
            "The free acidity mentioned on the label requires chemical analysis, and the sour, bitter, and spicy feelings felt by the tongue are not the same concept. Low acidity is one of the requirements for some grades, but other physical, chemical and sensory conditions are also required.",
            "If marketing emphasizes a very low number without specifying category, origin, and preservation, the message is still incomplete. Disinfection after opening the bottle cannot be ruled out by relying on the factory acidity number."
          ]
        ],
        [
          "Myth 3: Extra virgin cannot be heated",
          [
            "Extra virgin olive oil can be used in many home cooking applications. Heating will change some aromas and actual suitability depends on temperature, time, dish and oil condition. Overheating oil repeatedly for long periods of time is not the same thing as normal sautéing, roasting or stewing.",
            "Oils with extra delicate flavours can be reserved for finishing dishes, and everyday oils are used for cooking. This is to manage aroma and cost, rather than because extra virgin becomes harmful when exposed to heat."
          ]
        ],
        [
          "Myth 4: Bitterness means excitement or the stronger the better",
          [
            "The bitterness and pungency of fresh virgin oil can be positive characteristics, related to phenolics and fruitiness; but intensity should be balanced with fruity aroma, texture and use. The right oil for light fish may not be the same oil for bean soup and roasted meats.",
            "LuxurEat (露意膳) will write sensory words as comparable descriptions rather than efficacy hints. If you encounter claims of \"guaranteed cure\", \"detoxification\", \"zero burden\" or claims that can only be judged true or false based on a home test, you should return to the label and authoritative information."
          ]
        ],
        [
          "Misunderstanding 5: A place of origin automatically guarantees everything",
          [
            "Italy has an important olive oil tradition, but country names are not a substitute for specific production areas, producers, batches and storage. The place where the olives are grown, pressed, blended and bottled may differ and labels should be read accurately.",
            "Awards and certifications can provide additional information and have their own scope and year. Consumers should still confirm whether the award-winning product is the current product and batch, whether the certification mark is true and applicable, and combined with the sensory performance after opening the bottle."
          ]
        ],
        [
          "Misunderstanding 6: Turbidity must be more natural",
          [
            "Unfiltered oil may retain trace amounts of moisture and pulp particles, giving it a cloudier appearance, but these substances may also affect shelf stability. Filtered oil can also be a mechanically obtained extra virgin product. Whether to filter or not is a production choice, not a simple distinction between natural and industrial.",
            "Similarly, precipitation, floc or low-temperature crystallization need to be judged in conjunction with product instructions and storage, and cannot be directly used as a test of authenticity. For products with abnormal smell, bloated packaging or unknown origin, you should stop eating and check with the responsible party."
          ]
        ]
      ],
      "asideSummary": "Colour, acidity, refrigeration, bitterness or origin are only partial clues; multiple pieces of evidence and actual use can form a complete judgment."
    },
    "olive-recipes-guide": {
      "topicLabel": "Olive Oil Academy",
      "column": "Olive Oil Academy",
      "eyebrow": "Olive oil recipes",
      "title": "Olive Oil in Everyday Cooking: From Bread to Pasta",
      "meta": "Olive Oil Academy · 2026",
      "archive": "Kitchen Use",
      "intro": "From breads, salads, and beans to pasta and grilling, understand the different roles olive oil plays in seasoning, transferring heat, emulsifying, and finishing dishes.",
      "opening": [
        "When olive oil comes into a recipe, it's not just \"add a little oil.\" It carries aromas, connects sauces, helps heat the surface, and provides a fresh, fruity aroma right before serving. Only by clearly stating the time of addition, temperature and dosage can the same bottle of oil be reproducible stably in both home and professional kitchens.",
        "The recipe should be based on the ingredients and the target taste, rather than overdoing it to highlight the oil. Light oil, green spicy oil and mature fruity oil have their own places; if you only have one bottle, you can also distribute the dosage through the three stages of raw use, low-temperature blending and cooking."
      ],
      "sections": [
        [
          "Bread and raw food",
          [
            "Fresh bread with olive oil is the best way to directly observe the aroma and bitterness. Drizzle a small amount of oil first before deciding whether to add salt, tomatoes or herbs to avoid seasoning all at once to cover the oil. Tomato toasted bread can create clear layers of sweetness, sourness, burnt bread aroma and fruity aroma of oil.",
            "Working with the salt and acid first in the salad, then slowly adding the oil and stirring, results in a more even coating. Oil and vinegar will not permanently emulsify, but mustard, cheese or the ingredients of the ingredients themselves can help temporarily stabilize it; specific allergens should be labelled with the recipe."
          ]
        ],
        [
          "Beans, soups and vegetables",
          [
            "Bean and root starch can take on the bitterness and pungency of olive oil, and a small amount of raw oil can add aroma and fluidity to the thick taste. For soups, it is suitable to use part of the oil to stir-fry the basic ingredients, and reserve the other part for cooking.",
            "The oil used for roasting vegetables should be thin and even. Excessive oil will prevent the surface from dehydrating and burning. Record the oil usage by weight or portion first, and then adjust it according to the baking pan, moisture content and temperature. This is easier to reproduce than writing \"appropriate amount\" in general."
          ]
        ],
        [
          "Pasta and Sauce",
          [
            "Olive oil, cooking water, and cheese or other sauce ingredients can be stirred to form a temporary emulsification that allows the sauce to adhere to the noodles. The key is to control the amount of water, temperature and stirring, rather than relying on lots of oil to create the shine.",
            "Garlic, chili peppers and herbs release their flavour at moderate temperatures without burning the garlic or herbs. Adding a more fruity oil at the end retains the volatile aroma and reduces loss caused by prolonged heating."
          ]
        ],
        [
          "Create your own fuel meter",
          [
            "Record the oil type, dosage, adding time and results for frequently cooked dishes, such as \"how much for each portion before baking, and how much to add when serving\". The catering side can also record batches and bottle opening dates to facilitate cost and flavour consistency management.",
            "LuxurEat (露意膳)'s recipes present olive oil along with relevant product links, serving sizes, allergens and alternatives. When substituting oils, re-judge flavour and heating performance rather than assuming that all vegetable oils are identical."
          ]
        ],
        [
          "How to resume playback after heating",
          [
            "For the same dish, you can record the aroma before and after cooking: if you can barely smell the oil characteristics when you cook it, you can reduce the amount used in the first stage and leave a small portion until the dish is finished; if the bitterness and pungency overwhelm the ingredients, switch to a softer style or reduce the amount of oil poured at the end.",
            "A recipe is not a fixed order, but a set of proportions that can be verified repeatedly. By weighing and recording, the \"appropriate amount\" is converted into a range suitable for your pot, portion size and oil."
          ]
        ],
        [
          "Substitutions and Allergy Tips",
          [
            "Replacing butter with olive oil changes the frankincense, moisture content, and texture, and isn't always a one-for-one replacement; baking recipes especially need to be retested. If a recipe also uses cheese, nuts, fish or gluten-containing bread, the relevant allergens should be listed separately and cannot be omitted because olive oil itself does not contain these ingredients."
          ]
        ]
      ],
      "asideSummary": "Divide olive oil into four roles: raw food, cooking, emulsification and finishing dishes, and record the amount and time used so that the recipe can be reproduced stably."
    },
    "pizza-fundamentals": {
      "topicLabel": "Pizza Academy",
      "column": "Pizza Academy",
      "eyebrow": "Pizza Basics Course",
      "title": "Italian Pizza Begins with the Dough",
      "meta": "Pizza Academy · 2026",
      "archive": "Dough & Baking",
      "intro": "From flour, water content, fermentation, shaping to oven temperature, understand how an Italian pizza obtains light edges, a flexible center and clear toppings.",
      "opening": [
        "The basis of Italian pizza is not to pile on toppings, but to balance the dough, sauce, cheese and baking in a short time. Taking Neapolitan pizza as an example, industry standards will have clear requirements for raw materials, dough making, fermentation, manual shaping and baking; other Italian styles may use different thicknesses, moisture content and ovens.",
        "Therefore, the so-called \"authentic\" should not be judged solely by the visual symbols of round shape, focal spots or high temperature. Whether the strength of the flour is suitable for the fermentation time, whether the temperature of the dough is controllable, and whether the water content of the sauce matches the weight of the ingredients determines whether it will be light and elastic in the mouth, or whether it will be soggy, dry, hard or difficult to digest."
      ],
      "sections": [
        [
          "Flour, water and salt",
          [
            "The flour needs to have the ability to absorb water and gluten that matches the target fermentation time. It’s not that higher protein is better: too strong may make it difficult for the dough to stretch, while too weak may result in insufficient support. There is also no universal number for moisture content. It is affected by flour, equipment, environmental humidity, operating experience and finished product style.",
            "Salt not only provides flavour, but also affects gluten and fermentation rhythm. The water temperature helps control the temperature of the dough after kneading. For home production, the flour, room temperature and recipe should be fixed first, and then only one variable should be adjusted at a time; the catering side should also record the batch and actual out-of-tank temperature."
          ]
        ],
        [
          "Patiently sifting fermentation status",
          [
            "Fermentation time itself is not a badge of quality. The amount of yeast, dough temperature, room temperature or refrigeration conditions should be looked at together. When the fermentation is insufficient, the dough will be tight and the aroma will be thin; when the dough is over-fermented, the structure may become weak, the sour or alcoholic smell will be prominent, and it will be difficult to retain gas during shaping.",
            "Judgment should be based on volume, surface condition, ductility and smell, rather than just looking at a timer. After being divided and rounded, the dough needs to be loose enough so that it can be spread out by hand from the center without using a rolling pin to press the edges."
          ]
        ],
        [
          "Sauces, cheeses and toppings",
          [
            "The moisture, sweetness and sourness of the tomato sauce and the amount used will affect whether the center is moist and soft; the moisture content and cutting method of the cheese will affect the melting and water release. Basil and olive oil can play different aroma roles before and after baking, the exact order depends on the oven temperature and recipe.",
            "With each additional ingredient, weight, moisture content and aging time need to be reconsidered. Thinly sliced ​​vegetables, cured meats, or precooked ingredients are treated differently. You cannot rely on extended baking to compensate for heavy ingredients, otherwise the edges of the cake may dry out or burn first. Allergen information should also be confirmed on an individual basis with flour, dairy and processed meat products."
          ]
        ],
        [
          "High temperature baking and finished product judgment",
          [
            "The high temperature causes the water in the dough to quickly turn into steam, pushing the edges of the dough to expand and creating a baking aroma. When home ovens are cooler, you can improve heat transfer from the bottom with the help of a well-preheated baking stone or baking steel, but the time and results won't exactly replicate those of a professional oven.",
            "A good char brings aroma and should not be a cover for large areas of bitterness or doughiness. After cutting, observe whether the bottom is mature, whether the center can support the ingredients, and whether the edges of the cake are light and elastic. LuxurEat (露意膳) brings together professional flour, stable ingredients and executable processes to help users understand why Italian pizza is so famous."
          ]
        ]
      ],
      "asideSummary": "The core of pizza is the combination of variables: flour, moisture, fermentation, ingredient moisture and oven temperature jointly determine the structure, rather than a single label of long fermentation or high temperature."
    },
    "gelato-flavours": {
      "topicLabel": "Italian Gelato Academy",
      "column": "Italian Gelato Academy",
      "eyebrow": "Italian gelato flavour",
      "title": "Classic Flavours: How Italian Gelato Expresses Its Ingredients",
      "meta": "Italian gelato · 2026",
      "archive": "Flavour Lab",
      "intro": "Start with milk, vanilla, chocolate, coffee, hazelnuts, pistachios and fruits to understand how different ingredients change sweetness, texture and aroma.",
      "opening": [
        "Low temperature will slow down the release of aroma and change the sweetness experience, so a good Italian gelato cannot just rely on adding sugar or essence to make the taste louder. Recipes need to respect the fat, moisture, acidity, fiber and cocoa or nut solids of the ingredients before adjusting for freezing and serving conditions.",
        "Classic flavours endure because they clearly demonstrate craftsmanship: milk tests cleanliness and balance, chocolate tests cocoa and sweetness, nuts test roast and oil, and fruit tests ripeness, acidity and seasonality."
      ],
      "sections": [
        [
          "Milk vs. Vanilla: A deceptively simple benchmark",
          [
            "The taste of milk is not blocked by strong ingredients, and the frankincense, sweetness, ice crystals and aftertaste are all straightforward. If there are slight problems with raw material quality, heating processing and cold chain, peculiar smell or rough feeling will be easily detected.",
            "The sources and forms of vanilla are different. The labelling and usage of pods, extracts and natural flavours should be based on the product information. A good vanilla flavour should blend with the milk base, rather than just leaving a single sweet aroma."
          ]
        ],
        [
          "Chocolate and Coffee: Bitter-Sweet Structure",
          [
            "Chocolate flavour requires a balance of cocoa solids, cocoa butter, other fats and sugars. Darker colour does not necessarily mean higher cocoa content, the name and ingredients do. Bitterness, acidity, roasted aroma and sweetness need to remain distinct at low temperatures.",
            "The roasting degree, extraction method and amount of coffee added will affect the aroma and moisture. Over-roasting or over-roasting may leave you with a burnt and bitter taste, while under-roasting may result in loss of recognition after freezing."
          ]
        ],
        [
          "Hazelnuts and Pistachios: The reality of nuts",
          [
            "Nuts contain more fat and solids, which can significantly change viscosity, freeze and melt. Roasting can develop aroma, but excessive roasting will cause burnt bitterness; improper storage may also cause oxidation and stale flavour.",
            "Pistachios are not naturally fluorescent green and the colour can vary depending on variety, roasting and recipe. When choosing, you should pay more attention to the ingredients, aroma, fineness and whether there is greasiness or fragrance, rather than pursuing exaggerated colour."
          ]
        ],
        [
          "Fruit and Seasons: Moisture and Acidity Challenges",
          [
            "The water, sugar and acid content of strawberries, lemons, peaches, berries, etc. are obviously different and cannot share the same ratio. Ripeness changes flavour and also changes the amount of sugar and solids that need to be added. Fruit sorbets usually do not use milk as the main body, but the specific formula still needs to confirm allergens and cross-contact.",
            "When LuxurEat (露意膳) introduces flavours, it distinguishes between ingredient facts, sensory descriptions and product information. The common flavours are enough to demonstrate the professionalism of Italian gelato: real, clear, not overly covered, and maintaining a delicate level in every bite."
          ]
        ],
        [
          "Make a four-flavour comparison",
          [
            "Choose four categories: milk, chocolate, nuts and fruits, take only a small amount each time, and record them in order from colour, first aroma, sweetness, fineness to aftertaste. Drink water and pause in the middle to avoid the sugar and fat from the previous meal continuing to affect your judgment.",
            "Comparison can help consumers understand recipe differences and also help stores adjust menu levels. The greater the number of flavours, the more professional it is. Clear ingredients, rhythmic rotation and stable batches are more important."
          ]
        ],
        [
          "About colours and naming",
          [
            "Flavour names should be consistent with actual ingredients and applicable labelling. The colour can come from the raw materials themselves or coloring ingredients used in accordance with the law. Consumers should confirm it through the label, rather than judging by empirical methods such as \"the more natural, the darker.\" Store displays should also avoid decorations that suggest key ingredients that are not used."
          ]
        ]
      ],
      "asideSummary": "Classic flavours are not conservative choices, but the most direct test of craftsmanship: each ingredient needs to handle moisture, fat, acidity and aroma independently."
    },
    "nutrition-labels": {
      "topicLabel": "Nutrition & Ingredients",
      "column": "Nutrition & Ingredients",
      "eyebrow": "Understand food ingredient lists",
      "title": "How to Read a Food Ingredient List",
      "meta": "Nutrition and Ingredients Guide · 2026",
      "archive": "Label Reading",
      "intro": "Read a prepackaged food label in the order of food name, ingredients, nutrition, allergens, date, storage and responsible party.",
      "opening": [
        "Food labels are a gateway to product facts, but they need to be read in order. The front picture and slogan are responsible for attracting attention, and information such as legal name, ingredient list, nutritional ingredients, net content, date, storage method, producer and importer help consumers determine what the product is.",
        "China has released new versions of standards such as GB 7718-2025. The specific implementation and transition requirements should be based on the official documents of the national health department and market supervision department. Website articles can only explain the reading method. Any specific product should be based on the actual Chinese label and current applicable regulations."
      ],
      "sections": [
        [
          "Confirm the food name first",
          [
            "Brand names, range names and flavour names are not necessarily legal or authentic attributes of a food product. Look for a name that describes the category, such as dressing, sauce, olive oil, or frozen dessert, and then determine whether the picture on the front matches the actual ingredients.",
            "If it is emphasized that a certain ingredient or specific ingredient is added, the relevant content may need to be declared according to applicable rules. Don’t assume just because a picture of olives, truffles or fruit appears on the packaging that these are the main ingredients."
          ]
        ],
        [
          "Read the order of ingredients again",
          [
            "Ingredients are usually arranged in descending order of addition amount, and compound ingredients may need to be expanded to indicate their composition. Food additives should be presented according to prescribed names or functional categories, and the quality of a product cannot be judged solely by the length of the ingredient name.",
            "Products in the same category may use different ingredients for structure, acidity, emulsification, preservation or flavour. The key is that the name is clear, the purpose is legal, the information is verifiable, and it meets the dietary and allergy needs of the consumer."
          ]
        ],
        [
          "Nutritional numbers should be converted to serving size",
          [
            "Nutritional information may be stated per 100g, per 100ml or per serving. When comparing products, first unify the units and then convert based on the actual serving size. Figures such as energy, protein, fat, carbohydrates and sodium cannot be interpreted apart from the total diet.",
            "Nutrition claims such as “low”, “none” and “high” are subject to conditions and are not vague adjectives in everyday language. When encountering claims, you should also look at the value, portion size and applicable standards."
          ]
        ],
        [
          "Final check for safety and usage information",
          [
            "Allergens, production date, shelf life, post-opening requirements and storage temperature directly affect the choice. The shelf life is based on the marked storage conditions. Cold chain products cannot be judged only by the date after they leave the specified temperature.",
            "Imported products should also check the domestic responsible entities and Chinese information. LuxurEat (露意膳) will match the online introduction with the final product documents. If there are differences between the web page and packaging, the legal label and the latest technical information should prevail and be verified in a timely manner."
          ]
        ],
        [
          "Digital labels and online pages",
          [
            "Online sales pages should provide the key information consumers need to make a choice, but web page screenshots may expire after product updates. Still check the actual packaging when ordering and receiving your order, especially the formula, allergens, specifications and date.",
            "QR codes or digital labels can carry more detailed information, but should not obscure or replace information that must appear on the packaging by law. If the version cannot be confirmed, the batch will be retained and the responsible party will be queried."
          ]
        ]
      ],
      "asideSummary": "Read layer by layer from food name to ingredients, nutrition, allergens and storage, positive marketing messages are no substitute for a complete Chinese label."
    },
    "allergens-guide": {
      "topicLabel": "Nutrition & Ingredients",
      "column": "Nutrition & Ingredients",
      "eyebrow": "Allergen information",
      "title": "Allergen Information: Verify Product by Product",
      "meta": "Nutrition and Ingredients Guide · 2026",
      "archive": "Food Safety",
      "intro": "Distinguish between formula content, cross-contact and individual risks, and check allergens by product and batch, rather than replacing labels with a full range of slogans.",
      "opening": [
        "Food allergies are immune system reactions to specific food proteins and vary in severity from person to person. Lactose intolerance, general digestive discomfort, and food allergies are not the same thing and have different management recommendations. The most important thing for people with known allergies is to read specific product labels and follow medical advice.",
        "When a brand has multiple product lines, it cannot cover them all with “allergen-free”. Caviar, dairy-based frozen desserts, nut flavours, gluten-containing pizzas and sauces have different sources of risk, and recipes and production environments may vary from specification to batch and batch to batch."
      ],
      "sections": [
        [
          "Allergenic substances identified in the formula",
          [
            "First, check the ingredient list and allergen tips to confirm the ingredients related to you, such as milk, eggs, gluten-containing grains, nuts, soybeans, fish, crustaceans, etc. The composition of compound ingredients also needs to be read in detail, not just the main name.",
            "When the names are similar or the translations are unfamiliar, you should not make guesses based on experience. Contact the manufacturer or seller to obtain the latest Chinese labels and technical information, and choose not to eat it if it cannot be confirmed."
          ]
        ],
        [
          "Understand cross-contact",
          [
            "Just because certain allergenic substances are not actively added to the product formula does not mean that there is no possibility of exposure in the production environment. Shared equipment, storage, transportation, tools and store operations all require risk assessment and cleaning management.",
            "Precautionary reminders should be based on manufacturer documentation and applicable regulations and should not be expanded or deleted by dealers themselves. For high-risk groups, \"may contain\" should be taken seriously according to individual medical plans."
          ]
        ],
        [
          "Secondary confirmation for dining and family",
          [
            "Restaurants use original packaging and add additional sauces, cheeses, nuts or garnishes, and may use shared stoves and utensils. Allergies should be clearly stated when ordering so that the restaurant can assess whether it can be served safely.",
            "Keep original labels and batches when dispensing at home, and don’t just put powders or sauces into unmarked jars. When preparing food for different people, clean countertops, tools, and hands to avoid cross-use of the same knife or spoon."
          ]
        ],
        [
          "What to do when risks arise",
          [
            "People with a history of allergies should develop a personal management plan with their doctor and carry the necessary first aid medications as recommended. If you experience difficulty breathing, tightness in your throat, systemic reactions, or other serious symptoms, seek emergency medical help immediately.",
            "LuxurEat (露意膳) will publish ingredient and allergy information by product and does not use knowledge articles as a medical or purchase guarantee. Any formulation updates should be synchronized to labelling and sales materials so that consumers and professional customers can check before use."
          ]
        ],
        [
          "Document Checklist for Professional Procurement",
          [
            "Restaurants and food companies should keep specifications, ingredient and allergen statements, production change notices and contacts when purchasing. Menus or training materials must be synchronized with the current version and old recipe conclusions cannot be used.",
            "Risk assessment may also change when there are changes in raw materials, factories or production lines on the supplier side. Periodic review is more reliable than a one-time request for an \"allergen-free certificate.\""
          ]
        ],
        [
          "Don’t try it yourself with substitutes",
          [
            "People with allergies to certain nuts, dairy or grains cannot infer safety simply because a product uses alternative ingredients; the alternatives themselves may also be allergenic and may be produced under different circumstances. Any trial should be based on label confirmation and individual medical regimen."
          ]
        ]
      ],
      "asideSummary": "Allergen management must review formulations, production environments, and labelling on a product-by-product basis; website education is not a substitute for packaging information and individual medical regimens."
    },
    "clean-label": {
      "topicLabel": "Nutrition & Ingredients",
      "column": "Nutrition & Ingredients",
      "eyebrow": "no-additives tag",
      "title": "No-Additives Claims: First Ask What Is Not Added",
      "meta": "Nutrition and Ingredients Guide · 2026",
      "archive": "Ingredients & Claims",
      "intro": "“No-additives” only makes sense when the object, scope and evidence are clear; it does not automatically equate to more natural, safer or nutritionally better.",
      "opening": [
        "\"No-additives\" easily gives people a complete and absolute impression, but food formulas and labels require more precise questions: which ingredient is not added, whether it is not used in the formula, or is not detected in the final product; whether this statement complies with applicable regulations; whether similar products do not need this ingredient.",
        "Whether a food is worth choosing still depends on the food name, complete ingredients, nutrition, allergenic substances, production hygiene, storage and traceability information. Reducing unnecessary ingredients can be a clear product principle, but it cannot replace safety control, nor can all food additives that are legal and have technical functions be described as harmful."
      ],
      "sections": [
        [
          "Write the statement completely",
          [
            "Rather than just writing \"no-additives,\" a more responsible statement would indicate the specific target and scope of application, and could be supported by recipes, supplier documents, and production records. Using bold claims to create a special advantage can also be misleading if the product never requires the ingredient.",
            "Expressions such as \"no preservatives\", \"no artificial colours\" and \"no sucrose\" involve different definitions and cannot be replaced by each other. Whether it can be used, how to label it, and whether other sugar sources need to be stated should be reviewed on a product-by-product and market-by-market basis."
          ]
        ],
        [
          "Additives have clear functions",
          [
            "Food additives may be used for safety, antioxidant, acidity, emulsification, stabilization, leavening, coloring or other process purposes and are subject to variety, scope of use and dosage rules. Ingredient lists help consumers identify actual usage.",
            "Removing a stabilizer or emulsifier may change texture, melting, shelf life and cold chain requirements. To simplify formulations, safety and quality must be re-established through development and validation, rather than just removing the name from the copy."
          ]
        ],
        [
          "Natural sources also need to be evaluated",
          [
            "Natural ingredients may also contain allergens, sugars, salts or natural toxins, and their natural origin does not mean they are suitable for everyone. Flavours, concentrates, honey and botanical extracts also need to be accurately labelled and used appropriately.",
            "Consumers can choose products with simpler ingredients based on their dietary goals, but they do not have to regard the number of ingredients as the only rating. Clear functions, compliant usage, and traceable sources are often more important than simply pursuing a short list."
          ]
        ],
        [
          "LuxurEat (露意膳)’s Information Principles",
          [
            "Ingredients, nutrition, allergens, specifications, storage and usage documents should be completed before the product is launched, and then decide which claims can be supported by evidence. The yet-to-be-finalized Italian gelato powder base does not promise “no-additives” or other nutritional attributes in advance.",
            "The website separates brand principles from product facts: the former illustrates our focus on transparency, reliability and traceability, while the latter must be evidenced by the final labelling and technical data of each product. In this way, \"no-additives\" is not an empty health halo."
          ]
        ],
        [
          "How consumers can ask questions",
          [
            "When you see a no-additives statement, you can ask about the specific items that are not added, whether similar products are commonly used, how the product is kept stable, and whether the information can be verified in the ingredients and documents. Clear answers are more valuable than vague natural stories.",
            "If a personal goal is to reduce sugar, sodium, or specific ingredients, look directly at nutrients and ingredients rather than assuming that \"no-additives\" automatically meet those goals."
          ]
        ]
      ],
      "asideSummary": "No-additives require clear objects, scope and evidence; complete ingredients, safety control and traceability information are more important than a general label."
    },
    "nutrition-myths": {
      "topicLabel": "Nutrition & Ingredients",
      "column": "Nutrition & Ingredients",
      "eyebrow": "Food Facts and Myths",
      "title": "Nutrition Information: Separate Facts, Experience and Marketing",
      "meta": "Nutrition and Ingredients Guide · 2026",
      "archive": "Myth Check",
      "intro": "Review nutritional information in terms of portion size, level of evidence, intended populations and the overall diet, and avoid taking personal experience or marketing language as universal truth.",
      "opening": [
        "Nutritional content often condenses complex issues into a single ingredient, a number, or a prohibition. Real diet is made up of portion size, frequency, substitution relationships, cooking methods, lifestyle habits and personal health conditions. A single food usually cannot independently bring about results such as \"detoxification\", \"anti-cancer\" or rapid weight loss.",
        "Responsible articles should explain where the information comes from, who it applies to, what units of measurement it is, and which conclusions remain uncertain. Observational studies, clinical trials, regulatory standards, product testing, and personal experience each have their own uses and cannot be substituted for each other."
      ],
      "sections": [
        [
          "Myth 1: The more of a certain food, the better",
          [
            "Even if a food contains unsaturated fats, protein, or other valuable ingredients, excess may still make total energy, sodium, or sugar more than needed. Nutritional value does not conflict with moderation.",
            "The judgment should be based on what it replaces. If olive oil replaces some sources of saturated fat, it's not the same as adding a large amount to the original diet; nuts, dairy products and frozen desserts should also be combined in portion sizes."
          ]
        ],
        [
          "Myth 2: One study is the final word",
          [
            "Study subjects, sample size, intervention time, control method and outcome measures will all affect the conclusions. Cell or animal studies cannot be directly equated to the effects of daily consumption in humans, nor does correlation automatically prove cause and effect.",
            "When citing research, websites should avoid citing only the most alarming numbers and describe the level of research. Specific claims at the product level also need to comply with testing and regulatory conditions."
          ]
        ],
        [
          "Misunderstanding 3: What works for one person is suitable for everyone",
          [
            "Taste, satiety, digestion, and blood sugar responses may vary based on age, illness, medications, allergies, activity level, and dietary background. Personal experience can inspire questions, but it cannot replace systematic evidence.",
            "People who need to control their weight, lipids, blood sugar, kidney function or have food allergies should seek individual advice from a qualified professional. Social media advice should not change prescriptions or treatments."
          ]
        ],
        [
          "Establish a three-step verification method",
          [
            "The first is to look at the source: whether it is a health department, regulation, professional organization or complete study; the second is to look at the unit and serving size: whether per 100 grams, each serving and actual intake are consistent; the third is to look at the boundary: is this general advice, product data or medical conclusion.",
            "LuxurEat (露意膳)'s nutrition and ingredient content keeps facts, explanations and brand positions separate. We can explain how to read and mix without instilling fear in a single ingredient or packaging ordinary food into a cure."
          ]
        ],
        [
          "Writer and brand self-examination",
          [
            "Before publishing, you should check whether the title exaggerates the text, whether relative risks are written as absolute risks, whether study subjects have been stolen and replaced with owners, and whether product facts are supported by labels or documentation. If necessary, clearly state \"uncertain\" or \"subject to final information.\"",
            "When regulations, formulations, or evidence are updated, older articles should also be revised. Trustworthiness is not about never making mistakes, but about being able to explain the basis, version and correction process."
          ]
        ],
        [
          "Ask more about social media content",
          [
            "Short videos and posters often omit dosage, control groups, and applicable conditions. When you encounter a surprising conclusion, first look for the original source and publication date to confirm whether it is just a correlation, animal testing, or the brand's own investigation. If this cannot be verified, do not use it for medical purposes or to make drastic changes in your diet."
          ]
        ]
      ],
      "asideSummary": "Nutritional judgment requires source, portion, substitution relationship and applicable boundaries; personal feelings and marketing slogans cannot replace complete evidence."
    }
  };
  for (const [slug, content] of Object.entries(enSyncedTopicArticles)) {
    const id = `en-academy-${slug}`;
    if (articles[id]) Object.assign(articles[id], content);
  }

  // Web-ready Academy articles imported from the approved bilingual Pages source.
  const webReadyAcademyArticles = [
  {
    "slug": "italian-gelato-vs-ice-cream",
    "lang": "en",
    "topic": "gelato",
    "topicLabel": "Italian Gelato Academy",
    "column": "Italian Gelato Academy",
    "artClass": "is-gelato",
    "eyebrow": "Italian Gelato Academy",
    "title": "Italian Gelato vs Ice Cream: What Makes the Italian Tradition Different?",
    "meta": "Italian Gelato Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "italian-gelato-vs-ice-cream.webp",
    "intro": "Gelato and ice cream belong to the same broad family of frozen desserts, but traditional Italian gelato is shaped by a different balance of air, fat, serving temperature and flavour. The result is not simply a different recipe, but a different way of experiencing a frozen dessert.",
    "opening": [],
    "sections": [
      [
        "Two Frozen Desserts, Two Different Traditions",
        [
          "Around the world, the words gelato and ice cream are often used interchangeably. In practice, recipes vary widely, so there is no single formula that separates every gelato from every ice cream. Even so, artisanal Italian gelato is commonly made with a lower incorporation of air and is served at a slightly warmer temperature than hard-frozen ice cream.",
          "These differences influence texture immediately. Less incorporated air generally gives gelato a denser, smoother body, while the warmer serving temperature keeps it softer and allows aromas to become perceptible quickly on the palate."
        ]
      ],
      [
        "Fat, Texture and Flavour",
        [
          "Many traditional gelato recipes also use a lower proportion of cream than classic premium ice creams, although the exact fat content depends on the flavour and formulation. This matters because fat changes how flavour is perceived: a well-balanced gelato aims to feel creamy without allowing richness to dominate the ingredient itself.",
          "That is why a good pistachio gelato should taste recognisably of pistachio, a lemon sorbetto should remain bright and fresh, and a fior di latte should express the clean character of milk rather than simply sweetness."
        ]
      ],
      [
        "Gelato as Everyday Italian Culture",
        [
          "In Italy, gelato is not reserved for formal dining or special occasions. The neighbourhood gelateria is part of everyday social life: an afternoon stop, an evening walk, a family ritual or a small pleasure shared with friends.",
          "This accessibility is part of what makes gelato distinctive. It can showcase excellent ingredients and highly refined technique while still being served in a simple cup or cone. The craft is sophisticated; the experience does not need to be."
        ]
      ],
      [
        "Tradition Leaves Room for Innovation",
        [
          "Italian gelato has never been limited to a fixed list of flavours. Alongside chocolate, hazelnut, pistachio, coffee, fruit and fior di latte, gelatieri have long experimented with herbs, spices, extra virgin olive oil, cheeses and other ingredients that cross the usual boundary between sweet and savoury.",
          "The important point is not novelty for its own sake. Innovation works when the added ingredient remains recognisable and the balance of sweetness, aroma and texture still feels intentional."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat explores this meeting of tradition and experimentation through Truffle Gelato: an Italian-inspired concept in which the creamy, gently sweet base of gelato becomes a background for the distinctive aroma of truffle. The aim is not to replace classic flavours, but to offer another way to discover an Italian ingredient."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Gelato and ice cream belong to the same broad family of frozen desserts, but traditional Italian gelato is shaped by a different balance of air, fat, serving temperature and flavour. The result is not simply a different recipe, but a different way of experiencing a frozen dessert.",
    "relatedSlugs": [
      "story-of-italian-gelato",
      "truffle-meets-dessert",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "story-of-italian-gelato",
    "lang": "en",
    "topic": "gelato",
    "topicLabel": "Italian Gelato Academy",
    "column": "Italian Gelato Academy",
    "artClass": "is-gelato",
    "eyebrow": "Italian Gelato Academy",
    "title": "The Story of Italian Gelato: From Frozen Desserts to the Gelateria",
    "meta": "Italian Gelato Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "story-of-italian-gelato.webp",
    "intro": "The history of gelato is not the story of a single invention. It is a gradual evolution in which older frozen preparations, Italian court culture, technical experimentation and artisan practice eventually came together in the modern gelateria.",
    "opening": [],
    "sections": [
      [
        "Before Modern Gelato",
        [
          "People in several ancient cultures experimented with snow, ice, fruit, syrups and sweetened drinks long before modern refrigeration existed. These preparations were not gelato in the modern sense, but they show that the pleasure of chilled desserts is much older than the technology used to produce them today.",
          "In Italy, Renaissance courts - particularly those associated with Florence and other major cultural centres - appear prominently in many historical accounts of increasingly refined frozen desserts. Recipes, techniques and stories from this period vary, so it is more useful to see the Renaissance as part of a longer development rather than as one precise “birth date” for gelato."
        ]
      ],
      [
        "From Court Dessert to Artisan Craft",
        [
          "As cooling techniques improved and specialised preparation became more practical, frozen desserts gradually moved beyond elite tables. The important transformation was not simply a new ingredient list; it was the emergence of craft knowledge.",
          "The gelatiere became someone who understood temperature, freezing, sugar balance, texture, seasonality and the behaviour of individual ingredients. Different flavours required different adjustments rather than one universal recipe."
        ]
      ],
      [
        "The Italian Gelateria",
        [
          "Over time, the gelateria became a familiar part of Italian neighbourhood life. It created a distinctive social setting: less formal than a restaurant, more specialised than an ordinary café, and closely connected to the rhythm of streets, piazzas and evening walks.",
          "That combination of craftsmanship and informality helps explain why gelato became such a powerful symbol of Italian food culture. High technical skill can be experienced in the most uncomplicated format: a cup, a cone and a flavour chosen at the counter."
        ]
      ],
      [
        "Classic Ingredients, Continuing Creativity",
        [
          "Pistachio, hazelnut, chocolate, coffee, citrus fruits, seasonal fruit and fior di latte remain classic points of reference. Their strength lies in recognisable ingredients rather than excessive complexity.",
          "At the same time, tradition has never meant standing still. Contemporary gelato continues to explore new pairings while keeping the core discipline unchanged: the flavour should be clear, the texture should support it, and the recipe should remain balanced."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat uses this history as a starting point rather than a boundary. Its Truffle Gelato concept connects a traditional Italian frozen-dessert format with one of Italy’s most distinctive gourmet ingredients, presenting innovation as a continuation of Italian culinary curiosity rather than a rejection of tradition."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "The history of gelato is not the story of a single invention. It is a gradual evolution in which older frozen preparations, Italian court culture, technical experimentation and artisan practice eventually came together in the modern gelateria.",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "truffle-meets-dessert",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "truffle-meets-dessert",
    "lang": "en",
    "topic": "gelato",
    "topicLabel": "Italian Gelato Academy",
    "column": "Italian Gelato Academy",
    "artClass": "is-gelato",
    "eyebrow": "Italian Gelato Academy",
    "title": "Truffle Beyond Savoury Cuisine: When Truffle Meets Dessert",
    "meta": "Italian Gelato Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "truffle-meets-dessert.webp",
    "intro": "Truffle is usually associated with pasta, risotto, eggs and cheese. Yet truffle is above all an aromatic ingredient, and aroma can interact with sweetness, dairy, chocolate and other dessert elements in surprisingly coherent ways.",
    "opening": [],
    "sections": [
      [
        "Understanding Truffle Through Aroma",
        [
          "The character of truffle is experienced largely through its complex aroma. That is why a relatively small amount can change the perception of an entire dish. Warmth, fat and mild supporting ingredients can all influence how that aroma is released and perceived.",
          "This principle is familiar in savoury cooking, but it also helps explain why truffle can work in selected desserts. The goal is not to make a sweet dish taste “savoury”; it is to create a contrast in which the truffle remains recognisable without overwhelming the other components."
        ]
      ],
      [
        "Sweet and Savoury Are Not Opposites",
        [
          "Contemporary gastronomy frequently uses contrast: salted caramel, fruit with cheese, honey with mature cheese, chilli with chocolate, or extra virgin olive oil with cakes and gelato. These combinations work when sweetness, bitterness, saltiness, fat and aroma are kept in proportion.",
          "Truffle can enter the same logic. Used carefully, its earthy and aromatic profile can introduce depth into a sweet preparation rather than simply adding novelty."
        ]
      ],
      [
        "Chocolate, Honey and Cream",
        [
          "Dark chocolate can be particularly interesting because its bitterness and roasted notes create a strong aromatic partner. White chocolate offers the opposite approach: a sweeter, creamier background against which the truffle becomes the unexpected accent.",
          "Honey can bridge sweet and savoury flavours, while cream-based preparations provide a gentle, fatty base that carries aroma well. These are reasons truffle can be explored in creams, sauces, semifreddi and frozen desserts."
        ]
      ],
      [
        "Why Gelato Works",
        [
          "Gelato is especially suitable for this experiment because its texture can carry aroma while its sweetness can be controlled. As it softens in the mouth, the sensory experience changes gradually: first creaminess and sweetness, then a more distinct aromatic note.",
          "A successful truffle gelato should therefore feel balanced rather than aggressively flavoured. Truffle should have a clear presence, but the dessert still needs the smoothness and pleasure expected from gelato."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "This is one of the clearest points where LuxurEat’s product story belongs naturally inside the Academy. LuxurEat Truffle Gelato Mix is conceived around this contrast: a simplified preparation format designed to make an unusual Italian-inspired truffle dessert accessible beyond specialist restaurant kitchens, while keeping truffle itself at the centre of the experience."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Truffle is usually associated with pasta, risotto, eggs and cheese. Yet truffle is above all an aromatic ingredient, and aroma can interact with sweetness, dairy, chocolate and other dessert elements in surprisingly coherent ways.",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "evo-vs-common-cooking-oil",
    "lang": "en",
    "topic": "olive",
    "topicLabel": "Olive Oil Academy",
    "column": "Olive Oil Academy",
    "artClass": "is-olive",
    "eyebrow": "Olive Oil Academy",
    "title": "Italian Extra Virgin Olive Oil vs Common Cooking Oil: What Makes EVO Different?",
    "meta": "Olive Oil Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "evo-vs-common-cooking-oil.webp",
    "intro": "“Olive oil” is not one single product category. Extra Virgin Olive Oil (EVO) is defined by how it is obtained and by chemical and sensory criteria, while refined oils and olive-pomace oils are produced through different processes and have different characteristics.",
    "opening": [],
    "sections": [
      [
        "What “Extra Virgin” Actually Means",
        [
          "Under international standards, virgin olive oils are obtained from olives solely by mechanical or other physical means under conditions that do not alter the oil. Extra Virgin Olive Oil must also meet strict chemical and sensory requirements, including free acidity of no more than 0.8 grams of oleic acid per 100 grams of oil.",
          "One useful distinction concerns the phrase “cold extraction.” It is not a requirement for every oil to qualify as extra virgin. Under EU marketing rules, the phrase may be used only for virgin or extra virgin oils obtained below 27°C under the specified extraction conditions. In other words, “extra virgin” is the category; “cold extraction” is an additional production claim."
        ]
      ],
      [
        "Not All Olive Oils Are the Same",
        [
          "A bottle labelled Extra Virgin Olive Oil is different from a bottle labelled simply “Olive Oil.” The latter is generally a blend of refined olive oil and virgin olive oil. Olive-pomace oil belongs to another category again and is produced from olive pomace using processes that differ from virgin-oil extraction.",
          "This is why the front label matters. Consumers should look for the exact category rather than assuming that every product containing the words “olive oil” offers the same sensory character or production method."
        ]
      ],
      [
        "Regional Character Rather Than a Single “Best” Region",
        [
          "Italian EVO reflects cultivar, harvest timing, climate, soil and milling choices. Tuscany and Umbria are often associated with pronounced grassy, bitter and pungent profiles; Ligurian oils can be more delicate; Puglia and Sicily produce a wide range of styles from robust to fruit-forward.",
          "It is more useful to think in terms of style and pairing than to rank one region as universally “best.” A more assertive oil may suit grilled vegetables or meat, while a delicate oil can work beautifully with fish, vegetables or lighter dishes."
        ]
      ],
      [
        "Bitterness and Pungency Can Be Positive",
        [
          "Fresh extra virgin olive oils can show bitterness on the tongue and a peppery or pungent sensation in the throat. These are recognised sensory characteristics and can be associated with naturally occurring phenolic compounds.",
          "Intensity varies by cultivar, harvest, processing and age, so a stronger throat sensation should not be treated as a simple test of authenticity or quality. Professional assessment considers the overall sensory profile and the absence of defects, not one sensation in isolation."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat’s role is not simply to present “olive oil” as a generic premium ingredient. The product story should connect origin, producer, sensory character, intended use and traceability, helping Chinese consumers understand why one EVO can taste and behave very differently from another."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "“Olive oil” is not one single product category. Extra Virgin Olive Oil (EVO) is defined by how it is obtained and by chemical and sensory criteria, while refined oils and olive-pomace oils are produced through different processes and have different characteristics.",
    "relatedSlugs": [
      "story-of-italian-evo",
      "evo-chocolate-dessert",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "story-of-italian-evo",
    "lang": "en",
    "topic": "olive",
    "topicLabel": "Olive Oil Academy",
    "column": "Olive Oil Academy",
    "artClass": "is-olive",
    "eyebrow": "Olive Oil Academy",
    "title": "The Story of Italian Extra Virgin Olive Oil: From Mediterranean Staple to Regional Craft",
    "meta": "Olive Oil Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "story-of-italian-evo.webp",
    "intro": "Olive oil predates modern Italy by centuries, but the Italian peninsula developed an unusually rich regional culture around olive growing, milling, cooking and tasting. Today’s EVO is the modern expression of that long agricultural and culinary history.",
    "opening": [],
    "sections": [
      [
        "Older Than Modern Italy",
        [
          "Olive cultivation spread through the Mediterranean long before Italy existed as a nation. Greek settlement, Roman agriculture and Mediterranean trade all helped make olive oil an important food, commodity and everyday material on the Italian peninsula.",
          "During the Roman era, olive oil moved through organised trade networks and was used not only in cooking but also in lighting, cosmetics and ritual. Its importance was economic as well as gastronomic."
        ]
      ],
      [
        "Regional Identity Took Shape",
        [
          "After the Roman period, olive culture remained highly local. Different areas developed their own cultivars, harvest habits, milling practices and flavour preferences in response to climate, landscape and food traditions.",
          "That regional diversity still defines Italian EVO. Tuscany, Umbria, Liguria, Puglia, Sicily, Calabria, Garda and many other areas produce oils with markedly different sensory profiles. PDO and PGI systems now protect a number of these geographical identities."
        ]
      ],
      [
        "From Traditional Judgement to Modern Standards",
        [
          "For much of history, quality was assessed through experience, reputation and taste. During the twentieth century, chemical analysis and formal sensory assessment became increasingly important, and international and European standards created clearer categories for virgin, extra virgin, refined and other olive oils.",
          "This modern framework does not replace craftsmanship. It gives producers and consumers a shared language for discussing a product that is still strongly shaped by agriculture, timing and technique."
        ]
      ],
      [
        "Why EVO Is Compared with Wine",
        [
          "A fine extra virgin olive oil can express cultivar, place, harvest and production choices in a way that invites comparison with wine. Tasters speak about fruitiness, bitterness, pungency and aromatic notes; chefs choose different oils for different foods.",
          "The comparison is useful because it moves olive oil away from the idea of a neutral kitchen commodity. The oil itself can contribute flavour and identity to the finished dish."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat uses this regional approach to present Italian EVO as a product with a place, a producer and a sensory identity. For the Chinese market, that story becomes more credible when it is supported by clear origin information, product documentation and practical guidance on how the oil is best used."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Olive oil predates modern Italy by centuries, but the Italian peninsula developed an unusually rich regional culture around olive growing, milling, cooking and tasting. Today’s EVO is the modern expression of that long agricultural and culinary history.",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "evo-chocolate-dessert",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "evo-chocolate-dessert",
    "lang": "en",
    "topic": "olive",
    "topicLabel": "Olive Oil Academy",
    "column": "Olive Oil Academy",
    "artClass": "is-olive",
    "eyebrow": "Olive Oil Academy",
    "title": "Extra Virgin Olive Oil Beyond the Salad: When EVO Meets Chocolate and Dessert",
    "meta": "Olive Oil Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "evo-chocolate-dessert.webp",
    "intro": "Extra Virgin Olive Oil is usually introduced through savoury dishes, but its fruitiness, bitterness and aroma can also create sophisticated contrasts with chocolate, cake and gelato. The key is choosing the right oil and using it with restraint.",
    "opening": [],
    "sections": [
      [
        "More Than a Cooking Fat",
        [
          "Extra Virgin Olive Oil contributes more than richness. A well-made oil can bring grassy, herbaceous, fruity, bitter, peppery or nut-like notes of its own. That aromatic personality is precisely what makes it interesting in desserts.",
          "In pastry, butter often provides body and richness. EVO can perform part of that structural role in some recipes while also introducing a flavour of its own. The result is not automatically “lighter” or “healthier”; it is simply a different sensory approach."
        ]
      ],
      [
        "Chocolate and EVO",
        [
          "Dark chocolate and assertive EVO can work together because both may show bitterness and aromatic depth. A small amount of oil drizzled over dark chocolate, used in a ganache-style preparation or incorporated into a cake can extend the flavour rather than hide it.",
          "Milder, fruitier oils can also work with milk chocolate or citrus-based desserts. Matching intensity matters: a very pungent oil can dominate a delicate dessert, while an extremely mild oil may disappear completely."
        ]
      ],
      [
        "Gelato as a Simple Pairing",
        [
          "One of the easiest ways to understand the combination is a neutral or gently flavoured gelato - such as fior di latte or vanilla - finished with a few drops of fruity EVO and a small touch of salt.",
          "The contrast is immediate: cold and creamy against aromatic and slightly bitter. Because the preparation is so simple, the quality and style of the oil are easy to perceive."
        ]
      ],
      [
        "Balance, Not Shock Value",
        [
          "EVO in dessert should not be treated as a gimmick. The objective is the same as in savoury pairing: use enough to make the oil recognisable without allowing it to overpower the base dessert.",
          "That makes dessert pairing a useful way to teach consumers that Extra Virgin Olive Oil is not one neutral flavour, but an ingredient with a spectrum of styles."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat’s selected Italian EVOs can be presented not only for salads and everyday cooking, but also through pairing content that lets consumers discover their aromatic character. Linking each oil to specific recipes - chocolate, citrus cake, gelato or fruit - turns product promotion into practical education."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Extra Virgin Olive Oil is usually introduced through savoury dishes, but its fruitiness, bitterness and aroma can also create sophisticated contrasts with chocolate, cake and gelato. The key is choosing the right oil and using it with restraint.",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "choose-use-store-evo",
    "lang": "en",
    "topic": "olive",
    "topicLabel": "Olive Oil Academy",
    "column": "Olive Oil Academy",
    "artClass": "is-olive",
    "eyebrow": "Olive Oil Academy",
    "title": "How to Choose, Use and Store Italian Extra Virgin Olive Oil at Home",
    "meta": "Olive Oil Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "olive-cover-10.webp",
    "intro": "Choosing a good EVO does not require professional tasting training. A few practical habits - reading the category correctly, checking origin information, protecting the oil from light and heat, and matching intensity to the dish - make a much bigger difference than judging the bottle by colour alone.",
    "opening": [],
    "sections": [
      [
        "Read the Label Carefully",
        [
          "Start with the exact category: “Extra Virgin Olive Oil” should be clearly stated. Then look at origin information, producer or bottler details, geographical indications where relevant, and harvest information when it is provided.",
          "A dark bottle or tin helps protect the oil, but packaging alone does not prove quality. Colour is also unreliable: excellent oils can range from golden to deep green. Aroma, taste, freshness and traceability are more meaningful than appearance."
        ]
      ],
      [
        "Storage Matters",
        [
          "Light, heat and oxygen gradually reduce the aromatic quality of olive oil. Keep the bottle tightly closed and away from direct sunlight, radiators and the heat around the stove.",
          "After opening, use the oil regularly rather than saving it indefinitely for “special occasions.” EVO is at its best when its fresh aromatic character is still present."
        ]
      ],
      [
        "Raw and Cooked Uses",
        [
          "Extra Virgin Olive Oil can be used both raw and in cooking. Heating changes some of its fresh aromas, which is why a good oil often shows its personality most clearly when added at the end of cooking.",
          "Try it over vegetables, soup, grilled fish, legumes, bread, pasta, meat or even selected desserts. The question is not simply “Can I cook with EVO?” but “Which qualities of this oil do I want to preserve or emphasise in this dish?”"
        ]
      ],
      [
        "Choose by Style, Not Prestige Alone",
        [
          "A robust, bitter and pungent oil can stand up to grilled vegetables, meat and strongly flavoured foods. A delicate oil may suit fish, steamed vegetables, mild cheeses or desserts. Fruity oils can be especially versatile.",
          "There is no need for one universal bottle to do everything. Understanding style makes selection more useful than relying only on price, packaging or a famous region name."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat can turn each EVO product page into a practical guide: where the oil comes from, what it tastes like, how intense it is, which dishes suit it and how to store it. This creates a stronger reason to choose a specific bottle than generic “premium Italian olive oil” language."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Choosing a good EVO does not require professional tasting training. A few practical habits - reading the category correctly, checking origin information, protecting the oil from light and heat, and matching intensity to the dish - make a much bigger difference than judging the bottle by colour alone.",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "evo-chocolate-dessert"
    ]
  },
  {
    "slug": "neapolitan-roman-pizza-styles",
    "lang": "en",
    "topic": "pizza",
    "topicLabel": "Pizza Academy",
    "column": "Pizza Academy",
    "artClass": "is-pizza",
    "eyebrow": "Pizza Academy",
    "title": "Pizza Napoletana and Roman Pizza Styles: Why “Italian Pizza” Is Not One Thing",
    "meta": "Pizza Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "neapolitan-roman-pizza-styles.webp",
    "intro": "Outside Italy, pizza is often treated as one universal dish. Inside Italy, dough texture, baking method, shape and eating occasion can change dramatically from one city and style to another. Naples and Rome offer two of the clearest examples.",
    "opening": [],
    "sections": [
      [
        "Pizza Napoletana: Soft, Airy and Fast-Baked",
        [
          "Pizza Napoletana is registered in the European Union as a Traditional Speciality Guaranteed (TSG), with a specification that defines ingredients and preparation for the protected name. It is associated with a soft centre, a raised and airy cornicione and a very short bake in an extremely hot wood-fired oven.",
          "The finished pizza is flexible rather than cracker-crisp. It may be eaten at the table with knife and fork or folded for street eating. The softness of the centre is part of the style, not a sign that the pizza is undercooked."
        ]
      ],
      [
        "Rome Has More Than One Pizza Style",
        [
          "“Roman pizza” is not a single strict category. One familiar form is pizza romana tonda: a round pizza known for a thinner, crisper base. Another is pizza al taglio, baked in rectangular trays, cut into pieces and commonly sold by weight.",
          "These formats create a different eating experience from Neapolitan pizza. Crispness, portability and slice-based service can matter as much as the topping itself."
        ]
      ],
      [
        "Regional Style Changes Technique",
        [
          "The contrast between Naples and Rome shows why pizza should be understood as a family of Italian traditions rather than one standardised product. Flour choice, dough management, fermentation, shaping, oven type and serving format all contribute to the result.",
          "Neither approach is “better.” A soft Neapolitan pizza and a crisp Roman pizza are trying to achieve different textures."
        ]
      ],
      [
        "Culture Is Part of the Product",
        [
          "In 2017, UNESCO inscribed the art of the Neapolitan pizzaiuolo on the Representative List of the Intangible Cultural Heritage of Humanity. The recognition concerns the craft, gestures, knowledge and social practice surrounding the pizzaiuolo - not simply a recipe.",
          "That distinction is useful for consumers: authentic food culture is not created by an Italian flag on a package alone. It comes from technique, context and continuity of practice."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "For LuxurEat, a stronger pizza proposition begins by explaining these differences. Flour blends, tomato, EVO and other products become more meaningful when the consumer understands which Italian style they are intended to support and what texture or technique that style is trying to achieve."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Outside Italy, pizza is often treated as one universal dish. Inside Italy, dough texture, baking method, shape and eating occasion can change dramatically from one city and style to another. Naples and Rome offer two of the clearest examples.",
    "relatedSlugs": [
      "story-of-italian-pizza",
      "modern-pinsa-romana",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "story-of-italian-pizza",
    "lang": "en",
    "topic": "pizza",
    "topicLabel": "Pizza Academy",
    "column": "Pizza Academy",
    "artClass": "is-pizza",
    "eyebrow": "Pizza Academy",
    "title": "The Story of Italian Pizza: From Naples to a Global Icon",
    "meta": "Pizza Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "story-of-italian-pizza.webp",
    "intro": "Pizza became one of the world’s most recognisable foods, but its modern identity is rooted in Naples and in the everyday food culture of the eighteenth and nineteenth centuries. Its global success came later - through migration, adaptation and the international appeal of a simple, flexible format.",
    "opening": [],
    "sections": [
      [
        "Humble Beginnings in Naples",
        [
          "Flatbreads with toppings existed throughout the Mediterranean long before modern pizza. What changed in Naples was the emergence of the recognisable combination of leavened dough, tomato and other accessible toppings as an inexpensive urban food.",
          "Tomato, introduced to Europe after contact with the Americas, became increasingly accepted in southern Italian cooking and eventually became one of the ingredients most strongly associated with Neapolitan pizza."
        ]
      ],
      [
        "The Margherita Story",
        [
          "A popular tradition links the Pizza Margherita to pizzaiolo Raffaele Esposito and a royal visit by Queen Margherita in 1889, with tomato, mozzarella and basil representing the colours of the Italian flag.",
          "Historians continue to debate how literally every detail of that story should be read, but the Margherita became an enduring symbol: a simple pizza with a powerful national and international identity."
        ]
      ],
      [
        "Migration Made Pizza Global",
        [
          "Italian emigrants carried pizza traditions to the United States, South America and elsewhere. Local ovens, ingredients and tastes produced new styles, while pizza within Italy continued to develop regionally - from Roman formats to Sicilian sfincione and many local variations.",
          "The result is a useful paradox: pizza is globally adaptable, but the strongest versions still tend to have a clear identity rather than being a random collection of toppings."
        ]
      ],
      [
        "Protecting Craft and Tradition",
        [
          "Pizza Napoletana entered the EU register of Traditional Specialities Guaranteed in 2010. In 2017, UNESCO separately recognised the art of the Neapolitan pizzaiuolo as intangible cultural heritage.",
          "These recognitions show that pizza can be both everyday food and serious culinary heritage. Its value lies not in complexity, but in the accumulated knowledge behind dough, fermentation, heat and ingredient balance."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat can use pizza as a gateway into Italian food culture: explain the style first, then introduce the flour, EVO, tomato or topping that helps recreate it. Product becomes the application of the story, rather than the story becoming an excuse for the product."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Pizza became one of the world’s most recognisable foods, but its modern identity is rooted in Naples and in the everyday food culture of the eighteenth and nineteenth centuries. Its global success came later - through migration, adaptation and the international appeal of a simple, flexible format.",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "modern-pinsa-romana",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "modern-pinsa-romana",
    "lang": "en",
    "topic": "pizza",
    "topicLabel": "Pizza Academy",
    "column": "Pizza Academy",
    "artClass": "is-pizza",
    "eyebrow": "Pizza Academy",
    "title": "Beyond Classic Pizza: Discovering Modern Pinsa Romana",
    "meta": "Pizza Academy · 2026",
    "archive": "Academy / Culture",
    "imageFile": "modern-pinsa-romana.webp",
    "intro": "Pinsa Romana is best understood as a modern Roman baking innovation rather than an ancient recipe revived unchanged from antiquity. Its identity comes from a distinctive dough concept, an elongated shape and a texture that sits somewhere between familiar pizza expectations and contemporary bakery technique.",
    "opening": [],
    "sections": [
      [
        "A Modern Roman Innovation",
        [
          "The modern commercial form of Pinsa Romana emerged around the beginning of the twenty-first century. Presenting it this way is more accurate - and more interesting - than relying on exaggerated claims that it is a direct survival of an ancient Roman recipe.",
          "Its success shows that Italian food culture is still capable of creating new formats while drawing on familiar principles: fermentation, flour, hydration, careful baking and restrained toppings."
        ]
      ],
      [
        "A Distinctive Dough Concept",
        [
          "Pinsa-style doughs are commonly associated with blends that can include wheat, rice and soy flours, together with high hydration and relatively long fermentation. Exact formulas vary by producer and product.",
          "These choices are designed to create a light, open internal structure and a thin, crisp exterior. That sensory impression is the safer and more useful point to communicate than promising that Pinsa will necessarily be “easier to digest,” since individual digestion varies and product formulations are not identical."
        ]
      ],
      [
        "Shape as Part of the Identity",
        [
          "Pinsa is typically stretched into an elongated or oval form rather than the classic round pizza shape. The visual difference helps consumers recognise it immediately and supports a different service style: it can be topped before or after baking, sliced for sharing, or used as a base for both classic and contemporary ingredients.",
          "The name is often linked to the Latin verb pinsere, meaning to press or stretch, but the strongest modern identity comes from the product itself rather than from claims of ancient continuity."
        ]
      ],
      [
        "Innovation Without Losing Italian Logic",
        [
          "Pinsa works because the innovation remains legible. The dough has a clear texture, the toppings can stay simple, and the product still depends on the Italian principle of giving a few ingredients enough space to be tasted.",
          "It is therefore a useful Academy example: Italian tradition is not frozen in the past. It can also be a framework for new products that respect technique and ingredient balance."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "Pinsa is especially relevant for LuxurEat because the product story can connect directly to specialised flour blends and practical home or HORECA preparation. The strongest message is not “ancient Roman miracle dough,” but a modern Italian format with a recognisable texture, shape and method.",
          "More directly promotional articles in which preparation and product use are central to the reader’s intent."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Pinsa Romana is best understood as a modern Roman baking innovation rather than an ancient recipe revived unchanged from antiquity. Its identity comes from a distinctive dough concept, an elongated shape and a texture that sits somewhere between familiar pizza expectations and contemporary bakery technique.",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "truffle-gelato-at-home",
    "lang": "en",
    "topic": "gelato",
    "topicLabel": "Italian Gelato Academy",
    "column": "Italian Gelato Academy",
    "artClass": "is-gelato",
    "eyebrow": "Italian Gelato Academy",
    "title": "How to Prepare Italian-Inspired Truffle Gelato at Home",
    "meta": "Italian Gelato Academy · 2026",
    "archive": "Product & Practical Application",
    "imageFile": "truffle-gelato-at-home.webp",
    "intro": "Truffle Gelato is an unusual dessert, but the preparation experience does not need to be complicated. The LuxurEat concept uses a powdered mix to move the technically difficult part - formulation - away from the consumer and make the final dessert easier to prepare close to the moment it will be served.",
    "opening": [],
    "sections": [
      [
        "Why Use a Powdered Preparation?",
        [
          "Finished gelato requires frozen storage and transport. A powdered preparation follows a different model: the dry base can be stored and distributed without transporting the final dessert in a frozen state, and the gelato is prepared locally.",
          "This can be practical for home users as well as restaurants, boutique hotels, cafés, catering and other food-service settings that want to introduce an unusual dessert without importing tubs of finished frozen gelato."
        ]
      ],
      [
        "From Package to Dessert",
        [
          "The exact quantities and preparation method should always follow the final instructions supplied with the LuxurEat product. The purpose of the mix is to simplify the balance of dry ingredients and truffle flavour so that the user can focus on preparation, freezing and serving rather than professional gelato formulation.",
          "Depending on the final product instructions and the equipment available, the preparation may be processed with a domestic ice-cream/gelato machine or with a simplified home method. Texture will naturally depend on freezing method and serving temperature."
        ]
      ],
      [
        "Serving Truffle Gelato",
        [
          "Truffle Gelato can be served on its own in a small portion, allowing the aroma to remain the main feature. It can also be paired with dark chocolate, roasted hazelnuts, pistachios, a mild honey or selected fruits for contrast.",
          "The principle is restraint. Too many toppings can make an unusual flavour harder to understand. A simple presentation often makes the truffle character feel more deliberate and premium."
        ]
      ],
      [
        "Preparation Is Part of the Experience",
        [
          "Making the dessert rather than simply opening a ready-made container changes the consumer experience. There is anticipation in mixing, freezing, serving and revealing an unexpected flavour to guests.",
          "That makes Truffle Gelato suitable not only as a dessert, but also as a product experience - something that can be prepared, photographed, shared and discussed."
        ]
      ],
      [
        "LuxurEat Application",
        [
          "LuxurEat Truffle Gelato Mix is intended to bring an Italian-inspired gourmet idea into a format that can work across home, hospitality and food-service contexts. Product-specific quantities, allergens, storage conditions and preparation steps should always be taken from the final approved packaging and technical sheet."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Truffle Gelato is an unusual dessert, but the preparation experience does not need to be complicated. The LuxurEat concept uses a powdered mix to move the technically difficult part - formulation - away from the consumer and make the final dessert easier to prepare close to the moment it will be served.",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-meets-dessert"
    ]
  },
  {
    "slug": "pizza-pinsa-at-home",
    "lang": "en",
    "topic": "pizza",
    "topicLabel": "Pizza Academy",
    "column": "Pizza Academy",
    "artClass": "is-pizza",
    "eyebrow": "Pizza Academy",
    "title": "How to Make Italian-Style Pizza and Pinsa at Home",
    "meta": "Pizza Academy · 2026",
    "archive": "Product & Practical Application",
    "imageFile": "pizza-pinsa-at-home.webp",
    "intro": "A domestic oven cannot reproduce every condition of a professional pizzeria, but home cooks can get much closer to Italian-style results by matching the dough, heat and toppings to the style they want to make.",
    "opening": [],
    "sections": [
      [
        "Choose the Style Before the Dough",
        [
          "A Neapolitan-style pizza aims for softness and an airy rim, while a crisp Roman-style pizza or a Pinsa-style base aims for a different texture. A purpose-designed flour or blend can give the home cook a more suitable starting point than one universal dough formula."
        ]
      ],
      [
        "Get the Most from a Home Oven",
        [
          "Preheat thoroughly. A pizza stone or steel needs time to store heat, and a short use of the grill/broiler near the end can help with top browning. Because domestic ovens run cooler than professional Neapolitan ovens, adapt the dough and baking time to the equipment you actually have."
        ]
      ],
      [
        "For Pinsa: Texture Before Claims",
        [
          "Pinsa-style doughs often use high hydration, longer fermentation and flour blends that can include wheat, rice and soy, aiming for a crisp exterior and light, open interior. Describe that texture directly rather than promising that the product will necessarily be “more digestible.”"
        ]
      ],
      [
        "Toppings: Less Is More",
        [
          "A classic Margherita demonstrates the logic clearly: tomato, mozzarella, basil and Extra Virgin Olive Oil. Two or three well-chosen toppings will often give a clearer Italian-style result than a heavily loaded pizza."
        ]
      ],
      [
        "LuxurEat Application",
        [
          "LuxurEat can support this experience with Italian-inspired flour blends and complementary ingredients for specific Pizza or Pinsa applications. Each product page should clearly state the intended style, allergens and final approved preparation method.",
          "Brand-facing market articles separated from evergreen Academy content."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "A domestic oven cannot reproduce every condition of a professional pizzeria, but home cooks can get much closer to Italian-style results by matching the dough, heat and toppings to the style they want to make.",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "modern-pinsa-romana"
    ]
  },
  {
    "slug": "china-italian-gelato",
    "lang": "en",
    "topic": "gelato",
    "topicLabel": "Italian Gelato Academy",
    "column": "Italian Gelato Academy",
    "artClass": "is-gelato",
    "eyebrow": "Italian Gelato Academy",
    "title": "Why China Is Discovering Italian Gelato",
    "meta": "Italian Gelato Academy · 2026",
    "archive": "China Market Insight",
    "imageFile": "china-italian-gelato.webp",
    "intro": "China already has a sophisticated frozen-dessert market. The opportunity for Italian gelato is therefore not to introduce the idea of ice cream from zero, but to explain why gelato can represent a different combination of craft, flavour, texture and Italian food culture.",
    "opening": [],
    "sections": [
      [
        "From Frozen Dessert to Gastronomic Culture",
        [
          "Chinese consumers are increasingly familiar with Italian food beyond pizza and pasta. Coffee, wine, Extra Virgin Olive Oil and regional ingredients have all helped broaden the picture of what “Italian food” can mean.",
          "Gelato fits naturally into that expansion because it is immediately accessible but still offers a strong craft story. Texture, visible flavour displays, ingredient quality and the social culture of the gelateria make it easy to communicate visually as well as through text."
        ]
      ],
      [
        "Premium Requires a Reason",
        [
          "Imported origin alone is not enough to justify a premium position. Consumers have access to many international brands and unusual flavours, so a product needs a clear reason to exist: a recognisable ingredient, a distinctive experience, credible quality and a story that is easy to understand.",
          "For Italian gelato, the strongest differentiator is not simply the Italian flag. It is the connection between technique, ingredient identity and the culture of the gelateria."
        ]
      ],
      [
        "Why Unusual Flavours Can Work",
        [
          "Digital food culture rewards discovery. A new flavour can be photographed, shared, reviewed and ordered quickly, but novelty fades just as quickly when there is no substance behind it.",
          "Truffle creates a stronger story because it already carries a clear association with Italian gastronomy. Pairing it with gelato is unexpected, but the two elements still belong to the same national food culture."
        ]
      ],
      [
        "From Home to HORECA",
        [
          "A preparation format that can be finished locally opens more than one route to market. Consumers can prepare the dessert at home, while restaurants, hotels, cafés and pastry businesses can use it as a menu concept.",
          "That flexibility is particularly useful when the product story is educational as well as commercial: the consumer is not only buying a flavour, but learning why the flavour combination makes sense."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat positions Truffle Gelato as a bridge between familiar Italian gelato culture and a less familiar gourmet ingredient. For the Chinese market, the promotional message should focus on discovery, preparation and Italian origin - supported by clear product information rather than relying on “luxury” language alone."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "China already has a sophisticated frozen-dessert market. The opportunity for Italian gelato is therefore not to introduce the idea of ice cream from zero, but to explain why gelato can represent a different combination of craft, flavour, texture and Italian food culture.",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-meets-dessert"
    ]
  },
  {
    "slug": "china-italian-evo",
    "lang": "en",
    "topic": "olive",
    "topicLabel": "Olive Oil Academy",
    "column": "Olive Oil Academy",
    "artClass": "is-olive",
    "eyebrow": "Olive Oil Academy",
    "title": "Why China Is Discovering Italian Extra Virgin Olive Oil",
    "meta": "Olive Oil Academy · 2026",
    "archive": "China Market Insight",
    "imageFile": "china-italian-evo.webp",
    "intro": "Olive oil is no longer presented in China only as an imported health-oriented product. As consumers become more familiar with international cooking, EVO has more room to be understood as a flavour ingredient with regional identity, culinary applications and measurable production standards.",
    "opening": [],
    "sections": [
      [
        "A Category Moving Beyond “Healthy Imported Oil”",
        [
          "For many consumers, the first encounter with olive oil came through broad health messaging rather than through Italian cooking. That created awareness, but it also flattened important differences between Extra Virgin Olive Oil, refined olive oil and other categories.",
          "The next stage is more educational: what “extra virgin” means, why origin matters, why bitterness and pungency can be part of the sensory profile, and how different oils match different foods."
        ]
      ],
      [
        "Origin and Traceability Matter More",
        [
          "As imported food markets mature, origin claims need to be supported by documentation and product-specific information. Consumers and professional buyers increasingly want to know who produced the product, where it came from, what the label means and how the supply chain is controlled.",
          "This is especially important for olive oil because two bottles can look similar while belonging to different legal categories and having very different flavour profiles."
        ]
      ],
      [
        "Education Creates Product Value",
        [
          "EVO can be difficult to differentiate if every bottle is described only as “premium,” “healthy” or “Italian.” A stronger approach is to teach the consumer how to taste it, store it and pair it, then explain the specific cultivar, region or style of the product being offered.",
          "That turns knowledge into commercial value without making the educational content feel like an advertisement."
        ]
      ],
      [
        "A Natural Fit for Chinese Home Cooking",
        [
          "EVO does not need to be limited to Western recipes. It can be used with vegetables, seafood, soups, noodles, grilled foods and cold dishes, provided the flavour of the oil suits the preparation.",
          "The opportunity is therefore not to ask Chinese consumers to abandon familiar cooking habits, but to show where an Italian ingredient can add a new aromatic dimension."
        ]
      ],
      [
        "LuxurEat Perspective",
        [
          "LuxurEat’s strongest EVO proposition in China is documented quality plus practical education: origin, category, flavour profile, storage, recommended uses and traceability. Promotional claims should be product-specific and verifiable, with marketplace links appearing after the consumer understands what makes the oil different."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Olive oil is no longer presented in China only as an imported health-oriented product. As consumers become more familiar with international cooking, EVO has more room to be understood as a flavour ingredient with regional identity, culinary applications and measurable production standards.",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "evo-chocolate-dessert"
    ]
  },
  {
    "slug": "china-pizza-pinsa",
    "lang": "en",
    "topic": "pizza",
    "topicLabel": "Pizza Academy",
    "column": "Pizza Academy",
    "artClass": "is-pizza",
    "eyebrow": "Pizza Academy",
    "title": "Why China Is Discovering Italian Pizza - and Why Pinsa Creates a New Entry Point",
    "meta": "Pizza Academy · 2026",
    "archive": "China Market Insight",
    "imageFile": "china-pizza-pinsa.webp",
    "intro": "Pizza is already widely known in China, which changes the challenge completely. The opportunity is not to introduce pizza itself, but to move the conversation from generic fast food toward regional styles, dough technique, ingredient quality and newer Italian formats such as Pinsa.",
    "opening": [],
    "sections": [
      [
        "Pizza Is Familiar; Italian Pizza Culture Is Less Familiar",
        [
          "Large international chains helped make pizza a mainstream category, but they also created a simplified image of what pizza is. The Italian landscape is much broader: Neapolitan, Roman round pizza, pizza al taglio, sfincione and many other regional forms differ in texture, preparation and context.",
          "That diversity gives educational content a commercial role. The more consumers understand style, the easier it becomes to explain why flour, fermentation, oven conditions and topping restraint matter."
        ]
      ],
      [
        "Craft Is a Point of Differentiation",
        [
          "In major cities, artisan pizzerias and more specialised Italian restaurants have helped create demand for a more technique-driven experience. Consumers who already know pizza can now compare crust, fermentation, flour, tomato, cheese and EVO rather than judging only by topping quantity.",
          "This creates space for products that help reproduce a specific style rather than simply carrying an Italian-looking package."
        ]
      ],
      [
        "Pinsa Offers Something New Without Being Alien",
        [
          "Pinsa is useful because it is visually and texturally different, yet still understandable to someone who already likes pizza and flatbreads. Its elongated shape, airy interior and crisp exterior create an immediate point of difference.",
          "The story should emphasise modern Roman innovation and technique rather than exaggerated ancient-origin or digestibility claims. That makes the product easier to defend and more credible."
        ]
      ],
      [
        "Home and Professional Opportunities",
        [
          "Flour blends and preparation systems can serve both home cooks and HORECA customers. For home users, convenience and clear instructions matter; for professionals, consistency, storage and menu differentiation become more important.",
          "In both cases, the strongest brand message is the same: identify the Italian style, explain the method, then show how the product helps the user achieve it."
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "Pizza is already widely known in China, which changes the challenge completely. The opportunity is not to introduce pizza itself, but to move the conversation from generic fast food toward regional styles, dough technique, ingredient quality and newer Italian formats such as Pinsa.",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "modern-pinsa-romana"
    ]
  },
  {
    "slug": "italian-gelato-vs-ice-cream",
    "lang": "zh",
    "topic": "gelato",
    "topicLabel": "意式手工冰淇淋学院",
    "column": "意式手工冰淇淋学院",
    "artClass": "is-gelato",
    "eyebrow": "意式手工冰淇淋学院",
    "title": "意式手工冰淇淋与普通冰淇淋：意大利传统究竟有何不同？",
    "meta": "意式手工冰淇淋学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "italian-gelato-vs-ice-cream.webp",
    "intro": "意式手工冰淇淋 和普通冰淇淋都属于冷冻甜品，但传统意式手工冰淇淋在空气含量、脂肪比例、食用温度和风味表达之间形成了不同的平衡。因此，差别并不只是“配方不同”，而是带来了一种不同的冷冻甜品体验。",
    "opening": [],
    "sections": [
      [
        "两种冷冻甜品，两种不同传统",
        [
          "在世界各地，意式手工冰淇淋 和 普通冰淇淋 经常被混用。实际上，不同配方之间差异很大，并不存在一条可以把所有 意式手工冰淇淋 与所有普通冰淇淋完全分开的公式。不过，意大利手工 意式手工冰淇淋 通常会打入更少的空气，并以略高于硬质冰淇淋的温度食用。",
          "这些差异会直接影响口感。空气含量较低，通常会让 意式手工冰淇淋 的质地更加紧实、细腻；较高的食用温度则让它保持柔软，也让香气更快在口腔中释放。"
        ]
      ],
      [
        "脂肪、质地与风味",
        [
          "许多传统 意式手工冰淇淋 配方使用的奶油比例也低于经典高脂冰淇淋，但具体脂肪含量仍取决于口味和配方。脂肪会影响人对风味的感知，因此一款平衡良好的 意式手工冰淇淋 应当有足够的奶香和顺滑感，却不应让浓厚感盖住食材本身。",
          "因此，好的开心果 意式手工冰淇淋 应该让人清楚尝到开心果；柠檬 意式雪葩 应保持明亮、清新的酸香；纯牛奶口味 则应突出牛奶干净自然的风味，而不是只剩甜味。"
        ]
      ],
      [
        "意式手工冰淇淋 是意大利日常文化的一部分",
        [
          "在意大利，意式手工冰淇淋 并不只属于正式餐饮或特殊场合。社区里的 手工冰淇淋专卖店 是日常社交生活的一部分：下午顺路停一下、晚饭后散步、家庭习惯，或和朋友分享的一点小享受。",
          "这种亲近感正是 意式手工冰淇淋 的特点之一。它可以体现优质原料和高度成熟的制作技术，却仍然可以装在一个简单的杯子或蛋筒里。工艺可以很精细，享用方式却不必复杂。"
        ]
      ],
      [
        "传统也为创新留出空间",
        [
          "意大利 意式手工冰淇淋 从来没有被固定在一张口味清单里。除了巧克力、榛子、开心果、咖啡、水果和 纯牛奶口味，手工冰淇淋师 也长期尝试香草、香料、特级初榨橄榄油、奶酪，以及其他跨越甜咸边界的食材。",
          "关键并不是为了新奇而新奇。真正有效的创新，是让加入的新食材依然清晰可辨，同时让甜度、香气和质地之间保持有意图的平衡。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 以松露 意式手工冰淇淋 探索传统与创新的结合：让细腻、微甜的意式手工冰淇淋成为背景，衬托松露鲜明而独特的香气。它并不是为了取代巧克力、开心果等经典口味，而是提供另一种认识意大利食材的方式。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "意式手工冰淇淋 和普通冰淇淋都属于冷冻甜品，但传统意式手工冰淇淋在空气含量、脂肪比例、食用温度和风味表达之间形成了不同的平衡。因此，差别并不只是“配方不同”，而是带来了一种不同的冷冻甜品体验。",
    "relatedSlugs": [
      "story-of-italian-gelato",
      "truffle-meets-dessert",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "story-of-italian-gelato",
    "lang": "zh",
    "topic": "gelato",
    "topicLabel": "意式手工冰淇淋学院",
    "column": "意式手工冰淇淋学院",
    "artClass": "is-gelato",
    "eyebrow": "意式手工冰淇淋学院",
    "title": "意式手工冰淇淋的故事：从早期冷冻甜品到 手工冰淇淋专卖店",
    "meta": "意式手工冰淇淋学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "story-of-italian-gelato.webp",
    "intro": "意式手工冰淇淋 的历史并不是某一次“发明”的故事，而是一段逐渐演变的过程：早期冷冻甜品、意大利宫廷文化、技术实验与手工艺传统，最终共同塑造了今天我们熟悉的 手工冰淇淋专卖店。",
    "opening": [],
    "sections": [
      [
        "现代 意式手工冰淇淋 之前",
        [
          "早在现代制冷技术出现之前，多个古代文化就曾使用雪、冰、水果、糖浆和甜味饮料制作冰凉甜品。这些食物并不是现代意义上的 意式手工冰淇淋，却说明人类对冷冻甜品的兴趣远早于今天的制作技术。",
          "在意大利，文艺复兴时期的宫廷——尤其是佛罗伦萨及其他重要文化中心——经常出现在关于精致冷冻甜品发展的历史叙述中。由于这一时期的配方、技术与传说并不完全一致，更准确的理解方式，是把文艺复兴视为长期演变的一部分，而不是为 意式手工冰淇淋 指定一个唯一的“诞生日”。"
        ]
      ],
      [
        "从宫廷甜品到手工技艺",
        [
          "随着降温和制冷方法改善，专业制作逐渐变得可行，冷冻甜品也开始走出精英阶层的餐桌。真正重要的变化并不只是增加了某种原料，而是形成了一套手工制作知识。",
          "手工冰淇淋师 开始成为理解温度、冻结、糖分平衡、质地、季节性以及不同食材特性的人。不同口味需要不同调整，而不是套用一个万能配方。"
        ]
      ],
      [
        "意大利 手工冰淇淋专卖店",
        [
          "随着时间推移，手工冰淇淋专卖店 成为意大利社区生活中常见的一部分。它形成了一种很特别的社交空间：比餐厅随意，比普通咖啡馆更专门，同时又和街道、广场以及晚间散步的节奏紧密相连。",
          "这种“精湛工艺 + 轻松日常”的组合，解释了为什么 意式手工冰淇淋 会成为如此有代表性的意大利饮食文化符号。高度专业的技术，最终可以浓缩成最简单的体验：一个杯子、一个蛋筒，以及在柜台前选中的一种口味。"
        ]
      ],
      [
        "经典原料与持续创新",
        [
          "开心果、榛子、巧克力、咖啡、柑橘、时令水果和 纯牛奶口味 仍是经典参照。它们的优势在于原料本身清晰可辨，而不是靠过度复杂来制造存在感。",
          "与此同时，传统从来不意味着停滞。当代 意式手工冰淇淋 仍在探索新的搭配，但核心原则没有改变：风味要清晰，质地要服务于风味，整体配方要保持平衡。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 把这段历史视为创新的起点，而不是边界。LuxurEat 松露 意式手工冰淇淋 将传统意大利冷冻甜品形式与意大利最具辨识度的高端食材之一——松露——结合，把创新呈现为意大利烹饪好奇心的延续，而不是对传统的否定。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "意式手工冰淇淋 的历史并不是某一次“发明”的故事，而是一段逐渐演变的过程：早期冷冻甜品、意大利宫廷文化、技术实验与手工艺传统，最终共同塑造了今天我们熟悉的 手工冰淇淋专卖店。",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "truffle-meets-dessert",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "truffle-meets-dessert",
    "lang": "zh",
    "topic": "gelato",
    "topicLabel": "意式手工冰淇淋学院",
    "column": "意式手工冰淇淋学院",
    "artClass": "is-gelato",
    "eyebrow": "意式手工冰淇淋学院",
    "title": "松露不只属于咸味料理：当松露遇见甜点",
    "meta": "意式手工冰淇淋学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "truffle-meets-dessert.webp",
    "intro": "提到松露，人们通常想到意面、烩饭、鸡蛋和奶酪。但松露首先是一种以香气见长的食材，而香气完全可以与甜味、乳制品、巧克力以及其他甜点元素形成出人意料却协调的组合。",
    "opening": [],
    "sections": [
      [
        "从香气理解松露",
        [
          "松露的个性很大程度上通过复杂香气被感知。因此，即使使用量不大，也可能改变整道菜的感受。温度、脂肪以及味道温和的配角食材，都会影响这些香气如何释放和被感知。",
          "这一原则在咸味料理中很常见，也能解释为什么松露可以进入部分甜点。目标不是把甜点做成“咸味”，而是在不压过其他元素的前提下，让松露依然能够被清楚辨认。"
        ]
      ],
      [
        "甜与咸并非对立面",
        [
          "现代料理经常利用对比：海盐焦糖、水果配奶酪、蜂蜜配成熟奶酪、辣椒配巧克力，或特级初榨橄榄油搭配蛋糕和 意式手工冰淇淋。当甜、苦、咸、脂肪感与香气保持比例时，这些组合就能成立。",
          "松露也可以遵循同样的逻辑。谨慎使用时，它泥土般深沉而复杂的香气能够为甜味料理增加层次，而不只是制造噱头。"
        ]
      ],
      [
        "巧克力、蜂蜜与奶油",
        [
          "黑巧克力尤其值得尝试，因为苦味与烘烤香能成为松露有力的香气伙伴。白巧克力则提供相反的方向：更甜、更奶油化的背景，让松露成为意外出现的香气重点。",
          "蜂蜜可以连接甜与咸；奶油类基底则味道温和、脂肪感柔顺，有利于承载香气。这也是松露能够被用于奶油、酱汁、半冷冻甜点 以及冷冻甜品的原因之一。"
        ]
      ],
      [
        "为什么 意式手工冰淇淋 合适",
        [
          "意式手工冰淇淋 很适合做这类尝试，因为它的质地可以承载香气，同时甜度又能得到控制。随着 意式手工冰淇淋 在口中逐渐软化，感官体验会分层展开：先是奶油感和甜味，随后更明显的香气逐渐出现。",
          "因此，一款成功的松露 意式手工冰淇淋 应该强调平衡，而不是让松露味道具有攻击性。松露需要有明确存在感，但甜品本身仍必须保留 意式手工冰淇淋 应有的顺滑与愉悦感。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "这是 LuxurEat 产品故事最适合自然进入“学院”内容的位置之一。LuxurEat 松露意式手工冰淇淋粉末基底 正是围绕这种反差构思：通过更简化的制备形式，让原本更常见于专业餐厅厨房的意大利风格松露甜品，也能在更广泛的场景中实现，同时让松露始终成为体验核心。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "提到松露，人们通常想到意面、烩饭、鸡蛋和奶酪。但松露首先是一种以香气见长的食材，而香气完全可以与甜味、乳制品、巧克力以及其他甜点元素形成出人意料却协调的组合。",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-gelato-at-home"
    ]
  },
  {
    "slug": "evo-vs-common-cooking-oil",
    "lang": "zh",
    "topic": "olive",
    "topicLabel": "橄榄油学院",
    "column": "橄榄油学院",
    "artClass": "is-olive",
    "eyebrow": "橄榄油学院",
    "title": "意大利特级初榨橄榄油与普通食用油：特级初榨橄榄油 到底有什么不同？",
    "meta": "橄榄油学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "evo-vs-common-cooking-oil.webp",
    "intro": "“橄榄油”并不是一个单一产品类别。特级初榨橄榄油（特级初榨橄榄油）由其取得方式以及化学和感官标准共同定义；精炼橄榄油和橄榄果渣油则采用不同工艺生产，因此也具有不同特征。",
    "opening": [],
    "sections": [
      [
        "“特级初榨”究竟意味着什么",
        [
          "按照国际标准，初榨橄榄油必须仅通过机械或其他物理方式从橄榄中获得，并且处理条件不能导致油品发生改变。特级初榨橄榄油还必须满足严格的化学与感官要求，其中包括游离酸度以油酸计不高于每 100 克油 0.8 克。",
          "另一个需要区分的词是“冷提取（冷提取）”。并不是所有特级初榨橄榄油都必须具备这一表述。按照欧盟营销规则，只有在规定提取条件下、低于 27°C 获得的初榨或特级初榨橄榄油，才可以使用这一说法。也就是说，“特级初榨”是产品类别，而“冷提取”是额外的生产方式声明。"
        ]
      ],
      [
        "不是所有橄榄油都一样",
        [
          "标注为“特级初榨橄榄油”的产品，与只标注“橄榄油”的产品并不相同。后者通常是精炼橄榄油与初榨橄榄油的混合物。橄榄果渣油则属于另一个类别，其原料和生产过程也不同于初榨橄榄油。",
          "这就是为什么正面标签很重要。消费者应关注准确的产品类别，而不是认为所有写着“橄榄油”的产品都具有相同的风味特征或生产方式。"
        ]
      ],
      [
        "与其评“最好产区”，不如理解地域风格",
        [
          "意大利 特级初榨橄榄油 的表现受橄榄品种、采收时间、气候、土壤和压榨选择等因素影响。托斯卡纳和翁布里亚常让人联想到较明显的青草、苦感与辛辣感；利古里亚的风格可能更细腻；普利亚和西西里则从强劲到果香突出都有多种类型。",
          "与其把某个地区简单评为“全意大利最好”，不如从风格和搭配角度理解。更有力量感的油可能适合烤蔬菜或肉类，而较细腻的油则可能更适合鱼类、蔬菜和口味轻盈的料理。"
        ]
      ],
      [
        "苦味和辛辣感可以是积极特征",
        [
          "新鲜的特级初榨橄榄油可能在舌面呈现苦味，也可能在咽喉产生胡椒般的辛辣或刺激感。这些都是被认可的感官特征，并可能与天然存在的酚类化合物有关。",
          "这种强度会随着品种、采收、加工和储存时间而变化，因此不能把“喉咙越辣”简单当成判断真伪或品质的单一标准。专业感官评价看的是整体风味轮廓和是否存在缺陷，而不是孤立地看某一种刺激感。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 的作用并不是把“橄榄油”笼统包装成一种高端食材。更有说服力的产品故事，应把产地、生产者、感官特征、适用场景和可追溯性连接起来，帮助中国消费者理解为什么不同 特级初榨橄榄油 在味道和使用表现上可能完全不同。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "“橄榄油”并不是一个单一产品类别。特级初榨橄榄油（特级初榨橄榄油）由其取得方式以及化学和感官标准共同定义；精炼橄榄油和橄榄果渣油则采用不同工艺生产，因此也具有不同特征。",
    "relatedSlugs": [
      "story-of-italian-evo",
      "evo-chocolate-dessert",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "story-of-italian-evo",
    "lang": "zh",
    "topic": "olive",
    "topicLabel": "橄榄油学院",
    "column": "橄榄油学院",
    "artClass": "is-olive",
    "eyebrow": "橄榄油学院",
    "title": "意大利特级初榨橄榄油的故事：从地中海日常食材到地域手工传统",
    "meta": "橄榄油学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "story-of-italian-evo.webp",
    "intro": "橄榄油的历史远早于现代意大利国家的形成，但意大利半岛围绕橄榄种植、压榨、烹饪与品鉴发展出了极其丰富的地域文化。今天的 特级初榨橄榄油，正是这段漫长农业与饮食历史的现代延续。",
    "opening": [],
    "sections": [
      [
        "比现代意大利更古老",
        [
          "在意大利成为统一国家之前很久，橄榄种植就已经在地中海地区传播。希腊殖民、罗马农业以及地中海贸易共同推动橄榄油成为意大利半岛重要的食物、商品和日常材料。",
          "在罗马时期，橄榄油通过有组织的贸易网络流通，不仅用于烹饪，也用于照明、化妆和仪式。它既具有饮食价值，也具有重要经济价值。"
        ]
      ],
      [
        "地域身份逐渐形成",
        [
          "罗马时期之后，橄榄文化长期保持高度地方化。不同地区根据气候、地形和饮食传统，发展出自己的橄榄品种、采收习惯、压榨方法与风味偏好。",
          "这种地域多样性今天仍然定义着意大利 特级初榨橄榄油。托斯卡纳、翁布里亚、利古里亚、普利亚、西西里、卡拉布里亚、加尔达等众多地区，都能生产出感官特征明显不同的橄榄油。PDO 和 PGI 等体系也保护了其中一部分地理身份。"
        ]
      ],
      [
        "从经验判断到现代标准",
        [
          "在很长的历史时期里，品质主要依靠经验、声誉和品尝来判断。进入 20 世纪后，化学分析和正式感官评定的重要性不断提高，国际及欧洲标准也逐步建立了更清晰的初榨、特级初榨、精炼等橄榄油分类。",
          "现代标准并没有取代手工经验，而是为生产者和消费者提供了一套共同语言，用来讨论一种仍然深受农业条件、时间节点和工艺影响的产品。"
        ]
      ],
      [
        "为什么 特级初榨橄榄油 经常被拿来和葡萄酒比较",
        [
          "优质特级初榨橄榄油能够表现出品种、产地、采收和生产选择，这一点很容易让人联想到葡萄酒。品鉴者会谈论果香、苦味、辛辣感和不同香气；厨师也会针对不同食物选择不同风格的油。",
          "这种比较的价值在于，它能帮助消费者摆脱“橄榄油只是中性的厨房用油”这一印象。橄榄油本身也可以为一道菜贡献鲜明风味和身份。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 以地域差异作为讲述意大利 特级初榨橄榄油 的重要方式：一瓶油应有明确的产地、生产者和感官身份。面向中国市场时，如果这些故事能由清晰的产地信息、产品文件以及具体使用建议支持，可信度会更高。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "橄榄油的历史远早于现代意大利国家的形成，但意大利半岛围绕橄榄种植、压榨、烹饪与品鉴发展出了极其丰富的地域文化。今天的 特级初榨橄榄油，正是这段漫长农业与饮食历史的现代延续。",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "evo-chocolate-dessert",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "evo-chocolate-dessert",
    "lang": "zh",
    "topic": "olive",
    "topicLabel": "橄榄油学院",
    "column": "橄榄油学院",
    "artClass": "is-olive",
    "eyebrow": "橄榄油学院",
    "title": "特级初榨橄榄油不只拌沙拉：当 特级初榨橄榄油 遇见巧克力和甜点",
    "meta": "橄榄油学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "evo-chocolate-dessert.webp",
    "intro": "特级初榨橄榄油通常通过咸味料理被认识，但它的果香、苦味和芳香同样可以与巧克力、蛋糕和 意式手工冰淇淋 形成细腻的对比。关键在于选择合适的油，并控制使用量。",
    "opening": [],
    "sections": [
      [
        "不仅仅是一种烹饪脂肪",
        [
          "特级初榨橄榄油带来的不只是油脂感。制作良好的油本身可能具有青草、香草、果香、苦味、胡椒感或坚果般的气息。正是这种独立的芳香个性，让它在甜点中具有趣味。",
          "在烘焙中，黄油常用于提供结构和浓郁度。特级初榨橄榄油 在部分配方中可以承担其中一部分作用，同时带入自己的风味。这并不自动意味着成品“更轻”或“更健康”，只是采用了不同的感官思路。"
        ]
      ],
      [
        "巧克力与 特级初榨橄榄油",
        [
          "黑巧克力和风格鲜明的 特级初榨橄榄油 可以相互呼应，因为两者都可能带有苦味和较深的香气层次。少量 特级初榨橄榄油 可以淋在黑巧克力上、用于类似 甘纳许 的配方，或加入蛋糕中，让风味延伸而不是被遮盖。",
          "较温和、果香更明显的油，也可以和牛奶巧克力或柑橘类甜点搭配。强度匹配非常重要：过于辛辣的油可能压过精致甜点，而过于温和的油则可能完全消失。"
        ]
      ],
      [
        "用 意式手工冰淇淋 理解这种搭配",
        [
          "最容易理解的方式之一，是选择 纯牛奶口味 或香草这类中性、柔和风味的 意式手工冰淇淋，在表面加入几滴果香型 特级初榨橄榄油，再配一点盐。",
          "这种反差非常直接：冰凉、奶油般的口感，对上芳香与轻微苦感。因为做法足够简单，橄榄油本身的品质和风格反而更容易被感知。"
        ]
      ],
      [
        "追求平衡，而不是“猎奇”",
        [
          "特级初榨橄榄油 用在甜点里不应该被当成噱头。它和咸味搭配遵循同一原则：使用量要足以让人识别出橄榄油，又不能让它盖过甜点基底。",
          "因此，甜点搭配也是一种很好的消费者教育方式：让人理解特级初榨橄榄油并非只有一种“中性油味”，而是存在从细腻到强劲的一整套风格。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 精选的意大利 特级初榨橄榄油 不必只围绕沙拉和日常烹饪来呈现，也可以通过搭配内容帮助消费者理解每款油的芳香性格。把具体橄榄油与巧克力、柑橘蛋糕、意式手工冰淇淋 或水果等食谱连接起来，就能把产品宣传转化为实用的风味教育。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "特级初榨橄榄油通常通过咸味料理被认识，但它的果香、苦味和芳香同样可以与巧克力、蛋糕和 意式手工冰淇淋 形成细腻的对比。关键在于选择合适的油，并控制使用量。",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "choose-use-store-evo"
    ]
  },
  {
    "slug": "choose-use-store-evo",
    "lang": "zh",
    "topic": "olive",
    "topicLabel": "橄榄油学院",
    "column": "橄榄油学院",
    "artClass": "is-olive",
    "eyebrow": "橄榄油学院",
    "title": "在家如何选择、使用和保存意大利特级初榨橄榄油",
    "meta": "橄榄油学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "olive-cover-10.webp",
    "intro": "挑选一瓶好的 特级初榨橄榄油 并不需要专业品油师训练。正确读懂产品类别、查看产地信息、避光避热保存，并根据菜肴选择合适的风味强度，这些实用习惯远比单纯看油的颜色更重要。",
    "opening": [],
    "sections": [
      [
        "认真读标签",
        [
          "第一步是确认准确类别：标签上应明确写出“特级初榨橄榄油”。随后可以查看原产信息、生产者或装瓶商资料，在适用时关注地理标志，以及产品是否提供采收信息。",
          "深色玻璃瓶或金属罐有助于保护油品，但包装本身并不能证明品质。颜色同样不可靠：优秀橄榄油既可能呈金黄色，也可能呈深绿色。香气、味道、新鲜度和可追溯性比外观更有意义。"
        ]
      ],
      [
        "保存方式很重要",
        [
          "光、热和氧气会逐渐削弱橄榄油的芳香品质。瓶盖应保持紧闭，并远离阳光直射、暖气和灶台周围的高温。",
          "开封后应正常使用，而不是为了“特殊场合”无限期保存。特级初榨橄榄油 最有价值的时候，是新鲜香气仍然清晰存在的时候。"
        ]
      ],
      [
        "生用和加热都可以",
        [
          "特级初榨橄榄油既可以生用，也可以用于烹饪。加热会改变一部分新鲜芳香，因此好的橄榄油往往在出锅前或装盘后加入时，更能表现自己的性格。",
          "可以尝试用在蔬菜、汤、烤鱼、豆类、面包、意面、肉类，甚至部分甜点上。真正值得问的，不只是“特级初榨橄榄油 能不能加热”，而是“这道菜里，我想保留或突出这瓶油的哪些特点？”"
        ]
      ],
      [
        "按风格选择，而不是只看名气",
        [
          "强劲、苦感和辛辣感明显的油，能够应对烤蔬菜、肉类和风味浓郁的食物；细腻的油可能更适合鱼、蒸蔬菜、温和奶酪或甜点；果香型橄榄油往往用途尤其广。",
          "没有必要强求一瓶油包办所有场景。理解风格，比只依赖价格、包装或某个著名产区名来选择更有实际意义。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 可以把每个 特级初榨橄榄油 产品页本身做成一份实用指南：它来自哪里、尝起来是什么风格、强度如何、适合什么菜，以及应该怎样保存。相比泛泛而谈“高端意大利橄榄油”，这些信息能给消费者更明确的选择理由。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "挑选一瓶好的 特级初榨橄榄油 并不需要专业品油师训练。正确读懂产品类别、查看产地信息、避光避热保存，并根据菜肴选择合适的风味强度，这些实用习惯远比单纯看油的颜色更重要。",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "evo-chocolate-dessert"
    ]
  },
  {
    "slug": "neapolitan-roman-pizza-styles",
    "lang": "zh",
    "topic": "pizza",
    "topicLabel": "披萨学院",
    "column": "披萨学院",
    "artClass": "is-pizza",
    "eyebrow": "披萨学院",
    "title": "那不勒斯披萨与罗马披萨：为什么“意大利披萨”并不是一种东西",
    "meta": "披萨学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "neapolitan-roman-pizza-styles.webp",
    "intro": "在意大利以外，披萨常被当成一种统一菜式。但在意大利，不同城市和不同风格之间，面团质地、烘烤方式、形状甚至食用场景都可能发生巨大变化。那不勒斯和罗马就是最清楚的两个例子。",
    "opening": [],
    "sections": [
      [
        "那不勒斯披萨：柔软、蓬松、快速高温烘烤",
        [
          "那不勒斯披萨 在欧盟登记为“传统特色保证”（传统特色保证），受保护名称对应的规范对原料和制作方式作出了规定。它通常具有柔软的中心、隆起而充满气孔的 披萨外圈（外圈），并在极高温的柴火炉中短时间烘烤。",
          "成品应该具有柔韧性，而不是像饼干一样硬脆。它可以在餐桌上用刀叉吃，也可以折叠后作为街头食物。中心偏软是这一风格的一部分，并不等于没有烤熟。"
        ]
      ],
      [
        "罗马并不只有一种披萨",
        [
          "“罗马披萨”并不是一个唯一、严格的类别。常见形式之一是 罗马圆披萨，也就是以更薄、更脆底部著称的圆形披萨；另一种是 罗马方盘切片披萨，在长方形烤盘中烘烤，切块后通常按重量出售。",
          "这些形式和那不勒斯披萨形成了完全不同的食用体验。酥脆、便携、按块出售等特点，有时和配料本身一样重要。"
        ]
      ],
      [
        "地域风格会改变技术",
        [
          "那不勒斯和罗马之间的差异说明，披萨更应该被理解为一组意大利地方传统，而不是一种标准化产品。面粉选择、面团管理、发酵、整形、烤炉类型和出餐方式都会参与塑造成品。",
          "两种方式并不存在谁“更好”。柔软的那不勒斯披萨和酥脆的罗马披萨，本来就在追求不同的口感目标。"
        ]
      ],
      [
        "文化也是产品的一部分",
        [
          "2017 年，联合国教科文组织将“那不勒斯披萨师的技艺”列入人类非物质文化遗产代表作名录。被认可的是围绕 那不勒斯披萨师 形成的手艺、动作、知识和社会实践，而不只是某一个配方。",
          "这一点对消费者很重要：真正的饮食文化，并不会因为包装上印一面意大利国旗就自动成立，它来自技术、语境以及长期延续的实践。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "对 LuxurEat 来说，更有力的披萨产品逻辑，应该先把这些风格差异解释清楚。当消费者理解某种面粉、番茄、特级初榨橄榄油 或其他产品究竟服务于哪一种意大利披萨风格，以及该风格追求什么质地和技术目标时，产品本身才会更有意义。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "在意大利以外，披萨常被当成一种统一菜式。但在意大利，不同城市和不同风格之间，面团质地、烘烤方式、形状甚至食用场景都可能发生巨大变化。那不勒斯和罗马就是最清楚的两个例子。",
    "relatedSlugs": [
      "story-of-italian-pizza",
      "modern-pinsa-romana",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "story-of-italian-pizza",
    "lang": "zh",
    "topic": "pizza",
    "topicLabel": "披萨学院",
    "column": "披萨学院",
    "artClass": "is-pizza",
    "eyebrow": "披萨学院",
    "title": "意大利披萨的故事：从那不勒斯走向世界",
    "meta": "披萨学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "story-of-italian-pizza.webp",
    "intro": "披萨如今是全球最容易识别的食物之一，但现代披萨的身份根植于那不勒斯，以及 18、19 世纪的城市日常饮食文化。它后来才通过移民、地方化改造和简洁灵活的形式，成为全球性食物。",
    "opening": [],
    "sections": [
      [
        "从那不勒斯的平民食物开始",
        [
          "在现代披萨出现之前很久，地中海各地就存在加配料的扁面包。那不勒斯真正发生的变化，是发酵面团、番茄以及其他易获得配料的组合，逐渐形成一种价格亲民的城市食物。",
          "番茄在欧洲接触美洲之后被引入，随后逐渐被意大利南部烹饪接受，并最终成为与那不勒斯披萨联系最紧密的食材之一。"
        ]
      ],
      [
        "玛格丽特披萨的故事",
        [
          "一个广为流传的传统说法，把 玛格丽特披萨 与披萨师 拉斐尔·埃斯波西托 以及 1889 年 玛格丽特披萨 王后的王室访问联系起来：番茄、马苏里拉奶酪 和罗勒象征意大利国旗的三种颜色。",
          "历史学者至今仍讨论这一故事的每一个细节应该被多大程度按字面理解，但 玛格丽特披萨 最终确实成为一个持久符号：一张简单的披萨，却获得了强烈的意大利国家形象和全球认知。"
        ]
      ],
      [
        "移民让披萨走向全球",
        [
          "意大利移民把披萨传统带到美国、南美和其他地区。当地烤炉、原料和口味进一步产生了新的风格；与此同时，意大利国内的披萨也继续保持地域发展，从罗马形式到西西里 西西里厚披萨，再到许多地方变体。",
          "于是形成一个很有意思的悖论：披萨在全球范围内极具适应性，但真正有生命力的风格往往仍然拥有明确身份，而不是把各种配料随机堆在一起。"
        ]
      ],
      [
        "保护工艺与传统",
        [
          "那不勒斯披萨 于 2010 年进入欧盟“传统特色保证”（传统特色保证）名录。2017 年，联合国教科文组织又单独将“那不勒斯披萨师的技艺”认定为非物质文化遗产。",
          "这些认可说明，披萨既可以是日常食物，也可以是严肃的烹饪文化遗产。它的价值并不来自复杂，而来自面团、发酵、温度和原料平衡背后长期积累的知识。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 可以把披萨作为进入意大利饮食文化的一扇门：先解释风格，再介绍帮助实现这种风格的面粉、特级初榨橄榄油、番茄或配料。产品成为故事的实际应用，而不是让故事沦为销售产品的借口。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "披萨如今是全球最容易识别的食物之一，但现代披萨的身份根植于那不勒斯，以及 18、19 世纪的城市日常饮食文化。它后来才通过移民、地方化改造和简洁灵活的形式，成为全球性食物。",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "modern-pinsa-romana",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "modern-pinsa-romana",
    "lang": "zh",
    "topic": "pizza",
    "topicLabel": "披萨学院",
    "column": "披萨学院",
    "artClass": "is-pizza",
    "eyebrow": "披萨学院",
    "title": "经典披萨之外：认识现代罗马 品萨",
    "meta": "披萨学院 · 2026",
    "archive": "学院 / 文化",
    "imageFile": "modern-pinsa-romana.webp",
    "intro": "更准确的理解方式，是把 罗马品萨 看成一种现代罗马烘焙创新，而不是一份从古罗马时代原封不动流传下来的古老配方。它的身份来自独特的面团思路、细长形状，以及介于熟悉披萨印象与现代烘焙技术之间的质地。",
    "opening": [],
    "sections": [
      [
        "现代罗马创新",
        [
          "现代商业形态的 罗马品萨 大约在 21 世纪初出现。这样介绍它，比依赖“直接延续古罗马配方”这类夸大说法更准确，也更有意思。",
          "它的成功说明，意大利饮食文化依然能够创造新形式，同时继续借助熟悉的核心原则：发酵、面粉、水合度、谨慎烘烤和克制配料。"
        ]
      ],
      [
        "独特的面团概念",
        [
          "品萨 风格面团通常与混合粉、高水合度和较长发酵联系在一起；混合粉中可能包括小麦粉、米粉和大豆粉。具体配方则会因生产者和产品而不同。",
          "这些选择的目标，是形成轻盈、开放的内部组织以及薄而酥脆的外层。与其承诺 品萨 一定“更容易消化”，不如直接描述这种可感知的质地——因为个体消化情况不同，各产品配方也并不完全一致。"
        ]
      ],
      [
        "形状也是身份的一部分",
        [
          "品萨 通常会拉伸成细长或椭圆形，而不是经典的圆形披萨。视觉差异让消费者很容易辨认，也支持不同的出餐方式：可以在烘烤前或烘烤后加配料，可以切块分享，也可以同时承载经典和现代风格食材。",
          "品萨 这一名称常被解释为与拉丁语中“按压、拉伸”的含义有关，但它今天最有力的身份仍然来自现代产品本身，而不是所谓古代连续性的叙事。"
        ]
      ],
      [
        "创新，但不丢失意大利逻辑",
        [
          "品萨 之所以成立，是因为创新本身仍然清晰可理解：面团有明确质地，配料可以保持克制，产品仍然依赖意大利料理常见的一项原则——让少数几种食材拥有足够空间被真正品尝出来。",
          "因此，品萨 也是一个很适合学院内容的案例：意大利传统并不是被冻结在过去，它同样可以成为新产品的框架，只要创新仍尊重技术与原料平衡。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "品萨 对 LuxurEat 尤其有价值，因为它可以直接连接专业混合面粉，以及家庭和 酒店、餐厅与咖啡馆等餐饮渠道 餐饮场景中的具体应用。最有力的传播重点不是“古罗马神奇面团”，而是一种具有明确质地、形状和制作逻辑的现代意大利形式。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "更准确的理解方式，是把 罗马品萨 看成一种现代罗马烘焙创新，而不是一份从古罗马时代原封不动流传下来的古老配方。它的身份来自独特的面团思路、细长形状，以及介于熟悉披萨印象与现代烘焙技术之间的质地。",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "pizza-pinsa-at-home"
    ]
  },
  {
    "slug": "truffle-gelato-at-home",
    "lang": "zh",
    "topic": "gelato",
    "topicLabel": "意式手工冰淇淋学院",
    "column": "意式手工冰淇淋学院",
    "artClass": "is-gelato",
    "eyebrow": "意式手工冰淇淋学院",
    "title": "在家如何制作意大利风格松露 意式手工冰淇淋",
    "meta": "意式手工冰淇淋学院 · 2026",
    "archive": "产品与实际应用",
    "imageFile": "truffle-gelato-at-home.webp",
    "intro": "松露 意式手工冰淇淋 是一种不常见的甜品，但制作体验本身并不需要复杂。LuxurEat 的思路是用粉末基底把配方平衡这一技术难度从消费者端移走，让最终甜品能够更方便地在接近食用时间时完成。",
    "opening": [],
    "sections": [
      [
        "为什么使用粉末基底？",
        [
          "成品 意式手工冰淇淋 需要冷冻储存和运输。粉末基底采用的是另一种模式：干燥基底无需以成品冷冻状态运输，可以在常温条件下完成储存和配送，再在消费地制作最终 意式手工冰淇淋。",
          "这种方式既适合家庭用户，也适合希望增加特色甜品、但不想直接进口整桶冷冻 意式手工冰淇淋 的餐厅、精品酒店、咖啡馆、餐饮服务和其他食品服务场景。"
        ]
      ],
      [
        "从包装到甜品",
        [
          "具体用量和制作方法，应始终以 LuxurEat 最终产品所提供的正式说明为准。粉末基底的目的，是预先简化干性原料与松露风味之间的平衡，让使用者把注意力放在制作、冷冻和出餐上，而不必掌握专业 意式手工冰淇淋 配方设计。",
          "根据最终产品说明以及可用设备，可以使用家用冰淇淋／意式手工冰淇淋 机，也可以采用更简化的家庭制作方式。最终质地会自然受到冻结方式和食用温度影响。"
        ]
      ],
      [
        "如何搭配松露 意式手工冰淇淋",
        [
          "松露 意式手工冰淇淋 可以用小份量直接单独食用，让香气成为主角；也可以和黑巧克力、烤榛子、开心果、风味温和的蜂蜜或部分水果搭配，形成对比。",
          "原则仍然是克制。配料过多，反而会让这种不寻常的风味变得难以理解。简单的呈现方式往往更能让松露显得有意图、有质感。"
        ]
      ],
      [
        "制作过程本身也是体验",
        [
          "自己完成甜品，而不是直接打开一盒成品，会改变消费者体验。从混合、冷冻到出餐，再到让客人第一次发现意外风味，整个过程都会形成期待。",
          "因此，松露 意式手工冰淇淋 不只能被当作一份甜品，也可以成为一种产品体验——它可以被制作、拍摄、分享和讨论。"
        ]
      ],
      [
        "LuxurEat 应用",
        [
          "LuxurEat 松露意式手工冰淇淋粉末基底 希望把一种意大利风格的高端创意，转化为同时适用于家庭、酒店餐饮和专业食品服务场景的产品形式。具体用量、过敏原、储存条件和制作步骤，必须始终以最终批准的包装和技术资料为准。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "松露 意式手工冰淇淋 是一种不常见的甜品，但制作体验本身并不需要复杂。LuxurEat 的思路是用粉末基底把配方平衡这一技术难度从消费者端移走，让最终甜品能够更方便地在接近食用时间时完成。",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-meets-dessert"
    ]
  },
  {
    "slug": "pizza-pinsa-at-home",
    "lang": "zh",
    "topic": "pizza",
    "topicLabel": "披萨学院",
    "column": "披萨学院",
    "artClass": "is-pizza",
    "eyebrow": "披萨学院",
    "title": "在家如何制作意大利风格 披萨 与 品萨",
    "meta": "披萨学院 · 2026",
    "archive": "产品与实际应用",
    "imageFile": "pizza-pinsa-at-home.webp",
    "intro": "家用烤箱无法复制专业披萨店的全部条件，但只要让面团、热量和配料与目标风格匹配，家庭用户仍然可以明显接近意大利风格的成品。",
    "opening": [],
    "sections": [
      [
        "先确定风格，再决定面团",
        [
          "那不勒斯风格披萨追求柔软中心和蓬松外圈；酥脆的罗马风格披萨或 品萨 则追求不同质地。相比一个万能面团公式，为特定用途设计的面粉或混合粉，往往能为家庭制作提供更合适的起点。"
        ]
      ],
      [
        "尽可能发挥家用烤箱的能力",
        [
          "充分预热。披萨石或披萨钢需要时间储存热量，在最后阶段短时间开启上火／烧烤功能，也有助于顶部上色。家用烤箱温度通常低于专业那不勒斯披萨炉，因此应根据实际设备调整面团和烘烤时间。"
        ]
      ],
      [
        "做 品萨：先讲质地，不先讲功能",
        [
          "品萨 风格面团常采用高水合度、更长发酵时间，以及可能包含小麦、米和大豆的混合粉，目标是形成酥脆外层与轻盈、开放的内部组织。与其承诺产品一定“更易消化”，不如直接描述消费者能够真实感受到的质地。"
        ]
      ],
      [
        "配料：少即是多",
        [
          "经典 玛格丽特披萨 很清楚地体现了这一逻辑：番茄、马苏里拉奶酪、罗勒和特级初榨橄榄油。两三种选择得当的配料，通常比把披萨堆得很满更容易得到清晰的意大利风格。"
        ]
      ],
      [
        "LuxurEat 应用",
        [
          "LuxurEat 可以通过意大利风格混合面粉，以及针对特定 披萨 或 品萨 应用的配套食材来支持这一体验。每个产品页都应明确说明对应风格、过敏原以及最终批准的制作方法。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "家用烤箱无法复制专业披萨店的全部条件，但只要让面团、热量和配料与目标风格匹配，家庭用户仍然可以明显接近意大利风格的成品。",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "modern-pinsa-romana"
    ]
  },
  {
    "slug": "china-italian-gelato",
    "lang": "zh",
    "topic": "gelato",
    "topicLabel": "意式手工冰淇淋学院",
    "column": "意式手工冰淇淋学院",
    "artClass": "is-gelato",
    "eyebrow": "意式手工冰淇淋学院",
    "title": "为什么中国正在重新认识意大利 意式手工冰淇淋",
    "meta": "意式手工冰淇淋学院 · 2026",
    "archive": "中国市场洞察",
    "imageFile": "china-italian-gelato.webp",
    "intro": "中国已经拥有成熟的冷冻甜品市场。因此，意大利 意式手工冰淇淋 的机会并不是从零向消费者解释“什么是冰淇淋”，而是让人理解 意式手工冰淇淋 为什么能代表一种不同的工艺、风味、质地与意大利饮食文化组合。",
    "opening": [],
    "sections": [
      [
        "从冷冻甜品到饮食文化",
        [
          "中国消费者对意大利食物的认识正在超越披萨和意面。咖啡、葡萄酒、特级初榨橄榄油以及各类地域食材，都在不断拓展人们对“意大利美食”的理解。",
          "意式手工冰淇淋 很自然地适合进入这一扩展过程，因为它一方面足够容易理解，另一方面又有清晰的手工艺故事。质地、可视化口味展示、原料品质以及 手工冰淇淋专卖店 的社交文化，都非常适合通过图片和文字共同传播。"
        ]
      ],
      [
        "高端定位必须有理由",
        [
          "仅仅“进口”并不足以支撑高端定位。消费者可以接触到大量国际品牌和新奇口味，因此一个产品必须有明确存在理由：能够被识别的食材、独特体验、可信的品质，以及容易理解的故事。",
          "对意大利 意式手工冰淇淋 来说，最有力的差异并不是包装上的意大利国旗，而是制作技术、食材身份和 手工冰淇淋专卖店 文化之间的连接。"
        ]
      ],
      [
        "为什么非常规口味有机会",
        [
          "数字化饮食文化鼓励“发现”。一种新口味可以很快被拍摄、分享、评价和购买，但如果背后没有内容，新鲜感也会同样快速消失。",
          "松露能提供更扎实的故事，因为它本身已经和意大利高级饮食文化有明确关联。把它与 意式手工冰淇淋 结合虽然出乎意料，但两种元素仍然属于同一套意大利饮食文化。"
        ]
      ],
      [
        "从家庭到 酒店、餐厅与咖啡馆等餐饮渠道",
        [
          "可以在本地完成最终制作的产品形式，意味着不止一条市场路径。消费者可以在家制作，餐厅、酒店、咖啡馆和甜点店也可以把它作为菜单概念使用。",
          "当产品故事同时具备教育和商业价值时，这种灵活性尤其重要：消费者购买的不只是一个口味，也是在理解这种风味组合为什么能够成立。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 将松露 意式手工冰淇淋 定位为一座桥梁：一端是消费者已经逐渐熟悉的意大利 意式手工冰淇淋 文化，另一端是更少见的高端松露食材。面向中国市场时，宣传重点应放在发现、制作体验和意大利来源上，并由清晰的产品信息支撑，而不是只依赖“奢华”一类词汇。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "中国已经拥有成熟的冷冻甜品市场。因此，意大利 意式手工冰淇淋 的机会并不是从零向消费者解释“什么是冰淇淋”，而是让人理解 意式手工冰淇淋 为什么能代表一种不同的工艺、风味、质地与意大利饮食文化组合。",
    "relatedSlugs": [
      "italian-gelato-vs-ice-cream",
      "story-of-italian-gelato",
      "truffle-meets-dessert"
    ]
  },
  {
    "slug": "china-italian-evo",
    "lang": "zh",
    "topic": "olive",
    "topicLabel": "橄榄油学院",
    "column": "橄榄油学院",
    "artClass": "is-olive",
    "eyebrow": "橄榄油学院",
    "title": "为什么中国正在重新认识意大利特级初榨橄榄油",
    "meta": "橄榄油学院 · 2026",
    "archive": "中国市场洞察",
    "imageFile": "china-italian-evo.webp",
    "intro": "在中国，橄榄油正在逐步摆脱“进口健康油”这一单一形象。随着消费者越来越熟悉国际烹饪，特级初榨橄榄油 有更多机会被理解为一种具有地域身份、烹饪用途和明确生产标准的风味食材。",
    "opening": [],
    "sections": [
      [
        "从“进口健康油”走向更完整的品类认知",
        [
          "对不少消费者来说，第一次接触橄榄油是通过广泛的健康宣传，而不是意大利烹饪。这虽然建立了认知，却也容易把特级初榨橄榄油、精炼橄榄油和其他类别之间的重要差异抹平。",
          "下一阶段更需要教育内容：什么叫“特级初榨”、为什么产地重要、为什么苦味和辛辣感可能属于正常感官轮廓，以及不同风格的油应该如何搭配食物。"
        ]
      ],
      [
        "产地与可追溯性越来越重要",
        [
          "随着进口食品市场成熟，产地声明需要由文件和具体产品信息支持。消费者和专业采购方越来越关心是谁生产、来自哪里、标签意味着什么，以及供应链如何被控制。",
          "这对橄榄油尤其重要，因为两瓶外观看起来很相似的产品，可能属于不同法规类别，并拥有完全不同的风味轮廓。"
        ]
      ],
      [
        "教育内容能够创造产品价值",
        [
          "如果每瓶 特级初榨橄榄油 都只写“高端”“健康”“意大利”，产品会很难真正形成差异。更有力的方式，是先教消费者如何品鉴、保存和搭配，再解释具体产品的橄榄品种、产区或风格。",
          "这样，知识就能自然转化为商业价值，同时不会让教育内容看起来像一篇广告。"
        ]
      ],
      [
        "自然进入中国家庭烹饪",
        [
          "特级初榨橄榄油 并不需要被限制在西式食谱里。只要油的风味适合，它同样可以用于蔬菜、海鲜、汤、面食、烧烤以及凉菜。",
          "机会并不是让中国消费者放弃熟悉的烹饪习惯，而是展示一种意大利食材可以在哪些位置，为原有菜肴增加新的芳香维度。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 在中国市场最有力的 特级初榨橄榄油 价值主张，是“可验证的品质 + 实用教育”：产地、类别、风味轮廓、保存方法、推荐用途与可追溯性。宣传表述应当针对具体产品并可核验；在消费者已经理解产品差异之后，再自然连接官方购买渠道。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "在中国，橄榄油正在逐步摆脱“进口健康油”这一单一形象。随着消费者越来越熟悉国际烹饪，特级初榨橄榄油 有更多机会被理解为一种具有地域身份、烹饪用途和明确生产标准的风味食材。",
    "relatedSlugs": [
      "evo-vs-common-cooking-oil",
      "story-of-italian-evo",
      "evo-chocolate-dessert"
    ]
  },
  {
    "slug": "china-pizza-pinsa",
    "lang": "zh",
    "topic": "pizza",
    "topicLabel": "披萨学院",
    "column": "披萨学院",
    "artClass": "is-pizza",
    "eyebrow": "披萨学院",
    "title": "为什么中国正在进一步理解意大利 披萨——以及 品萨 如何创造新的入口",
    "meta": "披萨学院 · 2026",
    "archive": "中国市场洞察",
    "imageFile": "china-pizza-pinsa.webp",
    "intro": "披萨在中国已经拥有很高认知度，因此挑战完全不同。机会不在于再次介绍“什么是披萨”，而在于把讨论从泛化的快餐概念，带向地域风格、面团技术、食材品质，以及 品萨 这类更新的意大利形式。",
    "opening": [],
    "sections": [
      [
        "披萨很熟悉，意大利披萨文化却未必熟悉",
        [
          "大型国际连锁品牌让披萨成为大众品类，但也建立了一个相对简化的披萨印象。真正的意大利披萨版图更广：那不勒斯、罗马圆披萨、罗马方盘切片披萨、西西里 西西里厚披萨 等众多地方形式，在质地、制作和语境上都不同。",
          "这种多样性让教育内容本身具有商业作用。消费者越理解不同风格，就越容易理解为什么面粉、发酵、烤炉条件以及配料克制都很重要。"
        ]
      ],
      [
        "工艺可以成为差异点",
        [
          "在大城市，手工披萨店和更专业的意大利餐厅已经推动消费者对技术型体验产生更多需求。已经熟悉披萨的人，可以开始比较饼底、发酵、面粉、番茄、奶酪和 特级初榨橄榄油，而不再只看配料堆了多少。",
          "这就为真正帮助用户复现某种明确风格的产品创造了空间，而不仅仅是给包装加一点“意大利感”。"
        ]
      ],
      [
        "品萨 足够新，又不会陌生",
        [
          "品萨 的优势是视觉和质地明显不同，但对于已经喜欢披萨或扁面包的人来说又很好理解。细长外形、蓬松内部和酥脆外层，能迅速形成差异点。",
          "传播时应强调它作为现代罗马创新的技术和风格，而不是夸大古代起源或消化功能。这样产品更容易被解释，也更可信。"
        ]
      ],
      [
        "家庭与专业市场都有空间",
        [
          "混合面粉和制作系统既可以服务家庭用户，也可以服务 酒店、餐厅与咖啡馆等餐饮渠道 客户。家庭用户更看重便利和清晰说明；专业客户则更关注一致性、储存和菜单差异化。",
          "两种场景下最有力的品牌信息其实相同：先说清楚是哪一种意大利风格，再解释制作方法，最后说明产品如何帮助用户实现这种结果。"
        ]
      ],
      [
        "LuxurEat 视角",
        [
          "LuxurEat 可以通过 披萨 与 品萨 内容，把学院教育与精选混合面粉、特级初榨橄榄油 及其他意大利食材连接起来。品萨 尤其适合作为“发现型产品”：足够熟悉，消费者一眼能理解；又足够不同，可以引发好奇，而且非常适合视觉内容与现场演示。"
        ]
      ]
    ],
    "sectionMedia": [],
    "asideSummary": "披萨在中国已经拥有很高认知度，因此挑战完全不同。机会不在于再次介绍“什么是披萨”，而在于把讨论从泛化的快餐概念，带向地域风格、面团技术、食材品质，以及 品萨 这类更新的意大利形式。",
    "relatedSlugs": [
      "neapolitan-roman-pizza-styles",
      "story-of-italian-pizza",
      "modern-pinsa-romana"
    ]
  }
];
  const normalizeImportedBrand = (text, lang) => text.replace(/LuxurEat(?!\s*[（(]露意膳[）)])/g, lang === "zh" ? "LuxurEat（露意膳）" : "LuxurEat (露意膳)");
  const normalizeImportedChinese = (text) => normalizeImportedBrand(text, "zh")
    .replace(/意大利手工\s+意式手工冰淇淋/g, "意大利手工冰淇淋")
    .replace(/意大利\s+意式手工冰淇淋/g, "意式手工冰淇淋")
    .replace(/玛格丽特披萨\s+王后/g, "玛格丽特王后")
    .replace(/\bPDO\b/g, "原产地名称保护")
    .replace(/\bPGI\b/g, "地理标志保护")
    .replace(/([\u3400-\u9fff])\s+(?=[\u3400-\u9fff])/g, "$1");

  for (const article of webReadyAcademyArticles) {
    const normalizeText = article.lang === "zh" ? normalizeImportedChinese : (text) => normalizeImportedBrand(text, "en");
    const localizedArticle = article.lang === "zh" ? {
      ...article,
      title: normalizeText(article.title),
      intro: normalizeText(article.intro),
      asideSummary: normalizeText(article.asideSummary),
      sections: article.sections.map(([heading, paragraphs]) => [
        normalizeText(heading),
        paragraphs.map(normalizeText),
      ]),
    } : {
      ...article,
      title: normalizeText(article.title),
      intro: normalizeText(article.intro),
      asideSummary: normalizeText(article.asideSummary),
      sections: article.sections.map(([heading, paragraphs]) => [normalizeText(heading), paragraphs.map(normalizeText)]),
    };
    const id = `${localizedArticle.lang}-academy-${localizedArticle.slug}`;
    articles[id] = {
      ...localizedArticle,
      image: academyImage(localizedArticle.imageFile),
      related: localizedArticle.relatedSlugs.map((slug) => `${localizedArticle.lang}-academy-${slug}`),
    };
  }

  const removedAcademySlugs = new Set(["gelato-professional", "gelato-media", "producer-awards"]);
  for (const slug of removedAcademySlugs) {
    delete articles[`zh-academy-${slug}`];
    delete articles[`en-academy-${slug}`];
  }

  const relatedFallbacks = {
    olive: ["olive-nutrition", "olive-cultivars", "olive-storage"],
    gelato: ["gelato-flavours", "story-of-italian-gelato", "truffle-gelato-at-home"],
  };
  for (const article of Object.values(articles)) {
    const fallbacks = relatedFallbacks[article.topic];
    if (!fallbacks || article.related.length >= 3) continue;
    const fallback = fallbacks
      .map((slug) => `${article.lang}-academy-${slug}`)
      .find((id) => id !== `${article.lang}-academy-${article.slug}` && articles[id] && !article.related.includes(id));
    if (fallback) article.related.push(fallback);
  }

  window.LUXUREAT_ACADEMY_DATA = {
    order: [...baseArticles.map((article) => article.slug), ...allTopicArticles.filter((article) => article.lang === "zh").map((article) => article.slug), ...webReadyAcademyArticles.filter((article) => article.lang === "zh").map((article) => article.slug)]
      .filter((slug) => !removedAcademySlugs.has(slug)),
    articles,
  };
  Object.assign(window.LUXUREAT_ARTICLE_DATA?.articles || {}, articles);
})();
