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
      title: "Beluga（欧鳇）鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "Beluga鱼子酱被视为最奢华、最稀有的鱼子酱之一，取自欧鳇（Huso huso），以硕大的灰色颗粒和细腻、奶油般的口感闻名。",
      opening: [
        "Beluga鱼子酱长期被视为最负盛名、价格最高昂的鱼子酱。爱德华八世的妻子华里丝·辛普森十分喜爱它，使其成为奢华生活与社会地位的象征。温莎夫妇在巴黎温莎别墅、昂蒂布角克罗城堡和伊夫林地区日夫的磨坊庄园举行的晚宴，以大量供应Beluga鱼子酱闻名，宾客包括温斯顿·丘吉尔和玛琳·黛德丽等名流。",
        "作为稀有且备受追捧的珍馐，俄罗斯传统上曾是Beluga鱼子酱的主要来源之一。",
      ],
      sections: [
        ["Beluga鱼子酱的感官特征", [
          "品种：欧鳇（Huso huso）",
          "色泽：从深灰色到浅灰色",
          "颗粒尺寸：3.3–3.5毫米，色泽均匀、油脂感良好",
          "鲟鱼年龄：18–20年",
          "香气：无明显气味",
          "质地：柔软、细腻，带有奶油感",
          "风味：清新的鱼鲜味与海洋、奶油气息，尾韵略带甜感",
        ]],
        ["如何辨别Beluga鱼子酱", [
          "可通过密封罐上的标签辨别Beluga鱼子酱。传统上，Beluga标签和罐身使用蓝色或浅蓝色标识。鱼卵直径应在3–3.5毫米之间，色泽均匀。CaviarEat会在标签上明确标注纯种Beluga，保证其纯度。",
        ]],
        ["杂交Beluga", [
          "市场上也有常被称为“Beluga Siberian”的杂交品种，由贝氏鲟雌鱼与Beluga雄鱼杂交而成。其生产周期只需7–8年，而纯种Beluga通常需要18–20年。",
        ]],
        ["Beluga鱼子酱的搭配", [
          "理想搭配是香槟或优质起泡酒，可平衡鱼子酱天然的油脂感；冰镇伏特加也是经典选择。其他适合的酒款包括卢瓦尔河坡慕斯卡黛、加卢拉维蒙蒂诺DOCG、普罗旺斯卡西斯AOC、佛得角白麝香葡萄酒，或更现代的瓦尔多比亚德内普罗塞克。食物方面，可搭配薄切水煮土豆、黄油布里尼、溏心蛋，或淋有榛子油、核桃油的烤面包。",
        ]],
      ],
      asideSummary: "本文从稀有性、感官特征和标签辨别，到杂交品种、奢华历史与经典搭配，系统认识Beluga鱼子酱。",
    },
    "kaluga-amur-caviar": {
      eyebrow: "鱼子酱知识科普",
      title: "卡露伽与阿穆尔鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "卡露伽与阿穆尔鱼子酱被视为珍贵Beluga鱼子酱的优质替代选择，主要优势在于价格更亲民。卡露伽鲟仅栖息于中俄之间的黑龙江及其支流。",
      opening: ["该鲟鱼的主要养殖场位于中国宜都。其鱼子酱与Beluga十分相似，但风味略为浓郁；鱼卵色泽从棕色延伸至金色，是其鲜明特征。"],
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
      asideSummary: "本文比较卡露伽与阿穆尔鱼子酱的产地、成熟周期、颗粒尺寸、金棕色泽，以及它们作为Beluga替代选择的价值。",
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
          "质地：丝滑、颗粒紧实，卵膜比Beluga略厚。",
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
          "质地：顺滑丝润，卵膜比Beluga略厚。",
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
      title: "Sevruga（闪光鲟）鱼子酱",
      meta: "鱼子酱知识科普 · 2026",
      intro: "Sevruga闪光鲟的鱼卵是主要鱼子酱品种中最小的，直径约2毫米，色泽均匀、质地紧实、风味浓郁。",
      opening: ["其风味带有海洋、碘、榛子与植物气息，并具有鲜明的清新感。它是风格最强烈的鱼子酱之一，尤其受到偏爱浓郁香气者的欣赏。"],
      sections: [
        ["Sevruga鱼子酱的历史", [
          "20世纪上半叶，连接美国与欧洲的远洋客轮——如玛丽王后号、诺曼底号、雷克斯号、卡罗尼亚号、卢西塔尼亚号和著名的泰坦尼克号——象征着奢华与舒适。名流与上流社会聚集的船上餐厅供应精美菜肴，Sevruga鱼子酱是头等舱菜单的亮点之一。传统上，它会盛放在带有镀金边缘的精致瓷贝壳中，并搭配细切洋葱、碎熟鸡蛋和烤面包。",
        ]],
        ["Sevruga鱼子酱的特征", [
          "色泽：从深灰色到浅灰色，白化个体偶见金色。",
          "外观：颗粒较小，约2毫米，紧实且色泽均匀。",
          "香气：细腻海洋气息，伴有轻微榛子与草本香。",
          "质地：颗粒紧实，在柔软与爽脆之间取得平衡。",
          "风味：浓郁饱满，带有海洋、碘、榛子和植物层次，并有清新的明亮感。",
        ]],
        ["推荐搭配", [
          "Sevruga既适合搭配菜肴，也适合精选酒款。可选择来自Cap Breton的白色沙地葡萄酒，或苏玳、托卡伊阿苏精华等甜酒。菜肴方面，可搭配酸奶油和洋葱烤土豆、融化黄油煮芦笋或烤鱼，以衬托其独特而浓郁的风味。",
        ]],
      ],
      asideSummary: "本文介绍Sevruga的小颗粒、强烈海洋风味、远洋客轮时代的历史，以及其感官特征和推荐搭配。",
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
      intro: "主要鱼子酱品种包括Beluga、奥西特拉、贝氏鲟、卡露伽、Sevruga与白鲟，它们各自拥有不同的产地与感官特点。",
      opening: [
        "以下是最知名、最受欢迎的鱼子酱品种：",
        "Beluga（Huso huso）：原产于黑海与里海。",
        "奥西特拉或Asetra（Acipenser gueldenstaedtii）：源自俄罗斯传统。",
        "贝氏鲟（Acipenser baerii）：源自西伯利亚。",
        "卡露伽或阿穆尔（Acipenser dauricus x Schrenki）：生活在黑龙江流域的河流鲟鱼。",
        "Sevruga（Acipenser stellatus）：以小颗粒著称，过去常见于里海和黑海。",
        "白鲟（Acipenser transmontanus）：原生于太平洋及北美河流。",
      ],
      sections: [
        ["CaviarEat鱼子酱品种", [
          "CaviarEat产品目录提供以下鱼子酱：",
          "Beluga（Huso huso）：过去广泛分布于黑海和里海。",
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
            ["属性", "施氏鲟帝王", "皇家奥西特拉", "皇家贝氏鲟", "Beluga Huso Huso", "Huso Dauricus", "皇家卡露伽"],
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
      lang: "zh", slug: "gelato-vs-ice-cream", topic: "gelato", topicLabel: "意式 Gelato 学院", artClass: "is-gelato",
      eyebrow: "意式 Gelato 学院", title: "Gelato 与 Ice Cream：从名字到口感的区别", meta: "意式 Gelato 学院 · 2026", archive: "基础认识",
      intro: "Gelato 不是简单换一种英文说法，而是一套与配方、温度、空气含量和服务方式相关的意大利甜品传统。",
      opening: ["在中国市场，Gelato 常被直接翻译成冰淇淋，但真正的意式 Gelato 拥有自己的制作逻辑和文化背景。不同配方和生产者会形成差异，因此不能只用一个指标定义所有 Gelato。"],
      sections: [["更高的服务温度", ["Gelato通常以比传统冰淇淋更高的服务温度呈现，因此入口更柔软，香气释放也更直接。实际温度需要根据配方、设备和门店操作进行控制。"]], ["空气与质地", ["Gelato强调细腻、紧密和顺滑的口感。搅拌过程中引入的空气量、乳脂与固形物比例，都会影响最终的质地和融化速度。"]], ["意大利的日常文化", ["Gelato不仅是一种甜品，也是一种城市生活方式：人们在街角、广场和家庭聚会中享用它。LuxurEat将以意大利工艺和真实风味为主线，持续介绍它的历史与制作。"]]],
      asideSummary: "用清晰的语言区分意式 Gelato 与 Ice Cream，同时保留不同配方和工艺的真实差异。",
      relatedSlugs: ["gelato-history", "ugolini-gelato-mix"],
    },
    {
      lang: "zh", slug: "gelato-history", topic: "gelato", topicLabel: "意式 Gelato 学院", artClass: "is-gelato",
      eyebrow: "意式 Gelato 学院", title: "意大利 Gelato：从城市传统到现代工艺", meta: "意式 Gelato 学院 · 2026", archive: "历史与工艺",
      intro: "了解 Gelato 如何从意大利城市文化发展为兼具传统、创意与专业技术的现代甜品。",
      opening: ["Gelato的魅力在于它能把地方食材、季节风味和即时制作结合起来。每一家Gelateria都有自己的配方节奏，但对新鲜、平衡与口感的追求始终贯穿其中。"],
      sections: [["从季节食材开始", ["坚果、可可、咖啡、水果和香草都可以成为Gelato的风味基础。优秀的配方不会用过度甜度覆盖原料，而是让香气在低温中保持清晰。"]], ["工艺决定稳定性", ["配方设计、巴氏处理、熟化、冷冻和展示温度共同决定Gelato的稳定性。对于家庭、手工门店和工业生产者，设备与流程不同，最佳配方也会不同。"]], ["面向中国餐桌的表达", ["未来内容会介绍适合中国消费者的意大利Gelato口味、搭配方式和门店应用，并区分知识内容、家庭制作和专业生产的实际需求。"]]],
      asideSummary: "从季节原料、配方设计到展示温度，认识意大利 Gelato 背后的传统和现代工艺。",
      relatedSlugs: ["gelato-vs-ice-cream", "ugolini-gelato-mix"],
    },
    {
      lang: "zh", slug: "ugolini-gelato-mix", topic: "gelato", topicLabel: "Ugolini Gelato", artClass: "is-gelato",
      eyebrow: "Ugolini Gelato", title: "Ugolini Gelato 粉末：面向专业 Gelateria 的准备方向", meta: "Ugolini Gelato · 计划上市", archive: "产品前瞻",
      intro: "Ugolini计划推出适用于家庭、手工门店和工业客户的 Gelato 粉末基底，具体口味、规格和上市信息以最终产品资料为准。",
      opening: ["这是一项产品前瞻内容，而不是已经完成的销售承诺。未来产品可能覆盖单剂装和1公斤装，并探索松露、鱼子酱等具有品牌识别度的风味方向。"],
      sections: [["为不同生产规模准备", ["家庭Gelateria需要清晰易懂的操作流程；专业门店需要稳定的批次表现；工业客户则更关注规格、供应、标签和生产适配。产品资料将按不同使用场景分别说明。"]], ["从风味创意到可执行配方", ["松露或鱼子酱风味的开发，需要在香气强度、甜度、脂肪感、储存稳定性和实际消费场景之间取得平衡。最终口味与配方须以研发、法规和感官测试结果为准。"]], ["上市前的信息准备", ["在正式上市前，我们会发布成分表、过敏原、营养信息、建议用量、操作步骤、包装规格、保存条件和商务合作方式，让 Gelateria 能够清楚评估是否适合自己的生产流程。"]]],
      asideSummary: "Ugolini Gelato 粉末的产品前瞻，先讲清使用场景与信息标准，再等待最终配方和上市资料确认。",
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
      slug: "producer-awards", topic: "academy", artClass: "is-academy", topicLabel: { zh: "意大利美食学院", en: "Italian Food Academy" },
      eyebrow: { zh: "大师与产地故事", en: "Producers & Territories" }, title: { zh: "生产者与世界 Awards：等待真实档案入库", en: "Producers and world awards: a verified dossier" }, meta: { zh: "意大利美食学院 · 待补充资料", en: "Italian Food Academy · Dossier to be supplied" }, archive: { zh: "生产者档案", en: "Producer dossier" },
      intro: { zh: "为橄榄油、Gelato 与其他意大利食材预留企业、产地、技术资料和国际展会 Awards 的可核验档案。", en: "A verified dossier space for companies, territories, technical files and international fair awards across olive oil, Gelato and other Italian foods." },
      opening: { zh: ["公司名称、产地、产品规格、认证和 Awards 必须来自品牌提供的正式资料或可核对的展会记录。网站不会在资料确认前自行编写获奖结论。"], en: ["Company names, territories, formats, certifications and awards must come from formal brand files or verifiable fair records. The site will not invent a winning claim before the dossier is confirmed."] },
      sections: { zh: [["每家企业的档案字段", ["企业与品牌名称、国家和大区、产品类型、品种或配方、生产方式、技术参数、认证、联系人和中国市场合作范围。"]], ["每项 Award 的字段", ["奖项全称、年份、评审或展会名称、获奖产品、证书或官方链接、可使用的中文表述与版权许可。"]], ["上线前的验证", ["核对原始文件、中文翻译、发布日期、图片授权和宣传边界；只有完成确认后，档案才会从‘资料待补充’变为正式发布。"]]], en: [["Fields for each company", ["Company and brand, country and region, product type, cultivar or formula, production, specifications, certifications, contact and China-market scope."]], ["Fields for each award", ["Exact title, year, judging body or fair, winning product, certificate or official link, approved wording and image rights."]], ["Before publication", ["Check source files, translation, date, image rights and claim boundaries; only then can a dossier move from awaiting information to published."]]] },
      asideSummary: { zh: "真实企业名称、技术资料和 Awards 到位后，可直接填入这套档案结构。", en: "Once real company names, technical files and award records arrive, they can be placed directly into this dossier structure." }, relatedSlugs: ["ingredients-territory", "olive-regions", "gelato-professional"],
    },
    {
      slug: "cooking-techniques", topic: "academy", artClass: "is-academy", topicLabel: { zh: "意大利美食学院", en: "Italian Food Academy" },
      eyebrow: { zh: "基础烹饪课程", en: "Fundamental Cooking Techniques" }, title: { zh: "意大利料理的基础技法", en: "Fundamental techniques of Italian cooking" }, meta: { zh: "意大利美食学院 · 2026", en: "Italian Food Academy · 2026" }, archive: { zh: "基础技法", en: "Core techniques" },
      intro: { zh: "从控温、乳化、收汁到熟成，基础技法决定食材能否保持清晰风味。", en: "Temperature, emulsion, reduction and resting determine whether an ingredient keeps a clear flavour." },
      opening: { zh: ["意大利料理看似简单，真正的难点在于让少量原料保持平衡。技法应服务于食材，而不是掩盖食材。"], en: ["Italian cooking can look simple, but its challenge is keeping a small number of ingredients in balance. Technique should serve the ingredient, not hide it."] },
      sections: { zh: [["控温", ["低温融化黄油、保持烩饭流动性、控制 Gelato 的展示温度，都会直接改变口感。"]], ["乳化与收汁", ["面水、油脂、奶酪或高汤通过搅拌形成连续的酱汁，关键是逐步加入液体并观察质地。"]], ["最后一步", ["橄榄油、松露、奶酪或香草往往在出锅后完成风味收束，份量与时机同样重要。"]]], en: [["Temperature", ["Low heat for butter, a fluid risotto texture and the right Gelato display temperature all directly change mouthfeel."]], ["Emulsion and reduction", ["Pasta water, fat, cheese or stock can form a continuous sauce when liquid is added gradually and texture is watched."]], ["The final step", ["Olive oil, truffle, cheese or herbs often finish a dish after cooking; timing and proportion matter equally."]]] },
      asideSummary: { zh: "用少量、可复现的基础技法，帮助家庭和专业厨房稳定表达食材风味。", en: "A compact set of repeatable techniques for clearer flavour in home and professional kitchens." }, relatedSlugs: ["pasta-academy", "pairings-class", "olive-tasting"],
    },
    {
      slug: "pasta-academy", topic: "academy", artClass: "is-academy", topicLabel: { zh: "意大利美食学院", en: "Italian Food Academy" },
      eyebrow: { zh: "意大利面学院", en: "Pasta Academy" }, title: { zh: "意大利面：形状、酱汁与火候", en: "Pasta: shape, sauce and timing" }, meta: { zh: "意大利美食学院 · 2026", en: "Italian Food Academy · 2026" }, archive: { zh: "意面基础", en: "Pasta basics" },
      intro: { zh: "意大利面不是单一产品，形状、面团、酱汁和烹煮方式共同决定最终口感。", en: "Pasta is not one product; shape, dough, sauce and cooking method together define the final bite." },
      opening: { zh: ["选择意大利面时，不只看名称。粗细、表面纹理和形状会影响酱汁附着与入口节奏。"], en: ["Choosing pasta is not only about the name. Thickness, surface and shape affect sauce adhesion and the rhythm of the bite."] },
      sections: { zh: [["形状与酱汁", ["细面适合轻盈、顺滑的酱汁；管状或纹理明显的形状更适合承托肉酱、奶酪和蔬菜颗粒。"]], ["面水是风味的一部分", ["带有淀粉的面水可帮助油脂与奶酪形成更顺滑的酱汁，加入时应少量多次。"]], ["出锅仍会继续变化", ["面条离火后仍会吸收酱汁，因此应在略有弹性时完成翻拌与装盘。"]]], en: [["Shape and sauce", ["Thin pasta suits light, fluid sauces; tubes and ridged shapes carry meat, cheese and vegetable pieces."]], ["Pasta water is part of the flavour", ["Starchy pasta water helps fat and cheese form a smoother sauce when added gradually."]], ["The dish keeps changing", ["Pasta continues to absorb sauce off the heat, so finish tossing and plating while it still has a little bite."]]] },
      asideSummary: { zh: "把意面形状、酱汁和火候放在同一张判断表里，适合家庭和餐饮厨房继续扩展。", en: "A simple framework for matching pasta shape, sauce and timing in home and professional kitchens." }, relatedSlugs: ["cooking-techniques", "pairings-class", "olive-recipes-guide"],
    },
    {
      slug: "pairings-class", topic: "academy", artClass: "is-academy", topicLabel: { zh: "意大利美食学院", en: "Italian Food Academy" },
      eyebrow: { zh: "风味搭配课堂", en: "Pairing Class" }, title: { zh: "风味搭配：先看质地，再谈浓淡", en: "Pairing: start with texture, then intensity" }, meta: { zh: "意大利美食学院 · 2026", en: "Italian Food Academy · 2026" }, archive: { zh: "搭配方法", en: "Pairing method" },
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
      slug: "gelato-flavours", topic: "gelato", artClass: "is-gelato", topicLabel: { zh: "意式 Gelato 学院", en: "Italian Gelato Academy" },
      eyebrow: { zh: "意式 Gelato 风味", en: "Gelato Flavours" }, title: { zh: "从开心果到松露：Gelato 如何表达原料", en: "From pistachio to truffle: how Gelato expresses an ingredient" }, meta: { zh: "意式 Gelato · 2026", en: "Italian Gelato · 2026" }, archive: { zh: "风味实验室", en: "Flavour lab" },
      intro: { zh: "经典坚果、可可、水果、咖啡与未来的松露或鱼子酱方向，都需要先尊重原料，再建立甜度和质地。", en: "Nuts, cocoa, fruit, coffee and future truffle or caviar directions all begin with respect for the ingredient, then balance sweetness and texture." },
      opening: { zh: ["Gelato 的风味在低温下会变得更安静，因此配方需要让香气保持清晰，而不是简单提高甜度。"], en: ["Flavour becomes quieter at low temperature, so a Gelato recipe must keep aroma clear rather than simply increasing sweetness." ] },
      sections: { zh: [["原料先说话", ["开心果、榛子、巧克力和水果各有不同的脂肪、酸度和含水量，不能用同一套比例处理。"]], ["特殊风味的边界", ["松露或鱼子酱风味需要以香气平衡和真实消费场景为前提，最终配方必须经过研发、法规与感官测试。"]], ["给中国消费者的内容", ["专题会以口味词典、搭配建议、门店展示和家庭体验为入口，避免把 Gelato 误解为普通 Ice Cream。"]]], en: [["Let the ingredient speak", ["Pistachio, hazelnut, chocolate and fruit differ in fat, acidity and water, so they cannot share one ratio."]], ["Boundaries for unusual flavours", ["Truffle or caviar directions need aromatic balance and real occasions; final formulas require development, compliance and sensory testing."]], ["For Chinese visitors", ["The topic will use a flavour glossary, pairing ideas, shop display and home experiences while keeping Gelato distinct from generic ice cream."]]] },
      asideSummary: { zh: "为 Gelato 建立口味词典和产品开发边界，后续可以接入真实照片、视频和技术资料。", en: "A Gelato flavour vocabulary and development boundary, ready for real photography, video and technical files." }, relatedSlugs: ["gelato-vs-ice-cream", "gelato-history", "ugolini-gelato-mix"],
    },
    {
      slug: "gelato-professional", topic: "gelato", artClass: "is-gelato", topicLabel: { zh: "意式 Gelato 学院", en: "Italian Gelato Academy" },
      eyebrow: { zh: "Gelateria 专业应用", en: "Professional Gelateria Guide" }, title: { zh: "家庭、手工门店与工业生产：同一种 Gelato 的三套答案", en: "Family, artisanal and industrial Gelato: three different answers" }, meta: { zh: "意式 Gelato · 2026", en: "Italian Gelato · 2026" }, archive: { zh: "专业应用", en: "Professional use" },
      intro: { zh: "不同生产规模需要不同的配方、设备、包装、培训与合规资料。", en: "Different production scales require different recipes, equipment, packaging, training and compliance files." },
      opening: { zh: ["专业内容不应只展示一个漂亮口味，还要说明它能否稳定制作、如何储存、如何标识以及适合谁使用。"], en: ["Professional content should explain more than a beautiful flavour: repeatability, storage, labelling and the user it is designed for all matter." ] },
      sections: { zh: [["家庭 Gelateria", ["重点是步骤清晰、份量易懂、设备要求低和一次制作量可控。"]], ["手工门店", ["重点是批次稳定、展示温度、销售节奏、风味轮换和员工培训。"]], ["工业客户", ["重点是规格、供应稳定性、配方文件、过敏原、营养、标签、冷链与批量生产适配。"]]], en: [["Family gelateria", ["Priorities are clear steps, readable portions, modest equipment and a manageable batch size."]], ["Artisanal shop", ["Priorities are batch consistency, display temperature, service rhythm, flavour rotation and staff training."]], ["Industrial customer", ["Priorities are specification, stable supply, product file, allergens, nutrition, labelling, cold chain and batch fit."]]] },
      asideSummary: { zh: "为 Ugolini Gelato 粉的未来产品资料预留专业客户视角，避免只做消费者宣传。", en: "A professional lens for future Ugolini Gelato files, beyond consumer-facing promotion." }, relatedSlugs: ["ugolini-gelato-mix", "gelato-flavours", "ingredients-territory"],
    },
    {
      slug: "gelato-media", topic: "gelato", artClass: "is-gelato", topicLabel: { zh: "意式 Gelato 学院", en: "Italian Gelato Academy" },
      eyebrow: { zh: "照片与视频专题", en: "Photo & Video Journal" }, title: { zh: "Gelato 影像计划：让工艺被看见", en: "The Gelato visual journal: making craft visible" }, meta: { zh: "意式 Gelato · 待补充素材", en: "Italian Gelato · Media to be supplied" }, archive: { zh: "视觉档案", en: "Visual archive" },
      intro: { zh: "专题已预留产地、制作、展示、门店与产品包装的图片和视频位置，待真实素材确认后上线。", en: "The topic reserves space for origin, making, display, shop and packaging photography and video once authentic assets are supplied." },
      opening: { zh: ["为了保持可信度，网站不使用生成的产品照片冒充真实素材。收到照片、视频、品牌标识和授权信息后，再逐项替换当前的编辑视觉卡片。"], en: ["For credibility, the site does not use generated product photos as if they were real. Once photography, video, brand marks and permissions arrive, the editorial cards can be replaced item by item." ] },
      sections: { zh: [["建议素材清单", ["Gelateria 门店、原料特写、配方操作、冷冻与展示柜、单剂装与1公斤包装、松露或鱼子酱风味研发过程。"]], ["视频内容", ["可加入30至90秒的制作片段、专业客户操作演示、门店展示与产品问答；视频需提供字幕、封面和移动端版本。"]], ["发布前检查", ["确认拍摄者与人物授权、产品名称、规格、配方状态、版权、发布日期和中国市场使用范围。"]]], en: [["Suggested assets", ["Gelateria interiors, ingredient close-ups, recipe handling, freezing and display, single portions and 1 kg packs, and truffle or caviar R&D."]], ["Video formats", ["Use 30–90 second making clips, professional demonstrations, display tours and product Q&A with captions, poster frames and mobile versions."]], ["Before publishing", ["Confirm creator and participant permissions, product name, format, formula status, rights, date and China-market usage scope."]]] },
      asideSummary: { zh: "当前明确标注为素材待补充，避免用虚构图片或视频提前制造产品事实。", en: "This is clearly marked as awaiting assets, avoiding invented product photography or video claims." }, relatedSlugs: ["gelato-history", "gelato-professional", "ugolini-gelato-mix"],
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
      column: article.topicLabel,
      related: article.relatedSlugs.map((slug) => `${article.lang}-academy-${slug}`),
      sectionMedia: article.sectionMedia || [],
    };
  }

  window.LUXUREAT_ACADEMY_DATA = {
    order: [...baseArticles.map((article) => article.slug), ...allTopicArticles.filter((article) => article.lang === "zh").map((article) => article.slug)],
    articles,
  };
  Object.assign(window.LUXUREAT_ARTICLE_DATA?.articles || {}, articles);
})();
