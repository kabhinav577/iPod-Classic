import React from "react";
import "../css/Case.css";
import Display from "./Display";

class Case extends React.Component {
  render() {
    const {
      active,
      updateActiveMenu,
      currentMenu,
      changeMenuForward,
      changeMenuBackward,
      menuItems,
      musicItems,
      togglePlayPause,
      songItems,
      playing,
      songIndex,
      theme,
      audio,
      songUrl,
      songImgUrl,
      seekSongForward,
      seekSongReverse,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      setNoty,
      notifyText,
    } = this.props;
    // console.log(this.props);
    return (
      <div className="case-container">
        <div className="case">
          <Display
            songIndex={songIndex}
            playing={playing}
            active={active}
            musicItems={musicItems}
            menuItems={menuItems}
            currentMenu={currentMenu}
            songItems={songItems}
            audio={audio}
            songUrl={songUrl}
            songImgUrl={songImgUrl}
            wallpaper={wallpaper}
            wallpaperItems={wallpaperItems}
            noty={noty}
            setNoty={setNoty}
            notifyText={notifyText}
          />
        </div>
      </div>
    );
  }
}

export default Case;