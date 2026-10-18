import PageIntro from "@/components/PageIntro";
import Pending from "@/components/Pending";
import { site, whatsappLink, mapsEmbedSrc, mapsLink } from "@/content/site";
import s from "./contact.module.css";

export const metadata = {
  title: "Contact",
  description: `Contact ${site.fullName} in Pemuteran, Gerokgak, Buleleng, northwest Bali: address, map and WhatsApp.`,
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Contact", images: [{ url: "/share/contact.jpg", width: 1200, height: 630 }] },
};

export default function ContactPage() {
  const { contact } = site;

  return (
    <>
      <PageIntro
        title="Contact"
        intro="For questions about rooms, availability or activities, message the team on WhatsApp."
        actions={[
          { label: "Start a WhatsApp chat", href: whatsappLink(), external: true },
          { label: "Open in Google Maps", href: mapsLink(), external: true, variant: "ghost" },
        ]}
      />

      <section className={`section ${s.section}`}>
        <div className={`container ${s.grid}`}>
          <div className={s.details}>
            <dl className={s.list} data-stagger>
              <div className={s.row}>
                <dt>Address</dt>
                <dd>
                  <address className={s.address}>
                    {site.address.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </dd>
              </div>

              <div className={s.row}>
                <dt>WhatsApp</dt>
                <dd className={s.stack}>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={s.value}>
                    {contact.whatsapp.display}
                  </a>
                </dd>
              </div>

              <div className={s.row}>
                <dt>Phone</dt>
                <dd>
                  {contact.phone ? (
                    <a href={`tel:${contact.phone.tel}`} className={s.value}>
                      {contact.phone.display}
                    </a>
                  ) : (
                    <Pending />
                  )}
                </dd>
              </div>

              <div className={s.row}>
                <dt>Email</dt>
                <dd>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className={s.value}>
                      {contact.email}
                    </a>
                  ) : (
                    <Pending />
                  )}
                </dd>
              </div>

              <div className={s.row}>
                <dt>Opening hours</dt>
                <dd>{contact.hours ? <span className={s.value}>{contact.hours}</span> : <Pending />}</dd>
              </div>

              <div className={s.row}>
                <dt>Follow</dt>
                <dd className={s.social}>
                  {site.social.map((item) => (
                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className={s.mapCol} data-reveal>
            <div className={s.map}>
              <iframe
                title={`Map showing ${site.fullName} in Pemuteran`}
                src={mapsEmbedSrc()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
