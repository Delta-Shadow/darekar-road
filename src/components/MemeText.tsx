import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const textPadding = 16;

interface MemeTextProps extends Textbox {
	children: string;
}

const MemeText = (props: MemeTextProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const adjustFontSize = () => {
		if (containerRef.current === null || textRef.current === null) return;
		const container = containerRef.current;
		const text = textRef.current;
		if (
			text.getBoundingClientRect().height <
			container.getBoundingClientRect().height - 2 * textPadding
		) {
			// Grow this text
			while (
				text.getBoundingClientRect().height <
				container.getBoundingClientRect().height - 2 * textPadding
			) {
				textRef.current.style.fontSize = `${
					parseFloat(textRef.current.style.fontSize) + 1
				}px`;
			}
		} else {
			// Shrink this text
			while (
				text.getBoundingClientRect().height >
				container.getBoundingClientRect().height - 2 * textPadding
			) {
				textRef.current.style.fontSize = `${
					parseFloat(textRef.current.style.fontSize) - 1
				}px`;
			}
		}
	};

	useEffect(adjustFontSize, []);
	window.addEventListener('resize', adjustFontSize);

	return (
		<motion.div
			ref={containerRef}
			style={{
				position: 'absolute',
				left: `${props.x}%`,
				top: `${props.y}%`,
				width: `${props.w}%`,
				height: `${props.h}%`,
				color: 'white',
				fontFamily: 'Impact',
				padding: `${textPadding}px`
			}}
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
		>
			<div
				ref={textRef}
				style={{ fontSize: '16px' }}
			>
				{props.children}
			</div>
		</motion.div>
	);
};

export default MemeText;
