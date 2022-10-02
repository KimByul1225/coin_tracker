import Router from "./Router";
import { ThemeProvider } from "styled-components";
import ToggleButton from "./components/ToggleButton";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";


function App() {
  const isDark = useRecoilValue(isDarkAtom);

  
  return (
    <>
      <GlobalStyle/>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ToggleButton/>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

