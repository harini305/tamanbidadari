import Link from "next/link";
import Img from "@/components/Img";
import RoomIndex from "@/components/RoomIndex";
import { rooms } from "@/content/rooms";
import { site, whatsappLink } from "@/content/site";
import s from "./home.module.css";

export const metadata = {
  title: { absolute: `${site.fullName} · ${site.place}` },
  description:
    "Eco-friendly resort and yoga retreat in the quiet village of Pemuteran, northwest Bali: rooms built from wood and stone, a permaculture farm, a yoga studio and Balinese culture.",
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/share/home.jpg", width: 1200, height: 630 }] },
};

const experiences = [
  { name: "Yoga & meditation", image: "yoga-boulder" },
  { name: "Learn to dive", image: "snorkel-turtle" },
  { name: "Picnic on the beach", image: "beach-picnic" },
];

export default function Home() {
  return (
    <>
      <section className={s.hero} data-hero>
        <div className={s.heroMedia} data-hero-media>
          <Img name="pool-mountains-dusk" priority sizes="100vw" position="50% 62%" />
        </div>
        <div className={`container ${s.heroInner}`}>
          <h1 className={`t-display ${s.heroTitle}`} data-hero-item>
            Eco house &amp; yoga retreat in Pemuteran, Bali
          </h1>
          <div className={s.heroFoot}>
            <p className={`t-lead ${s.heroLede}`} data-hero-item>
              Rooms made of wood and stone, a permaculture farm and a yoga studio with daily classes,
              in a quiet village in the northwest of the island.
            </p>
            <div className="btn-row" data-hero-item>
              <Link href="/rooms/" className="btn btn--gold">
                Explore the rooms
              </Link>
              <Link href="/contact/" className="btn btn--light">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="frame split-media" data-reveal-image>
            <Img name="reception-pavilion" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <p className="t-statement">
              For those who seek the combination of authentic Balinese hospitality with an excellent
              hotel standard.
            </p>
            <div className={`t-muted ${s.introBody}`}>
              <p>
                {site.name} is an eco-friendly resort in the quiet village of Pemuteran, designed for
                those who want to experience a sustainable way of life, immerse themselves in nature
                and practise yoga.
              </p>
              <p>
                The rooms are spacious and comfortable, with large windows, air conditioning, hot
                water and free Wi-Fi.
              </p>
            </div>
            <Link href="/about/" className="link-arrow">
              About the retreat
            </Link>
          </div>
        </div>
      </section>

      <section className="section surface-sand">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="t-h2">Rooms</h2>
            <Link href="/rooms/" className="link-arrow">
              All rooms
            </Link>
          </div>
          <RoomIndex rooms={rooms} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="t-h2">Yoga, the sea and Balinese culture</h2>
            <Link href="/services/" className="link-arrow">
              All services
            </Link>
          </div>

          <div className={s.mosaic}>
            {experiences.map((item, i) => (
              <figure key={item.name} className={`${s.tile} ${i === 0 ? s.tileLead : ""}`}>
                <div className={`frame ${s.tileMedia}`} data-reveal-image>
                  <Img
                    name={item.image}
                    sizes={i === 0 ? "(max-width: 960px) 100vw, 58vw" : "(max-width: 960px) 50vw, 40vw"}
                  />
                </div>
                <figcaption className={s.tileCaption}>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-sand">
        <div className="container split split--flip split--compact">
          <div className="frame split-media" data-reveal-image>
            <Img name="pool-sign-mountains" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">Find us in Pemuteran</h2>
            <address className={s.visitAddress}>
              {site.address.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="btn-row">
              <a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
              <Link href="/contact/" className="btn btn--ghost">
                Map and contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
