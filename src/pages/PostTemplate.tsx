import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { animationProps, SimpleFade } from '../lib/animationVariants';
import { MdAdd, MdDelete } from 'react-icons/md';
import BoxFitImage from '../components/BoxFitImage';
import { createTemplate, TemplateData } from '../api/template';
import useAPI from '../lib/useAPI';
import { BarLoader } from 'react-spinners';

let parseCoords: ((_x: number, _y: number) => { x: number; y: number }) | null;

function constructCoordsParser(x: number, y: number, w: number, h: number) {
	parseCoords = (_x, _y) => {
		return {
			x: ((_x - x) * 100) / w,
			y: ((_y - y) * 100) / h
		};
	};
}

const PostTemplate = () => {
	const [templateName, setTemplateName] = useState<string>('');
	const [img, setImg] = useState<File | null>(null);
	const [imgURL, setImgURL] = useState<string | null>(null);
	const [selectedTextboxIndex, setSelectedTextboxIndex] = useState<number | null>(null);
	const [textboxes, setTextboxes] = useState<Array<Textbox>>([]);

	const templatePoster = useAPI(createTemplate, {
		resetOnFail: true,
		delayedReset: true
	});

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setImg(e.target.files[0]);
	};

	const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.items) {
			const selectedFile = e.dataTransfer.items[0].getAsFile();
			if (selectedFile === null) return;
			setImg(selectedFile);
		} else {
			setImg(e.dataTransfer.files[0]);
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		if (parseCoords !== null) {
			const newCoords = parseCoords(e.clientX, e.clientY);
			setTextboxes([
				...textboxes,
				{
					x: newCoords.x,
					y: newCoords.y,
					w: 0,
					h: 0
				}
			]);
			setSelectedTextboxIndex(textboxes.length);
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		e.preventDefault();
		if (parseCoords !== null && selectedTextboxIndex !== null) {
			let newTextboxes = [...textboxes];
			const currentTextbox = textboxes[selectedTextboxIndex];
			const newCoords = parseCoords(e.clientX, e.clientY);
			newTextboxes[selectedTextboxIndex] = {
				...currentTextbox,
				w: newCoords.x - currentTextbox.x,
				h: newCoords.y - currentTextbox.y
			};
			setTextboxes(newTextboxes);
		}
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		e.preventDefault();
		setSelectedTextboxIndex(null);
	};

	const handleRemoveImg = () => {
		setImg(null);
		setTextboxes([]);
	};

	const handleTextboxRemove = (i: number) => {
		const newTextboxes = [...textboxes];
		newTextboxes.splice(i);
		setTextboxes(newTextboxes);
	};

	const handleTemplatePost = () => {
		if (templateName !== '' && img)
			templatePoster.trigger({
				name: templateName,
				img,
				textboxes
			});
	};

	// Display the selected image file
	useEffect(() => {
		if (img === null) {
			if (imgURL !== null) URL.revokeObjectURL(imgURL);
			setImgURL(null);
			return;
		} else {
			const url = URL.createObjectURL(img);
			setImgURL(url);
			return () => URL.revokeObjectURL(url);
		}
	}, [img]);

	return (
		<motion.div
			{...animationProps(SimpleFade, true)}
			className='flex-1 flex flex-col justify-center items-center gap-4'
			onDrop={handleFileDrop}
			onDragOver={e => e.preventDefault()}
		>
			{imgURL === null ? (
				// If an image is not selected, ask user to select one
				<>
					<motion.p
						{...animationProps(SimpleFade)}
						className='text-zinc-500 text-2xl text-center'
					>
						Tap the button to select an image
						<br />
						Or just drag and drop
					</motion.p>
					<motion.label
						{...animationProps(SimpleFade)}
						className='cursor-pointer bg-zinc-100 rounded-full shadow-2xl p-2'
					>
						<MdAdd className='text-zinc-300 text-4xl' />
						<input
							type='file'
							accept='image/*'
							onChange={handleFileSelect}
							className='hidden'
						/>
					</motion.label>
				</>
			) : (
				// If an image is selected, display it and allow user to drag textboxes
				<>
					<input
						className=' outline-none border-x-0 border-t-0 border-b-2 border-solid border-white'
						value={templateName}
						onChange={e => setTemplateName(e.target.value)}
					/>
					<BoxFitImage
						src={imgURL}
						afterFitting={constructCoordsParser}
					>
						<div
							className='absolute w-full h-full top-0 left-0 z-10'
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
						>
							{textboxes.map((textbox, i) => (
								<TextboxPlaceholder
									key={i}
									index={i}
									onRemove={() => handleTextboxRemove(i)}
									{...textbox}
								/>
							))}
						</div>
					</BoxFitImage>
					<div className='mt-4 flex flex-row gap-4 justify-center'>
						<motion.button
							{...animationProps(SimpleFade)}
							className='p-2 bg-zinc-400 rounded-xl w-52'
							onClick={
								templatePoster.status === 'idle' ? handleTemplatePost : undefined
							}
						>
							{templatePoster.status === 'idle' && 'Post karo'}
							{templatePoster.status === 'waiting' && (
								<>
									Waiting
									<BarLoader width='100%' />
								</>
							)}
							{templatePoster.status === 'finished' && 'Posted Template!'}
							{templatePoster.status === 'failed' && 'Could not post'}
						</motion.button>
						<motion.button
							{...animationProps(SimpleFade)}
							className='p-2 bg-zinc-400 rounded-xl w-52'
							onClick={handleRemoveImg}
						>
							Remove
						</motion.button>
					</div>
				</>
			)}
		</motion.div>
	);
};

interface TextboxPlaceholderProps extends Textbox {
	index: number;
	onRemove: () => void;
}

const TextboxPlaceholder = (props: TextboxPlaceholderProps) => {
	return (
		<div
			className='absolute border-white border-solid border-2 flex justify-center items-center'
			style={{
				zIndex: props.index * 100,
				left: `${props.x}%`,
				top: `${props.y}%`,
				width: `${props.w}%`,
				height: `${props.h}%`
			}}
		>
			<div
				className='p-2 rounded-full bg-red-400 text-red-50 text-2xl hover:text-3xl transition-all'
				style={{
					zIndex: props.index * 100
				}}
				onClick={e => {
					e.stopPropagation();
					props.onRemove();
				}}
			>
				<MdDelete />
			</div>
		</div>
	);
};

export default PostTemplate;
