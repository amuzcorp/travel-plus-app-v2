import PropTypes from 'prop-types';

const GnbHomeFocused = ({ color = '#2E3239', width = 39, height = 39, ...rest }) => (
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
      d="M37.1609 18.5042L19.5805 3.48901L2 18.5042L3.2989 20.025L5.08057 18.5033V35.1956H16.3306V24.6956H22.8306V35.1956H34.0806V18.5035L35.862 20.025L37.1609 18.5042ZM32.0806 16.7953L19.5805 6.11919L7.08057 16.7951V33.1956H14.3306V22.6956H24.8306V33.1956H32.0806V16.7953Z"
    />
    <path d="M5.5 17L19.5 5L32.5 16V34H24V24H15.5V34H5.5V17Z" />
  </svg>
);

GnbHomeFocused.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GnbHomeFocused;
