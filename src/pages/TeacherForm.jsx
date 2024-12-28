import Header from '../components/Header';
import { useState, useEffect } from 'react';
import {
  addTeacherAsync,
  updateTeacherAsync,
} from '../features/teachers/teachersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    qualification: '',
    yearOfExperience: '',
  });
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);
  const { state: existingTeacher } = location;
  console.log(existingTeacher);

  useEffect(() => {
    if (existingTeacher) {
      if (
        existingTeacher.name &&
        existingTeacher.age &&
        existingTeacher.gender &&
        existingTeacher.qualification &&
        existingTeacher.yearOfExperience
      ) {
        setFormData(existingTeacher);
      }
    }
  }, [existingTeacher]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === 'radio' && checked
          ? value
          : name === 'age' || name === 'yearOfExperience'
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const teacher = {
      ...formData,
    };

    if (existingTeacher) {
      dispatch(updateTeacherAsync({ _id: existingTeacher._id, ...teacher }));
      setMessage('Teacher updated successfully');
    } else {
      dispatch(addTeacherAsync(teacher));
      setMessage('Teacher added successfully');
    }

    console.log(formData);
    //resetting form
    const emptyValues = {
      name: '',
      age: '',
      gender: '',
      qualification: '',
      yearOfExperience: '',
    };

    setFormData(emptyValues);
  };

  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          <h2 className="mb-3">{existingTeacher ? 'Edit' : 'Add'} Teacher</h2>
          {message && <p className="alert alert-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <br />
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                value={formData.age}
                required
              />
            </div>
            <br />
            <div>
              <label>Gender: </label>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Male"
                className="ms-2"
                checked={formData.gender === 'Male'}
                required
              />
              <label className="ms-2">Male</label>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Female"
                className="ms-2"
                checked={formData.gender === 'Female'}
                required
              />
              <label className="ms-2">Female</label>
            </div>
            <br />
            <div>
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                onChange={handleChange}
                value={formData.qualification}
                required
              />
            </div>
            <br />
            <div>
              <input
                type="number"
                name="yearOfExperience"
                placeholder="Year of experience"
                onChange={handleChange}
                value={formData.yearOfExperience}
                required
              />
            </div>
            <br />
            <div>
              <button type="submit" className="btn btn-primary">
                {existingTeacher ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default TeacherForm;
