import PropTypes from 'prop-types';

const GnbExitSelected = ({ color = '#E6E6E6', width = 39, height = 46, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 46"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <line x1="3" y1="44.5" x2="35" y2="44.5" stroke="#00FFCC" strokeWidth="3" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.25 12.25V11.75V10C24.25 9.03614 23.4639 8.25 22.5 8.25H11.5C10.5361 8.25 9.75 9.03614 9.75 10V29C9.75 29.9639 10.5361 30.75 11.5 30.75H22.5C23.4639 30.75 24.25 29.9639 24.25 29V27.25V26.75H24.75H26.75H27.25V27.25V29.5C27.25 31.8461 25.3461 33.75 23 33.75H11C8.65386 33.75 6.75 31.8461 6.75 29.5V9.5C6.75 7.15386 8.65386 5.25 11 5.25H23C25.3461 5.25 27.25 7.15386 27.25 9.5V11.75V12.25H26.75H24.75H24.25ZM29.5833 12.1928L29.935 12.5684L36.105 19.1584L36.4249 19.5002L36.105 19.8419L29.935 26.4319L29.5833 26.8075L29.2179 26.4452L28.0279 25.2652L27.6875 24.9276L28.0105 24.5733L31.2677 21.0002H17.75H17.25V20.5002V18.5002V18.0002H17.75H31.2677L28.0105 14.427L27.6875 14.0727L28.0279 13.7351L29.2179 12.5551L29.5833 12.1928Z"
    />
  </svg>
);

GnbExitSelected.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbExitSelected;
