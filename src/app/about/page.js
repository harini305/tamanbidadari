import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Img from "@/components/Img";
import { facilities } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import s from "./about.module.css";

export const metadata = {
  title: "About",
  description:
    "An eco-friendly resort in Pemuteran, northwest Bali, built from wood and stone, with a yoga studio, a permaculture farm, an organic restaurant, a pool, a spa and a library.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About", images: [{ url: "/share/about.jpg", width: 1200, height: 630 }] },
};

// Copy condensed from the live About page (audit 03 §4), grammar corrected.
export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About"
        intro="A unique eco-friendly resort in the quiet village of Pemuteran, in the northwest of Bali, Indonesia."
        image="brick-rooms-evening"
        position="50% 60%"
        actions={[
          { label: "See the rooms", href: "/rooms/" },
          { label: "Enquire on WhatsApp", href: whatsappLink(), external: true, variant: "ghost" },
        ]}
      />

      <section className="section">
        <div className="container split">
          <div className="frame split-media" data-reveal-image>
            <Img name="canopy-beds-square" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">A sustainable way of life</h2>
            <div className={`t-muted ${s.body}`}>
              <p>
                The resort is designed for those who want to experience a sustainable way of life,
                immerse themselves in nature and practise yoga.
              </p>
              <p>
                The accommodation is made of natural materials such as wood and stone, and designed to
                blend in with the surrounding landscape. The rooms are spacious and comfortable, with
                large windows that look out to the mountains. Each room has air conditioning, hot water
                and free Wi-Fi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-sand">
        <div className="container split split--flip">
          <div className="frame split-media" data-reveal-image>
            <Img name="yoga-garden" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">Yoga and the farm</h2>
            <div className={`t-muted ${s.body}`}>
              <p>
                The yoga studio offers daily classes for practitioners of all levels. It is surrounded
                by lush greenery, a peaceful and relaxing place to practise yoga and meditation.
              </p>
              <p>
                The resort is also home to a permaculture farm, where guests can learn about
                sustainable farming and take part in the farm&rsquo;s activities. The farm produces
                organic fruit, vegetables and herbs, which the restaurant uses to create healthy,
                delicious meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="frame split-media" data-reveal-image>
            <Img name="pool-umbrellas" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">Around the retreat</h2>
            <p className="t-muted">
              Other facilities include a swimming pool, a spa offering a range of massages and body
              treatments, and a library where guests can relax and read.
            </p>
            <ul className={s.facilities}>
              {facilities.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section surface-sand">
        <div className={`container ${s.closing}`} data-reveal>
          <p className="t-statement">
            {site.name} is for those who want to experience a sustainable way of life, learn about
            permaculture farming and practise yoga in a peaceful, natural environment.
          </p>
          <div className="btn-row">
            <Link href="/rooms/" className="btn">
              See the rooms
            </Link>
            <Link href="/contact/" className="btn btn--ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
