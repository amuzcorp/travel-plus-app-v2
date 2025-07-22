import PropTypes from 'prop-types';

const GnbLuggageSelected = ({ color = '#E6E6E6', width = 37, height = 31, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 37 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.6367 2.54837C15.6367 2.24638 15.8831 2 16.1851 2H20.8195C21.1215 2 21.3679 2.24638 21.3679 2.54837V4.63428H15.6367V2.54837ZM13.6367 4.63428V2.54837C13.6367 1.14181 14.7785 0 16.1851 0H20.8195C22.2261 0 23.3679 1.14181 23.3679 2.54837V4.63428H27V28.2687H10V4.63428H13.6367ZM29 28.2687H30V31H32V28.2687H33.1828C35.0148 28.2687 36.5 26.7835 36.5 24.9515V7.95149C36.5 6.11944 35.0148 4.63428 33.1828 4.63428H29V28.2687ZM8 4.63428V28.2687H7V31H5V28.2687H3.81721C1.98517 28.2687 0.5 26.7835 0.5 24.9515V7.95149C0.5 6.11944 1.98517 4.63428 3.81721 4.63428H8Z"
      fill={color}
    />
  </svg>
);

GnbLuggageSelected.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbLuggageSelected;
