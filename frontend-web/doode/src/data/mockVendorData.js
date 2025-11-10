export const mockVendorData = {
  id: 1,
  name: "Taste of Africa",
  city: "LAGOS",
  address: "123 African Street, Victoria Island",
  delivery: true,
  menuImagePath: "/images/menu.jpg",
  totalRatings: 47,
  averageRating: 4.5,
  description: "Authentic African cuisine with flavors from across the continent. Family-owned since 1995, we bring you traditional recipes passed down through generations.",
  
  businessOwner: {
    id: 1,
    name: "Adebayo Johnson",
    phone: "+234-801-234-5678",
    email: "adebayo@tasteofafrica.com",
    pType: "VENDOR"
  },

  delicacies: [
    {
      id: 1,
      name: "Jollof Rice",
      price: 2500,
      imagePath: "/images/jollof-rice.jpg",
      description: "Traditional Nigerian jollof rice cooked with tomatoes, peppers, and spices. Served with fried plantains and chicken.",
      averageRating: 4.8,
      totalRatings: 23
    },
    {
      id: 2,
      name: "Suya",
      price: 1800,
      imagePath: "/images/suya.jpg",
      description: "Spicy grilled beef skewers with peanut spice rub. Served with sliced onions and tomatoes.",
      averageRating: 4.9,
      totalRatings: 18
    },
    {
      id: 3,
      name: "Egusi Soup",
      price: 3200,
      imagePath: "/images/egusi-soup.jpg",
      description: "Melon seed soup with assorted meats, fish, and vegetables. Served with pounded yam.",
      averageRating: 4.7,
      totalRatings: 15
    },
    {
      id: 4,
      name: "Pounded Yam",
      price: 1500,
      imagePath: "/images/pounded-yam.jpg",
      description: "Smooth and stretchy pounded yam, perfect with any African soup.",
      averageRating: 4.6,
      totalRatings: 12
    },
    {
      id: 5,
      name: "Chin Chin",
      price: 800,
      imagePath: "/images/chin-chin.jpg",
      description: "Crispy Nigerian snack made from fried dough. Perfect as a starter or dessert.",
      averageRating: 4.4,
      totalRatings: 8
    },
    {
      id: 6,
      name: "Zobo Drink",
      price: 600,
      imagePath: "/images/zobo.jpg",
      description: "Refreshing hibiscus drink with pineapple and ginger. Served chilled.",
      averageRating: 4.5,
      totalRatings: 10
    }
  ],

  reviews: {
    101: "The best jollof rice in Lagos! The flavors are amazing and the service is always excellent.",
    102: "Authentic Nigerian cuisine that reminds me of home. The suya is perfectly spiced.",
    103: "Great atmosphere and friendly staff. The egusi soup with pounded yam is a must-try!",
    104: "Consistently good food. Their delivery service is fast and reliable.",
    105: "Family-friendly restaurant with authentic African dishes. Highly recommended!"
  },

  ratingDistribution: {
    5: 0.6,  // 60% 5-star reviews
    4: 0.3,  // 30% 4-star reviews  
    3: 0.08, // 8% 3-star reviews
    2: 0.015, // 1.5% 2-star reviews
    1: 0.005  // 0.5% 1-star reviews
  },

  orders: []
};