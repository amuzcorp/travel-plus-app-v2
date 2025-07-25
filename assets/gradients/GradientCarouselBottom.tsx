export default ({ width = "1920", height = "430" }) => {
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
        fill="url(#paint0_linear_2591_367937)"
        fillOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2591_367937"
          x1="100%"
          y1="0"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0" stopOpacity="0" />
          <stop offset="0.5" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
