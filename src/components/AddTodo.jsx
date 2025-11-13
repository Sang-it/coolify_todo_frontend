import { useState } from 'preact/hooks';

export function AddTodo({ onAdd }) {
    const [text, setText] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!text.trim()) return;
        
        setIsAdding(true);
        await onAdd(text.trim());
        setText('');
        setIsAdding(false);
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="add-todo-input"
                placeholder="What needs to be done?"
                value={text}
                onInput={(e) => setText(e.target.value)}
                disabled={isAdding}
            />
            <button 
                type="submit" 
                className="add-todo-button"
                disabled={!text.trim() || isAdding}
            >
                {isAdding ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
}