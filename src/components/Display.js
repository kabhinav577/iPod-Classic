import React from "react";
import "../css/Display.css";
import Navbar from "./Navbar";
import LockScreen from "./LockScreen";
import Menu from "./Menu";

class Display extends React.Component {
  render() {
    const {
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      audio,
      songUrl,
      songImgUrl,
      wallpaper,
      wallpaperItems,
      noty,
      setNoty,
      notifyText,
    } = this.props;

    return (
      <div
        style={{ backgroundImage: `url(${wallpaperItems[wallpaper]})` }}
        className="display"
      >
        <Navbar
          noty={noty}
          setNoty={setNoty}
          playing={playing}
          notifyText={notifyText}
        />
        {currentMenu === -2 && <LockScreen />}
        {currentMenu === -1 && (
          <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />
        )}
      </div>
    );
  }
}

export default Display;
