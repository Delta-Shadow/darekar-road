import { useEffect, useRef, useState } from 'react';

interface BoxFitImageProps {
	src: string;
	afterFitting?: (x: number, y: number, w: number, h: number) => void;
	children?: React.ReactNode;
}

const BoxFitImage = (props: BoxFitImageProps) => {
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

	useEffect(() => {
		setTimeout(() => {
			if (imgRef.current !== null && fillAxis !== null && props.afterFitting) {
				const dimensions = imgRef.current.getBoundingClientRect();
				props.afterFitting(
					dimensions.left,
					dimensions.top,
					dimensions.width,
					dimensions.height
				);
			}
		}, 100);
	}, [imgRef, fillAxis]);

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
				src={props.src}
				alt='Meme'
				className={`${fillAxis !== null ? 'w-full h-full' : ''}`}
			/>
			{props.children}
		</div>
	);
};

export default BoxFitImage;
