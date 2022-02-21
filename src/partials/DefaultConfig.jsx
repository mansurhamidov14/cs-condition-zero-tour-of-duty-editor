import React from 'react';
import { Button, ControlGroup, H5, HTMLSelect, InputGroup, Label, NumericInput, Slider } from "@blueprintjs/core";
import { FIELDS, WEAPONS } from "../consts";
import { Col, Row } from "../components";

const weaponPreference = ['none'];

export const DefaultConfig = () => {
	const [skill, setSkill] = React.useState(40);
	return (
		<Row className="py-1">
      <Col size={12}>
        <H5>Configs</H5>
        <Row>
          {FIELDS.map((field) => (
            <Col size={4} key={field.accessor}>
              <Label>
                {field.label}
                {field.type === 'select' ? (
                  <HTMLSelect large>
                    {field.options.map((opt) => (
                      <option value={opt.value}>{opt.label}</option>
                    ))}
                  </HTMLSelect>
                ) : field.type === 'slider' ? (
                  <Slider {...field.props} value={skill} onChange={setSkill} />
                ) : field.type === 'number' ? (
                  <NumericInput name={field.accessor} large fill {...field.props} />
                ) : (
                  <InputGroup type={field.type} name={field.accessor} large />
                )}
              </Label>
            </Col>
          ))}
        </Row>
      </Col>
      <Col size={12} className="py-2">
        <H5>Weapon preference</H5>
        <Row>
          {weaponPreference.map((value, index) => {
            return (
              <Col size={4}>
                <ControlGroup fill>
                  <HTMLSelect value={value} large fill>
                    <option value="none">None</option>
                    {WEAPONS.map((weapon) => (
                      <option key={weapon.value} value={weapon.value}>{weapon.label}</option>
                    ))}
                  </HTMLSelect>
                  {Boolean(index) && <Button intent="danger" icon="minus" />}
                </ControlGroup>
              </Col>
            )
          })}
          <Col size={12} className="py-1">
            <Button intent="success" icon="plus" small>Add weapon preference</Button>
          </Col>
        </Row>
      </Col>
		</Row>
	);
};