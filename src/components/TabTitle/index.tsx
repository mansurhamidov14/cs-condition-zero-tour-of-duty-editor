import { Icon } from "@blueprintjs/core";
import Col from "../Col";
import Row from "../Row";

import './styles.css';

type TabTitleProps = {
  title: string;
  saved: boolean;
}

const TabTitle: React.FC<TabTitleProps> = ({ title, saved }) => {
  return (
    <Row className="align-items-center justify-content-between px-1">
      <Col className="pt-text pt-intent-success">
        <span className={saved ? undefined : "unsaved-text"}>
          {title}
        </span>
      </Col>
      <Col>
        <Icon
          intent={saved ? "none" : "warning"}
          className="unsaved-icon"
          size={9}
          icon={saved ? null : "full-circle"}
        />
      </Col>
    </Row>
  );
};

export default TabTitle;