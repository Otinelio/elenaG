export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available?: boolean;
};

export const CATEGORIES = [
  "All",
  "Fast Food",
  "Grillades",
  "Plats du jour",
  "Accompagnements",
  "Snacks",
  "Boissons",
] as const;

export const DEFAULT_MENU: MenuItem[] = [
  // Fast Food
  { id: "ff1", name: "Burger maison", category: "Fast Food", price: 3000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop" },
  { id: "ff2", name: "Sandwich poulet grillé", category: "Fast Food", price: 2500, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop" },
  { id: "ff3", name: "Hot dog spécial", category: "Fast Food", price: 2000, image: "https://images.unsplash.com/photo-1612392062798-2dfb12ec1b09?w=800&auto=format&fit=crop" },
  { id: "ff4", name: "Nuggets (6 pcs)", category: "Fast Food", price: 2500, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop" },
  // Grillades
  { id: "gr1", name: "Poulet braisé entier", category: "Grillades", price: 7000, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop" },
  { id: "gr2", name: "Demi-poulet braisé", category: "Grillades", price: 3500, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop" },
  { id: "gr3", name: "Brochettes de boeuf (5 pcs)", category: "Grillades", price: 3500, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop" },
  { id: "gr4", name: "Poisson braisé", category: "Grillades", price: 4000, image: "https://images.unsplash.com/photo-1535140728325-a4d3707eee94?w=800&auto=format&fit=crop" },
  // Plats du jour
  { id: "pj1", name: "Thiéboudienne", category: "Plats du jour", price: 3500, image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&auto=format&fit=crop" },
  { id: "pj2", name: "Riz sauce arachide", category: "Plats du jour", price: 3000, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop" },
  { id: "pj3", name: "Attiéké poisson", category: "Plats du jour", price: 3000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop" },
  { id: "pj4", name: "Fufu + sauce gombo", category: "Plats du jour", price: 2500, image: "https://images.unsplash.com/photo-1604908554007-2a1fe5ebe616?w=800&auto=format&fit=crop" },
  // Accompagnements
  { id: "ac1", name: "Frites maison", category: "Accompagnements", price: 1500, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop" },
  { id: "ac2", name: "Alloco", category: "Accompagnements", price: 1500, image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=800&auto=format&fit=crop" },
  { id: "ac3", name: "Salade fraîche", category: "Accompagnements", price: 1000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop" },
  { id: "ac4", name: "Pain maison", category: "Accompagnements", price: 500, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop" },
  // Snacks
  { id: "sn1", name: "Alloco au poisson", category: "Snacks", price: 2500, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop" },
  { id: "sn2", name: "Omelette sandwich", category: "Snacks", price: 2000, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop" },
  { id: "sn3", name: "Pâté maison", category: "Snacks", price: 1000, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop" },
  // Boissons
  { id: "bs1", name: "Eau minérale", category: "Boissons", price: 500, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop" },
  { id: "bs2", name: "Jus naturel maison", category: "Boissons", price: 1000, image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop" },
  { id: "bs3", name: "Coca-Cola / Fanta / Sprite", category: "Boissons", price: 700, image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=800&auto=format&fit=crop" },
  { id: "bs4", name: "Bissap maison", category: "Boissons", price: 1000, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&auto=format&fit=crop" },
];

export type Cocktail = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  signature?: boolean;
};

export const COCKTAILS: Cocktail[] = [
  { id: "c1", name: "Mojito Tropical", description: "Rum, mint, lime, sparkling water", price: 2500, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop" },
  { id: "c2", name: "Elena Special", description: "House signature cocktail", price: 3000, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop", signature: true },
  { id: "c3", name: "Piña Colada", description: "Rum, coconut, pineapple", price: 3000, image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&auto=format&fit=crop" },
  { id: "c4", name: "Tequila Sunrise", description: "Tequila, orange juice, grenadine", price: 3000, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop" },
  { id: "c5", name: "Planters Punch", description: "Rum punch with tropical fruits", price: 2500, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop" },
  { id: "c6", name: "Gin & Tonic", description: "Gin, tonic, lime", price: 2500, image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop" },
  { id: "c7", name: "Mojito Virgin", description: "Mint, lime, sugar, sparkling water (no alcohol)", price: 2000, image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&auto=format&fit=crop" },
  { id: "c8", name: "Sunset Juice", description: "Orange, mango, passion fruit blend", price: 2000, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&auto=format&fit=crop" },
  { id: "c9", name: "Bissap cocktail", description: "House hibiscus blend", price: 1500, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&auto=format&fit=crop" },
];

export const BRAND = {
  name: "Elena G",
  tagline: "Good Food. Good Vibes.",
  address: "Agoè-Zongo, RN1, derrière Hôpital Dogta-Lafiè, Lomé, Togo",
  phoneDisplay: "+228 711 40812",
  phoneWa: "22871140812",
  hours: "Open Monday, Wednesday, Thursday, Friday, Saturday & Sunday · 10:00 – 00:00",
  closed: "Closed every Tuesday",
};

export function waLink(message: string) {
  return `https://wa.me/${BRAND.phoneWa}?text=${encodeURIComponent(message)}`;
}

export function formatCFA(n: number) {
  return `${n.toLocaleString("fr-FR")} F`;
}
