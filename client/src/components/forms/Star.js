import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ numberOfStars, starClick }) => (
  <>
    <StarRating
      numberOfStars={numberOfStars}
      changeRating={() => starClick(numberOfStars)}
      starDimension="20px"
      starSpacing="2px"
      starRatedColor="red"
      starEmptyColor="red"
    />
    <br/>
  </>
);

export default Star;
