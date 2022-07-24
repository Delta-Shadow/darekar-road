import { BeatLoader as Loader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';

import useMeme from '../lib/useMeme';
import Meme from '../components/Meme';
import MemeError from '../components/MemeError';
import { simpleFade } from '../lib/animationVariants';

const Home = () => {
	const [meme, loading, nextMeme] = useMeme();

	return (
		<motion.div
			variants={simpleFade}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='flex-1 flex justify-center items-center bg-zinc-900'
		>
			<motion.div
				variants={simpleFade}
				className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'
			>
				{loading ? (
					<motion.div variants={simpleFade}>
						<Loader
							size={15}
							color='white'
						/>
					</motion.div>
				) : (
					<>
						{meme === null ? (
							<motion.div variants={simpleFade}>
								<MemeError />
							</motion.div>
						) : (
							<motion.div variants={simpleFade}>
								<Meme meme={meme} />
							</motion.div>
						)}
					</>
				)}
				{/* {meme === null ? (
					<motion.div variants={simpleFade}>
						{loading ? (
							<Loader
								size={15}
								color='white'
							/>
						) : (
							<MemeError />
						)}
					</motion.div>
				) : (
					<motion.div variants={simpleFade}>
						<Meme meme={meme} />
					</motion.div>
				)} */}
			</motion.div>
		</motion.div>
	);
};

export default Home;
