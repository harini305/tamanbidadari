"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Page motion, driven by data attributes so pages stay server components.
// Everything is visible in the HTML; hidden start states are applied only
// here, after JS runs, and only when the visitor has not asked for reduced
// motion. All tweens and ScrollTriggers are reverted on route change.
//
//   data-hero          container of the home/page hero
//   data-hero-item     hero text lines, staggered in
//   data-hero-media    hero image wrapper, settles from a slight zoom
//   data-reveal        fades and rises into view once
//   data-stagger       its direct children rise in sequence
//   data-reveal-image  image wrapper revealed with a clip
//   data-parallax      image wrapper with a gentle scrubbed drift
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    const raf = requestAnimationFrame(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = (sel) => gsap.utils.toArray(sel);

        q("[data-hero]").forEach((hero) => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          const media = hero.querySelector("[data-hero-media] img");
          if (media) {
            tl.from(media, { scale: 1.08, duration: 1.8, ease: "power2.out" }, 0);
          }
          tl.from(
            hero.querySelectorAll("[data-hero-item]"),
            { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.12 },
            0.15
          );
        });

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 32,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        q("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        q("[data-reveal-image]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          tl.from(el, {
            clipPath: "inset(12% 8% 12% 8%)",
            duration: 1.3,
            ease: "power3.out",
          });
          if (img) {
            tl.from(img, { scale: 1.12, duration: 1.6, ease: "power2.out" }, 0);
          }
        });

        q("[data-parallax]").forEach((el) => {
          const img = el.querySelector("img");
          if (!img) return;
          gsap.set(img, { scale: 1.14 });
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
    });

    // Fonts can change text heights after first paint
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
