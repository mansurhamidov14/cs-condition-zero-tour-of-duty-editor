import styles from './row.module.css';

const Row = ({ children, className }) => (
  <div className={[styles.row, className].filter(Boolean).join(' ')}>{children}</div>
);

export default Row;
