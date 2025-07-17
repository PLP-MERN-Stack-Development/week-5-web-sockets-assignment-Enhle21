import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';

function App() {
    const [chores, setChores] = useState([]);
    const [title, setTitle] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [user, setUser] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [filter, setFilter] = useState('all');

    const getChores = async () => {
        const res = await axios.get('/api/chores');
        setChores(res.data);
    };

    const addChore = async () => {
        await axios.post('/api/chores', { title, assignedTo, dueDate });
        getChores();
        setTitle('');
        setAssignedTo('');
        setDueDate('');
    };

    const completeChore = async (id, isCompleted) => {
        await axios.put(`/api/chores/${id}`, { isCompleted: !isCompleted });
        getChores();
    };

    const deleteChore = async (id) => {
        await axios.delete(`/api/chores/${id}`);
        getChores();
    };

    useEffect(() => {
        getChores();
    }, []);

    if (!user) return <AuthForm onLogin={setUser} />;

    let filteredChores = chores;
    if (filter === "completed") filteredChores = chores.filter(c => c.isCompleted);
    if (filter === "overdue") filteredChores = chores.filter(c => new Date(c.dueDate) < new Date() && !c.isCompleted);

    return (
        <div>
            <h1>ChoreMate 🧹</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chore Title" />
            <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assign to" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button onClick={addChore}>Add Chore</button>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
            </select>
            <ul>
                {filteredChores.map(chore => (
                    <li key={chore._id}>
                        <span style={{ textDecoration: chore.isCompleted ? 'line-through' : 'none' }}>
                            {chore.title} - {chore.assignedTo || "Unassigned"} - 
                            <span style={{ color: new Date(chore.dueDate) < new Date() ? 'red' : 'black' }}>
                                Due: {new Date(chore.dueDate).toLocaleDateString()}
                            </span>
                        </span>
                        <button onClick={() => completeChore(chore._id, chore.isCompleted)}>
                            {chore.isCompleted ? 'Undo' : 'Done'}
                        </button>
                        <button onClick={() => deleteChore(chore._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;