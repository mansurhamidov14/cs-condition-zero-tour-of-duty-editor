import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  H2,
} from "@blueprintjs/core";
import { Col, Row, TemplateEditModal } from "../components";
import { useBotProfile } from '../contexts/BotProfile';
import { capitalizeFirstLetter } from '../utils';
import { confirmationService } from '../services';
import type { IPlayer } from '../models/types';

export const Players = () => {
  const { allPlayers: players, createPlayer, deletePlayer } = useBotProfile();
  const [editedPlayer, setEditedPlayer] = React.useState<IPlayer | null>(null as any);

  const handleSubmit = React.useCallback((player: IPlayer) => {
    editedPlayer?.applyChanges(player);
    setEditedPlayer(null);
  }, [editedPlayer]);

  const handleDeleteClick = React.useCallback((player: IPlayer) => {
    confirmationService.requestConfirmation({
      title: 'Are you sure?',
      body: `Player '${player.name}' will be removed`,
      confirmButton: { label: 'Yes, delete' },
      onConfirm: () => deletePlayer(player.id)
    })
  }, [deletePlayer]);

  const handlePlayerCreate = React.useCallback(() => {
    const newPlayer = createPlayer();
    setEditedPlayer(newPlayer);
  }, [createPlayer]);

  const handleClose = React.useCallback(() => {
    if (editedPlayer?.isNew) {
      deletePlayer(editedPlayer.id);
    }
    setEditedPlayer(null);
  }, [deletePlayer, editedPlayer]);

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
                <Button intent="danger" icon="trash" onClick={() => handleDeleteClick(player)}>Delete</Button>
              </ButtonGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col size={12} className="py-1">
          <Button intent="success" onClick={handlePlayerCreate} icon="plus">Add player</Button>
        </Col>
      </Row>
      <TemplateEditModal
        mode="player"
        title="Edit player"
        data={editedPlayer}
        isOpen={Boolean(editedPlayer)}
        onClose={handleClose}
        onSubmit={handleSubmit as any}
      />
    </div>
  );
};
