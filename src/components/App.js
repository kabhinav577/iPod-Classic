import React from "react";
import "../css/App.css";

// Importing Components
import KnowMore from "./KnowMore";

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
    } else if (e.detail.interval > 250 && e.detail.interval < 1000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  render() {
    return (
      <div>
        <KnowMore />
      </div>
    );
  }
}

export default App;
