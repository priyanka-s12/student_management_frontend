import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { fetchTeachers } from './teachersSlice';
import TeacherList from './TeacherList';

const TeacherView = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => {
    return state.teachers;
  });
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  return (
    <div>
      <Header />
      <main className="container py-3">
        <section>
          <h2 className="mb-3">Teacher View</h2>
          <Link className="btn btn-warning" to="/addTeacher">
            Add Teacher
          </Link>
        </section>

        <section className="mt-3">
          <h3>Teacher List</h3>
          {status === 'loading' && (
            <p className="alert alert-primary">Loading...</p>
          )}
          {error ? <p className="alert alert-danger">{error}</p> : ''}
          {teachers && <TeacherList teachers={teachers.teachers} />}
        </section>
      </main>
    </div>
  );
};

export default TeacherView;
