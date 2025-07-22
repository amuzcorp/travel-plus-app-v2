import PropTypes from 'prop-types';

const GnbSettingsSelected = ({ color = '#E6E6E6', width = 34, height = 33, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 34 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_9202_9203)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.63 0H21.95L22.66 4.51C23.2 4.78 23.72 5.08 24.22 5.41L28.45 3.77L30.54 7.4L33.59 12.7L30.1 15.53C30.12 15.85 30.13 16.16 30.14 16.48C30.14 16.8 30.13 17.12 30.1 17.44L33.59 20.27L31.51 23.9L31.25 24.35L30.54 25.58L28.45 29.21L24.22 27.57C23.72 27.9 23.21 28.2 22.67 28.47L21.95 32.99H11.64L10.92 28.47C10.39 28.21 9.87 27.91 9.38 27.58L5.14 29.21L3.05 25.58L0 20.28L3.48 17.44C3.46 17.13 3.45 16.81 3.45 16.5C3.45 16.18 3.46 15.87 3.48 15.56L0 12.72L2.08 9.09L5.13 3.78L9.37 5.41C9.87 5.08 10.38 4.78 10.92 4.51L11.63 0ZM16.79 23C20.38 23 23.29 20.09 23.29 16.5C23.29 12.91 20.38 10 16.79 10C13.2 10 10.29 12.91 10.29 16.5C10.29 20.09 13.2 23 16.79 23Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_9202_9203">
        <rect width="33.58" height="33" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

GnbSettingsSelected.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbSettingsSelected;
