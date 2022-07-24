import { BeatLoader as Loader } from 'react-spinners';
import { Navigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Meme from '../components/Meme';
import { simpleFade } from '../lib/animationVariants';
import useTemplate from '../lib/useTemplate';

const Editor = () => {
	const [searchParams] = useSearchParams();
	const templateID = searchParams.get('t');
	const [template, loading] = useTemplate(templateID || ''); // Will fail internally if templateID is null

	if (templateID === null) return <Navigate to='/' />;

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
						{template === null ? (
							<motion.div variants={simpleFade}>
								<TemplateError />
							</motion.div>
						) : (
							<motion.div variants={simpleFade}>
								<Meme template={template} />
							</motion.div>
						)}
					</>
				)}
			</motion.div>
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
