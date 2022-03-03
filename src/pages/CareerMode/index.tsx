import { Icon, Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { Col, Row } from '../../components';
import { useCareerMode } from '../../contexts/GameModeProvider';
import { EDifficulty } from '../../models/types';
import { capitalizeFirstLetter } from '../../utils';
import { DifficultyMode } from './DifficultyMode';

import './styles.css';

export const CareerMode: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<EDifficulty>(EDifficulty.EASY);
  const careerMode = useCareerMode();

  return careerMode.mounted ? (
      <Tabs id="TabsExample" onChange={setSelectedTab as any} renderActiveTabPanelOnly selectedTabId={selectedTab} animate vertical>
        {Object.values(EDifficulty).map(difficulty => {
          const { saved } = careerMode[difficulty];
          return (
            <Tab
              disabled={!careerMode[difficulty].mounted}
              key={difficulty}
              id={difficulty}
              title={
                <Row className="align-items-center justify-content-between">
                  <Col className="pt-text pt-intent-success">
                    <span className={saved ? undefined : "unsaved-text"}>
                      {capitalizeFirstLetter(difficulty) + ' missions'}
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
              }
              panel={<DifficultyMode difficulty={difficulty} />}
            />
          );
        })}
      </Tabs>
    ) : <div/>;
};
