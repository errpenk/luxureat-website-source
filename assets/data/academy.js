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
            "src": academyImage("caviar-processing-06.webp"),
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

  window.LUXUREAT_ACADEMY_DATA = { order: baseArticles.map((article) => article.slug), articles };
  Object.assign(window.LUXUREAT_ARTICLE_DATA?.articles || {}, articles);
})();
