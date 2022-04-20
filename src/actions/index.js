import axios from "axios";
import * as employeesActions from "../constants";

export const CREATE_EMPLOYEE_ACTION =
	"CREATE_EMPLOYEE_ACTION";

export const UPDATE_EMPLOYEE_STATUS_ACTION =
	"UPDATE_EMPLOYEE_STATUS_ACTION";

export const CONFIRM_UPDATE_EMPLOYEE_STATUS_ACTION =
	"CONFIRM_UPDATE_EMPLOYEE_STATUS_ACTION";

const startFetching = () => {
	return {
		type: employeesActions.default.EMPLOYEES.LOAD,
	};
};

const fetchingSuccess = (employees) => {
	return {
		type: employeesActions.default.EMPLOYEES.LOAD_SUCCESS,
		employees: employees,
	};
};
const fetchingFailed = (error) => {
	return {
		type: employeesActions.default.EMPLOYEES.LOAD_FAILED,
		error: error,
	};
};

export const requestEmployees = () => async (dispatch) => {
	dispatch(startFetching());
	try {
		const json = await axios.get(
			"http://localhost:5000/employees"
		);
		dispatch(fetchingSuccess(json.data));
	} catch (e) {
		dispatch(fetchingFailed(e));
	}
};

export function createEmployee(employeeData) {
	return axios.post(
		"http://localhost:5000/employees",
		employeeData
	);
}

export function updateEmployeeStatus(status, employeeId) {
	return axios.patch(
		`http://localhost:5000/employees/${employeeId}`,
		{ status: status }
	);
}

export function createEmployeeAction(employeeData) {
	return (dispatch) => {
		createEmployee(employeeData).then((response) => {
			console.log(response.data);
		});
	};
}

export function confirmUpdateEmployeeStatusAction(status) {
	return {
		type: CONFIRM_UPDATE_EMPLOYEE_STATUS_ACTION,
		payload: status,
	};
}

export function updateEmployeeStatusAction(
	status,
	employeeId
) {
	return (dispatch) => {
		updateEmployeeStatus(status, employeeId).then(
			(response) => {
				dispatch(confirmUpdateEmployeeStatusAction(status));
			}
		);
	};
}
