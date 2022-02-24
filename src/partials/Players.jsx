import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  H2,
} from "@blueprintjs/core";
import { Col, Row, TemplateEditModal } from "../components";
import { useBotProfile } from '../contexts/BotProfile/hooks';
import { capitalizeFirstLetter } from '../utils';

export const Players = () => {
  const { allPlayers: players, createPlayer } = useBotProfile();
  const [editedPlayer, setEditedPlayer] = React.useState();

  const handleSubmit = React.useCallback((player) => {
    editedPlayer.applyChanges(player);
    setEditedPlayer(null);
  }, [editedPlayer]);

  return (
    <div>
      <Row>
        {players.map(player => (
          <Col key={player.id} size={4} className="py-1">
            <Card key={player.id}>
              <H2>{player.name}</H2>
              <div className="py-1">
                <p>
                  Templates: {player.templates.join(", ")}
                </p>
                <p>
                  Difficulty: {player.config.Difficulty?.map(capitalizeFirstLetter).join(', ') || 'Inherits from template'}
                </p>
              </div>
              <ButtonGroup>
                <Button intent="success" icon="edit" onClick={() => setEditedPlayer(player)}>Edit</Button>
                <Button intent="danger" icon="trash">Delete</Button>
              </ButtonGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col size={12} className="py-1">
          <Button intent="success" onClick={createPlayer} icon="plus">Add player</Button>
        </Col>
      </Row>
      <TemplateEditModal
        title="Edit player"
        data={editedPlayer}
        isOpen={Boolean(editedPlayer)}
        onClose={() => setEditedPlayer(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
