import { FC, useContext } from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import logos from '/meintodo.png';
import logosbl from '/meintodo_bl.png';

import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme';

const Navbar: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleTheme(e: any, mode: string) {
    e.preventDefault();
    setTheme(mode);

    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur?.();
    }
  }

  return (
    <div className="navbar bg-primary text-primary-content sticky top-0 z-[999] px-16">
      <div className="navbar-start">
        <NavLink
          to="/"
          id="to-homepage"
          className="btn btn-ghost normal-case text-xl hover:bg-inherit"
        >
          <img
            src={theme === 'winter' ? logos : logosbl}
            alt="logo-event-planner"
          />
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="flex gap-2">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive
                ? ' btn btn-ghost p-2 font-bold tracking-wide'
                : 'btn btn-ghost p-2'
            }
          >
            Home
          </NavLink>
          <div className="divider divider-horizontal mx-1 lg:flex hidden "></div>
          <label className="swap swap-rotate">
            <input
              onClick={(e) =>
                handleTheme(e, theme === 'night' ? 'winter' : 'night')
              }
              type="checkbox"
            />

            <div className="swap-on fill-current ">
              {theme === 'night' ? (
                <FaRegSun size="1.1rem" />
              ) : (
                <FaRegMoon size="1.1rem" />
              )}
            </div>

            <div className="swap-off fill-current ">
              {theme === 'winter' ? (
                <FaRegMoon size="1.1rem" />
              ) : (
                <FaRegSun size="1.1rem" />
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
