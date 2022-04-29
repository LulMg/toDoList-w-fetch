import React, { useState, useEffect } from "react";

//create your first component
const Home = (props) => {
	const [neWtask, setTask] = useState([]);
	const [input, setInput] = useState("");

	function getData() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/LulM")
			.then((response) => response.json())
			.then((result) => {
				setTask(result);
				console.log(result);
			})
			.catch((error) => console.log("Algo ha ido mal", error));
	}

	function putData() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(neWtask);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/LulM",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(neWtask, "BANDERAAAAAAAAA");
		if (neWtask.length > 0) {
			putData();
		}
	}, [neWtask]);

	const submit = (e) => {
		e.preventDefault();
		if (input !== "") {
			setTask([...neWtask, { label: input, done: false }]);
			setInput("");
		}
	};

	return (
		<div className="display-1 text-center mt-5">
			<p className="tittle">To Do list</p>
			<form onSubmit={(e) => submit(e)}>
				<div className="container">
					<div className="border bg-light p-4">
						<input
							onChange={(e) => setInput(e.target.value)}
							placeholder="Your task here"
							className="text-center border"
							value={input}
						/>
					</div>
				</div>
			</form>
			<div className="container">
				{neWtask?.map((task, id) => (
					<div key={id}>
						<Task
							value={task.label}
							id={id}
							neWtask={neWtask}
							setTask={setTask}
						/>
					</div>
				))}
			</div>
			<div className="container">
				<div className="border bg-light">
					<p className="taskNum ms-2 mt-2" id="pending">
						{neWtask?.length} pending tasks!
					</p>
				</div>
				<div className="border bg-light p-1 mx-3"></div>
				<div className="border bg-light p-1 mx-4"></div>
			</div>
		</div>
	);
};

function Task({ value, id, neWtask, setTask, task }) {
	const deleteTsk = (id) => {
		setTask(neWtask.filter((task, elm) => elm !== id));
	};

	return (
		<div className="border bg-light p-2" id="newTask">
			<div className="row d-flex">
				<div className="col text-start">{value}</div>

				<div className="col text-end">
					<button className="x btn" onClick={() => deleteTsk(id)}>
						❌
					</button>
				</div>
			</div>
		</div>
	);
}
export default Home;
