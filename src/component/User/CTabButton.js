import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { ProfileTabVar } from "../../apollo";

const TabButton = styled.span`
  background-color: ${props =>
    props.active
      ? props.theme.button.activeBgColor
      : props.theme.button.bgColor};
  font-weight: ${props => (props.active ? "700" : "")};
  padding: 20px 100px;
  &:hover {
    cursor: pointer;
    background-color: ${props =>
      props.active ? "" : props.theme.button.hoverBgColor};
    text-decoration: underline;
  }
`;

export const CTabButton = ({ activeTab, title }) => {
  const ProfileTab = useReactiveVar(ProfileTabVar);

  return (
    <TabButton
      onClick={() => {
        ProfileTabVar(activeTab);
      }}
      active={Boolean(ProfileTab === activeTab)}
    >
      {title}
    </TabButton>
  );
};
