import React, { useState } from "react";
import "./App.css";

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
	return (
		<div
			className="todo"
			style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
		>
			{todo.text}
			<div>
				<button onClick={() => completeTodo(index)}>Complete</button>
				<button onClick={() => removeTodo(index)}>X</button>
			</div>
		</div>
	);
};

const TodoForm = ({ addTodo }) => {
	const [value, setValue] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
};

const App2 = () => {
	const [todos, setTodos] = useState([
		{
			text: "Todo 1",
			isCompleted: false,
		},
		{
			text: "Todo 2",
			isCompleted: false,
		},
		{
			text: "Todo 3",
			isCompleted: false,
		},
	]); //array con estos 3 valores iniciales

	const addTodo = (text) => {
		const newTodos = [{ text }, ...todos]; //añade text al principio del array de todos
		setTodos(newTodos); //actualizamos el array de todos
	};

	const completeTodo = (index) => {
		const newTodos = [...todos]; //copiamos el array todos
		newTodos[index].isCompleted = true; //modificamos el atributo isComplete de la copia
		setTodos(newTodos); //actualizamos el array de todos
	};

	const removeTodo = (index) => {
		const newTodos = [...todos]; //copiamos el array todos
		newTodos.splice(index, 1); //eliminamos el todo de la copia
		setTodos(newTodos); //actualizamos el array de todos
	};

	return (
		<div className="app">
			<div className="todo-list">
				<TodoForm addTodo={addTodo} />
				{todos.map((todo, index) => (
					<Todo
						key={index}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
						removeTodo={removeTodo}
					/>
				))}
			</div>
		</div>
	);
};

export default App2;
