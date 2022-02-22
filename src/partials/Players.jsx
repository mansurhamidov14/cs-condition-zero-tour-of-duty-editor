import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  ControlGroup,
  H4,
  H5,
  HTMLSelect,
  InputGroup,
  Label,
  NumericInput,
  Slider
} from "@blueprintjs/core";
import { Col, Row } from "../components";
import { FIELDS, WEAPONS_WITHOUT_GROUPS } from "../consts";
import { usePlayers, useTemplates } from '../contexts/BotProfile/hooks';

export const Players = () => {
  const [open, setOpen] = React.useState({});
  const players = usePlayers();
  const templates = useTemplates();
  return (
    <Row>
      {players.map((player, playerIndex) => {
        const isWeaponPreferenceInherited = player.config.WeaponPreference == null;
        return (
          <Col key={player.id} size={6} className="py-1">
            <Card>
              <Row className="justify-content-between">
                <Col size={9}>
                  <H4>{player.name}</H4>
                </Col>
                <Col className="px-1">
                  <Button icon="chevron-down" onClick={() => setOpen(state => ({ ...state, [playerIndex]: !state[playerIndex] }))} />
                </Col>
              </Row>
              <Collapse isOpen={open[playerIndex]}>
                <Row>
                  <Col size={6} className="py-1">
                    <Label>
                      Player name
                      <InputGroup value={player.name} onChange={(e) => player.setName(e.target.value)} type="text" />
                    </Label>
                  </Col>
                  <Col size={12}>
                    <H5>Templates</H5>
                    <Row>
                      {player.templates.map((playerTemplate, templateIndex) => {
                        return (
                          <Col key={templateIndex} size={6} className="py-1">
                            <ControlGroup fill>
                              <HTMLSelect fill value={playerTemplate} onChange={(e) => player.editTemplate(templateIndex, e.target.value)}>
                                {templates.map((template) => (
                                  <option key={template.name} value={template.name}>{template.name}</option>
                                ))}
                              </HTMLSelect>
                              {Boolean(templateIndex) && (
                                <Button onClick={() => player.removeTemplate(templateIndex)} icon="minus" intent="danger" />
                              )}
                            </ControlGroup>
                          </Col>
                        )
                      })}
                      <Col size={12} className="py-1">
                        <Button intent="success" icon="plus" small onClick={() => player.addTemplate(templates[0].name)}>
                          Add template
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col size={12} className="py-2">
                    <H5>Configs</H5>
                    <Row>
                      {FIELDS.map((field) => {
                        const isValueInheritedFromTemplate = [null, undefined].includes(player.config[field.accessor]);
                        return (
                          <Col className="py-1" size={6} key={field.accessor}>
                            <Label>
                              {field.label}
                              {field.type === 'select' ? (
                                <HTMLSelect disabled={isValueInheritedFromTemplate} value={player.config[field.accessor]} onChange={(e) => player.setConfig(field.accessor, e.target.value)}>
                                  {field.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </HTMLSelect>
                              ) : field.type === 'slider' ? (
                                <Slider disabled={isValueInheritedFromTemplate} value={Number(player.config[field.accessor]) || 0} small {...field.props} onChange={(value) => player.setConfig(field.accessor, value)} />
                              ) : field.type === 'number' ? (
                                <NumericInput disabled={isValueInheritedFromTemplate} value={player.config[field.accessor]} onValueChange={(_, value) => player.setConfig(field.accessor, value)} name={field.accessor} fill {...field.props} />
                              ) : (
                                <InputGroup onChange={(e) => player.setConfig(field.accessor, e.target.value)} disabled={isValueInheritedFromTemplate} type={field.type} name={field.accessor} />
                              )}
                            </Label>
                            <Checkbox
                              checked={isValueInheritedFromTemplate}
                              onChange={() => player.toggleConfigParamInheritance(field.accessor)}
                            >
                              Inherit from template
                            </Checkbox>
                          </Col>
                        )
                      })}
                    </Row>
                  </Col>
                  <Col size={12}>
                    <H5>Weapon preference</H5>
                    <Checkbox
                      checked={isWeaponPreferenceInherited}
                      onChange={() => {
                        player.toggleConfigParamInheritance('WeaponPreference');
                      }}
                    >Inherit weapon preference from template</Checkbox>
                    <Row class="py-1">
                      {!isWeaponPreferenceInherited && (
                        <>
                          {player.config.WeaponPreference.map((value, prefIndex) => {
                            return (
                              <Col key={`value_${prefIndex}`} size={6} className="py-1">
                                <ControlGroup fill>
                                  <HTMLSelect value={value} fill onChange={(e) => player.editWeaponPreference(prefIndex, e.target.value)}>
                                    <option value="none">None</option>
                                    {WEAPONS_WITHOUT_GROUPS.map((weapon) => (
                                      <option key={weapon.value} value={weapon.value}>{weapon.label}</option>
                                    ))}
                                  </HTMLSelect>
                                  <Button intent="danger" icon="minus" onClick={() => player.removeWeaponPreference(prefIndex)} />
                                </ControlGroup>
                              </Col>
                            )
                          })}
                          <Col size={12} className="py-1">
                            <Button onClick={() => player.addWeaponPreference(WEAPONS_WITHOUT_GROUPS[0].value)} intent="success" icon="plus" small>Add weapon preference</Button>
                          </Col>
                        </>
                      )}  
                    </Row>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
