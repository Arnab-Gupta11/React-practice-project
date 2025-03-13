/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./DropArea.css";
const DropArea = ({ handleOnDrop, status, position }: { handleOnDrop: any; status: string; position: number }) => {
  const [showDropArea, setShowDropArea] = useState<boolean>(false);
  return (
    <div
      className={`${showDropArea ? "drop-area" : "hide-drop-area"}`}
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => {
        handleOnDrop(status, position);
        setShowDropArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      DropArea
    </div>
  );
};

export default DropArea;
