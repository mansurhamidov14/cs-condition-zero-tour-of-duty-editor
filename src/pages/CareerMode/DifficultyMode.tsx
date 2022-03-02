import { Button, ButtonGroup, Card, Checkbox, Classes, H4, H5, Icon, Label, NumericInput, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Col, MapEditModal, Row } from "../../components";
import { useDifficultyMode } from "../../contexts/GameModeProvider";
import { EDifficulty, IMap } from "../../models/types";
import { difficultyModePrimitiveFields } from "./consts";

interface IProps {
  difficulty: EDifficulty;
}

export const DifficultyMode: React.FC<IProps> = ({ difficulty }) => {
  const mode = useDifficultyMode(difficulty);
  const [editedMap, setEditedMap] = React.useState<IMap | null>(null);

  return mode.mounted ? (
    <Row className="py-1">
      <Col size={12}>
        <H4>Primary config</H4>
        <Row className="py-1">
          {difficultyModePrimitiveFields.map((field) => (
            <Col key={field.accessor} size={4}>
              <Label>
                <Row className="label-with-help">
                  <Col>{field.label}</Col>
                  {field.helperText && (
                    <Col>
                      <Tooltip content={field.helperText}>
                        <Icon icon="help" />
                      </Tooltip>
                    </Col>
                  )}
                </Row>
                <NumericInput
                  large
                  fill
                  min={1}
                  value={String(mode[field.accessor])}
                  onValueChange={(value) => mode.set(field.accessor, value)}
                  name={field.accessor}
                />
              </Label>
            </Col>
          ))}
        </Row>
      </Col>
      <Col size={12} className="py-2">
        <H5>Teammates</H5>
        <Row>
          {mode.Characters.map((character) => (
            <Col>
              <Checkbox key={character.player.id} checked={character.isParticipating} onChange={() => character.toggleParticipation()}>
                {character.player.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Col>
      <Col size={12} className="py-2">
        <Tooltip className={Classes.TOOLTIP_INDICATOR} content="Minimum Reputation Points (RP) to unlock teammates from appropriate 'Cost' category">
          <H4>Cost availablity</H4>
        </Tooltip>
        <Row className="py-1">
          {Object.keys(mode.CostAvailability).map((cost) => (
            <Col key={cost} size={4}>
              <Label>
                Cost {cost}
                <NumericInput
                  large
                  fill
                  min={1}
                  value={mode.CostAvailability[Number(cost)]}
                  onValueChange={(_, value) => mode.setCostAvailabilty(cost, value)}
                />
              </Label>
            </Col>
          ))}
        </Row>
      </Col>
      <Col size={12}>
        <H4>Maps</H4>
        <Row>
          {mode.Maps.map((gameMap) => (
            <Col key={gameMap.id} size={4} className="py-1">
              <Card className="full-height">
                <H5>{gameMap.name}</H5>
                <p><strong>Enemies:</strong>&nbsp;&nbsp;{gameMap.config.bots.join(", ")}</p>
                <p>
                  <strong>Tasks:</strong>&nbsp;&nbsp;
                  {gameMap.config.tasks.map((task, index) => (
                    <React.Fragment key={index}>
                      <br />
                      {gameMap.parseTaskName(task)}
                    </React.Fragment>
                  ))}
                </p>
                <ButtonGroup>
                  <Button intent="success" icon="edit" onClick={() => setEditedMap(gameMap)}>Edit</Button>
                </ButtonGroup>
              </Card>
            </Col>
          ))}
        </Row>  
      </Col>
      <MapEditModal isOpen={Boolean(editedMap)} onClose={() => setEditedMap(null)} gameMap={editedMap} />
      <Col>
        <Button intent="success" icon="floppy-disk" onClick={() => mode.export()}>Save</Button>
      </Col>
    </Row>
  ) : <div />;
};
