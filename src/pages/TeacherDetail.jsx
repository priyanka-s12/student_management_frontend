import Header from '../components/Header/';
import {
  fetchTeachers,
  deleteTeacherAsync,
} from '../features/teachers/teachersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeacherDetail = () => {
  const [message, setMessage] = useState('');
  const { teacherId } = useParams();
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);

  const teacherData = teachers?.find((teacher) => teacher._id === teacherId);

  console.log(teacherData);

  const handleDelete = (teacherId) => {
    dispatch(deleteTeacherAsync(teacherId));
    setMessage('Teacher deleted successfully');
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          <h2 className="mb-3">Teacher Detail</h2>

          {message && <p className="alert alert-success">{message}</p>}
          {error && <p className="alert alert-danger">{error}</p>}
          {teacherData ? (
            <>
              <p>Name: {teacherData.name}</p>
              <p>Age: {teacherData.age}</p>
              <p>Gender: {teacherData.gender}</p>
              <p>Qualification: {teacherData.qualification}</p>
              <p>Year of Experience: {teacherData.yearOfExperience}</p>

              <button className="btn btn-warning me-2">
                <Link
                  to={`/editteacher/${teacherData._id}`}
                  state={teacherData}
                >
                  Edit Details
                </Link>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(teacherData._id)}
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
        </section>
      </main>
    </>
  );
};

export default TeacherDetail;
