import { Link } from 'react-router-dom';

const TeacherList = ({ teachers }) => {
  console.log(teachers);
  return (
    <section>
      <ul>
        {teachers && teachers.length > 0 && (
          <div>
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                <Link to={`/teachers/${teacher._id}`}>
                  {teacher.name} (Qualification: {teacher.qualification})
                </Link>
              </li>
            ))}
          </div>
        )}
      </ul>
    </section>
  );
};

export default TeacherList;
