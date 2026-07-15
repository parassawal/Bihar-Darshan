import type { CultureSection } from '../components/tribals/CulturalHighlightsGrid';

/**
 * Returns cultural sections for a given tribe.
 * 2 carousel sections:
 *   1. Traditions & Culture
 *   2. Famous Personalities
 */

/* ──────────────────────────────────────────────────────────────
   Tribe-specific data
   ────────────────────────────────────────────────────────────── */

const santhalSections: CultureSection[] = [
  {
    heading: 'Traditions & Culture',
    cards: [
      {
        image: '/images/tribals/santhal.png',
        title: 'Sohrai Festival',
        description: 'A harvest festival celebrated with wall paintings, cattle worship, and traditional Santhali songs and dances.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Baha Festival',
        description: 'The spring flower festival where Sal flowers are offered to the deity and community dances fill the village.',
      },
      {
        image: '/images/tribals/santhal_nobg.png',
        title: 'Jadopatia Scroll Painting',
        description: 'Traditional scroll paintings used by Santhal priests to narrate stories of life, death, and the afterlife.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Manjhi Haram Council',
        description: 'The village governance system led by the headman (Manjhi Haram), emphasizing community consensus and justice.',
      },
    ],
  },
  {
    heading: 'Famous Personalities',
    cards: [
      {
        image: '/images/tribals/santhal.png',
        title: 'Sido Murmu',
        description: 'Leader of the 1855 Santhal Rebellion against British colonial exploitation and zamindari oppression.',
      },
      {
        image: '/images/tribals/santhal_nobg.png',
        title: 'Kanhu Murmu',
        description: 'Co-leader of the Santhal Hool alongside his brother Sido. A symbol of tribal resistance and courage.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Droupadi Murmu',
        description: 'Former President of India and the first tribal woman to hold the highest constitutional office.',
      },
      {
        image: '/images/tribals/santhal.png',
        title: 'Chand & Bhairav',
        description: 'Brothers who alongside Sido and Kanhu, were instrumental in leading the great Santhal uprising of 1855.',
      },
    ],
  },
  {
    heading: 'Arts & Handicrafts',
    cards: [
      {
        image: '/images/tribals/santhal_nobg.png',
        title: 'Jadopatia Paintings',
        description: 'Traditional scroll paintings narrating creation myths and tribal folklore, created by the Jadopatia community.',
      },
      {
        image: '/images/tribals/santhal.png',
        title: 'Sohrai Wall Art',
        description: 'Vibrant mural art using natural clays and colors to decorate houses, especially during the harvest season.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Bamboo & Cane Craft',
        description: 'Intricate baskets, fishing traps, and daily utility items crafted with remarkable skill using local bamboo.',
      },
    ],
  },
  {
    heading: 'Food',
    cards: [
      {
        image: '/images/tribals/generic.png',
        title: 'Handia (Rice Beer)',
        description: 'A traditional and sacred fermented beverage made from rice and herbal root ferments called Ranu.',
      },
      {
        image: '/images/tribals/santhal_nobg.png',
        title: 'Pitha',
        description: 'Traditional rice cakes prepared in various sweet and savory forms, especially during festivals like Makar Sankranti.',
      },
      {
        image: '/images/tribals/santhal.png',
        title: 'Forest Produce',
        description: 'Diet rich in locally foraged mushrooms, tubers, leaves, and fruits like Mahua and Sal seeds.',
      },
    ],
  },
  {
    heading: 'Oral Stories & Folklore',
    cards: [
      {
        image: '/images/tribals/santhal.png',
        title: 'The Binti Myths',
        description: 'Sacred creation myths explaining the origin of the universe, earth, and the Santhal ancestors, Pilchu Haram and Pilchu Budhi.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Tales of Marang Buru',
        description: 'Folklore surrounding the Great Mountain spirit, Marang Buru, who guided the Santhals through their ancestral journeys.',
      },
      {
        image: '/images/tribals/santhal_nobg.png',
        title: 'Animal Fables',
        description: 'Stories imparting moral lessons and highlighting the deep connection between the Santhals and forest wildlife.',
      },
    ],
  },
];

const oraonSections: CultureSection[] = [
  {
    heading: 'Traditions & Culture',
    cards: [
      {
        image: '/images/tribals/oraon.png',
        title: 'Karam Festival',
        description: 'A major festival celebrated with all-night dances around the Karam tree, symbolizing prosperity and good health.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Sarhul Festival',
        description: 'Spring festival celebrating new blooms. Sacred Sal flowers are offered and community feasts mark the occasion.',
      },
      {
        image: '/images/tribals/oraon_nobg.png',
        title: 'Dhumkuria System',
        description: 'Youth dormitories where unmarried members learn tribal customs, songs, dances, and social responsibilities.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Sarna Worship',
        description: 'Sacred groves serve as places of worship where rituals are performed to honor Dharmes, the supreme sun deity.',
      },
    ],
  },
  {
    heading: 'Famous Personalities',
    cards: [
      {
        image: '/images/tribals/oraon.png',
        title: 'Jatra Oraon',
        description: 'A prominent tribal freedom fighter who led the Tana Bhagat movement against British rule and social injustice.',
      },
      {
        image: '/images/tribals/oraon_nobg.png',
        title: 'Kartik Oraon',
        description: 'Social reformer who worked tirelessly for the educational upliftment and rights of tribal communities.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Tribal Elders',
        description: 'Community leaders who preserve the Oraon oral traditions, medicinal knowledge, and ceremonial practices.',
      },
    ],
  },
  {
    heading: 'Arts & Handicrafts',
    cards: [
      {
        image: '/images/tribals/oraon.png',
        title: 'Wood Carving',
        description: 'Skilled craftsmanship in creating wooden masks, musical instruments like the Mandar, and household items.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Traditional Ornaments',
        description: 'Intricate brass and silver jewelry, including heavy necklaces and bangles, traditionally worn by Oraon women.',
      },
      {
        image: '/images/tribals/oraon_nobg.png',
        title: 'Textile Weaving',
        description: 'Handwoven traditional garments with specific patterns that signify tribal identity and marital status.',
      },
    ],
  },
  {
    heading: 'Food',
    cards: [
      {
        image: '/images/tribals/generic.png',
        title: 'Chilka Roti',
        description: 'A popular traditional crepe made from rice flour and chana dal, often served with meat or vegetable curries.',
      },
      {
        image: '/images/tribals/oraon_nobg.png',
        title: 'Handia',
        description: 'The traditional rice beer that holds immense cultural and ritualistic significance in Oraon society.',
      },
      {
        image: '/images/tribals/oraon.png',
        title: 'Tribal Curries',
        description: 'Flavorful dishes prepared with locally sourced meats, fish, and forest vegetables, cooked using traditional methods.',
      },
    ],
  },
  {
    heading: 'Oral Stories & Folklore',
    cards: [
      {
        image: '/images/tribals/oraon_nobg.png',
        title: 'Myths of Dharmes',
        description: 'Creation stories centering on Dharmes, the Supreme Being, and his interactions with humans and nature.',
      },
      {
        image: '/images/tribals/oraon.png',
        title: 'Rohtasgarh Legends',
        description: 'Historical folklore recounting the Oraon ancestors\' migration from the ancient fort of Rohtasgarh.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Spiritual Tales',
        description: 'Narratives explaining the origins of sacred groves (Sarna) and the importance of appeasing local nature spirits.',
      },
    ],
  },
];

const mundaSections: CultureSection[] = [
  {
    heading: 'Traditions & Culture',
    cards: [
      {
        image: '/images/tribals/munda.png',
        title: 'Ulgulan Legacy',
        description: 'The Great Tumult led by Birsa Munda against British colonial rule remains a defining cultural memory.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Akhra Gatherings',
        description: 'The village dancing ground where Munda people gather for folk dances, music, and community celebrations.',
      },
      {
        image: '/images/tribals/munda_nobg.png',
        title: 'Mage Festival',
        description: 'A winter festival celebrated with traditional Jadur and Mage dances, storytelling, and ritual offerings.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Singbonga Worship',
        description: 'Rituals to honor the Sun God at sacred Sarna groves, accompanied by community prayers and offerings.',
      },
    ],
  },
  {
    heading: 'Famous Personalities',
    cards: [
      {
        image: '/images/tribals/munda.png',
        title: 'Birsa Munda',
        description: 'The legendary "Dharti Aaba" (Father of the Earth) who led the tribal rebellion against the British in 1899-1900.',
      },
      {
        image: '/images/tribals/munda_nobg.png',
        title: 'Tribal Warriors',
        description: 'Generations of Munda warriors who fought against exploitation, preserving their land rights and dignity.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Community Leaders',
        description: 'Village headmen and spiritual leaders who maintained Munda traditions through centuries of change.',
      },
    ],
  },
  {
    heading: 'Arts & Handicrafts',
    cards: [
      {
        image: '/images/tribals/munda.png',
        title: 'Weaponry & Metalwork',
        description: 'Traditional skills in forging iron tools, hunting implements, and iconic weapons like bows and arrows.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Woodcraft',
        description: 'Carved wooden pillars, agricultural implements, and traditional musical instruments like the Nagara.',
      },
      {
        image: '/images/tribals/munda_nobg.png',
        title: 'Stone Carving',
        description: 'The ancient practice of creating Sasandiri (burial stones) to honor ancestors, reflecting deep historical roots.',
      },
    ],
  },
  {
    heading: 'Food',
    cards: [
      {
        image: '/images/tribals/munda_nobg.png',
        title: 'Illi (Rice Beer)',
        description: 'A sacred and social beverage integral to Munda rituals, hospitality, and daily life.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Dalma & Rice',
        description: 'A wholesome staple combination of lentils cooked with local vegetables, typically served with boiled rice.',
      },
      {
        image: '/images/tribals/munda.png',
        title: 'Roasted Meats',
        description: 'Traditional preparations of game and livestock, often roasted over open fires during communal feasts.',
      },
    ],
  },
  {
    heading: 'Oral Stories & Folklore',
    cards: [
      {
        image: '/images/tribals/munda.png',
        title: 'Songs of Ulgulan',
        description: 'Folk songs and ballads immortalizing the heroic deeds of Birsa Munda and the great rebellion.',
      },
      {
        image: '/images/tribals/generic.png',
        title: 'Asur-Munda Legends',
        description: 'Ancient myths detailing the mythological conflicts and interactions between the Munda and the iron-smelting Asur tribe.',
      },
      {
        image: '/images/tribals/munda_nobg.png',
        title: 'Singbonga Epics',
        description: 'Narratives praising the Sun God, Singbonga, and explaining the cosmic order and the Munda\'s place within it.',
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   Generic fallback for tribes without specific data
   ────────────────────────────────────────────────────────────── */

const genericSections = (tribeName: string, id: string): CultureSection[] => [
  {
    heading: 'Traditions & Culture',
    cards: [
      {
        image: `/images/tribals/${id}.png`,
        title: 'Traditional Festivals',
        description: `The ${tribeName} celebrate seasonal festivals tied to agriculture and nature, featuring folk dances, music, and communal feasting.`,
      },
      {
        image: `/images/tribals/generic.png`,
        title: 'Village Governance',
        description: `A traditional council system governs ${tribeName} villages, with elders playing a central role in decision-making and dispute resolution.`,
      },
      {
        image: `/images/tribals/${id}_nobg.png`,
        title: 'Rituals & Worship',
        description: `Nature worship and ancestor veneration form the spiritual core of ${tribeName} life, with sacred groves serving as places of prayer.`,
      },
      {
        image: `/images/tribals/generic.png`,
        title: 'Folk Music & Dance',
        description: `Rhythmic folk dances accompanied by traditional drums and flutes are performed during festivals and community celebrations.`,
      },
    ],
  },
  {
    heading: 'Famous Personalities',
    cards: [
      {
        image: `/images/tribals/${id}.png`,
        title: 'Community Elders',
        description: `Respected elders who have preserved the ${tribeName} oral traditions, medicinal knowledge, and cultural practices for generations.`,
      },
      {
        image: `/images/tribals/${id}_nobg.png`,
        title: 'Tribal Leaders',
        description: `Leaders who have fought for the rights, recognition, and welfare of the ${tribeName} community across different eras.`,
      },
      {
        image: `/images/tribals/generic.png`,
        title: 'Cultural Keepers',
        description: `Artists, musicians, and storytellers who keep the rich heritage of the ${tribeName} alive through their craft and performance.`,
      },
    ],
  },
  {
    heading: 'Arts & Handicrafts',
    cards: [
      {
        image: `/images/tribals/${id}.png`,
        title: 'Traditional Crafts',
        description: `Unique artisanal skills passed down through generations, reflecting the aesthetic sense of the ${tribeName}.`,
      },
      {
        image: `/images/tribals/generic.png`,
        title: 'Bamboo & Cane Work',
        description: `Skilled weaving of local bamboo and cane into functional daily items, baskets, and decorative pieces.`,
      },
      {
        image: `/images/tribals/${id}_nobg.png`,
        title: 'Handloom & Textiles',
        description: `Traditional weaving techniques producing distinct patterns and fabrics worn by the ${tribeName}.`,
      },
    ],
  },
  {
    heading: 'Food',
    cards: [
      {
        image: `/images/tribals/generic.png`,
        title: 'Traditional Cuisine',
        description: `Authentic dishes representing the culinary heritage of the ${tribeName}, made from locally sourced ingredients.`,
      },
      {
        image: `/images/tribals/${id}_nobg.png`,
        title: 'Rice Preparations',
        description: `Various staples and fermented beverages made from rice, a vital part of the daily and ritualistic diet.`,
      },
      {
        image: `/images/tribals/${id}.png`,
        title: 'Forest Produce',
        description: `A diverse diet relying on seasonal forest gatherings, including roots, tubers, wild greens, and mushrooms.`,
      },
    ],
  },
  {
    heading: 'Oral Stories & Folklore',
    cards: [
      {
        image: `/images/tribals/${id}.png`,
        title: 'Ancestral Tales',
        description: `Oral histories recounting the origins, migrations, and legendary ancestors of the ${tribeName}.`,
      },
      {
        image: `/images/tribals/generic.png`,
        title: 'Creation Myths',
        description: `Spiritual narratives explaining the creation of the world, humans, and the relationship with nature.`,
      },
      {
        image: `/images/tribals/${id}_nobg.png`,
        title: 'Nature Folklore',
        description: `Stories and fables that emphasize living in harmony with the environment and respecting forest spirits.`,
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   Lookup
   ────────────────────────────────────────────────────────────── */

const specificData: Record<string, CultureSection[]> = {
  santhal: santhalSections,
  oraon: oraonSections,
  munda: mundaSections,
};

export const getTribeCulturalSections = (id: string, tribeName: string): CultureSection[] => {
  return specificData[id] || genericSections(tribeName, id);
};
