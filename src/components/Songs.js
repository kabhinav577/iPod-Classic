import React from "react";

class Songs extends React.Component {
  render() {
    const { songItems, active } = this.props;

    return (
      <div className="music">
        <h2>Songs</h2>
        <ul>
          {songItems.map((ele, i) => {
            return active === i ? (
              <li key={i} className="active">
                &nbsp;{ele}
              </li>
            ) : (
              <li id="song1" key={i}>
                &nbsp;{ele}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Songs;
