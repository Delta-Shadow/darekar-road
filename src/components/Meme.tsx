import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import MemeText from './MemeText';

interface MemeProps {
	meme: Meme;
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
				src={props.meme.img}
				alt='meme'
				className={`${fillAxis !== null ? 'w-full h-full' : ''}`}
			/>
			{props.meme.textboxes?.map((textbox) => {
				const { x, y, w, h, content } = textbox;
				// return <MemeText {...{ x, y, w, h }}>{content}</MemeText>;
				return <MemeText {...{ x, y, w, h }} />;
			})}
		</div>
	);
};

export default Meme;
