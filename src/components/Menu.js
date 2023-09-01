import React from "react";
import "../css/Menu.css";
import game from "../static/game.jpg";
import music from "../static/music.jpg";
import settings from "../static/setting.jpg";

class Menu extends React.Component {
  render() {
    const { active, menuItems, songImgUrl } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <ul>
            {menuItems.map((ele, i) => {
              return active === i ? (
                <li key={i} className="active">
                  &nbsp;{ele}
                </li>
              ) : (
                <li key={i} className="">
                  &nbsp;{ele}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="leaf">
          {active === 0 && (
            <img className="leaf-img" src={songImgUrl} alt=""></img>
          )}
          {active === 1 && <img className="leaf-img" src={music} alt=""></img>}
          {active === 2 && <img className="leaf-img" src={game} alt=""></img>}
          {active === 3 && (
            <img className="leaf-img" src={settings} alt=""></img>
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
