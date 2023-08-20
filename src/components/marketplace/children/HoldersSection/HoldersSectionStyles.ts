import styled from 'styled-components';

export const ExploreHolders = styled.section`
  display: inline-flex;
  gap: 10px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll !important;
  overflow-y: hidden;
  white-space: nowrap;
  margin-bottom: 70px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  overflow: -moz-scrollbars-horizontal;
  padding: 0px 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

export const Holder = styled.div`
  height: 150px;
  min-width: 150px;
  background-color: var(--color-bg-300);
  border-radius: 100%;
  border: 2px solid var(--color-accent-100);
  position: relative;
  margin-bottom: 10px;

  img {
    border-radius: 100%;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 100%;
  font-size: 20px;
  background: var(--color-accent-100);
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-font-100);
  display: none;

  .left {
    background: var(--color-accent-100);
    transform: translateY(-50px) translateX(-13px);
  }

  .right {
    background: var(--color-accent-100);
    transform: translateY(-50px) translateX(-10px);
  }
`;
