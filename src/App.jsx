import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });

  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) return;
    fetch("http://localhost:3001/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);
        setNewStudent({ name: "", class: "", age: "" });
        setShowModal(false);
      });
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xoá sinh viên "${name}" (ID: ${id})?`);
    if (!confirmDelete) return;

    fetch(`http://localhost:3001/students/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setStudents((prev) => prev.filter((sv) => sv.id !== id));
      })
      .catch((err) => console.error("Lỗi xoá sinh viên:", err));
  };



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">📋 Danh sách sinh viên</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Thêm sinh viên
          </button>
        </div>

        <table className="w-full text-left border">
          <thead className="bg-blue-100">
            <tr>
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
                    onClick={() => handleDelete(sv.id, sv.name)}
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

      {/* Modal thêm sinh viên */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Thêm sinh viên mới</h2>
            <input
              type="text"
              placeholder="Họ tên"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Lớp"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <input
              type="number"
              placeholder="Tuổi"
              className="w-full mb-4 px-3 py-2 border rounded"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddStudent}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
