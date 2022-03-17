import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { onDarkMode, onLightMode, themeModeVar } from "../../apollo";

const ModeBtn = styled.div`
  text-align: center;
  padding: 5px;
  cursor: pointer;
`;

export const ThemeModeBtn = () => {
  const themeMode = useReactiveVar(themeModeVar);
  return (
    <ModeBtn onClick={themeMode ? onLightMode : onDarkMode}>
      <FontAwesomeIcon icon={themeMode ? faSun : faMoon} size={"lg"} />
    </ModeBtn>
  );
};
