import {
  Button,
  Classes,
  Dialog,
  Checkbox,
  ControlGroup,
  H5,
  HTMLSelect,
  InputGroup,
  Label,
  NumericInput,
  Slider, 
  ButtonGroup
} from "@blueprintjs/core";
import * as React from "react";
import { IPlayer, ITemplate } from "../../models/types";
import { Col, Row } from "..";
import { FIELDS, DIFFICULTIES, WEAPONS_WITHOUT_GROUPS, REQUIRED_SKINS } from "../../consts";
import { useBotProfile } from "../../contexts/BotProfile";
import { capitalizeFirstLetter, nullishFilter } from "../../utils";

type TemplateEditModalProps = {
  data: IPlayer | ITemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPlayer | ITemplate | null) => void;
  title: string;
  mode?: 'template' | 'player'
}

const TemplateEditModal: React.FC<TemplateEditModalProps> = ({ data, isOpen, onClose, onSubmit, title, mode = 'template' }) => {
  const [editedTemplateData, setEditedTemplateData] = React.useState<IPlayer | ITemplate>(null as any);
  const { templates, defaultConfig } = useBotProfile();
  const fields = React.useRef(FIELDS.filter(({ skipForTemplate }: any) => !skipForTemplate));

  React.useEffect(() => {
    if (data) {
      const editedData = {
        name: data.name,
        config: {
          ...data.config,
          WeaponPreference: data.config.WeaponPreference && [...data.config.WeaponPreference],
          Difficulty: data.config.Difficulty && [...data.config.Difficulty]
        },
        templates: (data as IPlayer).templates
      };
      setEditedTemplateData(editedData as any)
    }
  }, [data]);

  const isWeaponPreferenceInherited = React.useMemo(() => editedTemplateData?.config?.WeaponPreference == null, [editedTemplateData]);
  const isDifficultyInherited = React.useMemo(() => editedTemplateData?.config?.Difficulty == null, [editedTemplateData]);

  const setPlayerName = React.useCallback((event: any) => {
    setEditedTemplateData(state => ({
      ...(state || {}),
      name: event.target.value
    }) as any);
  }, [editedTemplateData]);

  const setConfig = React.useCallback((key: string, value: any) => {
    setEditedTemplateData(state => ({
      ...state,
      config: {
        ...(state || {}).config,
        [key]: value
      }
    }) as any);
  }, [editedTemplateData]);

  const setWeaponPreference = React.useCallback((weaponIndex, value) => {
    setEditedTemplateData(state => ({
      ...state,
      config: {
        ...state.config,
        WeaponPreference: [...state.config.WeaponPreference.slice(0, weaponIndex), value, ...state.config.WeaponPreference.slice(weaponIndex + 1)].filter(nullishFilter)
      }
    }));
  }, [editedTemplateData]);

  const toggleDifficulty = React.useCallback((difficulty) => {
    const wasDifficultySet = editedTemplateData.config.Difficulty.includes(difficulty);
    let newValue;
    if (wasDifficultySet) {
      newValue = editedTemplateData.config.Difficulty.filter((d) => d !== difficulty)
      
    } else {
      const setDifficulties = [...(editedTemplateData.config.Difficulty || []), difficulty];
      newValue = DIFFICULTIES.filter(d => setDifficulties.includes(d));
    }
    setConfig('Difficulty', newValue);
  }, [setWeaponPreference]);

  const addWeaponPreference = React.useCallback(() => {
    setEditedTemplateData(state => ({
      ...state,
      config: {
        ...state.config,
        WeaponPreference: [...state.config.WeaponPreference, WEAPONS_WITHOUT_GROUPS[0].value]
      }
    }));
  }, [editedTemplateData]);

  const removeWeaponPreference = React.useCallback((weaponIndex) => {
    setWeaponPreference(weaponIndex, null);
  }, [setWeaponPreference]);

  const addTemplate = React.useCallback(() => {
    setEditedTemplateData(state => ({
      ...state,
      templates: [...(state as any).templates, templates[0].name]
    }));
  }, [editedTemplateData]);

  const setTemplate = React.useCallback((templateIndex, value) => {
    setEditedTemplateData(state => ({
      ...state,
      templates: [...(state as any).templates.slice(0, templateIndex), value, ...(state as any).templates.slice(templateIndex + 1)].filter(nullishFilter)
    }))
  }, [editedTemplateData]);

  const removeTemplate = React.useCallback((templateIndex) => {
    setTemplate(templateIndex, null);
  }, [setTemplate]);

  const toggleParameterInheritance = React.useCallback((key) => {
    setEditedTemplateData(state => ({
      ...state,
      config: {
        ...state.config,
        [key]: nullishFilter((state as any).config[key]) ? null : ((data as any)?.defaults.config[key] || (defaultConfig as any)[key])
      }
    }))
  }, [editedTemplateData]);

  return (
    <Dialog
      title={`${title}: ${data?.name || ''}`}
      isOpen={isOpen}
      onClose={onClose}
      className={Classes.DARK}
    >
      <div className={Classes.DIALOG_BODY}>
        {Boolean(editedTemplateData) && (
          <Row>
            <Col size={6} className="py-1">
              <Label>
                Player name
                <InputGroup value={editedTemplateData.name} onChange={setPlayerName} type="text" />
              </Label>
            </Col>
            <Col size={6}>
              <div style={{ paddingBottom: '10px'}} />
              <div>Difficulty</div>
              <div style={{ paddingBottom: '6px'}} />
              <ButtonGroup>
                {DIFFICULTIES.map(difficulty => (
                  <Button
                    key={difficulty}
                    disabled={isDifficultyInherited}
                    active={editedTemplateData.config.Difficulty?.includes(difficulty)}
                    onClick={() => toggleDifficulty(difficulty)
                  }>
                    {capitalizeFirstLetter(difficulty)}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{ paddingBottom: '10px'}} />
              <Checkbox
                checked={isDifficultyInherited}
                onChange={() => toggleParameterInheritance('Difficulty')}
              >
                Inherit from template
              </Checkbox>
            </Col>
            {Boolean((editedTemplateData as any).templates) && (
              <Col size={12}>
                <span>Templates</span>
                <Row>
                  {(editedTemplateData as any).templates.map((playerTemplate: IPlayer['templates'], templateIndex: number) => {
                    return (
                      <Col key={templateIndex} size={4} className="py-1">
                        <ControlGroup fill>
                          <HTMLSelect fill value={playerTemplate as any} onChange={(e) => setTemplate(templateIndex, e.target.value)}>
                            {templates.map((template) => (
                              <option key={template.name} value={template.name}>{template.name}</option>
                            ))}
                          </HTMLSelect>
                          {Boolean(templateIndex) && (
                            <Button onClick={() => removeTemplate(templateIndex)} icon="minus" intent="danger" />
                          )}
                        </ControlGroup>
                      </Col>
                    )
                  })}
                  <Col size={12}>
                    <Button intent="success" icon="plus" small onClick={addTemplate}>
                      Add template
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
            <Col size={12} className="py-2">
              <H5>Parameters and skills</H5>
              <Row>
                {fields.current.map((field) => {
                  const isValueInheritedFromTemplate = editedTemplateData.config[field.accessor] == null;
                  return (
                    <Col className="py-1 px-2" size={4} key={field.accessor}>
                      <Label>
                        {field.label}
                        {field.type === 'slider' ? (
                          <Slider disabled={isValueInheritedFromTemplate} value={Number(editedTemplateData.config[field.accessor]) || 0} small {...field.props} onChange={(value) => setConfig(field.accessor, String(value))} />
                        ) : field.type === 'number' ? (
                          <NumericInput disabled={isValueInheritedFromTemplate} value={editedTemplateData.config[field.accessor]} onValueChange={(_, value) => setConfig(field.accessor, value)} name={field.accessor} fill {...field.props} />
                        ) : null}
                      </Label>
                        <Checkbox
                          checked={isValueInheritedFromTemplate}
                          onChange={() => toggleParameterInheritance(field.accessor)}
                        >
                          Inherit from template
                        </Checkbox>
                    </Col>
                  )
                })}
                {mode === 'player' && (
                  <Col className="py-1 px-2" size={4}>
                    <Label>
                      Skin
                      <HTMLSelect value={editedTemplateData.config.Skin} onChange={(e) => setConfig('Skin', e.target.value)}>
                        {REQUIRED_SKINS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </HTMLSelect>
                    </Label>
                  </Col>
                )}
              </Row>
            </Col>
            <Col size={12}>
              <H5>Weapon preference</H5>
              <Checkbox
                checked={isWeaponPreferenceInherited}
                onChange={() => {
                  toggleParameterInheritance('WeaponPreference');
                }}
              >Inherit weapon preference from template</Checkbox>
              <Row className="py-1">
                {!isWeaponPreferenceInherited && (
                  <>
                    {editedTemplateData.config.WeaponPreference.map((value, prefIndex) => {
                      return (
                        <Col key={`value_${prefIndex}`} size={4} className="py-1">
                          <ControlGroup fill>
                            <Button><strong>{prefIndex + 1}.</strong></Button>
                            <HTMLSelect value={value} fill onChange={(e) => setWeaponPreference(prefIndex, e.target.value)}>
                              {WEAPONS_WITHOUT_GROUPS.map((weapon) => (
                                <option key={weapon.value} value={weapon.value}>{weapon.label}</option>
                              ))}
                            </HTMLSelect>
                            <Button intent="danger" icon="minus" onClick={() => removeWeaponPreference(prefIndex)} />
                          </ControlGroup>
                        </Col>
                      )
                    })}
                    <Col size={12} className="py-1">
                      <Button onClick={addWeaponPreference} intent="success" icon="plus" small>Add weapon preference</Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button intent="primary" onClick={() => onSubmit(editedTemplateData)}>Apply changes</Button>
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

export default TemplateEditModal;
