import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  deleteStudentAsync,
  fetchStudents,
} from '../features/students/studentsSlice';

const StudentDetail = () => {
  const [message, setMessage] = useState('');

  const { studentid } = useParams();
  console.log(studentid);

  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const students = useSelector((state) => {
    // console.log(state.students.students);
    return state.students.students;
  });

  const studentData = students?.find((student) => student._id == studentid);
  console.log(studentData);

  const handleDelete = (studentid) => {
    // console.log(studentid);
    dispatch(deleteStudentAsync(studentid));
    setMessage('Student deleted successfully.');
    // navigate('/');
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">Student Detail</h2>

        {message && <p className="alert alert-success">{message}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
        {studentData ? (
          <>
            <p>Name: {studentData.name}</p>
            <p>Age: {studentData.age}</p>
            <p>Grade: {studentData.grade}</p>
            <p>Gender: {studentData.gender}</p>
            {studentData.attendance ? (
              <p>Attendance: {studentData.attendance}</p>
            ) : (
              ''
            )}
            {studentData.marks ? <p>Marks: {studentData.marks}</p> : ''}

            {/* Passing the student's data as state in the link. */}
            <button className="btn btn-warning me-2">
              <Link to={`/editstudent/${studentData._id}`} state={studentData}>
                Edit Details
              </Link>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(studentData._id)}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            {status === 'loading' && (
              <p className="alert alert-primary">Loading...</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDetail;
