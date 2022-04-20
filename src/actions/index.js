import axios from "axios";
import * as employeesActions from "../constants";

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

const createNewEmployeeAction = (payload) => {
	return {
		type: employeesActions.default.CREATE_EMPLOYEE_ACTION,
		payload,
	};
};

/* SERVICES */
/* ---------------------------------------------------*/

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

export const createEmployee = (employeeData) => {
	return (dispatch) => {
		axios
			.post("http://localhost:5000/employees", employeeData)
			.then(() => {
				dispatch(createNewEmployeeAction(employeeData));
			});
	};
};

export function updateEmployeeStatus(status, employeeId) {
	return axios.patch(
		`http://localhost:5000/employees/${employeeId}`,
		{ status: status }
	);
}

/* SERVICES */
/* ---------------------------------------------------*/

export function confirmUpdateEmployeeStatusAction(
	status,
	id
) {
	return {
		type: employeesActions.default
			.CONFIRM_UPDATE_EMPLOYEE_STATUS_ACTION,
		payload: { status, id },
	};
}

export function updateEmployeeStatusAction(
	status,
	employeeId
) {
	return (dispatch) => {
		updateEmployeeStatus(status, employeeId).then(
			(response) => {
				dispatch(
					confirmUpdateEmployeeStatusAction(
						status,
						employeeId
					)
				);
			}
		);
	};
}
