import { useState, useRef } from "react";
function App() {
  const inputRef = useRef();

  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")); // Lấy json parse ra mảng
    return storageJobs ?? []; // null or undefine get []
  });

  const handleSubmit = () => {

    if(setJob == ' ') return

    //(2) tạo hàm submit lấy job thêm vào danh sách jobs
    setJobs((prev) => {
      const newJobs = [...prev, job];

      //Save to localstorage (3)
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });

    setJob(""); // Sau khi set ds setJobs thì sửa setJob thành chuỗi rỗng

    inputRef.current.focus();
  };

  const deleteJob = (index) => {
    const newJobs = [...jobs]; // tránh sửa mảng cũ, sửa mảng newJobs ko ảnh hưởng đến mảng cũ

    newJobs.splice(index, 1);

    //Save to localstorage
    const jsonJobs = JSON.stringify(newJobs);
    localStorage.setItem("jobs", jsonJobs);

    setJobs(newJobs);
  };


  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="form">
        <input
          className="form-control"
          ref={inputRef}
          value={job}
          onChange={(e) => setJob(e.target.value)} // (1) two-way binding
        />
        <button className="btn" onClick={handleSubmit}>Add</button>
      </div>

      <ul className="list-group">
        {jobs.map((job, index) => (
          <li key={index} className="list-group-item">
            {job}
            <span className="close" onClick={() => deleteJob(index)}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
