import type { CategoryId } from '../lib/menu';

export const guidance: Record<
  CategoryId,
  { question: string; answer: string; picks: [string, string][] }
> = {
  pizza: {
    question: 'Which pizza topping should I choose?',
    answer:
      'All nine pizzas in the website catalogue are described as 8-inch and air-fryer cooked. Start with the topping you want, then decide whether a Schezwan or chilli finish sounds right. These are ingredient comparisons, not a ranked best-seller list.',
    picks: [
      ['onion-chataka-pizza', 'Onion with pizza sauce and cheese; herbs and chilli flakes.'],
      ['corn-masti-pizza', 'Sweet corn with pizza sauce and cheese; herbs and chilli flakes.'],
      ['double-veg-pizza', 'Onion and capsicum with pizza sauce and cheese.'],
      ['schezwan-veg-pizza', 'Onion and capsicum with a spicy Schezwan kick.'],
      ['paneer-chataka-pizza', 'Paneer and onion with pizza sauce and cheese.'],
      ['corn-olive-pizza', 'Sweet corn and black olive for a sweet-and-savoury combination.'],
      ['capsicum-olive-pizza', 'Capsicum and green olive for a tangy, savoury combination.'],
      ['chilli-onion-pizza', 'Onion and jalapeno with a spicy chilli oil finish.'],
      ['schezwan-corn-pizza', 'Sweet corn and red paprika with spicy Schezwan sauce.'],
    ],
  },
  sandwiches: {
    question: 'How are the grilled sandwich fillings different?',
    answer:
      'The six sandwiches use different fillings and cheese combinations. Compare the named ingredients rather than assuming every sandwich has the same cheese or sauce. All are grilled, vegetarian and egg-free.',
    picks: [
      ['creamy-veg-grilled-sandwich', 'Onion, capsicum and creamy mayo.'],
      ['corn-cream-grilled-sandwich', 'Sweet corn and creamy cheese; described as mellow.'],
      ['schezwan-corn-grilled-sandwich', 'Sweet corn and creamy mayo with a spicy Schezwan kick.'],
      ['paneer-tandoori-grilled-sandwich', 'Paneer, onion and smoky tandoori mayo.'],
      [
        'veg-cheese-slice-grilled-sandwich',
        'Onion, capsicum and creamy mayo, plus a melted cheese slice.',
      ],
      [
        'corn-cheese-slice-grilled-sandwich',
        'Sweet corn and creamy cheese, plus a melted cheese slice.',
      ],
    ],
  },
  maggi: {
    question: 'Classic, veg, cheese or Schezwan Maggi?',
    answer:
      'Choose Classic for the plain masala description, Veg for onion and capsicum, Cheese for melted cheese, or Schezwan for vegetables and a spicy kick. Check the current portion options on Zomato.',
    picks: [
      ['classic-masala-maggi', 'The plain masala Maggi option.'],
      ['veg-masala-maggi', 'Masala Maggi with onion and capsicum.'],
      ['cheese-maggi', 'Masala Maggi with melted cheese.'],
      ['schezwan-maggi', 'Onion, capsicum and a bold Schezwan kick.'],
    ],
  },
  pasta: {
    question: 'Red sauce or white sauce pasta?',
    answer:
      'The red option is tangy penne with onion and capsicum. The white option is creamy fusilli with sweet corn. They differ in pasta shape, sauce and vegetables, not just the colour of the sauce.',
    picks: [
      ['chatpata-red-sauce-pasta', 'Penne · tangy red sauce · onion, capsicum and herbs.'],
      ['creamy-white-sauce-pasta', 'Fusilli · creamy white sauce · sweet corn and herbs.'],
    ],
  },
  snacks: {
    question: 'Classic Salted Fries or Peri Peri Fries?',
    answer:
      'Choose Classic Salted for salt seasoning, or Peri Peri for the spicy seasoning described on the menu. Both are air-fryer cooked with a light oil drizzle rather than deep-fried.',
    picks: [
      ['classic-salted-fries', 'Finished with salt for a simple, crisp bite.'],
      ['peri-peri-fries', 'Tossed in bold peri peri seasoning for a spicy bite.'],
    ],
  },
};
