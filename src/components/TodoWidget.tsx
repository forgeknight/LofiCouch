import { useState, useEffect, useRef } from 'react';
import { Plus, X, Check, ListTodo } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function TodoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('loficouch-todos');
      return saved ? JSON.parse(saved) : [
        { id: 1, text: 'Sink into the couch 🛋️', done: false },
        { id: 2, text: 'Listen to some beats 🎵', done: false },
        { id: 3, text: 'Sip on something warm ☕', done: false },
      ];
    } catch {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem('loficouch-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: newTodo.trim(), done: false }]);
    setNewTodo('');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5
          hover:bg-white/[0.08] transition-all duration-300 text-white/40 hover:text-white/70"
      >
        <ListTodo className="w-4.5 h-4.5" />
      </button>

      <div className={`absolute bottom-12 left-0 w-72 backdrop-blur-2xl bg-black/60 border border-white/[0.08]
        rounded-2xl p-4 shadow-2xl z-50
        transition-all duration-500 origin-bottom-left
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
        
        <h3 className="text-white/50 font-semibold mb-3 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          ✨ Chill Tasks
        </h3>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {todos.map(todo => (
            <div key={todo.id}
              className={`flex items-center gap-2 group p-1.5 rounded-lg hover:bg-white/[0.03] transition-all
                ${todo.done ? 'opacity-35' : ''}`}>
              <button
                onClick={() => setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))}
                className={`w-4.5 h-4.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all
                  ${todo.done ? 'bg-emerald-500/40 border-emerald-500/40' : 'border-white/15 hover:border-amber-400/40'}`}
              >
                {todo.done && <Check className="w-2.5 h-2.5 text-white" />}
              </button>
              <span className={`text-xs flex-1 ${todo.done ? 'line-through text-white/25' : 'text-white/50'}`}
                style={{ fontFamily: 'Nunito, sans-serif' }}>
                {todo.text}
              </span>
              <button
                onClick={() => setTodos(prev => prev.filter(t => t.id !== todo.id))}
                className="opacity-0 group-hover:opacity-100 text-white/15 hover:text-red-400/50 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.04]">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="add a task..."
            className="flex-1 bg-white/[0.04] rounded-lg px-3 py-1.5 text-xs text-white/60
              placeholder-white/15 border border-white/[0.04] focus:border-amber-500/20
              focus:outline-none transition-all"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          />
          <button
            onClick={addTodo}
            className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-400/70 rounded-lg p-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
