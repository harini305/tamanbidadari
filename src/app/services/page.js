import PageIntro from "@/components/PageIntro";
import Img from "@/components/Img";
import Enquiry from "@/components/Enquiry";
import { services, facilities } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import s from "./services.module.css";

export const metadata = {
  title: "Services",
  description:
    "Yoga and meditation, learning to dive, Balinese dance lessons, culture activities, beach picnics, the restaurant, a cooking class, farming and sunrise walks in Pemuteran, Bali.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Services", images: [{ url: "/share/services.jpg", width: 1200, height: 630 }] },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        intro={`Yoga and meditation, diving, Balinese dance and culture, the farm and the restaurant: the experiences offered at ${site.name}.`}
        actions={[
          { label: "Ask about activities", href: whatsappLink(`Hello, I would like to ask about activities at ${site.fullName}.`), external: true },
          { label: "See the rooms", href: "/rooms/", variant: "ghost" },
        ]}
      />

      <section className="section">
        <div className="container">
          <ul className={s.grid} data-stagger>
            {services.map((item) =>
              item.image ? (
                <li key={item.name} className={s.item}>
                  <div className={`frame ${s.media}`}>
                    <Img name={item.image} sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" />
                  </div>
                  <h2 className={`t-h3 ${s.name}`}>{item.name}</h2>
                  {item.text && <p className="t-small t-muted">{item.text}</p>}
                </li>
              ) : (
                <li key={item.name} className={`${s.item} ${s.textItem}`}>
                  <h2 className={`t-h3 ${s.name}`}>{item.name}</h2>
                  {item.text && <p className="t-small t-muted">{item.text}</p>}
                  <a
                    className={`link-arrow ${s.ask}`}
                    href={whatsappLink(`Hello, I would like to ask about the ${item.name.toLowerCase()} at ${site.fullName}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask on WhatsApp
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="section surface-sand">
        <div className="container split">
          <div className="frame split-media" data-reveal-image>
            <Img name="spa-massage" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">At the retreat</h2>
            <ul className={s.facList}>
              {facilities.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--flip split--compact">
          <div className="frame split-media" data-reveal-image>
            <Img name="garden-tree" sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="split-text" data-reveal>
            <h2 className="t-h2">Planning your days</h2>
            <p className="t-muted">
              Times, prices and availability for these activities are not listed here. Ask the team on
              WhatsApp about anything you would like to do during your stay.
            </p>
            <Enquiry />
          </div>
        </div>
      </section>
    </>
  );
}
