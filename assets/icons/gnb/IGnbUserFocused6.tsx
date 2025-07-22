import PropTypes from 'prop-types';

const IGnbUserFocused6 = ({ color = '#2E3239', width = 39, height = 39 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.7095 3.58008C15.5295 3.58008 12.5595 7.48008 12.5595 12.5201C12.5595 17.5601 15.5295 22.6501 19.7095 22.6501C23.8895 22.6501 26.8595 17.3501 26.8595 12.5201C26.8595 7.69008 23.8895 3.58008 19.7095 3.58008ZM29.6195 24.9401H29.6395C28.2695 24.5101 26.9195 23.9101 25.6895 23.1901L23.9095 24.4301C19.5095 27.2001 15.4795 24.4301 15.4795 24.4301L13.6995 23.1901C12.4695 23.9201 11.1295 24.5101 9.75945 24.9401C6.12945 26.0801 4.18945 28.7701 4.18945 30.4501V34.5701H22.6895L25.5695 30.4501L29.6495 33.2901L33.7695 27.4901C32.8295 26.4701 31.4395 25.5101 29.6195 24.9401Z"
      fill={color}
    />
    <path
      d="M38.6898 27L30.5698 38.58L24.7998 34.59L24.8098 34.57L25.9898 32.89L30.0498 35.71L36.2398 27H38.6898Z"
      fill={color}
    />
  </svg>
);

IGnbUserFocused6.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IGnbUserFocused6;
