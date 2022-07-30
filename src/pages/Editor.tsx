import { useRef } from 'react';
import { BarLoader, BeatLoader as Loader } from 'react-spinners';
import { Navigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import EditableMeme from '../components/EditableMeme';
import { simpleFade } from '../lib/animationVariants';
import useAPI from '../lib/useAPI';
import { readTemplate } from '../api/template';
import { createTemplatedMeme } from '../api/meme';

const Editor = () => {
	const [searchParams] = useSearchParams();
	const txts = useRef<Array<string> | null>(null);
	const [template, templateFetchStatus, getTemplate] = useAPI(readTemplate);
	const [postMemeResponse, postMemeStatus, postMeme] = useAPI(createTemplatedMeme, {
		resetOnFail: true,
		delayedReset: true
	});

	const templateID = searchParams.get('t');
	if (templateID === null) return <Navigate to='/' />;

	if (templateFetchStatus === 'not_started') getTemplate(templateID);

	const handleEdit = ((_txts: Array<string>) => {
		txts.current = _txts;
	}).bind(this);

	const handlePost = () => {
		if (template === null || txts.current === null) return;
		postMeme({
			templateID: templateID,
			texts: txts.current
		});
	};

	return (
		<motion.div
			variants={simpleFade}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className='flex-1 flex flex-col gap-8 justify-center items-center bg-zinc-900'
		>
			<motion.div
				variants={simpleFade}
				className='w-full h-full md:w-2/3 md:h-2/3 flex justify-center items-center'
			>
				{templateFetchStatus === 'waiting' ||
					(templateFetchStatus === 'not_started' && (
						<Loader
							size={15}
							color='white'
						/>
					))}
				{templateFetchStatus === 'failed' && (
					<motion.div
						variants={simpleFade}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<TemplateError />
					</motion.div>
				)}
				{templateFetchStatus === 'finished' && template !== null && (
					<motion.div
						variants={simpleFade}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<EditableMeme
							img={template.img}
							textboxes={template.textboxes}
							onEdit={handleEdit}
						/>
					</motion.div>
				)}
			</motion.div>
			<motion.button
				variants={simpleFade}
				className='p-2 bg-zinc-400 rounded-xl  w-1/6'
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
