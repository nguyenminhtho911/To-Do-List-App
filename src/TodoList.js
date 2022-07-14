import React from "react";
import { Todo } from "./Todo";

export const TodoList = ({ todoList, checkDone, deleteJob }) => {
  // const count = useRef(0)
  return (
    <ul>
      {/* <h5>Render: {count.current++}</h5> */}
      {todoList.map((todo, index) => (
        <Todo todo={todo} key={index} id={index} checkDone={checkDone} deleteJob={deleteJob} />
      ))}
    </ul>
  );
};
