/**
 * Brand Brief Templates — niche-specific presets modeled after a UGC creator brief.
 *
 * 5 niches: Fashion/Lifestyle, Wellness, Food, Tech, Beauty/Makeup
 *
 * Each template pre-fills a full brief with sections:
 *  - campaignOverview, objective, targetAudience, deliverables,
 *    contentConcepts, keyFeatures, visualStyle, hookSuggestions,
 *    dos, donts, callToAction, timeline, usageRights
 */

const brandBriefTemplates = {
  "Fashion/Lifestyle": [
    {
      name: "Street Style Lookbook",
      description:
        "Urban-inspired outfits with bold styling and street-level energy.",
      brief: {
        docTitle: "STREET STYLE LOOKBOOK",
        campaignName: "Everyday Confidence",
        product: "Essential Oversized Hoodie",
        productReferenceNotes: [
          "Oversized streetwear fit",
          "Minimal styling",
          "Everyday lifestyle setting",
          "Natural lighting",
        ],
        campaignOverview:
          "We are looking for authentic UGC-style videos that feel natural and relatable. The video should feel like a TikTok post, a casual outfit video, a natural recommendation — NOT like a polished commercial.",
        objectives: [
          "Showcase outfit comfort and fit",
          "Build trust with authentic content",
          "Increase brand awareness",
          "Generate high-performing ad creatives",
        ],
        targetAudience: {
          ageRange: "18–30",
          style: "Streetwear / casual fashion",
          interests: [
            "TikTok fashion",
            "Oversized fits",
            "Everyday outfits",
            "Lifestyle creators",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Raw clips", "Alternate hooks"],
        },
        contentConcepts: [
          {
            title: "Outfit Transformation",
            description:
              "Start in a basic outfit → put on the featured piece → reveal final look.",
            hooks: [
              "POV you finally find the perfect oversized hoodie.",
              "This hoodie surprised me…",
            ],
          },
          {
            title: "Day-in-the-Life",
            description:
              "Show the outfit worn during daily activities: coffee run, walking outside, laptop work, casual hangout.",
            hooks: [],
          },
          {
            title: "First Impressions",
            description:
              "Film a quick unboxing + reaction. Mention comfort, softness, oversized fit.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Soft cotton fleece",
          "Oversized relaxed fit",
          "Minimalist design",
          "Neutral colors",
        ],
        visualStyle: [
          "Natural lighting",
          "iPhone-style filming",
          "Casual environments",
          "Outfit-focused shots",
        ],
        hookSuggestions: [
          "I didn't expect this to be this comfortable.",
          "This might be the best oversized hoodie I've tried.",
          "TikTok made me try this hoodie.",
        ],
        dos: [
          "Film in natural light",
          "Show product clearly",
          "Keep it authentic",
          "Use trendy sounds",
        ],
        donts: [
          "Overly scripted content",
          "Poor lighting",
          "Mention competitor brands",
          "Offensive or controversial topics",
        ],
        callToAction: [
          "Link is in my bio.",
          "I'll link it below.",
          "Definitely worth checking out.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Luxury Editorial",
      description:
        "High-end, polished content with an elevated editorial aesthetic.",
      brief: {
        docTitle: "ELEVATED ESSENTIALS CAMPAIGN BRIEF",
        campaignName: "Elevated Essentials",
        product: "Tailored Wool Blazer",
        productReferenceNotes: [
          "Sharp tailored silhouette",
          "Elevated neutral tones",
          "Indoor studio or upscale setting",
          "Soft directional lighting",
        ],
        campaignOverview:
          "We want content that feels aspirational yet attainable. Think fashion editorial meets everyday luxury. The content should feel curated, intentional, and visually striking — like a high-end lookbook.",
        objectives: [
          "Position the brand as premium and aspirational",
          "Drive consideration among style-conscious shoppers",
          "Create reusable ad creatives for premium placements",
          "Build brand prestige on social media",
        ],
        targetAudience: {
          ageRange: "25–40",
          style: "Luxury / minimalist fashion",
          interests: [
            "High-end fashion",
            "Capsule wardrobes",
            "Quiet luxury",
            "Editorial content",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Behind-the-scenes clips", "Styled flat-lay photos"],
        },
        contentConcepts: [
          {
            title: "Elevated GRWM",
            description:
              "Get ready for a night out or event. Focus on the styling process, with the blazer as the hero piece.",
            hooks: [
              "When you need that one piece to elevate everything.",
              "The blazer that changed my wardrobe.",
            ],
          },
          {
            title: "Capsule Wardrobe Feature",
            description:
              "Show 3 ways to style the blazer — casual, work, evening.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Premium wool blend",
          "Tailored structured fit",
          "Timeless neutral palette",
          "Versatile styling",
        ],
        visualStyle: [
          "Soft directional lighting",
          "Clean backgrounds",
          "Slow intentional movements",
          "Detail close-ups",
        ],
        hookSuggestions: [
          "This blazer is the definition of quiet luxury.",
          "One piece, three completely different looks.",
          "The quality on this is unreal.",
        ],
        dos: [
          "Use clean, minimal backgrounds",
          "Highlight fabric details",
          "Keep transitions smooth",
          "Style with intention",
        ],
        donts: [
          "Cluttered or messy environments",
          "Fast chaotic cuts",
          "Overly casual tone",
          "Mention competitor brands",
        ],
        callToAction: [
          "Link in bio for the collection.",
          "This one's worth the investment.",
          "Shop the look below.",
        ],
        timeline: {
          contentDue: "7 days after receiving the product",
          reviewPeriod: "3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Home Aesthetic",
      description:
        "Home decor and organization content with a curated lifestyle feel.",
      brief: {
        docTitle: "Curate Your Space Campaign Brief",
        campaignName: "Curate Your Space",
        product: "Home Decor / Organization Product",
        productReferenceNotes: [
          "Styled room or shelf vignettes",
          "Before/after organization",
          "Neutral and warm interiors",
          "Soft ambient lighting",
        ],
        campaignOverview:
          "Create aspirational home content that showcases the product in a beautifully styled space. Content should feel like a satisfying home transformation — think home organization TikTok meets interior design inspo.",
        objectives: [
          "Showcase product in a styled home environment",
          "Inspire home upgrades and organization",
          "Create satisfying transformation content",
          "Drive product sales through lifestyle appeal",
        ],
        targetAudience: {
          ageRange: "24–40",
          style: "Home decor / organization",
          interests: [
            "Interior design",
            "Home organization",
            "Aesthetic spaces",
            "DIY decor",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Before/after photos", "Full room tour"],
        },
        contentConcepts: [
          {
            title: "Satisfying Transformation",
            description:
              "Show a messy or plain space, then organize or style it using the product. End with the satisfying final reveal.",
            hooks: [
              "This one product transformed my space.",
              "Watch this room go from boring to beautiful.",
            ],
          },
          {
            title: "Styled Vignette",
            description:
              "Style a shelf, desk, or corner of a room featuring the product. Show the process and final look.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Aesthetic design",
          "Functional organization",
          "Premium materials",
          "Versatile styling",
        ],
        visualStyle: [
          "Warm ambient lighting",
          "Overhead and detail shots",
          "Satisfying organizing sequences",
          "Clean neutral backgrounds",
        ],
        hookSuggestions: [
          "The home upgrade that gets the most compliments.",
          "I wish I found this sooner.",
          "This made my home look 10x more expensive.",
        ],
        dos: [
          "Show before and after",
          "Keep the space styled and clean",
          "Use satisfying organizing sequences",
          "Highlight the product in context",
        ],
        donts: [
          "Cluttered distracting backgrounds",
          "Dark unflattering lighting",
          "Product shown in isolation only",
          "Mention competitor brands",
        ],
        callToAction: [
          "Link in bio to shop.",
          "Save this for your next home refresh.",
          "What room should I do next?",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
  ],

  Wellness: [
    {
      name: "Morning Routine",
      description:
        "Aesthetic morning content that inspires a productive start.",
      brief: {
        docTitle: "Start Your Day Right Campaign Brief",
        campaignName: "Start Your Day Right",
        product: "Wellness / Morning Product",
        productReferenceNotes: [
          "Calm morning setting",
          "Soft natural window light",
          "Minimalist home environment",
          "Warm tones and textures",
        ],
        campaignOverview:
          'Create calming, aspirational morning routine content that naturally integrates the product. The video should feel peaceful, intentional, and real — like a "that girl" morning vlog.',
        objectives: [
          "Showcase product in a daily routine context",
          "Inspire healthy morning habits",
          "Create aspirational lifestyle content",
          "Drive product awareness and interest",
        ],
        targetAudience: {
          ageRange: "20–35",
          style: "Wellness / lifestyle",
          interests: [
            "Morning routines",
            "Self-care",
            "Productivity",
            "Aesthetic vlogs",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["ASMR version", "Extended routine clips"],
        },
        contentConcepts: [
          {
            title: "That Girl Morning",
            description:
              "Film a peaceful morning routine — wake up, skincare, make coffee/breakfast, use the product naturally as part of the flow.",
            hooks: [
              "My 6am morning routine that changed everything.",
              "The product that upgraded my mornings.",
            ],
          },
          {
            title: "One Product, Better Mornings",
            description:
              "Focus on the single product and how it fits into the morning — show the before and after difference.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Integrates seamlessly into daily routine",
          "Premium quality",
          "Aesthetic design",
          "Wellness-focused",
        ],
        visualStyle: [
          "Soft natural morning light",
          "Warm muted tones",
          "Slow intentional movements",
          "ASMR-friendly sounds",
        ],
        hookSuggestions: [
          "My morning isn't complete without this.",
          "This one thing upgraded my entire routine.",
          "The most peaceful morning routine.",
        ],
        dos: [
          "Film in soft morning light",
          "Keep movements slow and calm",
          "Show the product naturally in use",
          "Use calming sounds or music",
        ],
        donts: [
          "Rushing or chaotic energy",
          "Dark lighting",
          "Forced product placement",
          "Mention competitor brands",
        ],
        callToAction: [
          "Link in bio to start your mornings right.",
          "Save this for morning inspo.",
          "What's your morning must-have?",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Wellness Journey",
      description: "Holistic wellness content focused on mind, body, and soul.",
      brief: {
        docTitle: "Feel Your Best Campaign Brief",
        campaignName: "Feel Your Best",
        product: "Wellness / Health Product",
        productReferenceNotes: [
          "Calming natural environments",
          "Yoga or meditation settings",
          "Green and earth tones",
          "Soft diffused lighting",
        ],
        campaignOverview:
          "Create authentic wellness content that shows how the product supports a healthier lifestyle. Content should feel genuine and empowering — not preachy or clinical.",
        objectives: [
          "Build trust in the wellness community",
          "Show product in an authentic wellness context",
          "Drive trial and purchase",
          "Create shareable wellness content",
        ],
        targetAudience: {
          ageRange: "22–40",
          style: "Wellness / mindfulness",
          interests: [
            "Yoga and meditation",
            "Holistic health",
            "Fitness",
            "Self-improvement",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Extended workout/routine clip", "Testimonial version"],
        },
        contentConcepts: [
          {
            title: "Wellness Routine Integration",
            description:
              "Show the product as part of a yoga, meditation, or wellness routine. Focus on the feeling and results.",
            hooks: [
              "This changed my wellness routine completely.",
              "The one thing my body needed.",
            ],
          },
          {
            title: "My Wellness Essentials",
            description:
              "A roundup of daily wellness essentials with the product featured as the hero item.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Natural / clean ingredients",
          "Supports overall wellness",
          "Easy to integrate daily",
          "Trusted quality",
        ],
        visualStyle: [
          "Soft natural or diffused light",
          "Earth tones and greenery",
          "Calm flowing movements",
          "Mindful pacing",
        ],
        hookSuggestions: [
          "If you're on a wellness journey, you need this.",
          "The product I recommend to everyone.",
          "I feel the difference every single day.",
        ],
        dos: [
          "Keep the tone calm and genuine",
          "Show real usage in a wellness context",
          "Emphasize how it makes you feel",
          "Use natural settings",
        ],
        donts: [
          "Medical claims",
          "Before/after body transformation claims",
          "Overly salesy tone",
          "Mention competitor brands",
        ],
        callToAction: [
          "Start your wellness journey — link in bio.",
          "Save this for your self-care day.",
          "Your body will thank you.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Self-Care Reset",
      description:
        "Cozy, comforting self-care rituals for winding down and recharging.",
      brief: {
        docTitle: "Self-Care Reset Campaign Brief",
        campaignName: "Restore & Recharge",
        product: "Self-Care / Relaxation Product",
        productReferenceNotes: [
          "Cozy evening setting",
          "Soft textures and warm blankets",
          "Candles and ambient light",
          "Bath or bedroom environment",
        ],
        campaignOverview:
          "Create cozy, comforting content that positions the product as an essential part of a self-care ritual. Content should feel like a warm hug — genuine, vulnerable, and relatable. Think Sunday reset energy.",
        objectives: [
          "Build emotional connection with the audience",
          "Showcase the product in self-care routines",
          "Create relatable wind-down content",
          "Drive community engagement and shares",
        ],
        targetAudience: {
          ageRange: "22–38",
          style: "Self-care / cozy lifestyle",
          interests: [
            "Self-care routines",
            "Mental wellness",
            "Bath rituals",
            "Cozy lifestyle content",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["ASMR version", "Product ritual close-ups"],
        },
        contentConcepts: [
          {
            title: "Sunday Reset",
            description:
              "Document a full self-care reset — bath, skincare, tea, journaling, featuring the product as the anchor of the ritual.",
            hooks: [
              "My Sunday reset routine that saved my week.",
              "This is your sign to take a break.",
            ],
          },
          {
            title: "Evening Wind-Down",
            description:
              "Show a calming evening routine — dimming lights, putting on comfortable clothes, using the product to unwind.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Soothing ingredients or materials",
          "Calming sensory experience",
          "Beautiful packaging",
          "Ritual-worthy quality",
        ],
        visualStyle: [
          "Warm low lighting",
          "Soft textures and cozy props",
          "Earth tones and muted palettes",
          "Gentle close-up filming",
        ],
        hookSuggestions: [
          "My self-care non-negotiables.",
          "The coziest evening routine you'll see today.",
          "You deserve this tonight.",
        ],
        dos: [
          "Create a warm, cozy atmosphere",
          "Be genuine and personal",
          "Show the product in use",
          "Use calming music or ASMR",
        ],
        donts: [
          "Sterile or cold environments",
          "Overly promotional energy",
          "Skipping the emotional connection",
          "Harsh or fast-paced editing",
        ],
        callToAction: [
          "Treat yourself — link in bio.",
          "What's your self-care go-to?",
          "Save this for your next reset night.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
  ],

  Food: [
    {
      name: "Cozy Café Vibes",
      description:
        "Warm, inviting café content that feels like a hug in a mug.",
      brief: {
        docTitle: "Cozy Café Vibes Campaign Brief",
        campaignName: "Your New Favorite Spot",
        product: "Café Experience / Beverage",
        productReferenceNotes: [
          "Warm café interiors",
          "Latte art and handcrafted drinks",
          "Cozy seating and ambient decor",
          "Soft warm lighting",
        ],
        campaignOverview:
          "A cozy neighborhood café known for handcrafted drinks and comfort food. We want warm, inviting content that makes viewers feel like they're sitting at the café with a friend. Content should feel organic and unforced.",
        objectives: [
          "Drive foot traffic to the café",
          "Showcase signature drinks and dishes",
          "Build a community-driven brand presence",
          'Create shareable "aesthetic" content',
        ],
        targetAudience: {
          ageRange: "20–35",
          style: "Café culture / foodie lifestyle",
          interests: [
            "Coffee culture",
            "Café hopping",
            "Aesthetic food content",
            "Cozy vibes",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Flat-lay photos", "Behind-the-counter clips"],
        },
        contentConcepts: [
          {
            title: "First Sip Reaction",
            description:
              "Film the moment you take the first sip of a signature drink. Capture genuine reaction.",
            hooks: [
              "Found my new favorite café.",
              "This latte is almost too pretty to drink.",
            ],
          },
          {
            title: "Cozy Study Date",
            description:
              "Show the café as a study or work-from-café spot — laptop, latte, and vibes.",
            hooks: [],
          },
          {
            title: "Menu Tour",
            description:
              "Walk viewers through your order from menu to table. Show the full experience.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Handcrafted drinks",
          "Locally sourced ingredients",
          "Cozy atmosphere",
          "Unique menu items",
        ],
        visualStyle: [
          "Warm, ambient lighting",
          "Close-up food shots",
          "Cozy backgrounds",
          "Slow, relaxed pacing",
        ],
        hookSuggestions: [
          "Found my new favorite café.",
          "This latte is almost too pretty to drink.",
          "The coziest spot in town.",
        ],
        dos: [
          "Show the drink/food being made or served",
          "Capture the café atmosphere",
          "Use warm tones",
          "Include genuine reactions",
        ],
        donts: [
          "Rush through the content",
          "Film in harsh lighting",
          "Show empty or messy spaces",
          "Use aggressive sales language",
        ],
        callToAction: [
          "Go try this place.",
          "Dropping the location below.",
          "You need this in your life.",
        ],
        timeline: {
          contentDue: "3 days after the visit",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Fine Dining Showcase",
      description:
        "Elevated plating and sophisticated ambiance for upscale brands.",
      brief: {
        docTitle: "The Art of Dining Campaign Brief",
        campaignName: "The Art of Dining",
        product: "Fine Dining Experience",
        productReferenceNotes: [
          "Artistic plating and presentation",
          "Elegant table settings",
          "Moody ambient restaurant lighting",
          "Close-up food textures",
        ],
        campaignOverview:
          "An upscale restaurant looking for cinematic UGC that captures the artistry behind every dish. Content should feel like a curated dining experience — elegant, intentional, and visually stunning.",
        objectives: [
          "Position the restaurant as a must-visit destination",
          "Highlight chef craftsmanship and plating",
          "Attract a discerning, high-spending audience",
          "Create premium ad content",
        ],
        targetAudience: {
          ageRange: "28–50",
          style: "Fine dining / gourmet culture",
          interests: [
            "Gourmet food",
            "Wine pairing",
            "Fine dining experiences",
            "Culinary arts",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video + 5 x Photos",
          format: "9:16",
          duration: "30–60 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Course-by-course breakdown", "Chef interaction clips"],
        },
        contentConcepts: [
          {
            title: "The Full Experience",
            description:
              "Document the dining journey from arrival to dessert. Capture ambiance, service, and each course.",
            hooks: [
              "This might be the most beautiful meal I've ever had.",
              "Fine dining, but make it worth it.",
            ],
          },
          {
            title: "Plating Art",
            description:
              "Focus on the visual artistry of each plate — close-ups, slow reveals, and sauce drizzles.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Michelin-quality plating",
          "Seasonal tasting menus",
          "Curated wine list",
          "Intimate ambiance",
        ],
        visualStyle: [
          "Moody, low-key lighting",
          "Cinematic slow motion",
          "Tight close-ups on plating details",
          "Minimal camera movement",
        ],
        hookSuggestions: [
          "This might be the most beautiful meal I've ever had.",
          "Fine dining, but make it worth it.",
          "Every course was a work of art.",
        ],
        dos: [
          "Capture plating details",
          "Film the ambiance",
          "Show genuine awe",
          "Use slow, cinematic movement",
        ],
        donts: [
          "Use flash photography",
          "Film other diners without consent",
          "Rush through courses",
          "Use casual or slangy language",
        ],
        callToAction: [
          "Reservation link in bio.",
          "This is a must-try.",
          "Worth every moment.",
        ],
        timeline: {
          contentDue: "5 days after the visit",
          reviewPeriod: "3–5 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website and press usage",
          ],
          duration: "12 months",
        },
      },
    },
    {
      name: "Quick Bites & Street Food",
      description: "Energetic, casual content with a street-food feel.",
      brief: {
        docTitle: "Bold Flavors Campaign Brief",
        campaignName: "Bold Flavors",
        product: "Street Food / Quick-Service Menu",
        productReferenceNotes: [
          "Vibrant street market setting",
          "Bold colorful ingredients",
          "Handheld food and on-the-go eating",
          "Bright natural daylight",
        ],
        campaignOverview:
          "A vibrant street food brand bringing bold flavors to the masses. We want high-energy, mouth-watering content that captures the excitement of grabbing something delicious on the go. Think food market energy.",
        objectives: [
          "Drive awareness of new menu items",
          "Showcase bold flavors and portion sizes",
          "Create viral-worthy food content",
          "Increase delivery app orders",
        ],
        targetAudience: {
          ageRange: "18–30",
          style: "Street food / casual dining",
          interests: [
            "Food challenges",
            "Street food tours",
            "Budget eats",
            "Viral food content",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Taste reaction clips", "POV ordering footage"],
        },
        contentConcepts: [
          {
            title: "First Bite Reaction",
            description:
              "Film the moment you take the first bite. Big reactions, close-up of the food, genuine commentary.",
            hooks: [
              "Best street food I've ever tried.",
              "You NEED to try this.",
            ],
          },
          {
            title: "Food Market Tour",
            description:
              "Walk through the market/stall and show the ordering process, the cooking, and the final result.",
            hooks: [],
          },
          {
            title: "Ranking & Rating",
            description:
              "Try multiple items and rank them. Give honest, enthusiastic feedback.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Bold fusion flavors",
          "Generous portions",
          "Fresh ingredients",
          "Affordable pricing",
        ],
        visualStyle: [
          "Bright, natural light",
          "Handheld, energetic filming",
          "Close-ups of food textures",
          "Fast-paced editing",
        ],
        hookSuggestions: [
          "Best street food I've ever tried.",
          "You NEED to try this.",
          "I can't believe this only costs…",
        ],
        dos: [
          "Show the food up close",
          "Capture cooking action",
          "Be energetic and genuine",
          "Show portion sizes",
        ],
        donts: [
          "Overproduced or staged content",
          "Negative reviews without context",
          "Filming in low-light areas",
          "Ignoring food safety",
        ],
        callToAction: [
          "Go find them at…",
          "Link in bio to order.",
          "You won't regret it.",
        ],
        timeline: {
          contentDue: "3 days after the visit",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Delivery app marketing",
          ],
          duration: "6 months",
        },
      },
    },
  ],

  Tech: [
    {
      name: "Unboxing & First Look",
      description: "Excitement-driven unboxing content with first impressions.",
      brief: {
        docTitle: "First Impressions Campaign Brief",
        campaignName: "First Impressions",
        product: "New Tech Product / Gadget",
        productReferenceNotes: [
          "Clean desk setup",
          "Product packaging details",
          "Close-up build quality shots",
          "Well-lit workspace",
        ],
        campaignOverview:
          "Capture the excitement of unboxing a new product. The video should feel genuine and discovery-driven — like watching a friend open a new gadget. Focus on first impressions, build quality, and initial reactions.",
        objectives: [
          "Generate launch excitement",
          "Showcase build quality and design",
          "Drive pre-orders or early sales",
          "Create shareable unboxing content",
        ],
        targetAudience: {
          ageRange: "18–35",
          style: "Tech enthusiasts / early adopters",
          interests: [
            "Unboxing videos",
            "New gadgets",
            "Tech reviews",
            "Product launches",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "30–60 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["ASMR unboxing version", "Quick specs overlay"],
        },
        contentConcepts: [
          {
            title: "Classic Unboxing",
            description:
              "Open the packaging on camera, reveal the product, explore what's in the box, share first impressions of build quality.",
            hooks: [
              "This just arrived and I'm so hyped.",
              "Let's see if this lives up to the hype.",
            ],
          },
          {
            title: "Speed Setup",
            description:
              "Unbox, set up, and use the product for the first time in one continuous flow.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Premium build quality",
          "Innovative design",
          "Fast performance",
          "Value for the price",
        ],
        visualStyle: [
          "Clean well-lit desk",
          "Close-up detail shots",
          "Overhead unboxing angle",
          "ASMR-friendly audio",
        ],
        hookSuggestions: [
          "I did NOT expect it to feel this premium.",
          "Is this the best unboxing of the year?",
          "The packaging alone is worth it.",
        ],
        dos: [
          "Show packaging details",
          "Get close-ups of build quality",
          "Share genuine reactions",
          "Mention key specs naturally",
        ],
        donts: [
          "Rushing through the unboxing",
          "Skipping the reveal moment",
          "Reading specs off a sheet",
          "Mention competitor products",
        ],
        callToAction: [
          "Link in bio to check it out.",
          "Would you get this?",
          "Full review coming soon.",
        ],
        timeline: {
          contentDue: "2 days after receiving the product",
          reviewPeriod: "2 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "In-Depth Review",
      description: "Detailed, data-driven reviews for the tech-savvy audience.",
      brief: {
        docTitle: "The Honest Review Campaign Brief",
        campaignName: "The Honest Review",
        product: "Tech Product / Software",
        productReferenceNotes: [
          "Product in real-world use",
          "Screen recordings or benchmarks",
          "Comparison setups",
          "Clean professional backdrop",
        ],
        campaignOverview:
          "Create a thorough, honest review that helps viewers make a purchase decision. Content should feel credible and informative — think trusted tech reviewer, not salesperson. Include real performance data.",
        objectives: [
          "Build credibility and trust",
          "Drive informed purchase decisions",
          "Showcase real-world performance",
          "Create evergreen review content",
        ],
        targetAudience: {
          ageRange: "22–40",
          style: "Tech enthusiasts / professionals",
          interests: [
            "In-depth reviews",
            "Benchmarks and performance",
            "Buying guides",
            "Tech comparison",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "30–60 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Benchmark screenshots", "Comparison clips"],
        },
        contentConcepts: [
          {
            title: "Week With It",
            description:
              "After using the product for a week, share honest thoughts on performance, battery, build quality, and value.",
            hooks: [
              "I used this for a week — here's the truth.",
              "Honest review after 7 days.",
            ],
          },
          {
            title: "Speed & Performance Test",
            description:
              "Put the product through real-world performance tests. Show load times, benchmarks, or workflow demos.",
            hooks: [
              "Let's see how fast this really is.",
              "Speed test that might surprise you.",
            ],
          },
        ],
        keyFeatures: [
          "Real-world performance",
          "Battery efficiency",
          "Build and design quality",
          "Software experience",
        ],
        visualStyle: [
          "Clean professional setup",
          "Screen recordings where relevant",
          "Good audio quality",
          "B-roll of product in use",
        ],
        hookSuggestions: [
          "Here's what no one is telling you about this product.",
          "After a week, here's my honest take.",
          "Is it worth the price? Let's find out.",
        ],
        dos: [
          "Be honest about pros AND cons",
          "Show real-world usage",
          "Include performance data",
          "Keep it concise but thorough",
        ],
        donts: [
          "Only praise with no critique",
          "Read specs without context",
          "Poor audio quality",
          "Mention competitor products negatively",
        ],
        callToAction: [
          "Link in bio for the best price.",
          "Worth it or skip it? Comment below.",
          "Full specs linked below.",
        ],
        timeline: {
          contentDue: "7 days after receiving the product",
          reviewPeriod: "3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Setup & Productivity",
      description: "Desk tours, workflows, and productivity-focused content.",
      brief: {
        docTitle: "Level Up Your Setup Campaign Brief",
        campaignName: "Level Up Your Setup",
        product: "Productivity Tool / Desk Accessory",
        productReferenceNotes: [
          "Organized desk setup",
          "Product integrated into workflow",
          "Before/after desk transformation",
          "Clean ambient lighting",
        ],
        campaignOverview:
          "Show how the product fits into or improves a real workspace. Content should feel aspirational yet achievable — like a setup tour that makes viewers want to upgrade their own space.",
        objectives: [
          "Showcase the product in a real workspace",
          "Inspire desk setup upgrades",
          "Drive sales through lifestyle integration",
          "Create aspirational productivity content",
        ],
        targetAudience: {
          ageRange: "22–38",
          style: "Productivity / remote work",
          interests: [
            "Desk setups",
            "Productivity tips",
            "Remote work",
            "Work from home gear",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Before/after setup clip", "Workflow demo"],
        },
        contentConcepts: [
          {
            title: "Desk Tour + Integration",
            description:
              "Tour the desk setup, introduce the product, and show how it fits into the daily workflow.",
            hooks: [
              "This one upgrade changed my entire workflow.",
              "My desk setup just hit different.",
            ],
          },
          {
            title: "Before & After Setup",
            description:
              "Show the desk before the product, then the transformation after adding it.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Seamless workflow integration",
          "Clean minimal design",
          "Productivity boost",
          "Premium build quality",
        ],
        visualStyle: [
          "Clean ambient desk lighting",
          "Overhead desk shots",
          "Smooth transitions",
          "ASMR-friendly setup sounds",
        ],
        hookSuggestions: [
          "The desk upgrade I didn't know I needed.",
          "This made my setup 10x better.",
          "If you work from home, you need this.",
        ],
        dos: [
          "Show the product in context",
          "Highlight how it improves the workflow",
          "Keep the setup clean",
          "Use smooth transitions",
        ],
        donts: [
          "Messy or cluttered desk",
          "Just showing the product in isolation",
          "Ignoring the workflow aspect",
          "Mention competitor products",
        ],
        callToAction: [
          "Link in bio to upgrade your setup.",
          "What would you add to this desk?",
          "Setup list linked below.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
  ],

  "Beauty/Makeup": [
    {
      name: "Everyday Glam",
      description: "Wearable, polished looks for the everyday beauty lover.",
      brief: {
        docTitle: "Everyday Glam Campaign Brief",
        campaignName: "Effortless Beauty",
        product: "Signature Foundation / Palette",
        productReferenceNotes: [
          "Natural skin-focused finish",
          "Soft glam aesthetic",
          "Well-lit vanity or bathroom setting",
          "Close-up skin texture shots",
        ],
        campaignOverview:
          "Create relatable beauty content that feels achievable for everyday wear. The video should look like a genuine product recommendation from a trusted friend — not a brand ad.",
        objectives: [
          "Showcase product performance and finish",
          "Build trust through authentic demonstration",
          "Drive purchase intent",
          "Create high-converting ad creatives",
        ],
        targetAudience: {
          ageRange: "20–35",
          style: "Everyday beauty / soft glam",
          interests: [
            "Makeup tutorials",
            "Skincare routines",
            "Beauty recommendations",
            "GRWM content",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Before/after photos", "Swatch clips"],
        },
        contentConcepts: [
          {
            title: "GRWM — Everyday Look",
            description:
              "Film a quick get-ready-with-me applying the product. Show application, blending, and final result.",
            hooks: [
              "My everyday foundation routine in 30 seconds.",
              "This foundation just became my holy grail.",
            ],
          },
          {
            title: "Before & After",
            description:
              "Start with bare skin, apply the product, show the transformation side-by-side.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Buildable coverage",
          "Long-lasting formula",
          "Natural skin-like finish",
          "Wide shade range",
        ],
        visualStyle: [
          "Ring light or natural window light",
          "Close-up application shots",
          "Clean vanity setup",
          "Skin texture close-ups",
        ],
        hookSuggestions: [
          "The most natural-looking foundation I've ever tried.",
          "If you hate cakey foundation, you need this.",
          "Watch this coverage — I'm shook.",
        ],
        dos: [
          "Show real skin texture",
          "Film the full application process",
          "Use good lighting",
          "Give honest opinions",
        ],
        donts: [
          "Heavy filters",
          "Skip showing actual application",
          "Overly edited skin",
          "Mention competitor brands",
        ],
        callToAction: [
          "Link in bio to shop.",
          "Run, don't walk.",
          "Would you try this shade?",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Bold & Editorial",
      description: "High-impact, creative looks that push boundaries.",
      brief: {
        docTitle: "Bold & Editorial Campaign Brief",
        campaignName: "Unleash Color",
        product: "Bold Color Palette / Lip Collection",
        productReferenceNotes: [
          "Vivid saturated colors",
          "Creative editorial styling",
          "Studio or dramatic backdrop",
          "Directional dramatic lighting",
        ],
        campaignOverview:
          "Push creative boundaries with bold, editorial-style beauty content. This campaign is about self-expression and artistry. Content should feel like wearable art.",
        objectives: [
          "Showcase color payoff and pigmentation",
          "Attract the creative beauty community",
          "Generate viral shareable looks",
          "Position the brand as bold and innovative",
        ],
        targetAudience: {
          ageRange: "18–30",
          style: "Creative / editorial beauty",
          interests: [
            "Makeup artistry",
            "Color trends",
            "Beauty challenges",
            "Editorial looks",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–45 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Close-up swatch video", "Tutorial breakdown"],
        },
        contentConcepts: [
          {
            title: "Transformation Look",
            description:
              "Start with a bare face, then cut to a dramatic bold look. Use quick transitions for impact.",
            hooks: [
              "Wait for the transformation...",
              "I went ALL IN with this palette.",
            ],
          },
          {
            title: "Swatch & Create",
            description:
              "Swatch the bold colors on the hand/arm, then create a look using those shades.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Intense pigmentation",
          "Blendable formula",
          "Unique bold shades",
          "Long-wearing",
        ],
        visualStyle: [
          "Dramatic directional lighting",
          "Bold color-coordinated backgrounds",
          "Extreme close-ups",
          "Sharp transitions",
        ],
        hookSuggestions: [
          "This pigment is INSANE.",
          "I created the boldest look with just one palette.",
          "This color is everything.",
        ],
        dos: [
          "Go bold with color",
          "Show pigment close-ups",
          "Use creative angles",
          "Make it shareable",
        ],
        donts: [
          "Playing it safe with neutral looks",
          "Poor color representation",
          "Dull flat lighting",
          "Mention competitor brands",
        ],
        callToAction: [
          "Which shade is your favorite?",
          "Link in bio to shop the palette.",
          "Try this look and tag us.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
    {
      name: "Clean Beauty",
      description: "Minimal, skin-first content with a fresh, natural finish.",
      brief: {
        docTitle: "Clean Beauty Campaign Brief",
        campaignName: "Skin First",
        product: "Tinted Moisturizer / Skin Tint",
        productReferenceNotes: [
          "Dewy natural skin",
          "Minimal makeup aesthetic",
          "Bright natural lighting",
          "Clean fresh backgrounds",
        ],
        campaignOverview:
          'Celebrate the beauty of natural skin with minimal, clean beauty content. The video should feel fresh, honest, and skin-focused. Think "no-makeup makeup" energy.',
        objectives: [
          "Showcase the skin-like finish",
          "Appeal to the clean beauty community",
          "Build trust with ingredient-conscious consumers",
          "Drive trial and sampling",
        ],
        targetAudience: {
          ageRange: "22–40",
          style: "Clean / minimal beauty",
          interests: [
            "Skincare",
            "Clean ingredients",
            "No-makeup makeup",
            "Wellness",
          ],
        },
        deliverables: {
          quantity: "1 x Vertical Video",
          format: "9:16",
          duration: "15–30 seconds",
          resolution: "1080x1920",
          fileType: ".mp4 or .mov",
          optional: ["Ingredient close-up", "Wear-test throughout the day"],
        },
        contentConcepts: [
          {
            title: "No-Makeup Makeup",
            description:
              'Apply the skin tint with fingers for a natural look. Show the "my skin but better" result.',
            hooks: [
              "This is my entire makeup routine now.",
              "The most natural skin tint I've ever tried.",
            ],
          },
          {
            title: "Morning Skincare to Makeup",
            description:
              "Show your skincare routine flowing into applying the product. Emphasize how it works with skincare.",
            hooks: [],
          },
        ],
        keyFeatures: [
          "Clean ingredients",
          "Sheer buildable coverage",
          "Dewy natural finish",
          "Skincare-infused formula",
        ],
        visualStyle: [
          "Bright natural window light",
          "No heavy filters",
          "Skin close-ups showing real texture",
          "Minimal clean backgrounds",
        ],
        hookSuggestions: [
          "If you love the no-makeup look, you need this.",
          "One product, 30 seconds, and I'm out the door.",
          "Finally a skin tint that actually looks like skin.",
        ],
        dos: [
          "Show real skin texture",
          "Keep lighting bright and natural",
          "Emphasize simplicity",
          "Mention clean ingredients",
        ],
        donts: [
          "Heavy filters or editing",
          "Over-applying for full coverage",
          "Dark moody lighting",
          "Mention competitor brands",
        ],
        callToAction: [
          "Link in bio for the shade finder.",
          "This is clean beauty done right.",
          "Try it — your skin will thank you.",
        ],
        timeline: {
          contentDue: "5 days after receiving the product",
          reviewPeriod: "2–3 days",
        },
        usageRights: {
          rights: [
            "Paid ad usage rights",
            "Social media usage",
            "Website marketing usage",
          ],
          duration: "6 months",
        },
      },
    },
  ],
};

export default brandBriefTemplates;
