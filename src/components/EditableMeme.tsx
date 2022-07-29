import { useRef } from 'react';
import BoxFitImage from './BoxFitImage';
import MemeText from './MemeText';

interface EditableMemeProps {
	img: string;
	textboxes: Array<Textbox>;
	onEdit: (texts: Array<string>) => void;
}

const EditableMeme = (props: EditableMemeProps) => {
	const memeTxts = useRef<Array<string>>(new Array(props.textboxes.length).fill(''));

	const handleEdit = (textboxIndex: number, txt: string) => {
		memeTxts.current[textboxIndex] = txt;
		props.onEdit(memeTxts.current);
	};

	return (
		<BoxFitImage src={props.img}>
			{props.textboxes.map((textbox, i) => (
				<MemeText
					{...textbox}
					onEdit={txt => handleEdit(i, txt)}
				/>
			))}
		</BoxFitImage>
	);
};

export default EditableMeme;
