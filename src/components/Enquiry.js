import Link from "next/link";
import { site, whatsappLink } from "@/content/site";
import Pending from "./Pending";
import styles from "./Enquiry.module.css";

// Booking / enquiry actions. Until a booking destination is confirmed
// (site.booking.url), this offers a WhatsApp enquiry that is clearly not a
// reservation, instead of linking to the broken booking engine.
export default function Enquiry({ roomName, tone = "light", block = false }) {
  const message = roomName
    ? `Hello, I would like to ask about the ${roomName} at ${site.fullName}.`
    : `Hello, I would like to ask about staying at ${site.fullName}.`;

  return (
    <div className={`${styles.enquiry} ${styles[tone]} ${block ? styles.block : ""}`}>
      {site.booking.url ? (
        <a className={`btn ${tone === "dark" ? "btn--gold" : ""}`} href={site.booking.url} target="_blank" rel="noopener noreferrer">
          {site.booking.label}
        </a>
      ) : (
        <>
          <a
            className={`btn ${tone === "dark" ? "btn--gold" : ""}`}
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire on WhatsApp
          </a>
          <p className={styles.note}>
            Opens a WhatsApp chat with the team. Sending a message does not reserve a room.
          </p>
          <Pending>Online booking link awaiting owner confirmation</Pending>
        </>
      )}
      <Link href="/contact/" className={styles.secondary}>
        Other ways to get in touch
      </Link>
    </div>
  );
}
