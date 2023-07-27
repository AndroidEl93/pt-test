import styles from './Bonus.module.css';
import { useSelector } from 'react-redux';

const getFormatedDate = (date) => date?.split('T')[0].split('-').slice(1, 3).reverse().join('.');

function Bonus() {
	const bonusData = useSelector((state) => state.data.bonusData);
	const error = useSelector((state) => state.data.error);
	const isLoading = useSelector((state) => state.data.isLoading);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.preloader_wrap}>
					<svg className={styles.preloader} viewBox="0 0 50 50">
						<circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
					</svg>
				</div>
			) : error ? (
				<div className={styles.preloader_wrap}>Ошибка загрузки</div>
			) : (
				<>
					<div className={styles.headline}>{`${bonusData.currentQuantity} бонусов`}</div>
					<div className={styles.information}>
						<div>{`${getFormatedDate(bonusData.dateBurning)} сгорит`}</div>
						<img src="/img/fire.svg" alt="fite" />
						<div>{`${bonusData.forBurningQuantity} бонусов`}</div>
					</div>
					<div className={styles.button}>
						<img src="/img/ellipse.svg" alt="ellipse" />
						<img className={styles.arrow} src="/img/arrow.svg" alt="arrow" />
					</div>
				</>
			)}
		</div>
	);
}

export default Bonus;
