// import css from './Button.module.css';
import PropTypes from 'prop-types';
import css from './Button.module.css';

// export default Button;
const Button = ({ onClick, disabled }) => {
  return (
    <button className={css.Button} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export default Button;
