import Link from "next/link";
import PageIntro from "./PageIntro";
import Gallery from "./Gallery";
import Enquiry from "./Enquiry";
import Img from "./Img";
import { rooms, getRoom } from "@/content/rooms";
import { site, whatsappLink } from "@/content/site";
import styles from "./RoomPage.module.css";

export function roomMetadata(slug) {
  const room = getRoom(slug);
  return {
    title: room.name,
    description: room.metaDescription,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title: room.name,
      description: room.metaDescription,
      images: [{ url: `/share/${slug}.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function RoomPage({ slug }) {
  const room = getRoom(slug);
  const others = rooms.filter((r) => r.slug !== slug);

  return (
    <>
      <PageIntro
        title={room.name}
        intro={room.summary}
        image={room.hero}
        back={{ href: "/rooms/", label: "All rooms" }}
        actions={[
          {
            label: "Enquire on WhatsApp",
            href: whatsappLink(`Hello, I would like to ask about the ${room.name} at ${site.fullName}.`),
            external: true,
          },
          { label: "View photographs", href: "#photos-title", variant: "ghost" },
        ]}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h2 className="t-h2" data-reveal>
              About the room
            </h2>
            <div className={`t-lead ${styles.description}`} data-reveal>
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className={styles.block} data-reveal>
              <h3 className={`t-label ${styles.blockTitle}`}>In the room</h3>
              <ul className={styles.amenities}>
                {room.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            {room.included && (
              <div className={styles.block} data-reveal>
                <h3 className={`t-label ${styles.blockTitle}`}>{room.included.title}</h3>
                <ul className={styles.amenities}>
                  {room.included.items.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className={styles.aside} aria-label="Room details and enquiry">
            <div className={styles.card} data-reveal>
              <dl className={styles.facts}>
                {room.facts.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Enquiry roomName={room.name} block />
            </div>
          </aside>
        </div>
      </section>

      <section className={`section ${styles.photos}`} aria-labelledby="photos-title">
        <div className="container">
          <div className={styles.photosHead} data-reveal>
            <h2 id="photos-title" className="t-h2">
              Photographs
            </h2>
            {room.galleryNote && <p className="t-small t-muted">{room.galleryNote}</p>}
          </div>
          <Gallery items={room.gallery} title={room.name} />
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="other-rooms">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 id="other-rooms" className="t-h2">
              Other rooms
            </h2>
            <Link href="/rooms/" className="link-arrow">
              Compare all rooms
            </Link>
          </div>
          <ul className={styles.others} data-stagger>
            {others.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.slug}/`} className={styles.other}>
                  <span className={`frame ${styles.otherMedia}`}>
                    <Img name={r.card} sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" />
                  </span>
                  <span className={`t-h3 ${styles.otherName}`}>{r.name}</span>
                  <span className={`t-small t-muted`}>{r.facts[0].label}: {r.facts[0].value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
