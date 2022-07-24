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

export default MemeError;
