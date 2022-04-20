import React, { useState } from "react";
import Button from "@mui/material/Button/Button";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createEmployeeAction } from "../../actions";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const initialState = {
		firstName: "",
		lastName: "",
		email: "",
		jobTitleName: "",
		status: "Added",
	};
	const [newEmployee, setNewEmployee] =
		useState(initialState);

	const handleInputChange = (e) => {
		let { value, name } = e.target;
		setNewEmployee({ ...newEmployee, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createEmployeeAction(newEmployee));
		navigate("/");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="First Name"
					name="firstName"
					value={newEmployee.firstName}
					style={{ marginBottom: 30 }}
					onChange={handleInputChange}
				/>
				<TextField
					fullWidth
					label="Last Name"
					name="lastName"
					value={newEmployee.lastName}
					style={{ marginBottom: 30 }}
					onChange={handleInputChange}
				/>
				<TextField
					fullWidth
					label="Email"
					name="email"
					value={newEmployee.email}
					style={{ marginBottom: 30 }}
					onChange={handleInputChange}
				/>
				<TextField
					fullWidth
					label="Job Title"
					name="jobTitleName"
					value={newEmployee.jobTitleName}
					style={{ marginBottom: 30 }}
					onChange={handleInputChange}
				/>
				<Button
					variant="contained"
					type="submit"
					onClick={handleSubmit}
				>
					Add Employee
				</Button>
			</form>
		</>
	);
};

export default AddEmployee;
