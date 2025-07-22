import PropTypes from 'prop-types';

const GnbSettingsFocused = ({ color = '#2E3239', width = 39, height = 39, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 39"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.63 3H24.95L25.66 7.51C26.2 7.78 26.72 8.08 27.22 8.41L31.45 6.77L33.54 10.4L36.59 15.7L33.1 18.53C33.12 18.85 33.13 19.16 33.14 19.48C33.14 19.8 33.13 20.12 33.1 20.44L36.59 23.27L34.51 26.9L34.25 27.35L33.54 28.58L31.45 32.21L27.22 30.57C26.72 30.9 26.21 31.2 25.67 31.47L24.95 35.99H14.64L13.92 31.47C13.39 31.21 12.87 30.91 12.38 30.58L8.14 32.21L6.05 28.58L3 23.28L6.48 20.44C6.46 20.13 6.45 19.81 6.45 19.5C6.45 19.18 6.46 18.87 6.48 18.56L3 15.72L5.08 12.09L8.13 6.78L12.37 8.41C12.87 8.08 13.38 7.78 13.92 7.51L14.63 3ZM19.79 26C23.38 26 26.29 23.09 26.29 19.5C26.29 15.91 23.38 13 19.79 13C16.2 13 13.29 15.91 13.29 19.5C13.29 23.09 16.2 26 19.79 26Z"
    />
  </svg>
);

GnbSettingsFocused.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbSettingsFocused;
