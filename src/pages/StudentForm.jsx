import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudentAsync,
  updateStudentAsync,
} from '../features/students/studentsSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const [attendance, setAttendance] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  const location = useLocation();
  console.log(location);
  const { state: existingStudent } = location;

  useEffect(() => {
    if (existingStudent) {
      // console.log(existingStudent.name);
      setName(existingStudent.name || '');
      setAge(existingStudent.age || ' ');
      setGrade(existingStudent.grade || '');
      setGender(existingStudent.gender === 'Male' ? 'Male' : 'Female');
      setAttendance(existingStudent.attendance || '');
      setMarks(existingStudent.marks || '');
    }
  }, [existingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      name,
      age: Number(age),
      grade,
      gender,
      attendance: Number(attendance),
      marks: Number(marks),
    };

    // console.log(student);
    if (existingStudent) {
      dispatch(updateStudentAsync({ _id: existingStudent._id, ...student }));
      setMessage('Student updated successfully.');
    } else {
      dispatch(addStudentAsync(student));
      setMessage('Student added successfully.');
    }
    setName('');
    setAge('');
    setGrade('');
    setGender('');
    setAttendance('');
    setMarks('');
    // console.log(dispatch);

    // navigate('/');
  };

  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">{existingStudent ? 'Edit' : 'Add'} Student</h2>

        {message && <p className="alert alert-success">{message}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <input
              type="number"
              id="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              id="grade"
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label className="form-label">Gender: </label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              className="ms-2"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ms-2">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              className="ms-2"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ms-2">Female</label>
          </div>
          <br />
          {existingStudent && (
            <>
              <div>
                <input
                  type="number"
                  id="attendance"
                  placeholder="Attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
              </div>
              <br />
              <div>
                <input
                  type="number"
                  id="marks"
                  placeholder="Marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
              <br />
            </>
          )}

          <div className="py-3">
            <button id="addBtn" type="submit" className="btn btn-primary">
              {existingStudent ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default StudentForm;
