import { Button, Classes, ControlGroup, Dialog, H5, HTMLSelect, Icon, InputGroup, Label, NumericInput, Switch, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { Col, Row } from "..";
import { useBotProfile } from "../../contexts/BotProfile";
import { IMap, MissionTask } from "../../models/types";
import { mapPrimitiveFields, TASK_FIELDS } from "../../pages/CareerMode/consts";
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
    return gameMap?.difficultyMode.Characters.filter(({ isParticipating }) => !isParticipating).map(({ player }) => player);
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

  const setTask = React.useCallback((taskIndex: number, field: keyof MissionTask, value: any) => {
    setEditedMap((state) => ({
      ...state as any,
      config: {
        ...state?.config,
        tasks: (state?.config.tasks || []).map((task, index) => {
          return taskIndex === index ? {
            ...task,
            [field]: value
          } : task;
        })
      }
    }));
  }, [editedMap]);

  const removeTask = React.useCallback((taskIndex: number) => {
    setEditedMap((state) => ({
      ...state as any,
      config: {
        ...state?.config,
        tasks: (state?.config.tasks || []).filter((_, index) => index !== taskIndex)
      }
    }));
  }, [editedMap]);

  const addTask = React.useCallback(() => {
    setEditedMap((state) => ({
      ...state as any,
      config: {
        ...state?.config,
        tasks: [...(state?.config.tasks || []), { action: 'kill', amount: 1 }]
      }
    }));
  }, [editedMap])

  const onSave = React.useCallback(() => {
    gameMap?.save(editedMap as any);
    onClose();
  }, [gameMap, editedMap])

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
            <Col size={12} className="py-1">
              <H5>Enemies</H5>
              <Row>
                {editedMap?.config.bots.map((mapBot, mapBotIndex) => {
                  return (
                    <Col key={mapBotIndex} size={4} className="py-1">
                      <ControlGroup fill>
                        <HTMLSelect fill value={mapBot} onChange={(e) => setBot(mapBotIndex, e.target.value)}>
                          {enemies?.map((player) => (
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
                    Add an enemy 
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col size={12} className="py-1">
              <H5>Missions</H5>
                {editedMap?.config.tasks.map((task, taskIndex) => (
                  <Row key={taskIndex} className="py-1">
                    {TASK_FIELDS.map((field, fieldIndex) => {
                      let disabled = false;
                      if (field.disabledIf?.length) {
                        field.disabledIf.forEach((disabledField) => {
                          if (disabledField.is.includes((task as any)?.[disabledField.field])) {
                            disabled = true;
                          }
                        })
                      } else if (field.enabledIf?.length) {
                        disabled = true;
                        field.enabledIf.forEach((enabledField) => {
                          if (enabledField.is.includes((task as any)?.[enabledField.field])) {
                            disabled = false;
                          }
                        })
                      }
                      return (
                        <Col key={fieldIndex} size={field.col}>
                          {field.type === 'number' && (
                            <NumericInput onValueChange={(value) => setTask(taskIndex, field.id, value)} disabled={disabled} {...field.props} fill value={(task as any)?.[field.id] || 0} />
                          )}
                          {field.type === 'select' && (
                            <HTMLSelect onChange={(e) => setTask(taskIndex, field.id, e.target.value)} disabled={disabled} value={(task as any)?.[field.id] || ""} fill>
                              {field.options.map((option) => {
                                let optionIsDisabled = false;
                                if (option.disabledIf) {
                                  option.disabledIf.forEach(disabledOption => {
                                    if (disabledOption.is.includes((task as any)?.[disabledOption.field])) {
                                      optionIsDisabled = true;
                                    }
                                  });
                                }
                                return <option key={option.value} disabled={optionIsDisabled} value={option.value}>{option.label}</option>
                              })}
                            </HTMLSelect>
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                ))}
                <Button icon="plus" intent="success" small onClick={addTask}>Add task</Button>
            </Col>
          </Row>
        )}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button intent="primary" onClick={onSave}>Apply changes</Button>
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