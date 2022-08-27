import { useEffect } from 'react';
import { BeatLoader as Loader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';

import Meme from '../components/Meme';
import CustomMeme from '../components/CustomMeme';
import { animationProps, SimpleFade } from '../lib/animationVariants';
import useMeme from '../lib/useMeme';

const Home = () => {
	const [meme, template, loading, nextMeme] = useMeme();

	// Handle the 'Space' Key
	const handleKey = (e: KeyboardEvent) => {
		if (e.code == 'Space') handleNext();
	};

	// Handle moving to the next meme
	const handleNext = () => {
		console.log('Will run:', Boolean(nextMeme));
		if (nextMeme !== null) nextMeme();
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
		<motion.div className='flex-1 flex flex-col gap-4 justify-center items-center bg-zinc-900'>
			<motion.div className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'>
				{loading && (
					<Loader
						size={15}
						color='white'
					/>
				)}
				<AnimatePresence>{!loading && meme === null && <MemeError />}</AnimatePresence>
				<AnimatePresence>
					{!loading && meme !== null && (
						<motion.div {...animationProps(SimpleFade, true)}>
							{meme.isCustom && <CustomMeme img={meme.customImg} />}
							{!meme.isCustom && template !== null && (
								<Meme
									img={template.img}
									textboxes={template.textboxes}
									texts={meme.textboxes}
								/>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
			{!loading && (
				<motion.p
					{...animationProps(SimpleFade)}
					className='text-zinc-600 text-lg'
				>
					{nextMeme === null
						? 'That was all the memes'
						: 'Click anywhere or press spacebar'}
				</motion.p>
			)}
		</motion.div>
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
