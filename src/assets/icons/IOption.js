const IOption = ({ width = "39", height = "39", ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 5C20.8805 5 22 6.1195 22 7.5C22 8.8805 20.8805 10 19.5 10C18.1195 10 17 8.8805 17 7.5C17 6.1195 18.1195 5 19.5 5ZM19.5 17C20.8805 17 22 18.1195 22 19.5C22 20.8805 20.8805 22 19.5 22C18.1195 22 17 20.8805 17 19.5C17 18.1195 18.1195 17 19.5 17ZM22 31.5C22 30.1195 20.8805 29 19.5 29C18.1195 29 17 30.1195 17 31.5C17 32.8805 18.1195 34 19.5 34C20.8805 34 22 32.8805 22 31.5Z"
      fill="#E6E6E6"
    />
  </svg>
);

export default IOption;
