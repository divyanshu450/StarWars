import React from "react";

const MovieIcon = () => {
  let width = 100;
  let height = 100;
  let strokeColor = 'black'
  return (
    <svg
    version="1.1"
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    width={width}
    height={height}
  >
    <style type="text/css">
      {`.st0 { fill:none; stroke:${strokeColor}; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:10; }`}
    </style>
    <circle className="st0" cx="13" cy="16" r="2" />
    <circle className="st0" cx="8" cy="11" r="2" />
    <circle className="st0" cx="8" cy="21" r="2" />
    <circle className="st0" cx="18" cy="11" r="2" />
    <path
      className="st0"
      d="M22.4,8.5l1.3,1.3c1.5,1.5,3.8,1.5,5.3,0l0,0c1.5-1.5,1.5-3.8,0-5.3"
    />
    <circle className="st0" cx="24" cy="24" r="7" />
    <line className="st0" x1="24" y1="21" x2="24" y2="27" />
    <line className="st0" x1="21" y1="24" x2="27" y2="24" />
    <path
      className="st0"
      d="M17.7,27c-1.4,0.6-3,1-4.7,1C6.4,28,1,22.6,1,16S6.4,4,13,4s12,5.4,12,12c0,0.4,0,0.7,0,1.1"
    />
  </svg>
  );
};

export default MovieIcon;
