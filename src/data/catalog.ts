import { BrandAccent, CategoryName, ModelProfile, VideoItem } from '../types';

export const BRAND_LOGO_URL = '/assets/aistudio/make-the-background-transparent_7104580f.jpg';

export const ACCENT_TOKENS: Record<
  BrandAccent,
  {
    hex: string;
    text: string;
    bg: string;
    softBg: string;
    border: string;
    ring: string;
  }
> = {
  pink: {
    hex: '#EC008C',
    text: 'text-[#D6007E]',
    bg: 'bg-[#EC008C]',
    softBg: 'bg-[#EC008C]/10',
    border: 'border-[#EC008C]',
    ring: 'focus-visible:ring-[#EC008C]',
  },
  blue: {
    hex: '#007BFF',
    text: 'text-[#0066D6]',
    bg: 'bg-[#007BFF]',
    softBg: 'bg-[#007BFF]/10',
    border: 'border-[#007BFF]',
    ring: 'focus-visible:ring-[#007BFF]',
  },
  lime: {
    hex: '#65A30D',
    text: 'text-[#4D7C0F]',
    bg: 'bg-[#65A30D]',
    softBg: 'bg-[#7AC943]/15',
    border: 'border-[#65A30D]',
    ring: 'focus-visible:ring-[#65A30D]',
  },
  yellow: {
    hex: '#D97706',
    text: 'text-[#B45309]',
    bg: 'bg-[#EAB308]',
    softBg: 'bg-[#FFD400]/20',
    border: 'border-[#EAB308]',
    ring: 'focus-visible:ring-[#EAB308]',
  },
};

export const CATEGORIES: CategoryName[] = [
  'All',
  'Fashion Editorial',
  'Studio Sessions',
  'Fitness & Movement',
  'Resort & Travel',
  'Backstage',
  'Beauty & Glam',
];

export const CATEGORY_ACCENT: Record<CategoryName, BrandAccent> = {
  All: 'pink',
  'Fashion Editorial': 'pink',
  'Studio Sessions': 'blue',
  'Fitness & Movement': 'lime',
  'Resort & Travel': 'yellow',
  Backstage: 'blue',
  'Beauty & Glam': 'pink',
};

export const MODELS: ModelProfile[] = [
  {
    id: 'elena-vance',
    slug: 'elena-vance',
    name: 'Elena Vance',
    location: 'Milan & Los Angeles',
    debutYear: 2021,
    specialty: 'Runway & Tailored Editorial',
    tagline: 'Sharp architectural silhouettes and high-color studio lookbooks.',
    biography: [
      'Elena Vance began her career walking independent Milanese tailoring showcases before expanding into kinetic editorial short films. Known for her commanding presence and razor-sharp studio pacing, she collaborates with art directors who favor crisp daylight spaces and saturated monochrome tailoring.',
      'Between runway seasons in Europe and studio shoots in Los Angeles, Elena produces behind-the-camera styling diaries and rooftop wellness sessions that highlight the athletic discipline behind live editorial work.',
    ],
    portraitUrl: '/src/assets/images/model_elena_vance_1795316227010.jpg',
    accent: 'pink',
    baseUpvotes: 1482,
    baseDownvotes: 64,
    stats: {
      height: '5\'10" (178 cm)',
      languages: 'English, Italian',
      agency: 'Vance Studio Collective',
      signatureStyle: 'Structured Magenta & Crisp Tailoring',
    },
  },
  {
    id: 'maya-lin',
    slug: 'maya-lin',
    name: 'Maya Lin',
    location: 'Tokyo & New York',
    debutYear: 2022,
    specialty: 'Contemporary Movement & Fitness',
    tagline: 'Kinetic choreography, sunlit loft routines, and athletic editorial reels.',
    biography: [
      'Trained in contemporary dance in Tokyo and modern movement studies in Manhattan, Maya Lin brings explosive athleticism and clean geometry to motion-focused video productions. Her loft rehearsal films blend modern dance phrasing with minimalist athletic styling.',
      'Maya frequently leads collaborative mobility sessions and high-frame-rate movement studies shot in natural daylight lofts and open-air city rooftops.',
    ],
    portraitUrl: '/src/assets/images/model_maya_lin_1795316227492.jpg',
    accent: 'blue',
    baseUpvotes: 1325,
    baseDownvotes: 51,
    stats: {
      height: '5\'7" (170 cm)',
      languages: 'English, Japanese',
      agency: 'Kinetik Talent NY',
      signatureStyle: 'Cobalt Activewear & Loft Motion',
    },
  },
  {
    id: 'sofia-morales',
    slug: 'sofia-morales',
    name: 'Sofia Morales',
    location: 'Barcelona & Amalfi',
    debutYear: 2020,
    specialty: 'Resort Fashion & Travel Cinema',
    tagline: 'Sun-drenched Mediterranean visual diaries and golden-hour lookbooks.',
    biography: [
      'Sofia Morales specializes in warm coastal storytelling and resort capsule films shot across Southern Europe. Her signature visual language pairs breezy linen silhouettes and sunburst yellow palettes against whitewashed coastal architecture.',
      'Over the past four seasons, Sofia has anchored flagship summer travel series and collaborative coastal film journals prized for their effortless natural lighting and vivid color grading.',
    ],
    portraitUrl: '/src/assets/images/model_sofia_morales_1795316227882.jpg',
    accent: 'yellow',
    baseUpvotes: 1640,
    baseDownvotes: 72,
    stats: {
      height: '5\'8" (173 cm)',
      languages: 'Spanish, English, Italian',
      agency: 'Solis Visual Management',
      signatureStyle: 'Golden Hour Resort Linen',
    },
  },
  {
    id: 'chloe-bennett',
    slug: 'chloe-bennett',
    name: 'Chloe Bennett',
    location: 'London',
    debutYear: 2023,
    specialty: 'Pop-Art Beauty & Studio Campaigns',
    tagline: 'Bold chromatic cosmetics sets, color-block knitwear, and high-key glam.',
    biography: [
      'Based in East London, Chloe Bennett is a sought-after beauty and color-editorial talent recognized for luminous studio close-ups and playful pop-art set collaborations. She thrives under sculptural studio lighting and theatrical acrylic color props.',
      'Her studio films pull viewers directly onto the cyclorama floor, showcasing real-time makeup artistry, chromatic gel tests, and vibrant seasonal lookbooks.',
    ],
    portraitUrl: '/src/assets/images/model_chloe_bennett_1795316226782.jpg',
    accent: 'lime',
    baseUpvotes: 1194,
    baseDownvotes: 48,
    stats: {
      height: '5\'9" (175 cm)',
      languages: 'English',
      agency: 'Chroma Artists London',
      signatureStyle: 'Pop-Art Lime & Luminous Beauty',
    },
  },
  {
    id: 'amara-okafor',
    slug: 'amara-okafor',
    name: 'Amara Okafor',
    location: 'Paris & Lagos',
    debutYear: 2019,
    specialty: 'Avant-Garde Outerwear & Backstage Film',
    tagline: 'Sculptural Parisian atelier couture and medium-format portrait cinema.',
    biography: [
      'Amara Okafor brings gallery-grade poise to Paris fashion weeks and documentary backstage cinema. With a background in art history, she gravitates toward bold color-blocked outerwear, sharp architectural tailoring, and 35mm portrait films.',
      'Her collaborations invite audiences behind the curtain of Parisian ateliers—capturing fitting rooms, lighting setups, and high-contrast studio portraits with timeless precision.',
    ],
    portraitUrl: '/src/assets/images/model_amara_okafor_1795316227011.jpg',
    accent: 'blue',
    baseUpvotes: 1715,
    baseDownvotes: 43,
    stats: {
      height: '5\'11" (180 cm)',
      languages: 'English, French',
      agency: 'Atelier Nord Paris',
      signatureStyle: 'Architectural Cobalt & Gallery Minimal',
    },
  },
  {
    id: 'valentina-rossi',
    slug: 'valentina-rossi',
    name: 'Valentina Rossi',
    location: 'Rome & Miami',
    debutYear: 2022,
    specialty: 'Street Style & Retro Travel Reels',
    tagline: 'Sunlit Art Deco strolls, patterned silk accessories, and upbeat city guides.',
    biography: [
      'Splitting her calendar between Rome and Miami Beach, Valentina Rossi blends Italian sartorial wit with playful retro street-style energy. Her daylight city walks celebrate pastel facades, bold eyewear, and kinetic handheld camera work.',
      'Whether filming solo Art Deco style reels or teaming up on Mediterranean coastal diaries, Valentina delivers upbeat, color-rich visual storytelling.',
    ],
    portraitUrl: '/src/assets/images/model_valentina_rossi_1795316227365.jpg',
    accent: 'pink',
    baseUpvotes: 1268,
    baseDownvotes: 59,
    stats: {
      height: '5\'8" (173 cm)',
      languages: 'Italian, English',
      agency: 'Via Veneto Creative',
      signatureStyle: 'Retro Eyewear & Vibrant Silk',
    },
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-magenta-runway',
    title: 'Magenta Studio Lookbook: Spring Architectural Runway Film',
    description:
      'Elena Vance commands a daylight gallery runway in razor-sharp hot-pink tailoring, accompanied by pop-art pink and yellow floor light installations shot in crisp 4K cinema framing.',
    thumbnailUrl: '/src/assets/images/vid_magenta_runway_1795316226974.jpg',
    duration: '08:42',
    durationSeconds: 522,
    views: 284500,
    publishedAt: '2026-11-21T16:30:00Z',
    relativeDate: '2 hours ago',
    category: 'Fashion Editorial',
    tags: ['Runway', '4K', 'Editorial', 'PopArt'],
    modelIds: ['elena-vance'],
    resolution: '4K',
    accent: 'pink',
    likes: 18420,
  },
  {
    id: 'vid-cobalt-choreography',
    title: 'Electric Blue Loft: High-Speed Contemporary Movement Reel',
    description:
      'Captured inside a sunlit industrial dance studio, Maya Lin performs an expressive contemporary movement sequence in electric cobalt athletic wear with crisp architectural shadows.',
    thumbnailUrl: '/src/assets/images/vid_cobalt_choreography_1795316227882.jpg',
    duration: '06:18',
    durationSeconds: 378,
    views: 196200,
    publishedAt: '2026-11-21T11:00:00Z',
    relativeDate: '7 hours ago',
    category: 'Fitness & Movement',
    tags: ['Choreography', 'Studio', '4K', 'Wellness'],
    modelIds: ['maya-lin'],
    resolution: '4K',
    accent: 'blue',
    likes: 14290,
  },
  {
    id: 'vid-amalfi-golden-hour',
    title: 'Amalfi Terrace Golden Hour: Sunburst Resort Capsule Film',
    description:
      'Sofia Morales explores whitewashed Mediterranean cliffside terraces in flowing sunburst yellow linen as late-afternoon light reflects across the turquoise coastline.',
    thumbnailUrl: '/src/assets/images/vid_amalfi_golden_hour_1795316227326.jpg',
    duration: '11:24',
    durationSeconds: 684,
    views: 342800,
    publishedAt: '2026-11-20T18:00:00Z',
    relativeDate: 'Yesterday',
    category: 'Resort & Travel',
    tags: ['GoldenHour', 'SummerLookbook', 'Travel', '4K'],
    modelIds: ['sofia-morales'],
    resolution: '4K',
    accent: 'yellow',
    likes: 23110,
  },
  {
    id: 'vid-popart-beauty',
    title: 'Color-Block Glam: Pop-Art Acrylic Beauty Studio Session',
    description:
      'Step onto a vibrant London cyclorama set with Chloe Bennett as camera tracks glide around hot-pink and lime-green acrylic pedestals for a luminous cosmetics campaign film.',
    thumbnailUrl: '/src/assets/images/vid_popart_beauty_1795316225662.jpg',
    duration: '09:15',
    durationSeconds: 555,
    views: 168900,
    publishedAt: '2026-11-20T09:15:00Z',
    relativeDate: '1 day ago',
    category: 'Beauty & Glam',
    tags: ['PopArt', 'Studio', 'BehindTheScenes', 'Editorial'],
    modelIds: ['chloe-bennett'],
    resolution: '4K',
    accent: 'lime',
    likes: 11840,
  },
  {
    id: 'vid-paris-backstage',
    title: 'Paris Atelier Backstage: Sculptural Cobalt Outerwear Fittings',
    description:
      'An intimate backstage documentary following Amara Okafor through final garment fittings, softbox lighting checks, and runway preparations inside a sunlit Parisian couture house.',
    thumbnailUrl: '/src/assets/images/vid_paris_backstage_1795316228595.jpg',
    duration: '12:50',
    durationSeconds: 770,
    views: 254100,
    publishedAt: '2026-11-19T14:20:00Z',
    relativeDate: '2 days ago',
    category: 'Backstage',
    tags: ['BehindTheScenes', 'Runway', '4K', 'Editorial'],
    modelIds: ['amara-okafor'],
    resolution: '4K',
    accent: 'blue',
    likes: 19650,
  },
  {
    id: 'vid-miami-streetstyle',
    title: 'Art Deco Daylight: Ocean Drive Retro Street Style Walk',
    description:
      'Valentina Rossi pairs crisp white linen tailoring with a bright magenta-and-gold silk scarf during a breezy afternoon stroll past Miami Beach pastel Art Deco landmarks.',
    thumbnailUrl: '/src/assets/images/vid_miami_streetstyle_1795316226619.jpg',
    duration: '07:05',
    durationSeconds: 425,
    views: 149300,
    publishedAt: '2026-11-18T16:45:00Z',
    relativeDate: '3 days ago',
    category: 'Fashion Editorial',
    tags: ['StreetStyle', 'GoldenHour', 'PopArt', 'Travel'],
    modelIds: ['valentina-rossi'],
    resolution: '1080p',
    accent: 'pink',
    likes: 10920,
  },
  {
    id: 'vid-sunlit-pilates',
    title: 'Skyline Morning Flow: Dual Rooftop Mobility & Pilates Session',
    description:
      'Maya Lin and Elena Vance team up high above the skyline for a bright, synchronized rooftop stretching and core mobility sequence bathed in crisp morning blue skies.',
    thumbnailUrl: '/src/assets/images/vid_sunlit_pilates_1795316226301.jpg',
    duration: '14:30',
    durationSeconds: 870,
    views: 312400,
    publishedAt: '2026-11-17T08:00:00Z',
    relativeDate: '4 days ago',
    category: 'Fitness & Movement',
    tags: ['Wellness', 'GoldenHour', '4K', 'Choreography'],
    modelIds: ['maya-lin', 'elena-vance'],
    resolution: '4K',
    accent: 'lime',
    likes: 21800,
  },
  {
    id: 'vid-neon-studio-lights',
    title: 'Chromatic Gels: Creative Pop-Color Cyclorama Lighting Film',
    description:
      'Chloe Bennett and Amara Okafor test bold magenta, cobalt, and sunburst theatrical overhead gels on a pure white studio cyclorama, revealing every camera move in real time.',
    thumbnailUrl: '/src/assets/images/vid_neon_studio_lights_1795316226468.jpg',
    duration: '10:12',
    durationSeconds: 612,
    views: 221700,
    publishedAt: '2026-11-16T15:10:00Z',
    relativeDate: '5 days ago',
    category: 'Studio Sessions',
    tags: ['Studio', 'PopArt', 'BehindTheScenes', '4K'],
    modelIds: ['chloe-bennett', 'amara-okafor'],
    resolution: '4K',
    accent: 'blue',
    likes: 16540,
  },
  {
    id: 'vid-mediterranean-coast',
    title: 'Coastal Promenade: Sunset Resort Film Diary in Yellow & Coral',
    description:
      'Sofia Morales and Valentina Rossi capture effortless vacation wardrobe transitions along a palm-lined white stone seafront promenade during warm coastal golden hour.',
    thumbnailUrl: '/src/assets/images/vid_mediterranean_coast_1795316227050.jpg',
    duration: '09:48',
    durationSeconds: 588,
    views: 278900,
    publishedAt: '2026-11-15T13:30:00Z',
    relativeDate: '6 days ago',
    category: 'Resort & Travel',
    tags: ['SummerLookbook', 'Travel', 'GoldenHour', 'StreetStyle'],
    modelIds: ['sofia-morales', 'valentina-rossi'],
    resolution: '4K',
    accent: 'yellow',
    likes: 20450,
  },
  {
    id: 'vid-editorial-monochrome',
    title: 'Medium-Format Framing: Monochrome Tailoring & Yellow Backdrop',
    description:
      'Shot beside a vintage twin-lens medium-format camera, Amara Okafor and Elena Vance contrast sharp black-and-white piped blazers against a single vivid sunburst studio panel.',
    thumbnailUrl: '/src/assets/images/vid_editorial_monochrome_1795316226612.jpg',
    duration: '13:16',
    durationSeconds: 796,
    views: 204600,
    publishedAt: '2026-11-14T10:00:00Z',
    relativeDate: '1 week ago',
    category: 'Studio Sessions',
    tags: ['Editorial', 'Studio', 'BehindTheScenes', '4K'],
    modelIds: ['amara-okafor', 'elena-vance'],
    resolution: '4K',
    accent: 'yellow',
    likes: 15980,
  },
];

export const ALL_TAGS: string[] = Array.from(
  new Set(VIDEOS.flatMap((v) => v.tags))
).sort();

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num.toString();
}
