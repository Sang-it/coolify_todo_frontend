import { TodoItem } from './TodoItem';

export function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>No todos yet. Add one above!</p>
            </div>
        );
    }

    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <div className="todo-list">
            {activeTodos.length > 0 && (
                <div className="todo-section">
                    <h2 className="section-title">Active ({activeTodos.length})</h2>
                    <ul className="todo-items">
                        {activeTodos.map(todo => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))}
                    </ul>
                </div>
            )}
            
            {completedTodos.length > 0 && (
                <div className="todo-section">
                    <h2 className="section-title">Completed ({completedTodos.length})</h2>
                    <ul className="todo-items">
                        {completedTodos.map(todo => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}