// Copies the selected original photographs from the Phase 1 audit folder
// (read-only) into public/images as resized WebP files, and writes
// src/content/images.json with dimensions, variants and alt text.
//
// Run with: npm run images
import sharp from "sharp";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "docs/source-audit/original-assets");
const OUT = path.join(ROOT, "public/images");
const SHARE = path.join(ROOT, "public/share");
const WIDTHS = [640, 1024, 1600];

// slug: [source path, alt text, optional trim]
// trim = [left, top, right, bottom] pixels to cut, for borders baked into a source file
const IMAGES = {
  // Grounds and shared spaces (2024 professional set)
  "pool-mountains-dusk": ["2024/01/DSC_0246-scaled.jpg", "Swimming pool and shaded day beds at dusk, with the mountains behind"],
  "garden-tree": ["2024/01/DSC_0263-scaled.jpg", "Lawn with a large shade tree, a swing and wooden benches lit by lanterns"],
  "brick-rooms-evening": ["2024/01/DSC_0273-scaled.jpg", "Brick guest rooms with lit terraces along a garden path in the evening"],
  "reception-pavilion": ["2024/01/DSC_0283-scaled.jpg", "Open reception pavilion with a carved timber roof and chandelier"],
  "pool-buddha": ["2024/01/DSC_0235-scaled.jpg", "Pool terrace with a stone Buddha statue, loungers and umbrellas"],
  "pool-sign-mountains": ["2024/03/WhatsApp-Image-2023-11-14-at-09.53.07_9c90393c.jpg", "Round pool with the Taman Bidadari sign and the mountains beyond"],

  // Apartment
  "apartment-bedroom": ["2024/01/DSC_0221-scaled.jpg", "Apartment bedroom with a king-size bed, desk and TV"],
  "apartment-kitchen": ["2024/01/DSC_0224-scaled.jpg", "Apartment kitchenette and dining table, with doors open toward the pool"],
  "apartment-king-bed": ["2024/03/DSC_0174-scaled.jpg", "King-size bed beneath a Balinese painting, with a window onto the garden"],
  "apartment-bathroom": ["2024/03/DSC_0173-scaled.jpg", "Bathroom with a stone basin, shower and glass-block wall"],
  "apartment-workspace": ["2024/03/WhatsApp-Image-2023-11-14-at-09.53.06_4887c596.jpg", "Bedroom with a desk, wardrobe and king-size bed"],
  "apartment-window": ["2024/03/WhatsApp-Image-2023-11-14-at-09.53.07_a02b9de4.jpg", "Bright bedroom with a king-size bed and a large window"],

  // Quad Room and Family 2 Bed Rooms (shared gallery in the source)
  "quad-beds": ["2024/01/DSC_0043-scaled.jpg", "Room with one queen-size bed and two single beds"],
  "queen-bed-carving": ["2024/01/DSC_0051-scaled.jpg", "Queen-size bed below a carved Balinese panel, with a window to the pool"],
  "quad-beds-side": ["2024/03/WhatsApp-Image-2023-11-14-at-09.07.50_470bbe7b.jpg", "Queen-size and single beds with red runners and folded towels"],

  // Deluxe Pool Access (2023 set)
  "deluxe-pool-night": ["2023/02/richfarmerbaliroom-1.jpg", "Pool lit blue at nightfall, with a stone Buddha and colourful umbrellas"],
  "deluxe-three-beds": ["2023/02/richfarmerbaliroom-3.jpg", "Three beds with red cushions under a Buddha painting"],
  "deluxe-terrace-door": ["2023/02/richfarmerbaliroom-4.jpg", "Brick terrace with a bench, opening into a room with canopy beds"],
  "deluxe-basin": ["2023/02/richfarmerbaliroom-5.jpg", "Bathroom with a vessel basin and timber-framed mirror"],
  "deluxe-canopy-bed": ["2023/02/richfarmerbaliroom-6.jpg", "Canopy bed with a mosquito net, beside a brick wall"],
  "deluxe-room-tv": ["2023/02/richfarmerbaliroom-7.jpg", "Room with canopy beds, a smart TV and glass doors to the garden"],
  "deluxe-terrace-view": ["2023/02/richfarmerbaliroom-8.jpg", "Terrace bench looking out over the garden toward the hills"],
  "deluxe-twin-beds": ["2023/02/twin-bed.jpg", "Twin beds with mosquito nets and a vase of flowers between them"],
  "garden-terrace": ["2023/02/garden-terrace-richfarmer.jpg", "Covered terrace by a reflecting pool, looking toward the hills"],
  "restaurant": ["2023/02/restaurant-richfarmer.jpg", "Open-air restaurant with green tablecloths under a timber roof"],

  // About
  "canopy-beds-square": ["2023/02/richfarmer-bali.webp", "Canopy beds in a brick-walled room", [0, 0, 0, 2]],
  "pool-umbrellas": ["2023/02/richfarmer.webp", "Pool with a large sun umbrella and loungers"],

  // Experiences
  "yoga-boulder": ["2023/02/best-yoga-on-bali.jpg", "Three women practising yoga in front of the Taman Bidadari boulder", [0, 2, 0, 0]],
  "yoga-garden": ["2023/02/best-yoga-on-bali-indonesia.jpg", "Guests stretching during a yoga class in the garden", [0, 1, 10, 0]],
  "snorkel-turtle": ["2023/02/diving-buleleng-1.jpg", "Two snorkellers swimming beside a sea turtle"],
  "learn-to-dive": ["2023/02/learn-to-dive.jpg", "Instructor helping a diver with scuba equipment in the water"],
  "dance-lesson": ["2023/02/learn-to-dance-in-bali.jpg", "Guests following a Balinese dance lesson on the lawn"],
  "culture-night": ["2023/02/culture-activity.jpg", "Balinese dancer performing with a guest on the lawn at night"],
  "beach-picnic": ["2023/02/picnic-on-the-beach.jpg", "Guests on beanbags for a picnic on the beach at sunset", [0, 2, 0, 0]],
  "cooking-class": ["2025/01/cooking-class-1.jpeg", "Guests in aprons preparing dishes at a long table during a cooking class"],
  "spa-massage": ["2023/02/best-spa-on-bali.jpg", "Therapist giving a back massage in a treatment room", [0, 2, 0, 0]],
};

// Share images (1200 x 630 JPEG) for Open Graph
const SHARE_IMAGES = {
  home: "pool-mountains-dusk",
  about: "brick-rooms-evening",
  rooms: "pool-buddha",
  "deluxe-pool-access": "deluxe-room-tv",
  apartment: "apartment-bedroom",
  "quad-room": "quad-beds",
  "family-2-bed-rooms": "queen-bed-carving",
  services: "yoga-boulder",
  contact: "pool-sign-mountains",
};

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await rm(SHARE, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await mkdir(SHARE, { recursive: true });

  const manifest = {};
  let total = 0;

  for (const [slug, [rel, alt, trim]] of Object.entries(IMAGES)) {
    const file = path.join(SRC, rel);
    const meta = await sharp(file).rotate().metadata();
    const [l, t, r, b] = trim ?? [0, 0, 0, 0];
    const w = meta.width - l - r;
    const h = meta.height - t - b;
    const load = () => {
      const img = sharp(file).rotate();
      return trim ? img.extract({ left: l, top: t, width: w, height: h }) : img;
    };
    // Skip a variant when it is barely smaller than the source itself
    const widths = WIDTHS.filter((x) => x < w * 0.85);
    widths.push(Math.min(w, 1600));
    const unique = [...new Set(widths)].sort((a, b) => a - b);

    const variants = [];
    for (const width of unique) {
      const name = `${slug}-${width}.webp`;
      const info = await load()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width >= 1600 ? 72 : 76, effort: 5 })
        .toFile(path.join(OUT, name));
      total += info.size;
      variants.push({ w: width, src: `/images/${name}`, kb: Math.round(info.size / 1024) });
    }
    manifest[slug] = { alt, width: w, height: h, source: rel, variants };
  }

  for (const [key, slug] of Object.entries(SHARE_IMAGES)) {
    const file = path.join(SRC, IMAGES[slug][0]);
    await sharp(file)
      .rotate()
      .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(SHARE, `${key}.jpg`));
  }

  await writeFile(
    path.join(ROOT, "src/content/images.json"),
    JSON.stringify(manifest, null, 2) + "\n"
  );
  console.log(`${Object.keys(manifest).length} images, ${(total / 1024 / 1024).toFixed(2)} MB of WebP variants`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
