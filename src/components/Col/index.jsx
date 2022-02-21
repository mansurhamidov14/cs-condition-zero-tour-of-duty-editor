import styles from './col.module.css';

const Col = ({ children, className, size }) => (
  <div className={[styles[`col-${size}`], className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Col;
