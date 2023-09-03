import React from "react";
import "../css/Themes.css";

class Wallpaper extends React.Component {
  render() {
    const { active, wallpaperItems } = this.props;
    return (
      <div className="music">
        <h2>Wallpaper Select</h2>
        <ul>
          {wallpaperItems.map((ele, i) => {
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

export default Wallpaper;
