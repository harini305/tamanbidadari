// The four room types listed on the live Rooms page, each with a detail page.
// Text is from the live Rooms and room-detail pages, lightly edited for
// grammar only. Amenities follow the Rooms page and detail page; the Home page
// additionally lists Fridge and Hair Dryer for some rooms (unconfirmed, Q6).
// The Home page's fifth room, "Deluxe Lumbung Room Pool Access", has no detail
// page and is not shown (owner question Q6).

export const rooms = [
  {
    slug: "deluxe-pool-access",
    name: "Deluxe Pool Access",
    summary:
      "For one or two guests. The bed can be set up as a twin or a double.",
    description: [
      "Designed for one or two guests, with a bed that can be arranged as a twin or a double.",
      "The listing for this room includes full board with three meals, and a selection of activities at no extra charge.",
    ],
    facts: [
      { label: "Guests", value: "1 or 2" },
      { label: "Beds", value: "Twin or double" },
      { label: "Meals", value: "Full board, 3 meals" },
    ],
    amenities: [
      "Air conditioning",
      "Smart TV",
      "Wi-Fi",
      "Hot shower",
      "Electric kettle",
      "Coffee and tea maker",
      "Mosquito net",
      "Connecting door",
    ],
    included: {
      title: "Free activities",
      items: ["Snorkelling", "Yoga", "Culture and Balinese dance lesson", "Farmer experience"],
    },
    hero: "deluxe-terrace-door",
    card: "deluxe-room-tv",
    gallery: [
      "deluxe-room-tv",
      "deluxe-canopy-bed",
      "deluxe-twin-beds",
      "deluxe-three-beds",
      "deluxe-terrace-view",
      "deluxe-basin",
      "deluxe-pool-night",
      "garden-terrace",
      "restaurant",
    ],
    metaDescription:
      "Deluxe Pool Access room for one or two guests in Pemuteran, Bali: twin or double bed, air conditioning, smart TV, Wi-Fi and full board with three meals.",
  },
  {
    slug: "apartment",
    name: "Apartment",
    summary:
      "Designed for a couple on a longer stay, with a king-size bed, a wide workspace and a private kitchen.",
    description: [
      "Designed for a couple on a long-term stay.",
      "The apartment has a king-size bed, a wide working space and its own private kitchen, with a fridge and a fast internet connection.",
    ],
    facts: [
      { label: "Guests", value: "A couple" },
      { label: "Beds", value: "1 king-size" },
      { label: "Suited to", value: "Longer stays" },
    ],
    amenities: [
      "Private kitchen",
      "Fridge",
      "Wide working space",
      "Fast internet connection",
      "Air conditioning",
      "TV",
      "Hot shower",
      "Coffee maker",
    ],
    hero: "apartment-bedroom",
    card: "apartment-bedroom",
    gallery: [
      "apartment-kitchen",
      "apartment-king-bed",
      "apartment-workspace",
      "apartment-window",
      "apartment-bathroom",
      "pool-mountains-dusk",
      "garden-tree",
    ],
    metaDescription:
      "Apartment for a couple on a longer stay in Pemuteran, Bali: king-size bed, private kitchen, fridge, wide workspace and fast internet.",
  },
  {
    slug: "quad-room",
    name: "Quad Room",
    summary:
      "For a family of four with two children: one queen-size bed and two single beds.",
    description: [
      "Designed for one family with two children, four guests in total.",
      "The room has one queen-size bed and two single beds.",
    ],
    facts: [
      { label: "Guests", value: "4 (a family with 2 children)" },
      { label: "Beds", value: "1 queen-size, 2 single" },
    ],
    amenities: ["Air conditioning", "TV", "Wi-Fi", "Hot shower", "Coffee maker", "Electric kettle"],
    hero: "quad-beds",
    card: "quad-beds",
    gallery: [
      "quad-beds",
      "quad-beds-side",
      "queen-bed-carving",
      "apartment-bathroom",
      "pool-buddha",
      "pool-sign-mountains",
      "garden-tree",
    ],
    metaDescription:
      "Quad Room for a family of four in Pemuteran, Bali: one queen-size and two single beds, air conditioning, TV, Wi-Fi and hot shower.",
  },
  {
    slug: "family-2-bed-rooms",
    name: "Family 2 Bed Rooms",
    summary:
      "Two rooms for two families, eight guests in all. Each room has one queen-size bed and two single beds.",
    description: [
      "Designed for two families, eight guests in total.",
      "Each of the two rooms has one queen-size bed and two single beds.",
    ],
    facts: [
      { label: "Guests", value: "8 (two families)" },
      { label: "Rooms", value: "2" },
      { label: "Beds per room", value: "1 queen-size, 2 single" },
    ],
    amenities: ["Air conditioning", "TV", "Wi-Fi", "Hot shower", "Coffee maker", "Electric kettle"],
    hero: "queen-bed-carving",
    card: "queen-bed-carving",
    // The live site uses the Quad Room gallery here (owner question Q7).
    gallery: [
      "queen-bed-carving",
      "quad-beds",
      "quad-beds-side",
      "apartment-bathroom",
      "pool-buddha",
      "pool-sign-mountains",
      "garden-tree",
    ],
    galleryNote:
      "Each room has the same bed layout as the Quad Room, and these photographs are shared with that page.",
    metaDescription:
      "Family 2 Bed Rooms for two families (eight guests) in Pemuteran, Bali: two rooms, each with one queen-size and two single beds.",
  },
];

// Shared paragraph from all four live detail pages. Used once, on /rooms/.
export const roomsIntro =
  "A place to relax and rejuvenate, with a peaceful atmosphere and views of the surrounding mountains and lush tropical forest. The retreat offers yoga, meditation and nature walks, and local cuisine made with fresh, organic ingredients.";

export function getRoom(slug) {
  return rooms.find((r) => r.slug === slug);
}
