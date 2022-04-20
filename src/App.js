import { Routes, Route } from "react-router-dom";
import Employees from "./components/Employees/Employees";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import Navbar from "./components/Navbar/Navbar";
function App() {
	return (
		<div className="App">
			<Navbar />
			<main>
				<div className="container">
					<Routes>
						<Route path="/" element={<Employees />} />
						<Route path="/add" element={<AddEmployee />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;
