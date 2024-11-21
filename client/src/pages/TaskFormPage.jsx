import {useForm} from 'react-hook-form';
import { useTasks } from "../context/tasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from 'dayjs';
import  utc  from "dayjs/plugin/utc";
dayjs.extend(utc);


function TasksFormPage() {
    const navigate = useNavigate();
    const params = useParams();
    const {createTask, getTask, updateTask} = useTasks();

    const {
      register,
      setValue,
      handleSubmit,
      //formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format
            (),
        }


        if (params.id) {
            updateTask(params.id, dataValid);
          } else {
            createTask(dataValid);
          }
        navigate("/tasks");
    });

    useEffect(() => {
        const loadTask = async () => {
          if (params.id) {
            const task = await getTask(params.id);
            setValue("title", task.title);
            setValue("description", task.description);
            setValue(
              "date",
              task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
            );
            setValue("completed", task.completed);
          }
        };
        loadTask();
      }, []);
    
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

        <form onSubmit={handleSubmit(onSubmit)}>
         <label htmlFor="title">Title</label> 
            <input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
            />
            
            <label htmlFor="description">Description</label>
            <textarea 
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            ></textarea>

            <label htmlFor="date">Date</label>
            <input type="date" name="date" {...register("date")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
            <button className='bg-indigo-500 px-3 py-2 rounded-md'>
                Guardar
            </button>
        </form>

        </div>
        </div>
    )
}

export default TasksFormPage;