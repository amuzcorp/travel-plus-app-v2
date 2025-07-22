import PropTypes from 'prop-types';

const GnbUserSelected = ({ color = '#E6E6E6', width = 39, height = 46, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 46"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.8391 12.5201C26.8391 17.3501 23.8691 22.6501 19.6891 22.6501C15.5091 22.6501 12.5391 17.5601 12.5391 12.5201C12.5391 7.48008 15.5091 3.58008 19.6891 3.58008C23.8691 3.58008 26.8391 7.69008 26.8391 12.5201ZM25.6699 23.1904C26.8999 23.9104 28.2499 24.5104 29.6199 24.9404H29.5999C33.2299 26.0804 35.1699 28.7704 35.1699 30.4504V34.5704H4.16992V30.4504C4.16992 28.7704 6.10992 26.0804 9.73992 24.9404C11.1099 24.5104 12.4499 23.9204 13.6799 23.1904L15.4599 24.4304C15.4599 24.4304 19.4899 27.2004 23.8899 24.4304L25.6699 23.1904Z"
    />
    <line x1="4" y1="44.5" x2="36" y2="44.5" stroke="#00FFCC" strokeWidth="3" />
  </svg>
);

GnbUserSelected.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbUserSelected;
