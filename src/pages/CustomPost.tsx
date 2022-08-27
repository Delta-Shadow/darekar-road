import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { animationProps, SimpleFade } from '../lib/animationVariants';
import { MdAdd } from 'react-icons/md';
import BoxFitImage from '../components/BoxFitImage';
import { createCustomMeme } from '../api/meme';
import useAPI from '../lib/useAPI';
import { BarLoader } from 'react-spinners';

const CustomPost = () => {
	const [img, setImg] = useState<File | null>(null);
	const [imgURL, setImgURL] = useState<string | null>(null);
	const [postMemeResponse, postMemeStatus, postMeme] = useAPI(createCustomMeme, {
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

	const handlePost = () => {
		if (img === null) return;
		postMeme({ img: img });
	};

	return (
		<motion.div
			{...animationProps(SimpleFade, true)}
			className='flex-1 flex flex-col justify-center items-center gap-4'
			onDrop={handleFileDrop}
			onDragOver={e => e.preventDefault()}
		>
			{imgURL === null ? (
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
				<>
					<BoxFitImage src={imgURL} />
					<motion.button
						{...animationProps(SimpleFade)}
						className={`p-2 rounded-xl w-1/6`}
						onClick={postMemeStatus === 'not_started' ? handlePost : undefined}
					>
						{postMemeStatus === 'not_started' && 'Post karo'}
						{postMemeStatus === 'waiting' && (
							<>
								Waiting
								<BarLoader width='100%' />
							</>
						)}
						{postMemeStatus === 'finished' && 'Posted Meme!'}
						{postMemeStatus === 'failed' && 'Could not post'}
					</motion.button>
					<motion.button
						{...animationProps(SimpleFade)}
						className='p-2 bg-zinc-400 rounded-xl  w-1/6'
						onClick={() => {
							setImg(null);
						}}
					>
						Remove
					</motion.button>
				</>
			)}
		</motion.div>
	);
};

export default CustomPost;
