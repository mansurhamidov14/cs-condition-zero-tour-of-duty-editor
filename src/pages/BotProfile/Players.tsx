import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  H2,
  InputGroup,
} from "@blueprintjs/core";
import { Col, Row, TemplateEditModal } from "../../components";
import { useBotProfile } from '../../contexts/BotProfile';
import { capitalizeFirstLetter } from '../../utils';
import { confirmationService } from '../../services';
import type { IPlayer } from '../../models/types';
import { useSearch } from '../../hooks';

export const Players = () => {
  const { allPlayers: players, createPlayer, deletePlayer } = useBotProfile();
  const [editedPlayer, setEditedPlayer] = React.useState<IPlayer | null>(null as any);
  const [filteredPlayers, searchText, setSearchText] = useSearch(players, ['name']);

  const handleSubmit = React.useCallback((player: IPlayer) => {
    editedPlayer?.save(player);
    setEditedPlayer(null);
  }, [editedPlayer]);

  const handleDeleteClick = React.useCallback((player: IPlayer) => {
    confirmationService.requestConfirmation({
      title: 'Are you sure?',
      body: `Player '${player.name}' will be deleted everywhere.`,
      confirmButton: { label: 'Yes, delete' },
      onConfirm: () => deletePlayer(player)
    });
  }, [deletePlayer]);

  const handlePlayerCreate = React.useCallback(() => {
    const newPlayer = createPlayer();
    setEditedPlayer(newPlayer);
  }, [createPlayer]);

  const handleClose = React.useCallback(() => {
    if (editedPlayer?.isNew) {
      deletePlayer(editedPlayer);
    }
    setEditedPlayer(null);
  }, [deletePlayer, editedPlayer]);

  return (
    <div>
      <Row className="justify-content-end">
        <Col>
          <InputGroup
            leftIcon="search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search player..."
            value={searchText}
          />
        </Col>
      </Row>
      <Row>
        {filteredPlayers.map(player => (
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
