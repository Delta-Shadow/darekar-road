import { useRef } from 'react';
import { BarLoader, BeatLoader as Loader } from 'react-spinners';
import { Navigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import EditableMeme from '../components/EditableMeme';
import { animationProps, SimpleFade } from '../lib/animationVariants';
import useAPI from '../lib/useAPI';
import { readTemplate } from '../api/template';
import { createTemplatedMeme } from '../api/meme';

const Editor = () => {
	const [searchParams] = useSearchParams();
	const txts = useRef<Array<string> | null>(null);
	const templateFetcher = useAPI(readTemplate);
	const memePoster = useAPI(createTemplatedMeme, {
		resetOnFail: true,
		delayedReset: true
	});

	const templateID = searchParams.get('t');
	if (templateID === null) return <Navigate to='/' />;

	if (templateFetcher.status === 'idle') templateFetcher.trigger(templateID);

	const handleEdit = ((_txts: Array<string>) => {
		txts.current = _txts;
	}).bind(this);

	const handlePost = () => {
		if (templateFetcher.value === null || txts.current === null) return;
		memePoster.trigger({
			templateID: templateID,
			texts: txts.current
		});
	};

	return (
		<motion.div
			{...animationProps(SimpleFade)}
			className='flex-1 flex flex-col gap-8 justify-center items-center bg-zinc-900'
		>
			<motion.div
				{...animationProps(SimpleFade)}
				className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'
			>
				{templateFetcher.status === 'waiting' ||
					(templateFetcher.status === 'idle' && (
						<Loader
							size={15}
							color='white'
						/>
					))}
				{templateFetcher.status === 'failed' && (
					<motion.div {...animationProps(SimpleFade, true)}>
						<TemplateError />
					</motion.div>
				)}
				{templateFetcher.status === 'finished' && templateFetcher.value !== null && (
					<motion.div {...animationProps(SimpleFade, true)}>
						<EditableMeme
							img={templateFetcher.value.img}
							textboxes={templateFetcher.value.textboxes}
							onEdit={handleEdit}
						/>
					</motion.div>
				)}
			</motion.div>
			<motion.button
				{...animationProps(SimpleFade)}
				className='p-2 bg-zinc-400 rounded-xl  w-1/6'
				onClick={memePoster.status === 'idle' ? handlePost : undefined}
			>
				{memePoster.status === 'idle' && 'Post karo'}
				{memePoster.status === 'waiting' && (
					<>
						Waiting
						<BarLoader width='100%' />
					</>
				)}
				{memePoster.status === 'finished' && 'Posted Meme!'}
				{memePoster.status === 'failed' && 'Could not post'}
			</motion.button>
		</motion.div>
	);
};

const TemplateError = () => {
	return (
		<div className='flex flex-col gap-4 p-4'>
			<p className='text-zinc-50 text-3xl text-center'>
				Darekar ne template pe bhi road bana diya guys
			</p>
			<p className='text-zinc-700 text-lg text-center mt-8'>
				Could not load the template due to some error
			</p>
			<p className='text-zinc-500 text-xl text-center'>Very sorry</p>
		</div>
	);
};

export default Editor;
