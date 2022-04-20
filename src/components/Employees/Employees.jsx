import React, { useEffect } from "react";
import "./Employees.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useSelector, useDispatch } from "react-redux";
import {
	requestEmployees,
	updateEmployeeStatusAction,
} from "../../actions";

const Employees = () => {
	const { employeesList, isLoading } = useSelector(
		(state) => state
	);

	const dispatch = useDispatch();
	// const [status, useStatus] = useState('Added')
	useEffect(() => {
		if (employeesList) dispatch(requestEmployees());
	}, []);

	const onRadioChange = (e, id) => {
		console.log("radio checked", e.target.value);
		console.log(id);
		dispatch(
			updateEmployeeStatusAction(e.target.value, id)
		);
	};

	return (
		<div>
			{isLoading ? (
				<LoadingButton
					loading
					loadingIndicator="Loading..."
					variant="text"
				>
					Fetch data
				</LoadingButton>
			) : (
				<>
					<Button
						component={Link}
						to="/add"
						variant="contained"
						style={{ marginBottom: 15, float: "right" }}
					>
						Add
					</Button>

					<TableContainer>
						<Table
							style={{ backgroundColor: "white" }}
							size="small"
						>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Job Title</TableCell>
									<TableCell>Stauts</TableCell>
									<TableCell>Change Status</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{employeesList?.map((item, index) => {
									return (
										<TableRow key={item.id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>
												{item.firstName}
											</TableCell>
											<TableCell>{item.lastName}</TableCell>
											<TableCell>{item.email}</TableCell>
											<TableCell>
												{item.jobTitleName}
											</TableCell>
											<TableCell>{item.status}</TableCell>
											<TableCell>
												<FormControl>
													<RadioGroup name="row-radio-buttons-group">
														<FormControlLabel
															checked={
																item.status === "Added"
															}
															control={<Radio />}
															label="Added"
															value="Added"
															style={{ fontSize: 14 }}
															onChange={(e) =>
																onRadioChange(e, item.id)
															}
														/>
														<FormControlLabel
															checked={
																item.status === "In-Check"
															}
															value="In-Check"
															control={<Radio />}
															label="In-Check"
															onChange={(e) =>
																onRadioChange(e, item.id)
															}
														/>
														<FormControlLabel
															checked={
																item.status === "Approved"
															}
															value="Approved"
															control={<Radio />}
															label="Approved"
															onChange={(e) =>
																onRadioChange(e, item.id)
															}
														/>
														<FormControlLabel
															checked={
																item.status === "Active"
															}
															value="Active"
															control={<Radio />}
															label="Active"
															onChange={(e) =>
																onRadioChange(e, item.id)
															}
														/>
														<FormControlLabel
															checked={
																item.status === "In-Active"
															}
															value="In-Active"
															control={<Radio />}
															label="In-Active"
															onChange={(e) =>
																onRadioChange(e, item.id)
															}
														/>
													</RadioGroup>
												</FormControl>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</div>
	);
};

export default Employees;
