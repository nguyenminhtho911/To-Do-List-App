import { useCallback, useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { v4 } from "uuid";

// uuid: tạo id duy nhất

function App() {
  const [todoList, setTodoList] = useState([]);
  const [job, setJob] = useState("");
  const [editTodo, setEditTodo] = useState({});
  // Get localstorage
  useEffect(() => {
    const storageTodoList = JSON.parse(localStorage.getItem("todoList")); // Lấy json parse ra mảng
    if (storageTodoList) {
      setTodoList(storageTodoList);
    }
  }, []);

  //Save localstorage
  const saveLocal = useCallback(() => {
    const jsonTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList", jsonTodoList);
  }, [todoList]);
  
  useEffect(() => {
    // const jsonTodoList = JSON.stringify(todoList);
    // localStorage.setItem("todoList", jsonTodoList);
    saveLocal();
  }, [todoList, saveLocal]);

  // add
  const handleSubmit = useCallback(() => {
    setTodoList((todoList) => [
      ...todoList,
      { id: v4(), name: job, isCompleted: false },
    ]);

    //reset input
    setJob("");
  }, [job]);

  //checkdone: cần id -> filter todolist xem việc làm nào có id tương ứng & cập nhật lại giá trị isCompleted từ false > true
  const checkDone = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  // Delete
  const deleteJob = (id) => {
    const newJobs = [...todoList];
    newJobs.splice(id, 1); // xóa 1 phần tử ở vị trí id
    setTodoList(newJobs);
  };

  // ** Edit Update **
  // keywork: js check object empty -> Object.keys(obj).length === 0;
  const handleEditTodo = (todo) => {
    let isEmptyObj = Object.keys(editTodo).length === 0; // true

    // *save
    // keywork: js update object in array
    if (isEmptyObj === false && editTodo.id === todo.id) {
      console.log("save");

      const todoListCopy = [...todoList];

      // Tìm phần tử thứ mấy
      let objIndex = todoListCopy.findIndex((item) => item.id === todo.id);

      //Update object's name property.
      todoListCopy[objIndex].name = editTodo.name;
      console.log(objIndex);

      setTodoList(todoListCopy);
      setEditTodo({});
      saveLocal();
      return;
    }
    // *edit
    setEditTodo(todo);
  };

  // check editTodo empty?
  let isEmptyObj;
  isEmptyObj = Object.keys(editTodo).length === 0; // true

  // Onchange EditTodo
  const handleOnchangeEditTodo = (e) => {
    let editTodoCopy = { ...editTodo };
    editTodoCopy.name = e.target.value;
    setEditTodo(editTodoCopy);
    console.log(editTodoCopy);
  };

  return (
    <div className="list">
      <h2>Danh sách cần làm</h2>
      <div className="input">
        <input
          placeholder="Thêm việc cần làm..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button disabled={!job} onClick={handleSubmit}>
          Thêm
        </button>
      </div>
      <TodoList
        todoList={todoList}
        checkDone={checkDone}
        deleteJob={deleteJob}
        handleEditTodo={handleEditTodo}
        editTodo={editTodo}
        isEmptyObj={isEmptyObj}
        handleOnchangeEditTodo={handleOnchangeEditTodo}
      />
    </div>
  );
}

export default App;
