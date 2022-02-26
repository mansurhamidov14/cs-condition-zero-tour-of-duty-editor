import * as React from 'react';
import './styles.css';

type ColProps = {
  className?: string;
  size: number;
}

const Col: React.FC<ColProps> = ({ children, className, size }) => (
  <div className={[`col-${size}`, className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Col;
