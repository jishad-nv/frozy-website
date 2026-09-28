/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FROZY - Central Product Data Architecture & Brand Configuration
 * Synchronized product models for the six official FROZY flavours.
 */

import { FROZY_ASSETS } from '../assets/products.ts';

export interface FrozyProduct {
  id: string;
  name: string;
  slug: string;
  flavour: string;
  subtitle: string;
  headline: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: 'INR';
  currencySymbol: '₹';
  rating: number;
  calories: string;
  netCarbs: string;
  protein: string;
  fat: string;
  story: string;
  ingredients: string[];
  backgroundColor: string; // Controlled pink/blush atmosphere
  bgColor: string; // compatibility alias
  accentColor: string;
  textColor: string;
  image: string;
  inStock: boolean;
  category: 'all' | 'signature' | 'fruit' | 'indulgent';
}

export interface FrozyReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
  favoriteFlavor: string;
  location: string;
}

export interface FrozyFaq {
  id: string;
  question: string;
  answer: string;
}

export interface FrozyStoreConfig {
  brandName: string;
  tagline: string;
  brandSubtext: string;
  heroCtaText: string;
  secondaryCtaText: string;
  reviewsCountText: string;
  reviewsSubtext: string;
  philosophyQuote: string;
  exploreHeadline: string;
  exploreSubtitle: string;
  faqHeadline: string;
  faqSubtitle: string;
  reviewsHeadline: string;
  reviewsSubtitle: string;
  currency: string;
  freeDeliveryThreshold: number;
  contact: {
    address: string;
    city: string;
    hoursWeekday: string;
    hoursWeekend: string;
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

export const FROZY_CONFIG: FrozyStoreConfig = {
  brandName: 'FROZY',
  tagline: 'Sweetness in every swirl',
  brandSubtext: 'Artisanal Indian Ice Cream',
  heroCtaText: 'Shop Ice Cream',
  secondaryCtaText: 'Explore Flavours',
  reviewsCountText: '25K+ Scoop Lovers',
  reviewsSubtext: 'Across Mumbai, Bengaluru & Delhi',
  philosophyQuote: 'One scoop. Instant happiness. Crafted with pure Malai cream and real Alphonso goodness.',
  exploreHeadline: 'Pick Your Happiness',
  exploreSubtitle: 'Cold, creamy, and seriously delicious.',
  faqHeadline: "FAQ's",
  faqSubtitle: "Everything about our scoops, dry-ice express delivery, and natural ingredients.",
  reviewsHeadline: 'Loved Across India',
  reviewsSubtitle: 'Real stories from scoop lovers who can’t get enough of FROZY.',
  currency: '₹',
  freeDeliveryThreshold: 499,
  contact: {
    address: '100 Feet Road, Indiranagar',
    city: 'Bengaluru, Karnataka 560038',
    hoursWeekday: 'Mon - Fri: 11:00 AM - 12:00 AM',
    hoursWeekend: 'Sat - Sun: 11:00 AM - 1:00 AM',
    phone: '+91 98450 78921',
    email: 'namaste@frozyicecream.in',
    instagram: '@frozy.india',
    facebook: 'FrozyIceCreamIndia',
    whatsapp: '+91 98450 78921',
  },
  navigation: [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'explore', label: 'FLAVOURS', href: '#explore' },
    { id: 'about', label: 'STORY', href: '#about' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ],
};

export const FROZY_PRODUCTS: FrozyProduct[] = [
  {
    id: 'pink-velvet',
    name: 'Pink Velvet',
    slug: 'pink-velvet',
    flavour: 'Strawberry & Velvet Cake',
    subtitle: 'Signature strawberry & velvet cake cream',
    headline: 'Sweetness in Pink.',
    description: 'Creamy strawberry goodness made for happy cravings.',
    shortDescription: 'Creamy strawberry goodness made for happy cravings.',
    price: 199,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 4.9,
    calories: '210 kcal / serving',
    netCarbs: '12g',
    protein: '6g',
    fat: '7g',
    story: 'Crafted with ripe Mahabaleshwar strawberries and fresh churned malai dairy.',
    ingredients: ['Fresh Dairy Cream', 'Mahabaleshwar Strawberries', 'Velvet Cake Crumbs', 'Cane Sugar', 'Natural Beetroot Extract'],
    backgroundColor: '#E87D98', // Soft strawberry-pink
    bgColor: '#E87D98',
    accentColor: '#B03657',
    textColor: '#ffffff',
    image: FROZY_ASSETS.pinkVelvetTub,
    inStock: true,
    category: 'signature',
  },
  {
    id: 'berry-bliss',
    name: 'Berry Bliss',
    slug: 'berry-bliss',
    flavour: 'Himalayan Wild Berries',
    subtitle: 'Wild raspberry & blackberry swirl',
    headline: 'Berry bliss in every creamy bite.',
    description: 'Wild Himalayan berries folded into sweet vanilla cream.',
    shortDescription: 'Wild Himalayan berries folded into sweet vanilla cream.',
    price: 229,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 5.0,
    calories: '195 kcal / serving',
    netCarbs: '10g',
    protein: '5g',
    fat: '6g',
    story: 'Handcrafted with slow-simmered wild berry compote and whole milk.',
    ingredients: ['Pure Dairy Cream', 'Wild Raspberries', 'Blackberries', 'Vanilla Pods', 'Citrus Pectin'],
    backgroundColor: '#7A2242', // Deep berry purple/pink
    bgColor: '#7A2242',
    accentColor: '#52142B',
    textColor: '#ffffff',
    image: FROZY_ASSETS.berryBlissTub,
    inStock: true,
    category: 'fruit',
  },
  {
    id: 'belgian-choco-melt',
    name: 'Belgian Choco Melt',
    slug: 'belgian-choco-melt',
    flavour: 'Belgian Dark Fudge',
    subtitle: 'Decadent dark fudge & cocoa curls',
    headline: 'Rich chocolate. Pure indulgence.',
    description: 'Single-origin 70% dark Belgian fudge in every scoop.',
    shortDescription: 'Single-origin 70% dark Belgian fudge in every scoop.',
    price: 249,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 4.9,
    calories: '240 kcal / serving',
    netCarbs: '15g',
    protein: '7g',
    fat: '9g',
    story: 'Imported Belgian cocoa solids melted gently with fresh cream and studded with crunchy chocolate curls.',
    ingredients: ['Dark Belgian Chocolate 70%', 'Dutch Cocoa Solids', 'Fresh Cream', 'Chocolate Ganache Ribbons', 'Sea Salt'],
    backgroundColor: '#3B2219', // Rich dark chocolate brown
    bgColor: '#3B2219',
    accentColor: '#24140F',
    textColor: '#ffffff',
    image: FROZY_ASSETS.belgianChocoTub,
    inStock: true,
    category: 'indulgent',
  },
  {
    id: 'mango-sunshine',
    name: 'Mango Sunshine',
    slug: 'mango-sunshine',
    flavour: 'Ratnagiri Alphonso',
    subtitle: 'Ratnagiri Alphonso mango swirl',
    headline: 'A little taste of summer.',
    description: 'Real Ratnagiri Alphonso mango in golden cream.',
    shortDescription: 'Real Ratnagiri Alphonso mango in golden cream.',
    price: 199,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 4.9,
    calories: '205 kcal / serving',
    netCarbs: '14g',
    protein: '5g',
    fat: '6g',
    story: 'Tree-ripened GI-tagged Alphonso mangoes sourced directly from seaside Konkan orchards.',
    ingredients: ['Alphonso Mango Pulp', 'Whole Dairy Milk', 'Sweet Cream', 'Mango Fruit Chunks', 'Cardamom Essence'],
    backgroundColor: '#D97724', // Bright mango yellow/orange
    bgColor: '#D97724',
    accentColor: '#A35416',
    textColor: '#ffffff',
    image: FROZY_ASSETS.mangoSunshineTub,
    inStock: true,
    category: 'fruit',
  },
  {
    id: 'pistachio-dream',
    name: 'Pistachio Dream',
    slug: 'pistachio-dream',
    flavour: 'Iranian Pista & Saffron',
    subtitle: 'Roasted Iranian pista & saffron malai',
    headline: 'Smooth, nutty and dreamy.',
    description: 'Roasted Iranian pista with royal saffron malai.',
    shortDescription: 'Roasted Iranian pista with royal saffron malai.',
    price: 249,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 5.0,
    calories: '225 kcal / serving',
    netCarbs: '11g',
    protein: '8g',
    fat: '9g',
    story: 'Toasted pistachios ground into nut butter and folded into reduced malai milk with Kashmiri saffron.',
    ingredients: ['Roasted Pistachios', 'Reduced Malai Milk', 'Kashmiri Saffron', 'Green Cardamom', 'Sweet Cream'],
    backgroundColor: '#496F54', // Soft pistachio green
    bgColor: '#496F54',
    accentColor: '#304A38',
    textColor: '#ffffff',
    image: FROZY_ASSETS.pistachioDreamTub,
    inStock: true,
    category: 'signature',
  },
  {
    id: 'cookie-crunch',
    name: 'Cookie Crunch',
    slug: 'cookie-crunch',
    flavour: 'Cookies & Cream',
    subtitle: 'Crunchy chocolate cookie crumble cream',
    headline: 'Crunch into happiness.',
    description: 'Rich vanilla cream folded with dark chocolate cookies.',
    shortDescription: 'Rich vanilla cream folded with dark chocolate cookies.',
    price: 219,
    currency: 'INR',
    currencySymbol: '₹',
    rating: 4.9,
    calories: '230 kcal / serving',
    netCarbs: '15g',
    protein: '6g',
    fat: '8g',
    story: 'Loaded with real chocolate wafer cookies crushed into sweet malai cream.',
    ingredients: ['Fresh Dairy Cream', 'Crushed Chocolate Cookies', 'Vanilla Pods', 'Cane Sugar', 'Sea Salt'],
    backgroundColor: '#78543E', // Warm creamy cookie brown
    bgColor: '#78543E',
    accentColor: '#4D3627',
    textColor: '#ffffff',
    image: FROZY_ASSETS.cookieCrunchTub,
    inStock: true,
    category: 'indulgent',
  },
];

export const FROZY_REVIEWS: FrozyReview[] = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    role: 'Food Blogger & Dessert Enthusiast',
    rating: 5,
    quote: "FROZY's Pink Velvet is genuinely unmatched. The velvet cake crumbles melt right into the fresh strawberry cream. It's the prettiest and tastiest ice cream in India right now!",
    avatar: FROZY_ASSETS.avatarAisha,
    favoriteFlavor: 'Pink Velvet',
    location: 'Bandra, Mumbai',
  },
  {
    id: 'rev-2',
    author: 'Rohan Mehra',
    role: 'Chef & Food Critic',
    rating: 5,
    quote: "The Mango Sunshine tastes like biting into a chilled, ripe Ratnagiri Alphonso straight from the seaside orchard. Clean, pure fruit with zero artificial syrup aftertaste.",
    avatar: FROZY_ASSETS.avatarMarcus,
    favoriteFlavor: 'Mango Sunshine',
    location: 'Indiranagar, Bengaluru',
  },
  {
    id: 'rev-3',
    author: 'Priya Iyer',
    role: 'Pastry Sommelier',
    rating: 5,
    quote: "The Belgian Choco Melt arrived rock solid in dry-ice packaging within 30 minutes. The dark chocolate intensity is pure heaven. My go-to midnight craving!",
    avatar: FROZY_ASSETS.avatarAisha,
    favoriteFlavor: 'Belgian Choco Melt',
    location: 'Vasant Vihar, New Delhi',
  },
];

export const FROZY_FAQS: FrozyFaq[] = [
  {
    id: 'faq-1',
    question: 'What makes FROZY ice cream so special?',
    answer: 'We craft our ice creams in small batches using 100% fresh dairy malai, real hand-picked fruits, and premium single-origin ingredients. We never use hydrogenated vegetable fats (vanaspati), high-fructose corn syrup, or artificial food colorings.',
  },
  {
    id: 'faq-2',
    question: 'How do you guarantee cold delivery in the Indian summer heat?',
    answer: 'Every FROZY order is dispatched in our specialized thermal dry-ice tote box that stays below -18°C for over 2 hours. Your scoops arrive perfectly chilled, firm, and ready to enjoy immediately.',
  },
  {
    id: 'faq-3',
    question: 'Are FROZY ice creams 100% vegetarian?',
    answer: 'Yes! All FROZY products are 100% vegetarian (eggless). We use natural plant-based pectins and real whole dairy milk and cream.',
  },
  {
    id: 'faq-4',
    question: 'Do you cater for weddings, birthday parties, and corporate events?',
    answer: 'Absolutely! Our FROZY Pink Scoop Carts and customized party tubs are a favorite across celebratory events in Bengaluru, Mumbai, and Delhi NCR. Contact our party hotline for bespoke menus.',
  },
];
