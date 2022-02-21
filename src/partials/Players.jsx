import React from 'react';
import {
  Button,
  Card,
  Checkbox,
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
import { FIELDS } from "../consts";

const players = new Array(3).fill(1);

const templates = [
  {
    name: 'Template 1',
    config: {},
    WeaponPreferences: []
  },
  {
    name: 'Template 2',
    config: {},
    WeaponPreferences: []
  }
];

export const Players = () => {
	const [skill, setSkill] = React.useState(40);
  return (
    <Row>
      {players.map(player => {
        return (
          <Col key={player} size={6} className="py-1">
            <Card>
              <H4>Some player</H4>
              <Row>
                <Col size={6}>
                  <Label>
                    Player name
                    <InputGroup type="text" />
                  </Label>
                </Col>
                <Col size={12}>
                  <H5>Templates</H5>
                  <Row>
                    {['1', '2'].map(playerTemplate => {
                      return (
                        <Col key={playerTemplate} size={6}>
                          <ControlGroup fill>
                            <HTMLSelect fill>
                              {templates.map((template) => (
                                <option key={template.name} value={template.name}>{template.name}</option>
                              ))}
                            </HTMLSelect>
                            <Button icon="minus" intent="danger" />
                          </ControlGroup>
                        </Col>
                      )
                    })}
                    <Col size={4} className="py-1">
                      <Button intent="success" icon="plus" small>Add template</Button>
                    </Col>
                  </Row>
                </Col>
                <Col size={12} className="py-2">
                  <H5>Configs</H5>
                  <Row>
                    {FIELDS.map((field) => (
                      <Col className="py-1" size={6} key={field.accessor}>
                        <Label>
                          {field.label}
                          {field.type === 'select' ? (
                            <HTMLSelect>
                              {field.options.map((opt) => (
                                <option value={opt.value}>{opt.label}</option>
                              ))}
                            </HTMLSelect>
                          ) : field.type === 'slider' ? (
                            <Slider small {...field.props} value={skill} onChange={setSkill} />
                          ) : field.type === 'number' ? (
                            <NumericInput name={field.accessor} fill {...field.props} />
                          ) : (
                            <InputGroup type={field.type} name={field.accessor} />
                          )}
                        </Label>
                        <Checkbox>Inherit from template</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
