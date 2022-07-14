import { useCallback, useEffect, useState } from "react";
import { TodoList } from "./TodoList";

// uuid: tạo id duy nhất

function App() {
  const [todoList, setTodoList] = useState([]);
  const [job, setJob] = useState("");

  // Get localstorage
  useEffect(() => {
    const storageTodoList = JSON.parse(localStorage.getItem("todoList")) ?? []; // Lấy json parse ra mảng
    if (storageTodoList) {
      setTodoList(storageTodoList)
    }
  }, []);

  //Save localstorage
  useEffect(() => {
    const jsonTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList", jsonTodoList);
  }, [todoList]);

  // add
  const handleSubmit = useCallback(() => {
    setTodoList((prev) => [...prev, { name: job, isCompleted: false }]);

    //reset input
    setJob("");
  }, [job]);

  //checkdone: cần id -> filter todolist xem việc làm nào có id tương ứng & cập nhật lại giá trị isCompleted từ false > true
  const checkDone = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo, index) =>
        index === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  // Delete
  const deleteJob = (id) => {
			const newJobs = [...todoList]
			newJobs.splice(id, 1) // xóa 1 phần tử ở vị trí id
      
      setTodoList(newJobs)
      
  }

  return (
    <div className="list">
      <h2>Danh sách cần làm</h2>
      <div className="input">
        <input
          placeholder="Nhập việc làm..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button disabled={!job} onClick={handleSubmit}>
          Thêm
        </button>
      </div>
      <TodoList todoList={todoList} checkDone={checkDone} deleteJob={deleteJob}/>
    </div>
  );
}

export default App;
