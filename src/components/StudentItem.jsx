// src/components/StudentItem.jsx

const StudentItem = ({ student, onDelete, onEdit }) => {
    return (
      <tr className="hover:bg-gray-50">
        <td className="p-2 border">{student.name}</td>
        <td className="p-2 border">{student.class}</td>
        <td className="p-2 border">{student.age}</td>
        <td className="p-2 border">
          <button
            onClick={() => onDelete(student.id, student.name)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
          <button
            onClick={() => onEdit(student)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded ml-2"
          >
            Sửa
          </button>
        </td>
      </tr>
    );
  };
  
  export default StudentItem;
  