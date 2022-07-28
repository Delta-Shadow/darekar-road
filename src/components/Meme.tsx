import { useRef, useState, useEffect } from 'react';
import MemeText from './MemeText';

interface MemeProps {
	img: string;
	textboxes?: Array<Textbox>;
	texts?: Array<string>;
	editable: boolean;
}

const Meme = (props: MemeProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const [fillAxis, setFillAxis] = useState<'x' | 'y' | null>(null);

	const adjustSize = () => {
		if (rootRef.current !== null && imgRef.current !== null) {
			const img = imgRef.current;
			const parent = rootRef.current.parentElement?.getBoundingClientRect() || null;
			if (parent !== null) {
				const horizontalSpace = parent.width - img.width;
				const verticalSpace = parent.height - img.height;
				if (horizontalSpace < verticalSpace) setFillAxis('x');
				else setFillAxis('y');
			}
		}
	};

	useEffect(adjustSize, [rootRef, imgRef]);
	window.addEventListener('resize', adjustSize);

	return (
		<div
			ref={rootRef}
			style={{
				position: 'relative',
				width: fillAxis === 'x' ? '100%' : 'auto',
				height: fillAxis === 'y' ? '100%' : 'auto'
			}}
		>
			<img
				ref={imgRef}
				src={props.img}
				alt='Meme'
				className={`${fillAxis !== null ? 'w-full h-full' : ''}`}
			/>
			{props.textboxes?.map((textbox, i) => {
				if (props.editable) return <MemeText {...textbox} />;
				else return <MemeText {...textbox}>{props.texts?.at(i)}</MemeText>;
			})}
		</div>
	);
};

export default Meme;
