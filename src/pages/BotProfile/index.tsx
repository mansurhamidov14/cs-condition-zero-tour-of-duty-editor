import { Button, Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { Col, Row } from '../../components';
import { useBotProfile } from '../../contexts/BotProfile';
import { DefaultConfig } from './DefaultConfig';
import { Players } from './Players';
import { Templates } from './Templates';

export const BotProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');
  const botProfile = useBotProfile();

  const actions = React.useMemo(() => {
    return (
      <Row>
        <Col>
          <Button intent="success" icon="floppy-disk" onClick={() => botProfile.export()}>
            Save
          </Button>
        </Col>
      </Row>
    );
  }, [botProfile])

  return (
    <>
      <Tabs id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} vertical animate>
        <Tab id="baseConfig" title="Base configuration" panel={<><DefaultConfig />{actions}</>} />
        <Tab id="templates" title="Templates" panel={<><Templates />{actions}</>} />
        <Tab id="players" title="Players" panel={<><Players />{actions}</>} />
      </Tabs>
    </>
  )
}