import React from 'react';
import { Card, Button, ButtonGroup, H2 } from "@blueprintjs/core";
import { Col, Row, TemplateEditModal } from "../components";
import { useBotProfile } from '../contexts/BotProfile/hooks';
import { WEAPONS_WITHOUT_GROUPS } from '../consts';
import { capitalizeFirstLetter } from '../utils';

export const Templates = () => {
  const { templates, createTemplate } = useBotProfile();
  const [editedTemplate, setEditedTemplate] = React.useState();

  const handleSubmit = React.useCallback((template) => {
    editedTemplate.applyChanges(template);
    setEditedTemplate(null);
  }, [editedTemplate]);

  return (
    <div>
      <Row>
        {templates.map(template => (
          <Col key={template.id} size={4} className="py-1">
            <Card key={template.id}>
              <H2>{template.name}</H2>
              <div className="py-1">
                <p>
                  <strong>Difficulty:</strong>&nbsp;&nbsp;{template.config.Difficulty?.map(capitalizeFirstLetter).join(', ') || 'Difficulty was not set'}
                </p>
                <p>
                  <strong>Weapons:</strong>&nbsp;&nbsp;{template.config.WeaponPreference?.map(
                    weapon => WEAPONS_WITHOUT_GROUPS.find(({ value }) => value === weapon)?.label
                  ).join(', ') || 'Weapon preference was not set. Probably this is skill based template'}
                </p>
              </div>
              <ButtonGroup>
                <Button intent="success" icon="edit" onClick={() => setEditedTemplate(template)}>Edit</Button>
                <Button intent="danger" icon="trash">Delete</Button>
              </ButtonGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col size={12} className="py-1">
          <Button intent="success" onClick={createTemplate} icon="plus">Add template</Button>
        </Col>
      </Row>
      <TemplateEditModal
        title="Edit template"
        data={editedTemplate}
        isOpen={Boolean(editedTemplate)}
        onClose={() => setEditedTemplate(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
