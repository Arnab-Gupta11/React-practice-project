import { Dispatch, SetStateAction } from "react";
import { ITask } from "../../App";
import TaskCard from "../TaskCard/TaskCard";
import "./StatusContainer.css";
import DropArea from "../DropArea/DropArea";
type TStatusContainer = {
  status: string;
  heading: string;
  tasks: ITask[] | [];
  setActiveTask: Dispatch<SetStateAction<number | null>>;
  handleOnDrop: (status: string, position: number) => void;
};
const StatusContainer = ({ status, heading, tasks, setActiveTask, handleOnDrop }: TStatusContainer) => {
  return (
    <div className="status-container">
      <div
        className={`status-container-heading ${
          status === "todo" ? "todo-container" : status === "ongoing" ? "ongoing-container" : "completed-container"
        }`}
      >
        {heading}
      </div>
      <div className="status-card-container">
        <DropArea handleOnDrop={handleOnDrop} status={status} position={0} />
        {tasks.length > 0 &&
          tasks.map(
            (task, idx) =>
              task.status === status && (
                <div key={idx}>
                  <TaskCard task={task} id={idx} setActiveTask={setActiveTask} />
                  <DropArea handleOnDrop={handleOnDrop} status={status} position={idx + 1} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default StatusContainer;
