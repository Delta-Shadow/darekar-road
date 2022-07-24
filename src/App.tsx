import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';

const App = () => {
	return (
		<BrowserRouter>
			<div className='flex flex-col bg-zinc-900 w-screen min-h-screen'>
				<div className='pt-4 px-4 flex flex-row gap-4 justify-evenly text-zinc-600 text-md md:justify-end'>
					<Link to='/'>Memes</Link>
					<Link to='/post'>Post</Link>
				</div>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/post'
						element={<Post />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
