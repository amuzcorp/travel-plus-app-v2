import PropTypes from 'prop-types';

const GnbHome = ({ color = '#E6E6E6', width = 39, height = 39, opacity = 0.8, ...rest }) => (
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
        d="M37.0808 18.5042L19.5004 3.48901L1.91992 18.5042L3.21882 20.025L5.00049 18.5033V35.1956H16.2505V24.6956H22.7505V35.1956H34.0005V18.5035L35.7819 20.025L37.0808 18.5042ZM32.0005 16.7953L19.5004 6.11919L7.00049 16.7951V33.1956H14.2505V22.6956H24.7505V33.1956H32.0005V16.7953Z"
      />
    </g>
  </svg>
);

GnbHome.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
};

export default GnbHome;
