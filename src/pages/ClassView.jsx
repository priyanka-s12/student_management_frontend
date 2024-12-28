import Header from '../components/Header';
import {
  fetchStudents,
  setFilter,
  setSortBy,
} from '../features/students/studentsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ClassView = () => {
  const dispatch = useDispatch();

  //state variables
  const { students, filter, sortBy, status, error } = useSelector(
    (state) => state.students
  );

  console.log(students, filter);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  //filters the students based on the selected filter value.
  const filteredStudents = students.filter((student) =>
    filter === 'Boys'
      ? student.gender === 'Male'
      : filter === 'Girls'
      ? student.gender === 'Female'
      : student
  );
  console.log(filteredStudents);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  //sorting functionality for students based on the selected sortBy value.
  const sortedStudents = filteredStudents.sort((a, b) =>
    sortBy === 'name'
      ? a.name.localeCompare(b.name)
      : sortBy === 'marks'
      ? b.marks - a.marks
      : b.attendance - a.attendance
  );

  console.log(sortedStudents);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">Class View</h2>

        <div className="mb-3">
          <label className="me-2">Filter by Gender: </label>
          <select onChange={handleFilterChange} value={filter}>
            <option value="All">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="me-2">Sort by: </label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
        {status === 'loading' && (
          <p className="alert alert-primary">Loading...</p>
        )}
        <div>
          <ul>
            {sortedStudents.map((student) => (
              <li key={student._id}>
                {student.name} - {student.gender} - Marks:{' '}
                {student.marks || 'Unknown'} - Attendance:{' '}
                {student.attendance || 'Unknown'}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default ClassView;
