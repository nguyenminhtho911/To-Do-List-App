import React from "react";
import { Todo } from "./Todo";

export const TodoList = ({
  todoList,
  checkDone,
  deleteJob,
  handleEditTodo,
  editTodo,
  isEmptyObj,
  handleOnchangeEditTodo
}) => {
  // const count = useRef(0)
  return (
    <ul>
      {/* <h5>Render: {count.current++}</h5> */}
      {todoList.map((todo, index) => (
        <Todo
          todo={todo}
          key={todo.id}
          id={todo.id}
          index={index}
          checkDone={checkDone}
          deleteJob={deleteJob}
          handleEditTodo={handleEditTodo}
          editTodo={editTodo}
          isEmptyObj={isEmptyObj}
          handleOnchangeEditTodo={handleOnchangeEditTodo}
        />
      ))}
    </ul>
  );
};
