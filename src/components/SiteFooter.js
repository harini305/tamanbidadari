import Link from "next/link";
import { nav, site, whatsappLink } from "@/content/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.name}>
            {site.name}
          </Link>
          <p className={styles.tag}>
            {site.descriptor} in Pemuteran, northwest Bali
          </p>
        </div>

        <nav aria-label="Footer" className={styles.col}>
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Visit</h2>
          <address className={styles.address}>
            {site.address.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Get in touch</h2>
          <ul className={styles.links}>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.channel}>
                <small>WhatsApp</small>
                <span>{site.contact.whatsapp.display}</span>
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <p>
          © {year} {site.fullName}
        </p>
        <p>{site.place}, Indonesia</p>
      </div>
    </footer>
  );
}
