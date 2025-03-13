import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import StatusContainer from "./components/StatusContainer/StatusContainer";
export interface ITask {
  status: string;
  task: string;
}
function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem("tasks")!) || []);
  const [activeTask, setActivTask] = useState<number | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("tasks", JSON.stringify([...tasks, { status: "todo", task: input }]));
    setTasks((prev) => [...prev, { status: "todo", task: input }]);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }, [tasks]);

  const handleOnDrop = (status: string, position: number) => {
    // console.log(`${activeTask} is going to place at ${status} container and at the position ${position}`);
    if (activeTask === null || activeTask === undefined) return;
    const taskToMove = tasks[activeTask];

    const updatedTask = tasks.filter((_, idx) => idx !== activeTask);
    updatedTask.splice(position, 0, {
      ...taskToMove,
      status: status,
    });
    setTasks(updatedTask);
  };
  return (
    <>
      <h1 className="text-4xl text-blue-500">Task Management</h1>
      <form id="input-div" className="" onSubmit={handleSubmit}>
        <input type="text" className="" id="input" name="todo" onChange={(e) => setInput(e.target.value)} />
        <button id="btn" type="submit">
          Add Task
        </button>
      </form>

      <div className="board-container">
        <StatusContainer status="todo" heading="Todo" tasks={tasks} setActiveTask={setActivTask} handleOnDrop={handleOnDrop} />
        <StatusContainer status="ongoing" heading="Ongoing" tasks={tasks} setActiveTask={setActivTask} handleOnDrop={handleOnDrop} />
        <StatusContainer status="completed" heading="Completed" tasks={tasks} setActiveTask={setActivTask} handleOnDrop={handleOnDrop} />
      </div>
    </>
  );
}

export default App;
