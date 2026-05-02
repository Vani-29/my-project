import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

function Teacher() {
  const [students, setStudents] = useState([]);
const [subject, setSubject] = useState("English");

  useEffect(() => {
  axios.get("http://localhost:5000/students")
    .then(res => setStudents(res.data));
}, []);
 
  const deleteStudent = async (id) => {
  await axios.delete(`http://localhost:5000/students/${id}`);

  const res = await axios.get("http://localhost:5000/students");
  setStudents(res.data);

  alert("✅ Student deleted successfully!");
};
 
const updateMarks = async (id, field, value) => {
  await axios.put(`http://localhost:5000/students/${id}`, {
    [field]: value
  });

  const res = await axios.get("http://localhost:5000/students");
  setStudents(res.data);
   alert("✅ Marks updated successfully!");
};
const getTopperId = () => {
  if (!students.length) return null;

  return students.reduce((max, s) =>
    Number(s.mid1 || 0) > Number(max.mid1 || 0) ? s : max
  )._id;
};
return (
  <div className="container">
    <h2>👨‍🏫 Teacher Panel</h2>

   
    <div className="card">
      <select onChange={(e) => setSubject(e.target.value)}>
        <option>English</option>
        <option>Data Structures</option>
        <option>Java</option>
        <option>Python</option>
      </select>
    </div>
<div className="card">
  <h2 >📊 Student Marks Table</h2>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Roll No</th>
        <th>Mid1</th>
        <th>Mid2</th>
        <th>Assignment</th>
        <th>Sem</th>
        <th>Comments</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      {students.map((s) => (
        <tr
          key={s._id}
          style={{
            background: s._id === getTopperId() ? "#d1fae5" : "white"
          }}
        >
          <td>{s.name}</td>
          <td>{s.rollNo}</td>

          <td><input onChange={(e)=>updateMarks(s._id,"mid1",e.target.value)} /></td>
          <td><input onChange={(e)=>updateMarks(s._id,"mid2",e.target.value)} /></td>
          <td><input onChange={(e)=>updateMarks(s._id,"assignment",e.target.value)} /></td>
          <td><input onChange={(e)=>updateMarks(s._id,"sem",e.target.value)} /></td>
          <td><input onChange={(e)=>updateMarks(s._id,"comment",e.target.value)} /></td>

          <td>
            <button onClick={() => deleteStudent(s._id)}>❌</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    <div className="card">
      Total Students: {students.length}
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

export default Teacher;