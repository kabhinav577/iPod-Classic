import React from "react";
import "../css/Themes.css";

class WheelColor extends React.Component {
  render() {
    const { active } = this.props;
    const colorArr = ["Black", "White", "Brown", "Purple"];
    return (
      <div className="music">
        <h2>Wheel Color Select</h2>
        <ul>
          {colorArr.map((ele, i) => {
            return active === i ? (
              <li key={i} className="active theme-li">
                {ele}
              </li>
            ) : (
              <li key={i} className="theme-li">
                {ele}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WheelColor;
