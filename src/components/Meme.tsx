import { useRef, useState, useEffect } from 'react';
import BoxFitImage from './BoxFitImage';
import MemeText from './MemeText';

interface MemeProps {
	img: string;
	textboxes: Array<Textbox>;
	texts?: Array<string>;
	editable: boolean;
}

const Meme = (props: MemeProps) => {
	const handleEdit = (textboxIndex: number, txt: string) => {
		console.log();
	};

	return (
		<BoxFitImage src={props.img}>
			{props.textboxes.map((textbox, i) => {
				if (props.editable) return <MemeText {...textbox} />;
				else
					return (
						<MemeText
							{...textbox}
							// onEdit={txt => handleEdit(i, txt)}
						>
							{props.texts?.at(i)}
						</MemeText>
					);
			})}
		</BoxFitImage>
	);
};

export default Meme;
