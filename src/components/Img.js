import images from "@/content/images.json";

// Renders a pre-optimised image from src/content/images.json with srcset,
// explicit dimensions (no layout shift) and lazy loading unless `priority`.
export default function Img({ name, sizes = "100vw", priority = false, alt, className, position }) {
  const img = images[name];
  if (!img) {
    throw new Error(`Unknown image "${name}"`);
  }
  const { variants } = img;
  const fallback = variants[Math.min(1, variants.length - 1)];

  return (
    <img
      src={fallback.src}
      srcSet={variants.map((v) => `${v.src} ${v.w}w`).join(", ")}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt ?? img.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
