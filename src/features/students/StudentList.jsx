import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
  // console.log(students);
  return (
    <section>
      <ul>
        {students && students.length > 0 && (
          <div>
            {students.map((student) => (
              <li key={student._id}>
                <Link to={`/students/${student._id}`}>
                  {student.name} (Age: {student.age})
                </Link>
              </li>
            ))}
          </div>
        )}
      </ul>
    </section>
  );
};

export default StudentList;
