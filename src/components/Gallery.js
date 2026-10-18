"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import images from "@/content/images.json";
import Img from "./Img";
import styles from "./Gallery.module.css";

// Room gallery: a grid of photographs that open in an accessible lightbox.
export default function Gallery({ items, title }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(null);
  const count = items.length;
  // On the 4-column desktop grid the first photo spans 2×2, so the last row
  // is short unless the final photos are widened to fill it.
  const leftover = (count + 3) % 4;
  const widenFrom = leftover === 2 ? count - 2 : leftover === 3 ? count - 1 : count;

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((d) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? images[items[index]] : null;

  return (
    <>
      <ul className={styles.grid} data-stagger>
        {items.map((name, i) => (
          <li
            key={name}
            className={`${styles.item} ${i === 0 ? styles.lead : ""} ${
              i >= widenFrom ? styles.wide : ""
            }`}
          >
            <button
              type="button"
              className={styles.thumb}
              onClick={() => open(i)}
              aria-label={`View larger: ${images[name].alt}`}
            >
              <Img
                name={name}
                sizes={i === 0 ? "(max-width: 960px) 100vw, 50vw" : "(max-width: 960px) 50vw, 25vw"}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`${title} photographs`}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {current && (
          <div className={styles.viewer}>
            <figure className={styles.figure}>
              <img
                src={current.variants[current.variants.length - 1].src}
                width={current.width}
                height={current.height}
                alt={current.alt}
              />
              <figcaption className={styles.caption}>
                <span>{current.alt}</span>
                <span aria-live="polite">
                  {index + 1} / {count}
                </span>
              </figcaption>
            </figure>
            <div className={styles.controls}>
              <button type="button" onClick={() => step(-1)} className={styles.ctrl}>
                <span aria-hidden="true">←</span>
                <span className="visually-hidden">Previous photo</span>
              </button>
              <button type="button" onClick={() => step(1)} className={styles.ctrl}>
                <span aria-hidden="true">→</span>
                <span className="visually-hidden">Next photo</span>
              </button>
              <button type="button" onClick={close} className={`${styles.ctrl} ${styles.close}`} autoFocus>
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
