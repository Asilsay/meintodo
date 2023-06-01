import { FC } from 'react';
import {
  FaBars,
  FaRegMoon,
  FaRegSun,
  FaRegWindowMaximize,
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-300 text-primary-content sticky top-0 z-[999] px-16">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Simple</a>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex lg:gap-1">
          <a className="btn btn-ghost p-2">Home</a>
          <a className="btn btn-ghost p-2">About</a>
          <a className="btn btn-ghost p-2">Contact</a>
        </div>

        <div className="divider divider-horizontal mx-1 lg:flex hidden"></div>

        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className={`text-primary btn btn-ghost p-1`}
          ></label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-1 shadow bg-base-100 rounded-box w-36"
          >
            <li>
              <a>
                <FaRegSun />
                Light
              </a>
            </li>
            <li>
              <a>
                <FaRegMoon />
                Dark
              </a>
            </li>
            <li>
              <a>
                <FaRegWindowMaximize />
                System
              </a>
            </li>
          </ul>
        </div>

        <div className="divider divider-horizontal mx-1 lg:flex hidden"></div>
        <div className=" gap-1 hidden lg:flex">
          <a className="btn btn-ghost p-2">Login</a>
          <a className="btn">Register</a>
        </div>

        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <FaBars size="1.2rem" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
