import styles from './container.module.css';

const Container = ({ children, className }) => (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);

export default Container;