import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const textPadding = 16;

interface MemeTextProps extends Textbox {
	children?: string; // If no child, then consider this to be editable
}

const MemeText = (props: MemeTextProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const adjustFontSize = () => {
		if (containerRef.current === null || textRef.current === null) return;
		const container = containerRef.current;
		const text = textRef.current;

		const isTextBiggerThanContainer = () =>
			text.getBoundingClientRect().height >
			container.getBoundingClientRect().height - 2 * textPadding;

		const increaseFontSize = () =>
			(text.style.fontSize = `${parseFloat(text.style.fontSize) + 1}px`);

		const decreaseFontSize = () =>
			(text.style.fontSize = `${parseFloat(text.style.fontSize) - 1}px`);

		if (!isTextBiggerThanContainer()) {
			// Grow this text
			while (!isTextBiggerThanContainer()) increaseFontSize();
		} else {
			// Shrink this text
			while (isTextBiggerThanContainer()) decreaseFontSize();
		}
	};

	useEffect(adjustFontSize, []);
	window.addEventListener('resize', adjustFontSize);

	return (
		<div
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
		>
			<div
				ref={textRef}
				style={{ fontSize: '16px', outline: 'none' }}
				contentEditable={props.children === undefined}
				spellCheck={false}
				onInput={adjustFontSize}
			>
				{props.children || 'Enter text here'}
			</div>
		</div>
	);
};

export default MemeText;
