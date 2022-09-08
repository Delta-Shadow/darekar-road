import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import PostOptions from './pages/PostOptions';
import PostTemplatedMeme from './pages/PostTemplatedMeme';
import PostCustomMeme from './pages/PostCustomMeme';
import PostTemplate from './pages/PostTemplate';

const App = () => {
	console.log(`public URL is: ${process.env.PUBLIC_URL}`);
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className='flex flex-col bg-zinc-900 w-screen min-h-screen'>
				<div className='pt-4 px-4 flex flex-row gap-4 justify-evenly text-zinc-600 text-md md:justify-end'>
					<Link to='/'>Memes</Link>
					<Link to='/post'>Post</Link>
					<Link to='/post/template'>New Template</Link>
				</div>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route path='/post'>
						<Route
							index
							element={<PostOptions />}
						/>
						<Route
							path='editor'
							element={<PostTemplatedMeme />}
						/>
						<Route
							path='custom'
							element={<PostCustomMeme />}
						/>
						<Route
							path='template'
							element={<PostTemplate />}
						/>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
