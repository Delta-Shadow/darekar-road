import { BeatLoader as Loader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';

import useMeme from './lib/useMeme';
import Meme from './components/Meme';

const anime = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.8 }
};

const App = () => {
	const [meme, loading, nextMeme] = useMeme();

	return (
		<div className='w-screen h-screen flex justify-center items-center bg-zinc-900'>
			<div className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'>
				<AnimatePresence>
					{meme === null ? (
						<motion.div {...anime}>
							{loading ? (
								<Loader
									size={15}
									color='white'
								/>
							) : (
								<p className='text-white text-lg'>
									Darekar ne meme pe road bana diya guys sorry
								</p>
							)}
						</motion.div>
					) : (
						<Meme meme={meme} />
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default App;
