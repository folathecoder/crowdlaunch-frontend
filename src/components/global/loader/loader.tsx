import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .ld-ripple {
    position: relative;
    width: 50px;
    height: 50px;
  }

  .ld-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ld-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .ld-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes ld-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }

    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }

    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }

    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const Loader = () => {
  return (
    <Container>
      <div className="ld-ripple">
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default Loader;
