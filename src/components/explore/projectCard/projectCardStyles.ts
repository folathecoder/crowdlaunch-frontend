import styled, { css } from 'styled-components';

export const ProjectContainer = styled.div`
  height: 421px;
  border-radius: 8px;
  padding: 9px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 267px;
  border-radius: 8px;
  position: relative;
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
