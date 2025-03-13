import { Dispatch, SetStateAction } from "react";
import { ITask } from "../../App";
import "./TaskCard.css";
interface ITaskCardProp {
  task: ITask;
  id: number;
  setActiveTask: Dispatch<SetStateAction<number | null>>;
}
const TaskCard = ({ task, setActiveTask, id }: ITaskCardProp) => {
  return (
    <div className="task-card" draggable onDragStart={() => setActiveTask(id)} onDragEnd={() => setActiveTask(null)}>
      {task.task}
    </div>
  );
};

export default TaskCard;
