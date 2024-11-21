import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import  TaskCard   from "../components/TaskCard";




 function TasksPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);


    if (tasks.lenght === 0) return (<h1>No hay tareas aun...</h1>);
    
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">{
            tasks.map (task => (
                <TaskCard task={task} key={task._id}/>
            ))}
        </div>
    )
}

export default TasksPage;
