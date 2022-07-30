import BoxFitImage from './BoxFitImage';
import MemeText from './MemeText';

interface MemeProps {
	img: string;
	textboxes: Array<Textbox>;
	texts: Array<string>;
}

const Meme = (props: MemeProps) => {
	return (
		<BoxFitImage src={props.img}>
			{props.textboxes.map((textbox, i) => (
				<MemeText
					key={i}
					{...textbox}
				>
					{props.texts.at(i)}
				</MemeText>
			))}
		</BoxFitImage>
	);
};

export default Meme;
