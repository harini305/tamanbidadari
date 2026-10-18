import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 6rem)" }}>
      <div className="container" style={{ display: "grid", gap: "1.75rem", justifyItems: "start" }}>
        <h1 className="t-h1">Page not found</h1>
        <p className="t-lead t-muted measure">
          This page does not exist. It may have been part of the previous website.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/rooms/" className="btn btn--ghost">
            Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
