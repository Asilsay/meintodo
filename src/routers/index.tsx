import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';
import Detail from '../pages/Detail';
import Error from '../pages/Error';
import Home from '../pages';

export const Router = () => {
  const theme = localStorage.getItem('theme') || 'bumblebee';

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/detail/:movie_id"
          element={<Detail />}
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
