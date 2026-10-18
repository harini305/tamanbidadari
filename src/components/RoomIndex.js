"use client";

import Link from "next/link";
import { useState } from "react";
import Img from "./Img";
import styles from "./RoomIndex.module.css";

// Home-page room list. On wide screens one large photograph changes as the
// visitor hovers or focuses a room; on smaller screens each room shows its own.
export default function RoomIndex({ rooms }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.index}>
      <div className={styles.stage} aria-hidden="true">
        {rooms.map((room, i) => (
          <div key={room.slug} className={`frame ${styles.stageImg}`} data-active={i === active || undefined}>
            <Img name={room.card} alt="" sizes="(max-width: 960px) 1px, 45vw" />
          </div>
        ))}
      </div>

      <ul className={styles.list} data-stagger>
        {rooms.map((room, i) => (
          <li key={room.slug}>
            <Link
              href={`/${room.slug}/`}
              className={styles.row}
              data-active={i === active || undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className={`frame ${styles.thumb}`}>
                <Img name={room.card} sizes="(max-width: 960px) 100vw, 1px" />
              </span>
              <span className={styles.body}>
                <span className={`t-h3 ${styles.name}`}>{room.name}</span>
                <span className={styles.summary}>{room.summary}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
