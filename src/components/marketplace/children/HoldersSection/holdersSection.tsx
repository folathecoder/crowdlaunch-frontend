import React, { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { BsPatchCheckFill } from 'react-icons/bs';
import { ExploreHolders, Holder, ScrollButton } from './HoldersSectionStyles';
import { ProfileLottie } from 'public/images';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import useGetUsers from '@/hooks/RequestHooks/GET/useGetUsers';
import { LottieImage, CustomSkeleton } from '@/components/global';
import { CroppedImage } from '@/components/global';

const HoldersSection = () => {
  const { users, fetchingStatus } = useGetUsers();
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

    const handleScroll = () => {
      checkScrollPositionDebounced();
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current?.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {!isAtStart && (
        <ScrollButton onClick={() => scroll(-100)} className="left">
          <BsArrowLeftShort />
        </ScrollButton>
      )}
      <ExploreHolders ref={ref}>
        {fetchingStatus === 1 &&
          new Array(16)
            .fill(null)
            .map((item) => (
              <CustomSkeleton
                key={item}
                height={150}
                width={150}
                variant="circular"
              />
            ))}
        {fetchingStatus === 2 &&
          users
            ?.filter((user) => user.userProfileImage !== '')
            .map((user) => (
              <div key={user?.userId}>
                <Holder>
                  {user?.userProfileImage ? (
                    <CroppedImage
                      src={user?.userProfileImage || ''}
                      alt={user?.userName}
                      width={150}
                      height={150}
                    />
                  ) : (
                    <LottieImage animationData={ProfileLottie} />
                  )}
                </Holder>
                <div>
                  <h5>
                    {user?.userName || `Anonymous`}
                    <span>
                      <BsPatchCheckFill />
                    </span>
                  </h5>
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
