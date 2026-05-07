/* =======================================
 * 熊日すぱいす ROOTS 画像リストセクション
 * URL: /src/components/roots/RootsImageListSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-07
 * Last updated: 2026-05-07
 * ======================================= */
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from './RootsImageListSection.module.scss';

type Props = {
  portraitImages: string[];
  squareImages: string[];
  landscapeImages: string[];
};

const pickImages = (sources: string[], count: number): string[] => {
  const unique = Array.from(new Set(sources.filter(Boolean)));
  if (unique.length <= count) return unique;

  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export default function RootsImageListSection({
  portraitImages,
  squareImages,
  landscapeImages,
}: Props) {
  const pickedPortrait = useMemo(
    () => pickImages(portraitImages, 1),
    [portraitImages]
  );
  const pickedSquares = useMemo(
    () => pickImages(squareImages, 2),
    [squareImages]
  );
  const pickedLandscapes = useMemo(
    () => pickImages(landscapeImages, 1),
    [landscapeImages]
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (pickedPortrait.length === 0) return null;

  const displayImages = [
    { src: pickedLandscapes[0], slot: styles.landscapeTop },
    { src: pickedPortrait[0], slot: styles.portraitLeft },
    { src: pickedSquares[0], slot: styles.squareTopRight },
    { src: pickedSquares[1], slot: styles.squareBottomRight },
  ].filter((entry): entry is { src: string; slot: string } =>
    Boolean(entry.src)
  );

  return (
    <section className={styles.rootsImageListSection}>
      <article>
        {displayImages.map((entry, index) => (
          <button
            key={`${entry.src}-${index}`}
            type="button"
            className={`${styles.gridItem} ${entry.slot}`}
            onClick={() => setActiveIndex(index)}
            aria-label="画像を拡大表示"
          >
            <Image
              src={entry.src}
              alt="ストーリー画像"
              width={1200}
              height={800}
              className={styles.image}
            />
          </button>
        ))}
      </article>

      {activeIndex !== null ? (
        <div className={styles.blockModal} onClick={() => setActiveIndex(null)}>
          <div
            className={styles.modalInner}
            onClick={(event) => event.stopPropagation()}
          >
            <Splide
              key={`modal-${activeIndex}-${displayImages.length}`}
              options={{
                type: 'loop',
                perPage: 1,
                perMove: 1,
                start: activeIndex,
                pagination: false,
                drag: true,
                speed: 500,
                gap: '0.8rem',
                padding: '6%',
              }}
              aria-label="画像カルーセル"
            >
              {displayImages.map((item, index) => (
                <SplideSlide key={`${item.src}-${index}`}>
                  <Image
                    src={item.src}
                    alt="拡大画像"
                    width={1600}
                    height={1066}
                    className={styles.modalImage}
                  />
                </SplideSlide>
              ))}
            </Splide>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setActiveIndex(null)}
              aria-label="閉じる"
            ></button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
