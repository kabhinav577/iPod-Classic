import React from "react";

class Themes extends React.Component {
  render() {
    const { active } = this.props;
    const colorArr = [
      "Rose Gold",
      "Space Gray",
      "Gold",
      "Light Purple",
      "Black",
    ];

    return (
      <div className="music">
        <h2>Theme Select</h2>
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

export default Themes;
