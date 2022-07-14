import React from "react";

export const Todo = ({ todo, checkDone, id, deleteJob}) => {

  return (
    <li className={todo.isCompleted === true ? "done" : null}>
      <p>{todo.name}</p>
      <p className="icon"><span className="icon-done" onClick={() => checkDone(id)}></span>
      <span className="close" onClick={() => deleteJob(id)}></span></p>

    </li>
  );
};
