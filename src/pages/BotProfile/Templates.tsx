import * as React from 'react';
import { Card, Button, ButtonGroup, H2, InputGroup } from "@blueprintjs/core";
import { Col, Row, TemplateEditModal } from "../../components";
import { useBotProfile } from "../../contexts/BotProfile";
import { WEAPONS_WITHOUT_GROUPS } from "../../consts";
import { capitalizeFirstLetter } from "../../utils";
import { confirmationService } from "../../services";
import type { ITemplate } from "../../models/types";
import { useSearch } from '../../hooks';

export const Templates = () => {
  const { templates, createTemplate, deleteTemplate } = useBotProfile();
  const [editedTemplate, setEditedTemplate] = React.useState<ITemplate | null>(null as any);
  const [filteredTemplates, searchText, setSearchText] = useSearch(templates, ['name']);

  const handleSubmit = React.useCallback((template) => {
    editedTemplate?.save(template);
    setEditedTemplate(null);
  }, [editedTemplate]);

  const handleTemplateCreate = React.useCallback(() => {
    const newTemplate = createTemplate();
    setEditedTemplate(newTemplate);
  }, [createTemplate]);

  const handleClose = React.useCallback(() => {
    if (editedTemplate?.isNew) {
      deleteTemplate(editedTemplate);
    }
    setEditedTemplate(null);
  }, [deleteTemplate, editedTemplate]);

  const handleDeleteClick = React.useCallback((template) => {
    confirmationService.requestConfirmation({
      title: 'Are you sure?',
      body: `Template '${template.name}' will be removed. It will also affect players using this template.`,
      confirmButton: { label: 'Yes, delete' },
      onConfirm: () => deleteTemplate(template)
    });
  }, [deleteTemplate]);

  return (
    <div>
      <Row className="justify-content-end">
        <Col>
          <InputGroup
            large
            leftIcon="search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search template..."
            value={searchText}
          />
        </Col>
      </Row>
      <Row>
        {filteredTemplates.map(template => (
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
                <Button intent="danger" icon="trash" onClick={() => handleDeleteClick(template)}>Delete</Button>
              </ButtonGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col size={12} className="py-1">
          <Button intent="success" onClick={handleTemplateCreate} icon="plus">Add template</Button>
        </Col>
      </Row>
      <TemplateEditModal
        title="Edit template"
        data={editedTemplate}
        isOpen={Boolean(editedTemplate)}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
