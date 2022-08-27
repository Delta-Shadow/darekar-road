import { useNavigate, createSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners';

import { animationProps, SimpleFade } from '../lib/animationVariants';
import useLoader from '../lib/useLoader';
import { readAllTemplates } from '../api/template';

const Post = () => {
	const [templates, templatesFetchStatus] = useLoader(readAllTemplates);

	return (
		<motion.div
			{...animationProps(SimpleFade, true)}
			className='bg-zinc-900 p-8 md:px-24 xl:px-48 xl:py-24 2xl:px-64 2xl:py-32'
		>
			<motion.p
				{...animationProps(SimpleFade)}
				className='mb-4 text-xl md:text-3xl text-zinc-400 text-center'
			>
				Darekar aapke contribution ka swagat karte hai
			</motion.p>
			<motion.p
				{...animationProps(SimpleFade)}
				className='mb-16 text-sm md:text-xl text-zinc-600 text-center'
			>
				Koi bhi template uthao aur road ko aage badhao
			</motion.p>
			{templatesFetchStatus === 'waiting' && (
				<motion.div {...animationProps(SimpleFade)}>
					<BeatLoader
						className='text-center'
						size={15}
						color='white'
					/>
				</motion.div>
			)}
			{templatesFetchStatus === 'failed' && (
				<motion.p {...animationProps(SimpleFade)}>Failed to load templates</motion.p>
			)}
			{templatesFetchStatus === 'finished' && templates !== null && (
				<TemplatesGrid templates={templates} />
			)}
		</motion.div>
	);
};

const TemplatesGrid = (props: { templates: Map<string, Template> }) => {
	return (
		<motion.div
			{...animationProps(SimpleFade)}
			className={`grid grid-cols-2 auto-rows-[minmax(0,30vh)] lg:grid-cols-3 gap-4 lg:gap-16`}
		>
			<CustomThumbnail />
			{(Object.entries(props.templates) as Array<[string, Template]>).map(
				([id, template]) => (
					<TemplateThumbnail
						targetId={id}
						{...template}
					/>
				)
			)}
		</motion.div>
	);
};

const CustomThumbnail = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/customPost');
	};

	return (
		<motion.div
			{...animationProps(SimpleFade)}
			className='rounded-xl hover:shadow-xl shadow-2xl flex flex-col justify-center items-center gap-4 cursor-pointer'
			onClick={handleClick}
		>
			<p className='text-zinc-400 text-5xl md:text-6xl text-center'>+</p>
			<p className='text-zinc-500 text-sm md:text-lg text-center'>Post a custom meme</p>
		</motion.div>
	);
};

const TemplateThumbnail = (props: Template & { targetId: string }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate({
			pathname: '/editor',
			search: `${createSearchParams({
				t: props.targetId
			})}`
		});
	};

	return (
		<motion.div
			{...animationProps(SimpleFade)}
			className='rounded-xl shadow-2xl hover:shadow-xl cursor-pointer'
			onClick={handleClick}
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
