import { BeatLoader as Loader } from 'react-spinners';
import { motion } from 'framer-motion';

import useMeme from '../lib/useMeme';
import Meme from '../components/Meme';
import { simpleFade } from '../lib/animationVariants';
import CustomMeme from '../components/CustomMeme';

const Home = () => {
	const [meme, template, loading, nextMeme] = useMeme();

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
				{loading && (
					<motion.div variants={simpleFade}>
						<Loader
							size={15}
							color='white'
						/>
					</motion.div>
				)}
				{!loading && meme === null && (
					<motion.div variants={simpleFade}>
						<MemeError />
					</motion.div>
				)}
				{!loading && meme !== null && (
					<>
						{meme.isCustom && <CustomMeme img={meme.customImg} />}
						{!meme.isCustom && template !== null && (
							<Meme
								img={template.img}
								textboxes={template.textboxes}
								texts={meme.textboxes}
							/>
						)}
					</>
				)}
			</motion.div>
		</motion.div>
	);
};

const MemeError = () => {
	return (
		<div className='flex flex-col gap-4 p-4'>
			<p className='text-zinc-50 text-3xl text-center'>
				Darekar ne meme pe road bana diya guys
			</p>
			<p className='text-zinc-700 text-lg text-center mt-8'>
				Could not load the meme due to some error
			</p>
			<p className='text-zinc-500 text-xl text-center'>Very sorry</p>
		</div>
	);
};

export default Home;
