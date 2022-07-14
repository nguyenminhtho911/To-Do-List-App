import React from "react";

export const Todo = ({ 
	todo, checkDone, id, index, deleteJob, handleEditTodo, editTodo, isEmptyObj,
	handleOnchangeEditTodo
}) => {

  return (
    <li className={todo.isCompleted === true ? "done" : null}>

	{/* 
		- check điều kiện khi nào thì cho input edit hiện ra
		- load lần đầu {} -> true - click set todo vào -> false
		- nếu editTodo.id === todo.id in ra input ngược lại in name ban đầu
	*/}
      {isEmptyObj === true ?
		<p>{index + 1} - {todo.name}</p>
		:
		<>
			{ editTodo.id === todo.id ?
				<p> 
					{index + 1} - 
					<input
						value={editTodo.name}
						onChange={handleOnchangeEditTodo}

					/>
				</p>
				:
				<p>{index + 1} - {todo.name}</p>

			}
		</>
      }

      <div className="icon">
				{todo.isCompleted === false && <button className="edit"
					onClick={() => handleEditTodo(todo)}>
						{
							isEmptyObj === false && editTodo.id === todo.id ? "Save" : "Edit"
						}
				</button>}
        

        <span className="icon-done" onClick={() => checkDone(id)}></span>
        <span className="close" onClick={() => deleteJob(id)}></span>
      </div>

    </li>
  );
};
