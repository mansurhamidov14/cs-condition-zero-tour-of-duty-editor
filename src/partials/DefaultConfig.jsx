import React from 'react';
import { HTMLSelect, InputGroup, Label, NumericInput, Slider } from "@blueprintjs/core";
import { FIELDS } from "../consts";
import { Col, Row } from "../components";

export const DefaultConfig = () => {
	const [skill, setSkill] = React.useState(40);
	return (
		<Row className="py-1">
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
							<NumericInput name={field.accessor} large fill />
						) : (
							<InputGroup type={field.type} name={field.accessor} large />
						)}
						
					</Label>
				</Col>
			))}
		</Row>
	);
};