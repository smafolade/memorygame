import React from "react";

function Card(props){
  const { imgSource, imgDesc, className, onClick } = props;
  return (
    <div className={`grid-card ${className}`} onClick={onClick}>
      <img
        className={`img-thumbnail img-fluid grid-img`}
        src={imgSource}
        alt={imgDesc}
      />
    </div>
  );
}

export default Card;
