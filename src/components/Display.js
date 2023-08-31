import React from "react";
import "../css/Display.css";
import Navbar from "./Navbar";

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        <Navbar />
      </div>
    );
  }
}

export default Display;
