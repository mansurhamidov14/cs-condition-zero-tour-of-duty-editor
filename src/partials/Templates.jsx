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
import { useTemplates } from '../contexts/BotProfile/hooks';

export const Templates = () => {
  const [open, setOpen] = React.useState({});
  const templates = useTemplates();
  return (
    <Row>
      {templates.map((template, templateIndex) => {
        const isWeaponPreferenceUnset = template.config.WeaponPreference == null;
        return (
          <Col key={template.id} size={6} className="py-1">
            <Card>
              <Row className="justify-content-between">
                <Col size={9}>
                  <H4>{template.name}</H4>
                </Col>
                <Col className="px-1">
                  <Button icon="chevron-down" onClick={() => setOpen(state => ({ ...state, [template.id]: !state[template.id] }))} />
                </Col>
              </Row>
              <Collapse isOpen={open[template.id]}>
                <Row>
                  <Col size={6} className="py-1">
                    <Label>
                      Template name
                      <InputGroup value={template.name} onChange={(e) => template.setName(e.target.value)} type="text" />
                    </Label>
                  </Col>
                  <Col size={12}>
                    <H5>Configs</H5>
                    <Row>
                      {FIELDS.map((field) => {
                        const isValueUnset = template.config[field.accessor] == null;
                        return (
                          <Col className="py-1" size={6} key={field.accessor}>
                            <Label>
                              {field.label}
                              {field.type === 'select' ? (
                                <HTMLSelect disabled={isValueUnset} value={template.config[field.accessor]} onChange={(e) => template.setConfig(field.accessor, e.target.value)}>
                                  {field.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </HTMLSelect>
                              ) : field.type === 'slider' ? (
                                <Slider disabled={isValueUnset} value={Number(template.config[field.accessor]) || 0} small {...field.props} onChange={(value) => template.setConfig(field.accessor, value)} />
                              ) : field.type === 'number' ? (
                                <NumericInput disabled={isValueUnset} value={template.config[field.accessor]} onValueChange={(_, value) => template.setConfig(field.accessor, value)} name={field.accessor} fill {...field.props} />
                              ) : (
                                <InputGroup onChange={(e) => template.setConfig(field.accessor, e.target.value)} disabled={isValueUnset} type={field.type} name={field.accessor} />
                              )}
                            </Label>
                            <Checkbox
                              checked={isValueUnset}
                              onChange={() => template.toggleConfigParamInheritance(field.accessor)}
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
                      checked={isWeaponPreferenceUnset}
                      onChange={() => {
                        template.toggleConfigParamInheritance('WeaponPreference');
                      }}
                    >Inherit weapon preference from template</Checkbox>
                    <Row class="py-1">
                      {!isWeaponPreferenceUnset && (
                        <>
                          {template.config.WeaponPreference.map((value, prefIndex) => {
                            return (
                              <Col key={`value_${prefIndex}`} size={6} className="py-1">
                                <ControlGroup fill>
                                  <HTMLSelect value={value} fill onChange={(e) => template.editWeaponPreference(prefIndex, e.target.value)}>
                                    <option value="none">None</option>
                                    {WEAPONS_WITHOUT_GROUPS.map((weapon) => (
                                      <option key={weapon.value} value={weapon.value}>{weapon.label}</option>
                                    ))}
                                  </HTMLSelect>
                                  <Button intent="danger" icon="minus" onClick={() => template.removeWeaponPreference(prefIndex)} />
                                </ControlGroup>
                              </Col>
                            )
                          })}
                          <Col size={12} className="py-1">
                            <Button onClick={() => template.addWeaponPreference(WEAPONS_WITHOUT_GROUPS[0].value)} intent="success" icon="plus" small>Add weapon preference</Button>
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
