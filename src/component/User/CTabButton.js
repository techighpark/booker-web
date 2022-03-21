import { useReactiveVar } from "@apollo/client";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ProfileTabVar } from "../../apollo";

const TabButton = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${props => (props.active ? "600" : "")};
  color: ${props =>
    props.active
      ? props.theme.primary.fontColor
      : props.theme.secondary.fontColor};
  padding: 25px 5px;
  margin: 0px 30px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${props => props.theme.primary.fontColor};
  }
`;
const ArrowIcon = styled.span`
  margin: 5px 0px;
  display: ${props => (props.active ? "" : "none")}; ;
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
      <ArrowIcon active={Boolean(ProfileTab === activeTab)}>
        <FontAwesomeIcon icon={faArrowUp} size={"xs"} />
      </ArrowIcon>
    </TabButton>
  );
};
