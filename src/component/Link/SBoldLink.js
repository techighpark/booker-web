import styled from "styled-components";

export const SBoldLink = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  color: ${props => props.theme.link.accent.fontColor};
  &:hover {
    color: ${props => props.theme.link.accent.hoverFontColor};
  }
`;
