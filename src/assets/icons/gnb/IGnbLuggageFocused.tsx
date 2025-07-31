import PropTypes from 'prop-types';

const GnbLuggageFocused = ({ color = '#2E3239', width = 39, height = 39, ...rest }) => (
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
      d="M16.6367 6.54837C16.6367 6.24638 16.8831 6 17.1851 6H21.8195C22.1215 6 22.3679 6.24638 22.3679 6.54837V8.63428H16.6367V6.54837ZM14.6367 8.63428V6.54837C14.6367 5.14181 15.7785 4 17.1851 4H21.8195C23.2261 4 24.3679 5.14181 24.3679 6.54837V8.63428H28V32.2687H11V8.63428H14.6367ZM30 32.2687H31V35H33V32.2687H34.1828C36.0148 32.2687 37.5 30.7835 37.5 28.9515V11.9515C37.5 10.1194 36.0148 8.63428 34.1828 8.63428H30V32.2687ZM9 8.63428V32.2687H8V35H6V32.2687H4.81721C2.98517 32.2687 1.5 30.7835 1.5 28.9515V11.9515C1.5 10.1194 2.98517 8.63428 4.81721 8.63428H9Z"
    />
  </svg>
);

GnbLuggageFocused.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbLuggageFocused;
