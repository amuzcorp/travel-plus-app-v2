export default ({ width = "1280", height = "1080" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="100%"
        height="100%"
        fill="url(#paint0_linear_2591_367936)"
        fillOpacity="1"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2591_367936"
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0" stopOpacity="1" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
