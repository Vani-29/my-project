import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

return (
  <div className="container">
    
    <h2>🧑‍💼 Admin Dashboard</h2>
    <div className="card">
  <h3>📊 System Overview</h3>
  <p>Total Students: {students.length}</p>
  <p>Total Subjects: 4</p>
</div>
<div className="card">
  <h3>➕ Add Subject</h3>
  <input placeholder="New Subject Name" />
  <button>Add Subject</button>
</div>

    <div className="card">
      <h3>All Students</h3>

     <table border="1" width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Roll No</th>
     
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {students.map(s => (
      <tr key={s._id}>
        <td>{s.name}</td>
        <td>{s.rollNo}</td>
      
        <td>
          <button>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    <button onClick={() => {
  localStorage.clear();
  window.location.href = "/";
}}>
  🚪 Logout
</button>
  </div>
);
 
}


export default Admin;