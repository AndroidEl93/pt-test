import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const dataSlice = createSlice({
	name: 'data',
	initialState: {
		bonusData: null,
		error: null,
		isLoading: true,
	},
	reducers: {
		setBonusData: (state, action) => {
			state.bonusData = action.payload;
			state.isLoading = false;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setBonusData, setError } = dataSlice.actions;

const getAccessTokenAxiosConfig = {
	method: 'post',
	url: 'http://84.201.188.117:5021/api/v3/clients/accesstoken',
	headers: {
		AccessKey: process.env.REACT_APP_ACCESS_KEY,
	},
	data: {
		idClient: process.env.REACT_APP_CLIENT_ID,
		accessToken: '',
		paramName: 'device',
		paramValue: process.env.REACT_APP_DEVICE_ID,
		latitude: 0,
		longitude: 0,
		sourceQuery: 0,
	},
};

const getBonusInfoAxiosConfig = (accessToken) => ({
	method: 'get',
	url: `http://84.201.188.117:5003/api/v3/ibonus/generalinfo/${accessToken}`,
	headers: {
		AccessKey: process.env.REACT_APP_ACCESS_KEY,
	},
});

export const getBonus = () => {
	return (dispatch) =>
		axios(getAccessTokenAxiosConfig)
			.then((res) => {
				if (res.data?.result?.status === 0) {
					axios(getBonusInfoAxiosConfig(res.data?.accessToken))
						.then((res) => {
							if (res.data?.resultOperation?.status === 0) {
								dispatch(setBonusData(res.data?.data));
							} else {
								console.error(`getBonus error:`);
								console.error(`error message: ${res.data?.resultOperation?.message}`);
								console.error(`log id: ${res.data?.resultOperation?.idLog}`);
								dispatch(setError(true));
							}
						})
						.catch((error) => {
							console.error(`getBonus error:`);
							console.error(error);
							dispatch(setError(true));
						});
				} else {
					console.error(`getBonus error:`);
					console.error(`error message: ${res.data?.result?.message}`);
					console.error(`log id: ${res.data?.result?.idLog}`);
					dispatch(setError(true));
				}
			})
			.catch((error) => {
				console.error(`getBonus error:`);
				console.error(error);
				dispatch(setError(true));
			});
};

export default dataSlice.reducer;
