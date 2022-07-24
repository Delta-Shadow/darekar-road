import { BeatLoader } from 'react-spinners';
import useTemplates from '../lib/useTemplates';

const Post = () => {
	const [templates, loading] = useTemplates();

	return (
		<div className='min-h-screen bg-zinc-900 p-8 md:px-24 xl:px-48 xl:py-24 2xl:px-64 2xl:py-32'>
			<p className='mb-4 text-3xl text-zinc-400 text-center'>
				Darekar aapke contribution ka swagat karte hai
			</p>
			<p className='mb-16 text-xl text-zinc-600 text-center'>
				Koi bhi template uthao aur road ke kaam ko aage badhao
			</p>
			{loading ? (
				<BeatLoader
					size={15}
					color='white'
				/>
			) : (
				<>
					{templates === null ? (
						<p>Failed to load templates</p>
					) : (
						<div className='grid grid-cols-2 auto-rows-[minmax(0,30vh)] lg:grid-cols-3 gap-16'>
							<CustomThumbnail />
							{templates.map((template) => (
								<TemplateThumbnail {...template} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

const CustomThumbnail = () => {
	return (
		<div className='rounded-xl hover:shadow-xl shadow-2xl flex flex-col justify-center items-center gap-4 cursor-pointer'>
			<p className='text-zinc-200 text-6xl text-center'>+</p>
			<p className='text-zinc-500 text-lg text-center'>Post a custom meme</p>
		</div>
	);
};

const TemplateThumbnail = (props: Template) => {
	return (
		<div className='rounded-xl shadow-2xl hover:shadow-xl cursor-pointer'>
			<img
				src={props.img}
				alt={props.name}
				className='w-full h-full object-contain'
			/>
		</div>
	);
};

export default Post;
