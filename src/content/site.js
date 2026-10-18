// Central brand, contact and booking configuration.
//
// Values set to `null` are NOT confirmed by the owner (see
// docs/source-audit/08-issues-gaps-questions.md and docs/owner-questions.md).
// While `preview.showPending` is true, the site shows a marked
// "awaiting confirmation" note in their place. Set it to false to hide them.

export const site = {
  // PROVISIONAL (owner question Q1: "Taman Bidadari" or "Rich Farmer"?).
  // Chosen because the logo, on-site signage and the most recent edits to the
  // live homepage use Taman Bidadari. Change it here and it updates everywhere.
  name: "Taman Bidadari",
  descriptor: "Eco House & Yoga",
  fullName: "Taman Bidadari Eco House & Yoga",
  place: "Pemuteran, Bali",

  url: "https://tamanbidadari.com",

  preview: {
    showPending: true,
  },

  address: {
    lines: ["Jalan Raya Seririt–Gilimanuk", "Pemuteran, Gerokgak 81155", "Buleleng, Bali, Indonesia"],
    singleLine: "Jalan Raya Seririt–Gilimanuk, Pemuteran, Gerokgak 81155, Buleleng, Bali, Indonesia",
  },

  // Keyless Google Maps embed query, as used on the live Contact page
  // (renders; verified in the Phase 1 audit). Exact pin: owner question Q11.
  mapQuery: "Rich Farmer Eco House, Jl. Baliprofil, Pemuteran, Kabupaten Buleleng, Bali",

  contact: {
    // The live site's WhatsApp widget and Contact page both open
    // wa.me/628113960699 (resolves). It is used only as a WhatsApp channel.
    whatsapp: {
      number: "628113960699",
      display: "+62 811 3960 699",
    },
    // Q3: the footer shows +62 813 3857 5384 and the Contact page shows
    // +62 811 3960 699. Not chosen until the owner confirms.
    // Shape: { display: "+62 ...", tel: "+62..." }
    phone: null,
    // Q4: info@richfarmerbali.com cannot receive mail (domain gone).
    email: null,
    // Q10: "Every day 11:00–20:00" vs "Weekend 09:00–20:00" conflict.
    hours: null,
  },

  // Q5: every existing "Book Now" link errors. Set to the confirmed booking
  // URL to turn the room enquiry buttons into booking links.
  booking: {
    url: null,
    label: "Book this room",
  },

  // Profiles respond on the live site (Phase 1). They still carry the
  // Rich Farmer name; confirm after Q1/Q16.
  social: [
    { label: "Instagram", href: "https://www.instagram.com/richfarmer_experience" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100086960977247" },
    { label: "YouTube", href: "https://www.youtube.com/@richfarmerexperience4416" },
  ],
};

export const nav = [
  { label: "About", href: "/about/" },
  {
    label: "Rooms",
    href: "/rooms/",
    children: [
      { label: "Deluxe Pool Access", href: "/deluxe-pool-access/" },
      { label: "Apartment", href: "/apartment/" },
      { label: "Quad Room", href: "/quad-room/" },
      { label: "Family 2 Bed Rooms", href: "/family-2-bed-rooms/" },
    ],
  },
  { label: "Services", href: "/services/" },
  { label: "Contact", href: "/contact/" },
];

export function whatsappLink(message) {
  const base = `https://wa.me/${site.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsEmbedSrc() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&t=m&z=13&output=embed`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
}
