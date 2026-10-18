"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, whatsappLink } from "@/content/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop Rooms dropdown: forced shut after an option is chosen, until the
  // pointer leaves it (otherwise :hover / :focus-within keep it showing)
  const [menuShut, setMenuShut] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigation
  const lastPath = useRef(pathname);
  useEffect(() => {
    setOpen(false);
    // Only after a real navigation, not on first load
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    setMenuShut(true);
    // Drop focus from the clicked dropdown link so :focus-within releases
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname]);

  // Scroll lock, Escape to close, focus handling and a simple focus trap
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () => panel.querySelectorAll("a, button");
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [toggleRef.current, ...focusables()];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const overlay = isHome && !scrolled && !open;
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);
  const roomsActive = (item) =>
    isActive(item.href) || item.children?.some((c) => isActive(c.href));

  return (
    <header
      className={`${styles.header} ${overlay ? styles.overlay : styles.solid} ${
        open ? styles.isOpen : ""
      }`}
    >
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.fullName}, home`}>
          <span className={styles.brandName}>{site.name}</span>
          <span className={styles.brandDesc}>{site.descriptor}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li
                key={item.href}
                className={item.children ? styles.hasMenu : undefined}
                data-shut={(item.children && menuShut) || undefined}
                onMouseLeave={item.children ? () => setMenuShut(false) : undefined}
                onKeyDown={
                  item.children
                    ? (e) => {
                        if (e.key === "Escape") {
                          setMenuShut(true);
                          e.currentTarget.querySelector("a")?.focus();
                        }
                      }
                    : undefined
                }
                // Reopen when keyboard focus arrives from outside the menu
                onFocus={
                  item.children
                    ? (e) => !e.currentTarget.contains(e.relatedTarget) && setMenuShut(false)
                    : undefined
                }
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${item.href === "/contact/" ? styles.navCta : ""}`}
                  aria-current={pathname === item.href ? "page" : undefined}
                  data-active={roomsActive(item) || undefined}
                >
                  {item.label}
                  {item.children && <span className={styles.caret} aria-hidden="true" />}
                </Link>
                {item.children && (
                  <ul className={styles.menu} aria-label={`${item.label} pages`}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={styles.menuLink}
                          aria-current={pathname === child.href ? "page" : undefined}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.toggleLines} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        aria-label="Menu"
      >
        <div className={`container ${styles.panelInner}`}>
          <ul className={styles.panelList}>
            <li>
              <Link href="/" className={styles.panelLink} aria-current={isHome ? "page" : undefined}>
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.panelSub}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={styles.panelSubLink}
                          aria-current={pathname === child.href ? "page" : undefined}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.panelFoot}>
            <p>{site.address.singleLine}</p>
            <a className="btn btn--gold" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
