import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Enquiry from "@/components/Enquiry";
import Img from "@/components/Img";
import { rooms, roomsIntro } from "@/content/rooms";
import { whatsappLink } from "@/content/site";
import s from "./rooms.module.css";

export const metadata = {
  title: "Rooms",
  description:
    "Four room types in Pemuteran, Bali: Deluxe Pool Access, Apartment, Quad Room and Family 2 Bed Rooms, for one or two guests up to two families of eight.",
  alternates: { canonical: "/rooms/" },
  openGraph: { title: "Rooms", images: [{ url: "/share/rooms.jpg", width: 1200, height: 630 }] },
};

export default function RoomsPage() {
  return (
    <>
      <PageIntro
        title="Rooms"
        intro={roomsIntro}
        image="pool-buddha"
        position="50% 70%"
        actions={[
          { label: "Enquire on WhatsApp", href: whatsappLink(), external: true },
          { label: "Contact", href: "/contact/", variant: "ghost" },
        ]}
      />

      <section className="section">
        <div className="container">
          <ul className={s.list}>
            {rooms.map((room, i) => (
              <li key={room.slug} className={`${s.room} ${i % 2 ? s.flip : ""}`}>
                <Link
                  href={`/${room.slug}/`}
                  className={`frame ${s.media}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  data-reveal-image
                >
                  <Img name={room.card} alt="" sizes="(max-width: 960px) 100vw, 58vw" />
                </Link>
                <div className={s.text} data-reveal>
                  <h2 className="t-h2">
                    <Link href={`/${room.slug}/`} className={s.titleLink}>
                      {room.name}
                    </Link>
                  </h2>
                  <p className="t-muted">{room.summary}</p>
                  <dl className={s.facts}>
                    {room.facts.slice(0, 2).map((f) => (
                      <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={`/${room.slug}/`} className="link-arrow">
                    View the {room.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-sand">
        <div className="container split split--compact">
          <div className="frame split-media" data-reveal-image>
            <Img name="garden-terrace" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">Availability</h2>
            <p className="t-muted">
              Rates and availability are not published on this site. Send the team a message on
              WhatsApp and say which room you are interested in.
            </p>
            <Enquiry />
          </div>
        </div>
      </section>
    </>
  );
}
