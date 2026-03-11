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
        className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5 sm:p-3
          hover:bg-white/[0.08] transition-all duration-300 text-white/40 hover:text-white/70"
      >
        <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Mobile: Full screen modal, Desktop: Popup */}
      <div className={`
        fixed sm:absolute inset-0 sm:inset-auto sm:bottom-14 sm:left-0
        w-full sm:w-80 md:w-[340px]
        h-full sm:h-auto
        backdrop-blur-2xl bg-black/90 sm:bg-black/70 
        sm:border sm:border-white/[0.08] sm:rounded-2xl 
        p-5 sm:p-5
        shadow-2xl z-50
        flex flex-col
        transition-all duration-500 origin-bottom-left
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 sm:hidden w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-white/50 font-semibold mb-4 sm:mb-3 text-sm sm:text-[10px] tracking-[0.2em] uppercase mt-8 sm:mt-0"
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          ✨ Chill Tasks
        </h3>

        <div className="flex-1 sm:flex-none space-y-2 sm:space-y-1.5 max-h-none sm:max-h-56 overflow-y-auto pr-1 custom-scrollbar">
          {todos.length === 0 && (
            <p className="text-white/20 text-sm sm:text-xs text-center py-8 sm:py-4">
              No tasks yet. Add one below! 👇
            </p>
          )}
          {todos.map(todo => (
            <div key={todo.id}
              className={`flex items-center gap-3 sm:gap-2 group p-3 sm:p-2 rounded-xl sm:rounded-lg bg-white/[0.02] sm:bg-transparent hover:bg-white/[0.04] transition-all
                ${todo.done ? 'opacity-40' : ''}`}>
              <button
                onClick={() => setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))}
                className={`w-6 h-6 sm:w-5 sm:h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all
                  ${todo.done ? 'bg-emerald-500/40 border-emerald-500/40' : 'border-white/20 hover:border-amber-400/40'}`}
              >
                {todo.done && <Check className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-white" />}
              </button>
              <span className={`text-sm sm:text-xs flex-1 ${todo.done ? 'line-through text-white/30' : 'text-white/60'}`}
                style={{ fontFamily: 'Nunito, sans-serif' }}>
                {todo.text}
              </span>
              <button
                onClick={() => setTodos(prev => prev.filter(t => t.id !== todo.id))}
                className="opacity-50 sm:opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400/60 transition-all p-1"
              >
                <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 sm:gap-2 mt-4 sm:mt-3 pt-4 sm:pt-3 border-t border-white/[0.06]">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="add a task..."
            className="flex-1 bg-white/[0.04] rounded-xl sm:rounded-lg px-4 sm:px-3 py-3 sm:py-2 text-sm sm:text-xs text-white/60
              placeholder-white/20 border border-white/[0.06] focus:border-amber-500/30
              focus:outline-none transition-all"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          />
          <button
            onClick={addTodo}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400/80 rounded-xl sm:rounded-lg px-4 sm:p-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
