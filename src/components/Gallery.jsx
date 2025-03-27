import React from "react";
import "../App.css";

const Gallery = ({ seen }) => {
  return (
    <div className="gallery">
      <h3>Gallery</h3>
      <div className="container-items">
        {seen && seen.length > 0 ?
          (seen.map((obj) => (
            <div>
              <img src={obj.image_small ? obj.image_small : obj.image}></img>
              <p>{obj.title}</p>
            </div>
          ))) : (
            <div>
              <h5>You haven't discovered any art yet!</h5>
            </div>
          )
          }
      </div>
    </div>
  );
};

export default Gallery;
