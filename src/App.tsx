import { useState } from "react";
import Dropdown from "./components/multi-dropdown";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Dropdown />
		</div>
	);
}

export default App;
