import { useState, useEffect } from 'preact/hooks';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';

const API_BASE = "https://ro0co4go04k0c4kg884oookg.caldwellwebservices.com"

export function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/todos`);
            if (!response.ok) throw new Error('Failed to fetch todos');
            const data = await response.json();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (text) => {
        try {
            const response = await fetch(`${API_BASE}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch (err) {
            setError(err.message);
            console.error('Error adding todo:', err);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !completed }),
            });
            if (!response.ok) throw new Error('Failed to update todo');
            const updatedTodo = await response.json();
            setTodos(todos.map(todo =>
                todo._id === id ? updatedTodo : todo
            ));
        } catch (err) {
            setError(err.message);
            console.error('Error updating todo:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete todo');
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (err) {
            setError(err.message);
            console.error('Error deleting todo:', err);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Todo App</h1>
            </header>

            <main className="app-main">
                <AddTodo onAdd={addTodo} />

                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}

                {loading ? (
                    <div className="loading">Loading todos...</div>
                ) : (
                    <TodoList
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                )}
            </main>
        </div>
    );
}
