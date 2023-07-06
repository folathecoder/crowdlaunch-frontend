import styled, { css } from 'styled-components';

export const ProjectContainer = styled.div`
  min-height: 421px;
  border-radius: 8px;
  padding: 9px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: 0.3s linear;

  &:hover {
    img {
      opacity: 0.5;
      transition: 0.3s linear;
    }
  }
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 267px;
  border-radius: 8px;
  position: relative;

  img {
    border-radius: 8px;
  }
`;

export const ProjectTitle = styled.div`
  margin-top: 13px;

  h3 {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
  }

  h4 {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
  }
`;

export const ProjectProgress = styled.div`
  margin-top: 12px;
`;

export const ProjectInfo = styled.div`
  width: 100%;
  height: 68px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 13px;
    font-weight: 400;
  }

  h5 {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }
`;
