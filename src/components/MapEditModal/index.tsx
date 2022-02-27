import { Button, Classes, ControlGroup, Dialog, H5, HTMLSelect, Icon, InputGroup, Label, NumericInput, Switch, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Col, Row } from "..";
import { useBotProfile } from "../../contexts/BotProfile";
import { IMap } from "../../models/types";
import { mapPrimitiveFields } from "../../pages/CareerMode/consts";
import { capitalizeFirstLetter } from "../../utils";

type MapEditModalProps = {
  gameMap: IMap | null;
  isOpen: boolean;
  onClose: () => void;
}

const MapEditModal: React.FC<MapEditModalProps> = ({ gameMap, isOpen, onClose }) => {
  const [editedMap, setEditedMap] = React.useState<IMap | null>(null);
  const { allPlayers } = useBotProfile();

  const enemies = React.useMemo(() => {
    return allPlayers.filter((player) => !gameMap?.difficultyMode.Characters.includes(player.name))
  }, [allPlayers, gameMap])

  React.useEffect(() => {
    if (gameMap) {
      const { difficultyMode, ...rest  } = gameMap
      setEditedMap(JSON.parse(JSON.stringify(rest)));
    }
    
  }, [gameMap]);

  const setMapName = React.useCallback((e: any) => {
    setEditedMap(state => ({ ...state as any, name: e.target.value }));
  }, [editedMap]);

  const setBot = React.useCallback((index: number, botName: string) => {
    setEditedMap((state) => ({
      ...state as any,
      config: {
        ...state?.config,
        bots: [...(state as any).config.bots.slice(0, index), botName, ...(state as any).config.bots.slice(index + 1)]
      }
    }))
  }, [editedMap]);

  const setConfig = React.useCallback((key: any, value: number) => {
    setEditedMap((state) => ({
      ...state as any,
      config: {
        ...state?.config,
        [key]: value
      }
    }))
  }, [editedMap]);

  return (
    <Dialog
      title={gameMap && `${capitalizeFirstLetter(gameMap.difficultyMode.difficulty)} - ${gameMap.name}`}
      isOpen={isOpen}
      onClose={onClose}
      className={Classes.DARK}
    >
      <div className={Classes.DIALOG_BODY}>
        {Boolean(editedMap) && (
          <Row>
            <Col size={6} className="py-1">
              <Label>
                Map (enter the name of your map file)
                <InputGroup value={editedMap?.name} onChange={setMapName} type="text" />
              </Label>
            </Col>
            <Col size={12}>
              <H5>Rules</H5>
              <Row>
                {mapPrimitiveFields.map((field) => (
                  <Col size={4}>
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
                      {field.inputType === 'number' ? (
                        <NumericInput
                          value={editedMap?.config[field.accessor]}
                          onValueChange={(value) => setConfig(field.accessor, value)}
                          min={1}
                          fill
                        />
                      ) : (
                        <div style={{ paddingTop: '10px'}}>
                          <Switch
                            onChange={() => setConfig(field.accessor, Number(!editedMap?.config.FriendlyFire))}
                            labelElement={editedMap?.config.FriendlyFire ? 'Enabled' : 'Disabled'}
                            large
                          />
                        </div>
                      )}
                    </Label>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col size={12} className="py-2">
              <H5>Bots</H5>
              <Row>
                {editedMap?.config.bots.map((mapBot, mapBotIndex) => {
                  return (
                    <Col key={mapBotIndex} size={4} className="py-1">
                      <ControlGroup fill>
                        <HTMLSelect fill value={mapBot} onChange={(e) => setBot(mapBotIndex, e.target.value)}>
                          {enemies.map((player) => (
                            <option key={player.id} value={player.name}>{player.name}</option>
                          ))}
                        </HTMLSelect>
                        {mapBotIndex >= editedMap.config.minEnemies && (
                          <Button onClick={() => {}} icon="minus" intent="danger" />
                        )}
                      </ControlGroup>
                    </Col>
                  )
                })}
                <Col size={12}>
                  <Button intent="success" icon="plus" small onClick={() => {}}>
                    Add bot
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button intent="primary" onClick={() => {}}>Apply changes</Button>
        </div>
      </div>
      <style>
        {`.bp3-dialog {
            width: 768px;
        }`}
      </style>
    </Dialog>
  );
};

export default MapEditModal;