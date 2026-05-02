import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";
import jsPDF from "jspdf";
function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);
  const data = [
  { name: "English", value: 80 },
  { name: "DSA", value: 75 },
  { name: "Java", value: 85 },
  { name: "Python", value: 90 }
];
const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text("Student Report Card", 10, 10);
  doc.text("Name: VEMU Student", 10, 20);
  doc.text("Branch: CSE E", 10, 30);

  doc.save("report.pdf");
};


 return (
 

  <div className="container">
    
    <h2>👨‍🎓 Student Dashboard</h2>

    <div className="card">
      <h3>Student Info</h3>
      <p>Name: Ram</p>
      <p>College: Vemu Institute of Technology</p>
      <p>Branch: CSE - E </p>
      <p>Email:Ram72@gmail.com</p>
      <p>Mobile No:56748392</p>
    </div>

    <div className="card">
      <h3>📊 Marks</h3>
      {students.map((s, i) => (
        <div key={i}>
          <p>{s.subject}: {s.marks}</p>
        </div>
      ))}
    </div>
    <div className="card">
  <h3>📊 Performance Chart</h3>

  <PieChart width={300} height={300}>
    <Pie data={data} dataKey="value" outerRadius={100}>
      {data.map((entry, index) => (
        <Cell key={index} />
      ))}
    </Pie>
  </PieChart>
</div>

    <button onClick={downloadPDF}>⬇ Download PDF</button>
     <button onClick={() => {
  localStorage.clear();
  window.location.href = "/";
}}>
  🚪 Logout
</button>
  </div>
  
);
}

export default Student;