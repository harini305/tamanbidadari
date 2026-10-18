import { site } from "@/content/site";

const routes = [
  "/",
  "/about/",
  "/rooms/",
  "/deluxe-pool-access/",
  "/apartment/",
  "/quad-room/",
  "/family-2-bed-rooms/",
  "/services/",
  "/contact/",
];

export default function sitemap() {
  return routes.map((path) => ({ url: `${site.url}${path}` }));
}
