import React from "react";
import "../css/Navbar.css";
import BatteryImg from "../static/battery.png";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      time: this.getCurrentTime(),
    };
    this.stateId = "";
  }

  componentDidMount() {
    const { noty } = this.props;
    if (noty === true) return;
    this.stateId = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 60000);
  }

  componentDidUpdate() {
    const { setNoty, noty } = this.props;
    if (noty === false) {
      setTimeout(() => {
        setNoty();
      }, 1000);
    }
  }

  componentWillUnmount() {
    const { noty } = this.props;
    if (noty !== true) clearInterval(this.stateId);
  }

  getCurrentTime() {
    const today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    if (today.getMinutes() < 10) {
      time = today.getHours() + ":0" + today.getMinutes();
    }
    return time;
  }

  render() {
    const { time } = this.state;
    const { playing, noty, notifyText } = this.props;
    return (
      <div className="bar">
        {
          <h5 className="heading">
            iPod <i className="fas fa-wifi"></i>
          </h5>
        }
        {noty === true && <h5 className="notification">{notifyText}</h5>}
        {noty === false && <h3 className="time">{time}</h3>}
        {
          <div className="right-container-nav">
            {playing ? (
              <h5 className="play-pause-nav">
                <i className="fas fa-play"></i>
              </h5>
            ) : (
              <h5 className="play-pause-nav">
                <i className="fas fa-pause"></i>{" "}
              </h5>
            )}
            <img className="battery" src={BatteryImg} alt="Battery" />
          </div>
        }
      </div>
    );
  }
}

export default Navbar;
