import BoxFitImage from './BoxFitImage';

interface CustomMemeProps {
	img: string;
}

const CustomMeme = (props: CustomMemeProps) => {
	return <BoxFitImage src={props.img} />;
};

export default CustomMeme;
