export function TodoItem({ todo, onToggle, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id, todo.completed)}
                />
                <span className="todo-text">{todo.text}</span>
                <span className="todo-date">
                    {formatDate(todo.createdAt)}
                </span>
            </div>
            <button
                className="delete-button"
                onClick={() => onDelete(todo._id)}
                aria-label="Delete todo"
            >
                ×
            </button>
        </li>
    );
}