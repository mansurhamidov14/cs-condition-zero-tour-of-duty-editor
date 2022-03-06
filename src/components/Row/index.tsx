import * as React from "react";
import "./styles.css";

type IRowProps = {
  className?: string;
}

const Row: React.FC<IRowProps> = ({ children, className }) => (
  <div className={['row', className].filter(Boolean).join(' ')}>{children}</div>
);

export default Row;
