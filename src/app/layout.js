import { Montserrat, Lora } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Motion from "@/components/Motion";
import { site } from "@/content/site";

// Montserrat: the closest match to the Taman Bidadari logo lettering (both the
// "TAMAN BIDADARI" wordmark and the tracked tagline), used for the whole site.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Lora: a calm serif for longer reading text (paragraphs, intros and the
// quoted brand statements). Everything structural stays in Montserrat.
const lora = Lora({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} · ${site.place}`,
    template: `%s · ${site.fullName}`,
  },
  description:
    "An eco-friendly resort and yoga retreat in the quiet village of Pemuteran, northwest Bali, with rooms built from wood and stone, a permaculture farm and daily yoga.",
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#37000a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Motion />
      </body>
    </html>
  );
}
