import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentForm from './pages/StudentForm';
import StudentDetail from './pages/StudentDetail';
import ClassView from './pages/ClassView';
import SchoolView from './pages/SchoolView';
import TeacherView from './features/teachers/TeacherView';
import TeacherDetail from './pages/TeacherDetail';
import TeacherForm from './pages/TeacherForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/addstudent',
    element: <StudentForm />,
  },
  {
    path: '/students/:studentid',
    element: <StudentDetail />,
  },
  {
    path: '/editstudent/:studentid',
    element: <StudentForm />,
  },
  {
    path: '/classes',
    element: <ClassView />,
  },
  {
    path: '/school',
    element: <SchoolView />,
  },
  {
    path: '/teachers',
    element: <TeacherView />,
  },
  {
    path: '/teachers/:teacherId',
    element: <TeacherDetail />,
  },
  {
    path: '/addteacher',
    element: <TeacherForm />,
  },
  {
    path: '/editteacher/:teacherId',
    element: <TeacherForm />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
