import { Card, Classes, H4, H5, Icon, Label, NumericInput, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Col, Row } from "../../components";
import { useDifficultyMode } from "../../contexts/GameModeProvider";
import { EDifficulty } from "../../models/types";
import { difficultyModePrimitiveFields } from "./consts";

interface IProps {
  difficulty: EDifficulty;
}

export const DifficultyMode: React.FC<IProps> = ({ difficulty }) => {
  const mode = useDifficultyMode(difficulty);

  return (
    <Row className="py-1">
      <Col size={12}>
        <H4>Primary config</H4>
        <Row className="py-1">
          {difficultyModePrimitiveFields.map((field) => (
            <Col key={field.accessor} size={4}>
              <Label>
                <Row className="difficulty-mode-label">
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
                  onValueChange={(_, value) => mode.set(field.accessor, Number(value))}
                  name={field.accessor}
                />
              </Label>
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
                <p><strong>Enemies:</strong>&nbsp;&nbsp;{gameMap.config.bots.map((bot) => bot).join(", ")}</p>
                <p>
                  <strong>Tasks:</strong>&nbsp;&nbsp;
                  {gameMap.config.tasks.map((task, index) => (
                    <React.Fragment key={index}>
                      <br />
                      {gameMap.parseTaskName(task)}
                    </React.Fragment>
                  ))}
                </p>
              </Card>
            </Col>
          ))}
        </Row>  
      </Col>
    </Row>
  );
};
