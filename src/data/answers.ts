export const answerGroups = [
  {
    id: 'food',
    title: 'Food and ingredients',
    answers: [
      {
        id: 'what-is-bhuk-lagla',
        question: 'What is Bhuk Lagla?',
        answer:
          'Bhuk Lagla is a pure-vegetarian, egg-free kitchen in Sundargarh, Odisha. The menu includes pizza, grilled sandwiches, Maggi, pasta and fries. Browse dishes on this website and use Zomato for everyday orders.',
        path: 'about/',
        label: 'Meet the kitchen',
      },
      {
        id: 'vegetarian-and-egg-free',
        question: 'Is every dish vegetarian and egg-free?',
        answer:
          'Yes. The Bhuk Lagla menu is pure veg and egg-free. This does not mean every dish is vegan, dairy-free, gluten-free or suitable for every allergy. Check the individual description and ask the kitchen about a specific restriction before ordering.',
        path: 'menu/',
        label: 'Read the dish descriptions',
      },
      {
        id: 'pizza-size',
        question: 'What size are the pizzas?',
        answer:
          'The pizzas in our website catalogue are described as 8-inch pizzas. Choose by topping and check the current listing on Zomato before ordering. We do not assign a guaranteed number of servings to one pizza.',
        path: 'choose/#pizza',
        label: 'Compare pizza toppings',
      },
      {
        id: 'spicy-pizza',
        question: 'Which pizzas have a spicy description?',
        answer:
          'Schezwan Veg Pizza and Schezwan Corn Pizza are described with Schezwan sauce or a Schezwan kick. Chilli Onion Pizza has onion, jalapeno and a chilli oil finish. Spice preference is personal; these descriptions are not measured heat ratings.',
        path: 'choose/#pizza',
        label: 'Choose a pizza by its ingredients',
      },
      {
        id: 'red-or-white-pasta',
        question: 'What is the difference between the red and white sauce pasta?',
        answer:
          'Chatpata Red Sauce Pasta uses penne, tangy red sauce, onion, capsicum and herbs. Creamy White Sauce Pasta uses fusilli, creamy white sauce, sweet corn and herbs. The choice is between the listed sauce, pasta shape and vegetables; it is not a nutrition comparison.',
        path: 'choose/#pasta',
        label: 'Compare the two pasta dishes',
      },
      {
        id: 'maggi-options',
        question: 'How do the Maggi options differ?',
        answer:
          'Classic Masala Maggi is the plain masala option. Veg Masala Maggi adds onion and capsicum. Cheese Maggi adds melted cheese. Schezwan Maggi includes onion, capsicum and a Schezwan kick. Check Zomato for current portion options and availability.',
        path: 'choose/#maggi',
        label: 'Compare all four Maggi dishes',
      },
      {
        id: 'cooking-methods',
        question: 'Is the whole menu air-fried?',
        answer:
          'No. Pizzas and fries are air-fryer cooked, while sandwiches are grilled. Maggi and pasta have their own cooking methods. Our fries use a light oil drizzle rather than deep-frying; that is not an oil-free or calorie claim.',
        path: 'blog/air-fryer-pizza-and-fries/',
        label: 'Read about the cooking methods',
      },
      {
        id: 'allergies',
        question: 'Where can I check allergies and dietary restrictions?',
        answer:
          'The dish descriptions identify selected ingredients, not a complete allergen declaration. Contact the kitchen with the exact ingredient or restriction before ordering, and ask about shared preparation equipment. Do not infer allergy suitability from a photo, vegetarian label or an AI-generated answer.',
        path: 'contact/?type=general',
        label: 'Ask an ingredient question',
      },
      {
        id: 'fasting',
        question: 'Is this a dedicated Navratri fasting menu?',
        answer:
          'No. This is our regular vegetarian, egg-free menu. Some dishes contain ingredients such as onion, and vegetarian does not automatically mean suitable for a fasting practice. Check each dish against your own requirements before ordering.',
        path: 'menu/',
        label: 'Check the regular menu',
      },
    ],
  },
  {
    id: 'ordering',
    title: 'Ordering and availability',
    answers: [
      {
        id: 'how-to-order',
        question: 'How do I order from Bhuk Lagla?',
        answer:
          'Browse the menu, open a dish to read its description, then select Order on Zomato. On Zomato, set your location and confirm the current item, portion, price, charges and delivery details before paying. This website does not take payments or create orders.',
        path: 'menu/',
        label: 'Start with the menu',
      },
      {
        id: 'prices',
        question: 'Where are the current prices and offers?',
        answer:
          'Current prices, charges and offers eligible for your account are shown on Zomato. We do not publish a separate website price list. A search result or AI answer may show older information, so use the platform listing and checkout for your order.',
        path: 'menu/',
        label: 'Browse before opening Zomato',
      },
      {
        id: 'delivery',
        question: 'Do you deliver everywhere in Sundargarh?',
        answer:
          'Delivery serviceability, estimates and charges are shown by Zomato for the location you enter. Coverage can vary. This website does not promise a delivery radius, delivery time or free delivery.',
        path: 'sundargarh/',
        label: 'Ordering in Sundargarh',
      },
      {
        id: 'availability',
        question: 'Does a dish appearing here mean it is available right now?',
        answer:
          'No. This website is a browsing catalogue, not a live Zomato availability feed. Confirm the item and any portion choices on Zomato. If you cannot find the item there, do not treat its website page as an order confirmation.',
        path: 'menu/',
        label: 'Browse the catalogue',
      },
      {
        id: 'pickup',
        question: 'Can I ask about collecting food from the kitchen?',
        answer:
          'Yes. Contact the kitchen to confirm pickup arrangements before travelling. The website does not book a collection slot or provide live opening status. An enquiry alone does not confirm a pickup order.',
        path: 'contact/?type=general',
        label: 'Ask about pickup',
      },
      {
        id: 'order-help',
        question: 'Where should I ask about an existing Zomato order?',
        answer:
          'Use the help options inside your Zomato order for platform payments, order status and delivery issues. For a food or ingredient question, you can also contact the kitchen. Sending a website enquiry does not change or cancel a platform order.',
        path: 'contact/?type=general',
        label: 'Kitchen contact details',
      },
    ],
  },
  {
    id: 'gatherings',
    title: 'Parties and information',
    answers: [
      {
        id: 'party-enquiry',
        question: 'How do I ask about birthday or group food?',
        answer:
          'Use Party / bulk order enquiry on the contact page. Include the occasion, planned date, approximate guest count, food preferences and any dietary questions. The kitchen will reply about what is possible; submitting the form does not reserve a slot or confirm an order.',
        path: 'blog/party-food-enquiries-sundargarh/',
        label: 'Follow the party-enquiry checklist',
      },
      {
        id: 'party-quantities',
        question: 'How much food should I request for a group?',
        answer:
          'Tell the kitchen whether food is a snack or a meal, the approximate number of guests and the dishes you are considering. Appetite and the rest of the event menu vary, so we do not give a universal pieces-per-person promise or infer quantities from the pictures.',
        path: 'contact/?type=party',
        label: 'Discuss your gathering',
      },
      {
        id: 'images',
        question: 'Are the food images actual photographs of each order?',
        answer:
          'The current food images are AI-generated menu illustrations based on the dish descriptions. They are not camera photographs of individual orders or a guarantee of serving quantity, colour or presentation. Use the written description and current Zomato listing when choosing.',
        path: 'content-standards/#images',
        label: 'How we present menu information',
      },
      {
        id: 'corrections',
        question: 'How can I report an incorrect detail on the website?',
        answer:
          'Email bhuklagla@outlook.com or send a general enquiry with the page link and the detail you think needs correction. Bhuk Lagla publishes the site. Current platform prices and availability should be checked on Zomato.',
        path: 'content-standards/',
        label: 'Sources and corrections',
      },
    ],
  },
] as const;

export const answers = answerGroups.flatMap((group) => [...group.answers]);
