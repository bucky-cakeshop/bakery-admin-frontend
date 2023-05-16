import { useEffect, useState } from "react";
import { getAllTasks } from '../api/tasks.api'
import { ItemCard } from "./ItemCard";

export function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
            console.log(res);

        }
        loadTasks();
    }, [])
    return (
        <div className="grid grid-cols-3 gap-3">
            {
                tasks.map(task => (
                    <ItemCard key={task.id} task={task}></ItemCard>
                ))
            }

        </div>
    );
}