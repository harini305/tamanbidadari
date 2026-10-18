import Link from "next/link";
import Img from "./Img";
import styles from "./PageIntro.module.css";

// Opening block for inner pages: title and intro on the left, the page's main
// actions on the right, then an optional wide photograph.
// actions: [{ label, href, external?, variant?: "primary" | "ghost" }]
export default function PageIntro({ title, intro, image, position, back, actions = [] }) {
  return (
    <section className={styles.intro} data-hero>
      <div className={`container ${styles.head}`}>
        <div className={styles.text}>
          {back && (
            <Link href={back.href} className={styles.back} data-hero-item>
              <span aria-hidden="true">←</span> {back.label}
            </Link>
          )}
          <h1 className="t-h1" data-hero-item>
            {title}
          </h1>
          {intro && (
            <div className={styles.lede} data-hero-item>
              {typeof intro === "string" ? <p className="t-lead">{intro}</p> : intro}
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className={`btn-row ${styles.actions}`} data-hero-item>
            {actions.map((a) => {
              const cls = `btn ${a.variant === "ghost" ? "btn--ghost" : ""}`;
              return a.external ? (
                <a key={a.label} href={a.href} className={cls} target="_blank" rel="noopener noreferrer">
                  {a.label}
                </a>
              ) : (
                <Link key={a.label} href={a.href} className={cls}>
                  {a.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {image && (
        <div className="container">
          <div className={`frame ${styles.wideMedia}`} data-hero-media>
            <Img name={image} priority sizes="(max-width: 1380px) 100vw, 1320px" position={position} />
          </div>
        </div>
      )}
    </section>
  );
}
