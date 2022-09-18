import Router from "./Router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./routes/atoms";


function App() {
  const isDark = useRecoilValue(isDarkAtom)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle/>
          <HelmetProvider>
            <Router />
          </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider>
    </>
  );
}

export default App;