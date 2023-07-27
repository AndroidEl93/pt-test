import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBonus } from './store/dataSlice';
import Bonus from './components/Bonus';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBonus());
	}, [dispatch]);

	return (
		<div className="App">
			<div className="header">
				<div className="logo">ЛОГОТИП</div>
				<img src="/img/info.svg" alt="info" />
			</div>
			<div className="bonus_wrap">
				<Bonus />
			</div>
			<div className="rectangle"></div>
		</div>
	);
}

export default App;
