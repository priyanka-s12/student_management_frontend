import Header from '../components/Header';
import { useEffect } from 'react';
import {
  fetchStudents,
  updateSchoolStats,
  setTopStudent,
} from '../features/students/studentsSlice';
import {
  fetchTeachers,
  updateTeacherStats,
} from '../features/teachers/teachersSlice';
import { useSelector, useDispatch } from 'react-redux';

const SchoolView = () => {
  const { students, status } = useSelector((state) => state.students);
  const { schoolStats } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  //   console.log(schoolStats);

  const { teachers } = useSelector((state) => state.teachers);
  const { teacherStats } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;

      //getting NaN - if attendance field value not present
      //attendance
      const totalAttendance = students.reduce(
        (acc, curr) => acc + (curr.attendance || 0),
        0
      );
      //   console.log(totalAttendance);
      const averageAttendance = (totalAttendance / totalStudents).toFixed(2);

      //marks
      const totalMarks = students.reduce(
        (acc, curr) => acc + (curr.marks || 0),
        0
      );
      //   console.log(totalMarks);
      const averageMarks = (totalMarks / totalStudents).toFixed(2);

      //top student
      const topStudent = students.reduce(
        (acc, curr) => (acc.marks < curr.marks ? curr : acc),
        students[0]
      );
      console.log(topStudent);

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageMarks,
          averageAttendance,
          topStudent,
        })
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [students]);

  useEffect(() => {
    if (teachers.length > 0) {
      const totalTeachers = teachers.length;
      const averageAge = (
        teachers.reduce((acc, curr) => acc + curr.age, 0) / totalTeachers
      ).toFixed(2);

      console.log(averageAge);

      const averageExperience = (
        teachers.reduce((acc, curr) => acc + curr.yearOfExperience, 0) /
        totalTeachers
      ).toFixed(2);
      console.log(averageExperience);

      dispatch(
        updateTeacherStats({ totalTeachers, averageAge, averageExperience })
      );
    }
  }, [teachers]);

  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">School View</h2>
        {status === 'loading' && (
          <p className="alert alert-primary">Loading...</p>
        )}
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">
                <h3>Students Stats</h3>
              </div>
              <div className="card-body">
                <p>Total Students: {schoolStats.totalStudents}</p>
                <p>Average Attendance: {schoolStats.averageAttendance}</p>
                <p>Average Marks: {schoolStats.averageMarks}</p>
                <p>Top Student: {schoolStats && schoolStats.topStudent.name}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Teacher Stats</h3>
              </div>
              <div className="card-body">
                <p>Total Teachers: {teacherStats.totalTeachers}</p>
                <p>Average Age: {teacherStats.averageAge}</p>
                <p>Average Experience: {teacherStats.averageExperience}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SchoolView;
