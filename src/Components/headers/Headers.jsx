import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineMenuFold } from 'react-icons/ai';
import { FaBell, FaRegUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
// import ThemeSwitcherButton from '../../../../theme/themeSwitcherButton';
import styles from '../styleSheet/styles.module.css';

function Header({ onSidebarToggle }) {
  const navigate = useNavigate();
  const goBack = () => {
    window.history.back();
  };
  const goForward = () => {
    navigate(1);
  };

  return (
    <header className={`${styles.container2} flex  justify-between items-cente p-3 sticky top-0 z-10`}>
      <div className={`flex justify-center items-center h-ful gap-x-2 `} >
        <button
          onClick={onSidebarToggle}
          className={`${styles.button} hidden sm:block`}>
          <AiOutlineMenuFold />
        </button>
        <button
          onClick={goBack}
          className={`${styles.button}`}>
          <AiOutlineArrowLeft />
        </button>
        <button
          onClick={goForward}
          className={`${styles.button}`}>
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="flex items-center gap-x-2">
        <button
          className={`${styles.button}`}>
          <FaBell />
        </button>
        <button
          className={`${styles.button}`}
          type="button"
        >
          <FaRegUserCircle />
        </button>
      </div>
    </header>
  )
}

export default Header;
