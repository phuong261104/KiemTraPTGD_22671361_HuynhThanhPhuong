import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/students/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setStudents((prev) => prev.filter((sv) => sv.id !== id));
      })
      .catch((err) => console.error("Lỗi xoá:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">📋 Danh sách sinh viên</h1>

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Lớp</th>
              <th className="p-2 border">Tuổi</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((sv) => (
              <tr key={sv.id} className="hover:bg-gray-50">
                <td className="p-2 border">{sv.name}</td>
                <td className="p-2 border">{sv.class}</td>
                <td className="p-2 border">{sv.age}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(sv.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
