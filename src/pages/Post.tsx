import { AnimatePresence, motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners';
import { simpleFade } from '../lib/animationVariants';
import useTemplates from '../lib/useTemplates';

const Post = () => {
	const [templates, loading] = useTemplates();

	return (
		<motion.div
			variants={simpleFade}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='min-h-screen bg-zinc-900 p-8 md:px-24 xl:px-48 xl:py-24 2xl:px-64 2xl:py-32'
		>
			<motion.p
				variants={simpleFade}
				className='mb-4 text-3xl text-zinc-400 text-center'
			>
				Darekar aapke contribution ka swagat karte hai
			</motion.p>
			<motion.p
				variants={simpleFade}
				className='mb-16 text-xl text-zinc-600 text-center'
			>
				Koi bhi template uthao aur road ko aage badhao
			</motion.p>
			{loading ? (
				<motion.div variants={simpleFade}>
					<BeatLoader
						className='text-center'
						size={15}
						color='white'
					/>
				</motion.div>
			) : (
				<>
					{templates === null ? (
						<motion.p variants={simpleFade}>Failed to load templates</motion.p>
					) : (
						<motion.div
							variants={simpleFade}
							className='grid grid-cols-2 auto-rows-[minmax(0,30vh)] lg:grid-cols-3 gap-16'
						>
							<CustomThumbnail />
							{templates.map((template) => (
								<TemplateThumbnail {...template} />
							))}
						</motion.div>
					)}
				</>
			)}
		</motion.div>
	);
};

const CustomThumbnail = () => {
	return (
		<motion.div
			variants={simpleFade}
			className='rounded-xl hover:shadow-xl shadow-2xl flex flex-col justify-center items-center gap-4 cursor-pointer'
		>
			<p className='text-zinc-200 text-6xl text-center'>+</p>
			<p className='text-zinc-500 text-lg text-center'>Post a custom meme</p>
		</motion.div>
	);
};

const TemplateThumbnail = (props: Template) => {
	return (
		<motion.div
			variants={simpleFade}
			className='rounded-xl shadow-2xl hover:shadow-xl cursor-pointer'
		>
			<img
				src={props.img}
				alt={props.name}
				className='w-full h-full object-contain'
			/>
		</motion.div>
	);
};

export default Post;
