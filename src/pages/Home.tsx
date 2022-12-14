import { useEffect } from 'react';
import { BeatLoader as Loader } from 'react-spinners';
import { motion } from 'framer-motion';

import Meme from '../components/Meme';
import CustomMeme from '../components/CustomMeme';
import { animationProps, SimpleFade } from '../lib/animationVariants';
import useMeme from '../lib/useMeme';

const Home = () => {
	const { meme, template, loading, hasNext, next } = useMeme();

	// Handle the 'Space' Key
	const handleKey = (e: KeyboardEvent) => {
		if (e.code == 'Space') handleNext();
	};

	// Handle moving to the next meme
	const handleNext = () => {
		next();
	};

	// Attaching event listeners
	useEffect(() => {
		window.addEventListener('keypress', handleKey);
		window.addEventListener('click', handleNext);
		return () => {
			window.removeEventListener('keypress', handleKey);
			window.removeEventListener('click', handleNext);
		};
	}, []);

	return (
		// Outer box that covers all the space from the navbar and down
		<div className='flex-1 flex flex-col gap-4 justify-center items-center bg-zinc-900'>
			{/* Smaller Box centered in the middle that will contain the meme */}
			<div className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'>
				{loading && (
					// If loading, display the loader
					<motion.div {...animationProps(SimpleFade, true)}>
						<Loader
							size={15}
							color='white'
						/>
					</motion.div>
				)}
				{
					// If finished loading but meme is still null, there has been an error
					!loading && meme === null && <MemeError />
				}
				{!loading && meme !== null && (
					// If finished loading and the meme is non-null, display the meme
					<motion.div {...animationProps(SimpleFade, true)}>
						{meme.isCustom && <CustomMeme img={meme.customImg} />}
						{!meme.isCustom && template !== null && (
							// Template will always be non-null if meme is non-null
							<Meme
								img={template.img}
								textboxes={template.textboxes}
								texts={meme.textboxes}
							/>
						)}
					</motion.div>
				)}
			</div>

			{/* Text that appears below the meme */}
			{!loading && meme !== null && (
				<motion.p
					{...animationProps(SimpleFade, true)}
					className='text-zinc-600 text-lg'
				>
					{hasNext ? 'Click anywhere or press spacebar' : 'That was all the memes'}
				</motion.p>
			)}
		</div>
	);
};

const MemeError = () => {
	return (
		<motion.div
			{...animationProps(SimpleFade, true)}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='flex flex-col gap-4 p-4'
		>
			<p className='text-zinc-50 text-3xl text-center'>
				Darekar ne meme pe road bana diya guys
			</p>
			<p className='text-zinc-700 text-lg text-center mt-8'>
				Could not load the meme due to some error
			</p>
			<p className='text-zinc-500 text-xl text-center'>Very sorry</p>
		</motion.div>
	);
};

export default Home;
