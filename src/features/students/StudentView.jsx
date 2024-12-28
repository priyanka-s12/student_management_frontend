import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchStudents } from './studentsSlice';
import StudentList from './StudentList';

const StudentView = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => {
    // console.log(state.students);
    return state.students;
  });

  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <main className="container py-3">
        <section>
          <h2 className="mb-3">Student View</h2>
          <Link className="btn btn-warning" to="/addstudent">
            Add Student
          </Link>
        </section>
        <section className="mt-3">
          <h3>Student List</h3>
          {status == 'loading' && (
            <p className="alert alert-primary">Loading...</p>
          )}
          {error ? <p className="alert alert-danger">{error}</p> : ''}
          {students && <StudentList students={students.students} />}
          {/* <StudentList students={students.students} /> */}
          {/* <ul>
            {students.students.map((student) => (
              <li key={student._id}>
                {student.name} (Age: {student.age})
              </li>
            ))}
          </ul> */}
        </section>
      </main>
    </div>
  );
};
export default StudentView;
