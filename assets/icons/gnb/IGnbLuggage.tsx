import PropTypes from 'prop-types';

const GnbLuggage = ({ color = '#E6E6E6', width = 39, height = 39, opacity = 0.8, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 39"
    fill="none"
    stroke={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g opacity={opacity}>
      <path
        d="M34.1828 9.63428H4.81721C3.53745 9.63428 2.5 10.6717 2.5 11.9515V28.9515C2.5 30.2313 3.53745 31.2687 4.81721 31.2687H34.1828C35.4626 31.2687 36.5 30.2313 36.5 28.9515V11.9515C36.5 10.6717 35.4626 9.63428 34.1828 9.63428Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2344 31.2687V9.63428"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 34L7 32" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M32 34L32 32" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      <path
        d="M28.7695 9.63428V31.2687"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6367 9.63442V6.54837C15.6367 5.6941 16.3308 5 17.1851 5H21.8195C22.6738 5 23.3679 5.6941 23.3679 6.54837V9.63442"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

GnbLuggage.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
};

export default GnbLuggage;
