import React, { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Image from 'next/image';
import { ExploreHolders, Holder, ScrollButton } from './HoldersSectionStyles';
import { holders } from '@/data/marketplace/marketplaceData';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';

const HoldersSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      const start = ref.current.scrollLeft;
      const end = start + scrollOffset;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / 500, 1);

        if (ref?.current?.scrollLeft)
          ref.current.scrollLeft = start + progress * scrollOffset;

        if (progress < 1) {
          window.requestAnimationFrame(animate);
        } else {
          checkScrollPosition();
        }
      };

      window.requestAnimationFrame(animate);
    }
  };

  const checkScrollPosition = () => {
    if (ref.current) {
      setIsAtStart(ref.current.scrollLeft === 0);
      setIsAtEnd(
        ref.current.scrollLeft >=
          ref.current.scrollWidth - ref.current.offsetWidth
      );
    }
  };

  useEffect(() => {
    const checkScrollPositionDebounced = debounce(checkScrollPosition, 100);
    if (ref.current) {
      ref.current.addEventListener('scroll', checkScrollPositionDebounced);
      return () => {
        ref.current?.removeEventListener(
          'scroll',
          checkScrollPositionDebounced
        );
      };
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {!isAtStart && (
        <ScrollButton onClick={() => scroll(-100)} className="left">
          <BsArrowLeftShort />
        </ScrollButton>
      )}
      <ExploreHolders ref={ref}>
        {holders.map((item) => (
          <div key={item.id}>
            <Holder>
              <Image src={item.collectorImage} alt="featured image" />
            </Holder>
            <div>
              <h5>{item.collectorName}</h5>
            </div>
          </div>
        ))}
      </ExploreHolders>
      {!isAtEnd && (
        <ScrollButton onClick={() => scroll(100)} className="right">
          <BsArrowRightShort />
        </ScrollButton>
      )}
    </div>
  );
};

export default HoldersSection;
