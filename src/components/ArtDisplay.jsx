import React from "react";
import "../App.css";

const ArtDisplay = ({ artwork, onAttributeClick, onDiscoverClick }) => {
  return (
    <div>
        <h1>Gallery Shuffle</h1>
        <h3>Discover new artwork! 🖼️ 🎭 🎨</h3>
      {artwork ? (
        <div className="display">
          <h2>{artwork.title}</h2>

          <img
            src={artwork.image ? artwork.image : null}
            alt={artwork.title}
          ></img>
          <div>
            {artwork.artist ? (
              <button id="artist" onClick={onAttributeClick}>
                {artwork.artist}
              </button>
            ) : null}
            {artwork.date ? (
              <button id="date" onClick={onAttributeClick}>
                {artwork.date}
              </button>
            ) : null}
            {artwork.medium ? (
              <button id="medium" onClick={onAttributeClick}>
                {artwork.medium}
              </button>
            ) : null}
            {artwork.category ? (
              <button id="category" onClick={onAttributeClick}>
                {artwork.category}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <br></br>
      <button onClick={onDiscoverClick}>🔍 Discover</button>
    </div>
  );
};

export default ArtDisplay;
