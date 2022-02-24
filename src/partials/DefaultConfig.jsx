import React from 'react';
import { Button, ControlGroup, H5, HTMLSelect, InputGroup, Label, NumericInput, Slider } from "@blueprintjs/core";
import { FIELDS, WEAPONS } from "../consts";
import { Col, Row } from "../components";
import { useBotProfile } from '../contexts/BotProfile/hooks';

export const DefaultConfig = () => {
	const { defaultConfig } = useBotProfile();
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
                  <HTMLSelect value={defaultConfig[field.accessor]} onChange={e => defaultConfig.set(field.accessor, e.target.value)} large>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </HTMLSelect>
                ) : field.type === 'slider' ? (
                  <Slider {...field.props} value={Number(defaultConfig[field.accessor]) || 0} onChange={(value) => defaultConfig.set(field.accessor, String(value))} />
                ) : field.type === 'number' ? (
                  <NumericInput value={defaultConfig[field.accessor]} onValueChange={(_, value) => defaultConfig.set(field.accessor, value)} name={field.accessor} large fill {...field.props} />
                ) : (
                  <InputGroup value={defaultConfig[field.accessor]} type={field.type} name={field.accessor} large />
                )}
              </Label>
            </Col>
          ))}
        </Row>
      </Col>
      <Col size={12} className="py-2">
        <H5>Weapon preference</H5>
        <Row>
          {defaultConfig.WeaponPreference?.map((value, index) => {
            return (
              <Col key={index} size={4}>
                <ControlGroup fill>
                  <Button><strong>{index + 1}</strong></Button>
                  <HTMLSelect value={value} onChange={e => defaultConfig.editWeaponPreference(index, e.target.value)} large fill>
                    {WEAPONS.map((weapon) => (
                      <option key={weapon.value} value={weapon.value}>{weapon.label}</option>
                    ))}
                  </HTMLSelect>
                  <Button intent="danger" icon="minus" onClick={() => defaultConfig.removeWeaponPreference(index)}/>
                </ControlGroup>
              </Col>
            )
          })}
          <Col size={12} className="py-1">
            <Button intent="success" icon="plus" onClick={() => defaultConfig.addWeaponPreference(WEAPONS[0].value)} small>Add weapon preference</Button>
          </Col>
        </Row>
      </Col>
		</Row>
	);
};