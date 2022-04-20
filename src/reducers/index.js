import * as employeesActions from "../constants";
const actions = employeesActions.default;

const updateState = (oldState, newState) => {
	return {
		...oldState,
		...newState,
	};
};

const initialState = {
	employeesList: [],
	isLoading: false,
	isError: false,
};

const startFetching = (state, action) => {
	return updateState(state, {
		employeesList: [],
		isLoading: true,
		isError: false,
	});
};

const fetchingSuccess = (state, action) => {
	return updateState(state, {
		isLoading: false,
		employeesList: action.employees,
		isError: false,
	});
};

const fetchingFailed = (state, action) => {
	return updateState(state, {
		isLoading: false,
		employeesList: [],
		isError: action.error,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.EMPLOYEES.LOAD:
			return startFetching(state, action);
		case actions.EMPLOYEES.LOAD_SUCCESS:
			return fetchingSuccess(state, action);
		case actions.EMPLOYEES.LOAD_FAILED:
			return fetchingFailed(state, action);

		default:
			return state;
	}
};

export default reducer;
