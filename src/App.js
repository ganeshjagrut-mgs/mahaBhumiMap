// import {userState} from react

import "./App.css";
import './index.css';
// import Location from "./Components/Location";

// import MyDropdown from "./Components/MyDropdown";
import Layout from "./Components/layout";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
    <Layout />
  </Router>,
    </>
  );
}

export default App;

