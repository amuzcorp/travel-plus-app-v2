import PropTypes from 'prop-types';

const IGnbExit = ({ color = '#E6E6E6', width = 39, height = 39, opacity = 0.8 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 39 39"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.75 10V11.75H26.75V9.5C26.75 7.43 25.07 5.75 23 5.75H11C8.93 5.75 7.25 7.43 7.25 9.5V29.5C7.25 31.57 8.93 33.25 11 33.25H23C25.07 33.25 26.75 31.57 26.75 29.5V27.25H24.75V29C24.75 30.24 23.74 31.25 22.5 31.25H11.5C10.26 31.25 9.25 30.24 9.25 29V10C9.25 8.76 10.26 7.75 11.5 7.75H22.5C23.74 7.75 24.75 8.76 24.75 10ZM28.38 14.0902L29.57 12.9102L35.74 19.5002L29.57 26.0902L28.38 24.9102L32.4 20.5002H17.75V18.5002H32.4L28.38 14.0902Z"
        />
      </g>
    </svg>
  );
};

IGnbExit.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
};

export default IGnbExit;
