import React from "react";

import Card from "./Card";

function Grid(props){
  const {
    list,
    visibleItems,
    setVisibleItems,
    finishedItems,
    checkItems
  } = props;

  return (
    <div className="container">
      <div className="row col-md-auto">
        {list.map((item, index) => {
          return(<Card
            key={item.id}
            className={`card ${
              visibleItems.includes(index) ? "grid-card-show" : ""
            } ${
              finishedItems.includes(index)
                ? "grid-card-show grid-card-finished"
                : ""
            }`}
            onClick={() => {
              if (!finishedItems.includes(index) && (visibleItems.length < 2)) {
                if (visibleItems.length === 0) {
                  setVisibleItems([index]);
                } else {
                  if (visibleItems[0] !== index) {
                  setVisibleItems(visibleItems.concat(index));
                  checkItems(visibleItems[0], index);
                  }
                }
              }
            }}
            imgSource={item.url}
            imgDesc={item.description}
          />
        )}
        )}
      </div>
    </div>
  );
}

export default Grid;
