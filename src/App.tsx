import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';

const App = () => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default App;
