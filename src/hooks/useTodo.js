import { useEffect, useReducer } from 'react';
import { todoReducer } from '../todoreducer';
import todoApi from '../api/todoApi';





export const useTodo = () => {

	const initialState = []
	

	

	const [todos, dispatch] = useReducer(
		todoReducer,
		initialState
	);

	
    const todosCount = todos.length
    const pendingTodosCount = todos.filter(todo => !todo.done).length

	const getAllTodos = async() => {
		
		const response = await todoApi.get('/');
		const data =  response.data;
		dispatch({
			type: 'get all',
			payload: data,
		});
	

	}

	const createTodo = async(todo) => {
		const response = await todoApi.post('/', todo);
		const data =  response.data;
		dispatch({
			type: 'Add Todo',
			payload: data,
		});
	}

	useEffect(() => {
		getAllTodos();
	}
	, []);
  


	const handleNewTodo = async(todo) => {
		console.log(todo);
		const newTodo={
			title: todo.description,
			completed: todo.done
		}
		const response = await todoApi.post('/', newTodo);
		const data =  response.data;
		const action = {
			type: 'Add Todo',
			payload: data,
		};



		dispatch(action);
	};

	const handleDeleteTodo = async(id) => {

		await todoApi.delete(`/${id}`);

		const action = {
			type: 'Delete Todo',
			payload: id,
		};

		dispatch(action);
	};

	const handleCompleteTodo = id => {
		const action = {
			type: 'Complete Todo',
			payload: id,
		};

		dispatch(action);
	};

	const handleUpdateTodo = (id, description) => {
		const action = {
			type: 'Update Todo',
			payload: {
				id,
				description,
			},
		};

		dispatch(action);
	};

    return{
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleUpdateTodo
    }
};
