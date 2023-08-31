import React from "react";
import "../css/App.css";

// Importing Components
import KnowMore from "./KnowMore";
import Case from "./Case";

// Importing all Songs
import song1 from "../static/songs/ram-siya-ram.mp3";
import song2 from "../static/songs/chal-tere-ishq-mein.mp3";
import song3 from "../static/songs/o-aasman-wale.mp3";
import song4 from "../static/songs/on-my-way.mp3";
import song5 from "../static/songs/under-the-influence.mp3";

// Importing all songs cover images
import song1Img from "../static/ram-siya-ram.jpg";
import song2Img from "../static/Chal-tere-ishq-mein.jpg";
import song3Img from "../static/o-asman-wale.jpg";
import song4Img from "../static/on-my-way.jpg";
import song5Img from "../static/under-the-influence.jpg";

// Importing wallpapers
import MusicBack from "../static/MusicBack.jpg";
import Celebration from "../static/Celebration.jpg";
import Poppies from "../static/Poppies.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      menuItems: ["Now Playing", "Music", "Games", "Settings"], //menu Items
      musicItems: ["All Songs", "Artist", "Albums"], //Items in music
      songItemsUrl: [song1, song2, song3, song4, song5], //songs list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img], //song images list
      wallpaperItems: [MusicBack, Poppies, Celebration], //wallpapers
      songItems: [
        "Ram siya ram (Sachet-parampara)",
        "Chal Tere Ishq Mein (Gadar-2)",
        "O Aasman Wale (Jubin)",
        "On My Way (Alan Walker)",
        "Under The Influence (Chris Brown)",
      ], //song names
      songIndex: 0, //current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, //length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      theme: "rgb(210, 210, 210)", //current body theme
      audio: new Audio(song1), //current audio file
      songImgUrl: song1Img, //current song img for now playing
      wheelColor: "white", //current wheel color
      wallpaper: 0, //current wallpaper
      noty: false, // has to show notification or not
      notifyText: "Wallpaper Changed", //notification text
    };
  }

  // FUNCTION FOR :: ON LONG PRESS ON THE FORWARD BTN TRACKS SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) return;

    if (this.state.playing === false) return;

    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }

      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songUrl: songUrl,
          songImgUrl: songImgUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR :: ON LONG PRESS ON BACKWARD BTN TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) return;

    if (this.state.playing === false) return;

    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }

      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songUrl: songUrl,
          songImgUrl: songImgUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // TOGGLE BUTTON FOR PLAY OR PAUSE ->
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) return;

    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  // FUNCTION FOR :: UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    )
      return;

    let min = 0,
      max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  // FUNCTION FOR :: CHANGE THE TEHEME OF iPod BODY
  setTheme = (id) => {
    let theme = "";
    if (id === 0) theme = "#FDDCD7";
    else if (id === 1) theme = "rgb(210, 210, 210)";
    else if (id === 2) theme = "#F5DDC5";
    else if (id === 3) theme = "#D1CDDA";
    else if (id === 4) theme = "black";

    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" });
    return;
  };

  // FUNCTION FOR :: WHEEL COLOR CHANGED
  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) wheelColor = "#212121";
    else if (id === 1) wheelColor = "white";
    else if (id === 2) wheelColor = "#3E2723";
    else if (id === 3) wheelColor = "#3D5AFE";
    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    });
    return;
  };

  // FUNCTION FOR :: SET WALLPAPER OF IPOD SCREEN
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed!",
    });
    return;
  };

  // FUNCTION FOR :: CHANGE PLAYING MUSIC FORM MENU
  changePlayingSongFromMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play();
      }
    );

    return;
  };

  // FUNCTION FOR :: CHANGE MENU FORWARD on PRESS OF CENTER BTN
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    )
      return;

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }

    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.changePlayingSongFromMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
    return;
  };

  // FUNCTION FOR ::CHANGE MENU BACKWARDS on PRESS CENTER OF BTN
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();

    if (this.state.currentMenu === -2) return;
    else {
      const prevID = navigationStack.pop();
      this.setState({
        currentMenu: prevID,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  // FUNCTION FOR :: SET NOTIFICATION WHEN SENDING NOTIFICATION
  setNoty = () => {
    this.setState({ noty: false });
    return;
  };

  render() {
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      theme,
      songUrl,
      songImgUrl,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      notifyText,
    } = this.state;
    return (
      <div>
        <KnowMore />
        <Case
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          currentMenu={currentMenu}
          audio={audio}
          musicItems={musicItems}
          songItems={songItems}
          playing={playing}
          theme={theme}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpaperItems={wallpaperItems}
          noty={noty}
          notifyText={notifyText}
          changeMenuForward={this.changeMenuForward}
          changeMenuBackward={this.changeMenuBackward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
        />
      </div>
    );
  }
}

export default App;
