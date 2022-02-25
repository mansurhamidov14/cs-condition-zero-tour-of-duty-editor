import * as React from 'react';
import './styles.css';

type IContainerProps = {
  className?: string;
}

const Container: React.FC<IContainerProps> = ({ children, className }) => (
  <div className={['container', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Container;
