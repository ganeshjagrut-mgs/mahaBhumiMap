import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Main from "./Main";
import axios from "axios";
import { BASE_URL } from "./constant";

function Layout() {
  const [data, setData] = React.useState(null);
  const onSubmit=async(data)=>{
    try {
      const response = await axios.get(
        `${BASE_URL}/plot/plotNumber/${data}`
      );
      setData(response.data)
    } catch (error) {
      console.error(
        `Error fetching talukas for district :`,
        error
      );
    }
  }
  return (
    <div className="flex h-full w-full bg-gray-100">
      <div className="bg-white p-2 ">
        <Sidebar onSubmit={onSubmit} />
      </div>
      <div className="px-3 w-full">
        <Main data={data}></Main>
      </div>
    </div>
  );
}
export default Layout;
