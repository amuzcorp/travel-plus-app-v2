import PropTypes from 'prop-types';

const GnbSearch = ({ color = '#E6E6E6', width = 39, height = 39, opacity = 0.8, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 39"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g opacity={opacity}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.0442 36.166L23.4657 25.5875L25.587 23.4662L36.1655 34.0447L34.0442 36.166Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3945 6.39502C10.8715 6.39502 6.39453 10.8724 6.39453 16.395C6.39453 21.9181 10.8715 26.395 16.3945 26.395C21.9171 26.395 26.3945 21.9181 26.3945 16.395C26.3945 10.8724 21.9171 6.39502 16.3945 6.39502ZM3.39453 16.395C3.39453 9.21564 9.21456 3.39502 16.3945 3.39502C23.574 3.39502 29.3945 9.21559 29.3945 16.395C29.3945 23.575 23.5739 29.395 16.3945 29.395C9.2146 29.395 3.39453 23.5749 3.39453 16.395Z"
      />
    </g>
  </svg>
);

GnbSearch.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
};

export default GnbSearch;
