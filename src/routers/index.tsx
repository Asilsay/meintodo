import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

import ScrollToTop from '../components/ScrollToTop';
import Detail from '../pages/Detail';
import Error from '../pages/Error';
import Home from '../pages';
import { ThemeContext } from '../context/theme';

export const Router = () => {
  const [theme, setTheme] = useState<string>('winter');
  const DarkTheme = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
    } else if (theme === 'winter') {
      document.documentElement.setAttribute('data-theme', 'winter');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={DarkTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/detail/:detail"
            element={<Detail />}
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default Router;
