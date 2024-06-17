import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './headers/Headers';
import Sidebar from './sidebar/Sidebar';


function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className=" h-screen  ">
      <div className="flex h-full w-full">
        <div className="ml- ">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className={`flex-1 justify-center items-center  w-full  max-h-screen overflow-scroll `}>
            {/* <Header onSidebarToggle={toggleSidebar} isOpen={sidebarOpen} /> */}
          <div>
            <div className=" p-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Layout;
