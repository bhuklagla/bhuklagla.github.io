import raw from '../data/menu.json';
export type CategoryId = 'pizza' | 'sandwiches' | 'snacks' | 'maggi' | 'pasta';
export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  image: string;
  availability: string;
  visible: boolean;
  featured: boolean;
  method: string | null;
}
export const menu = (raw as MenuItem[]).filter((item) => item.visible);
export const categories: { id: CategoryId; name: string; summary: string; imageId: string }[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    summary: 'Air-fryer cooked pizzas for big cravings.',
    imageId: 'paneer-chataka-pizza',
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    summary: 'Golden grilled bites, pure veg and egg-free.',
    imageId: 'corn-cream-grilled-sandwich',
  },
  {
    id: 'snacks',
    name: 'Fries & snacks',
    summary: 'A crisp little break from the everyday.',
    imageId: 'peri-peri-fries',
  },
  {
    id: 'maggi',
    name: 'Maggi',
    summary: 'A bowl of comfort for your next food break.',
    imageId: 'classic-masala-maggi',
  },
  {
    id: 'pasta',
    name: 'Pasta',
    summary: 'Creamy or tangy? Follow your craving.',
    imageId: 'chatpata-red-sauce-pasta',
  },
];
export const findItem = (id: string) => menu.find((item) => item.id === id)!;
export const relatedItems = (item: MenuItem) =>
  menu.filter((other) => other.category === item.category && other.id !== item.id).slice(0, 3);
