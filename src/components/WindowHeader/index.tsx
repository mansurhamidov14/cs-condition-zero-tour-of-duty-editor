import { Button, H6, Icon } from "@blueprintjs/core";
import * as React from "react";

import "./styles.css";

declare global {
  interface Window {
    electron: {
      closeApp: () => void;
      minimize: () => void;
      maximize: () => void;
      getWindowState: () => void;
    }
  }
}

const WindowHeader: React.FC = () => {
  return (
    <div className="window-header">
      <div className="window-header__title">
        <H6>CS: Condition Zero - Tour of Duty Editor tool</H6>
      </div>
      <div className="window-header__actions">
        <div className="window-header__actions__item">
          <Button small icon="minus" onClick={window.electron.minimize} />
        </div>
        <div className="window-header__actions__item">
          <Button small className="window-header__actions__item__maximize" onClick={window.electron.maximize}>
            <Icon size={12} icon="duplicate" />
          </Button>
        </div>
        <div className="window-header__actions__item">
          <Button small intent="danger" icon="cross" onClick={window.electron.closeApp} />
        </div>
      </div>
      
    </div>
  );
};

export default WindowHeader;
