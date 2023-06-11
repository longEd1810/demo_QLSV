const router = require('express').Router();

const QueryController = require('../controllers/QueryController');
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentController = require('../controllers/StudentController');
const TeacherController = require('../controllers/TeacherController');
const SubjectController = require('../controllers/SubjectController');
const ClassController = require('../controllers/ClassController');
const SemesterController = require('../controllers/SemesterController');
const GradeController = require('../controllers/GradeController');
const ClassroomController = require('../controllers/ClassroomController');
const RoleController = require('../controllers/RoleController');
const UploadController = require('../controllers/UploadController');

const initWebRoutes = (app) => {
    router.post('/register', RegisterController);
    router.post('/login', LoginController);
    router.post('/upload', UploadController);

    router.post('/students/add', StudentController.AddStudent);
    router.get('/students/list', StudentController.ListStudent);
    router.get('/students/no-class', StudentController.ListStudentNoClass);
    router.get('/students/by-class', StudentController.ListStudentByClass);
    router.post('/students/update-class', StudentController.UpdateClassStudent);
    router.get('/students/id', StudentController.GetStudentById);
    router.post('/students/update', StudentController.UpdateStudent);
    router.delete('/students/delete', StudentController.DeleteStudent);

    router.post('/teachers/add', TeacherController.AddTeacher);
    router.get('/teachers/list', TeacherController.ListTeacher);
    router.get('/teachers/id', TeacherController.GetTeacherById);
    router.post('/teachers/update', TeacherController.UpdateTeacher);

    router.post('/subjects/add', SubjectController.AddSubject);
    router.get('/subjects/list', SubjectController.ListSubject);
    router.get('/subjects/id', SubjectController.GetSubjectById);
    router.get('/subjects/department', SubjectController.GetSubjectByDepartment);
    router.post('/subjects/update', SubjectController.UpdateSubject);

    router.post('/grades/add', GradeController.AddGrade);
    router.get('/grade/find-grade-by-student-id', GradeController.FindGradeByStudentID);

    router.post('/classes/add', ClassController.AddClass);

    router.post('/semesters/add', SemesterController.AddSemester);
    router.get('/semesters/list-by-course', SemesterController.ListSemester);

    router.post('/classrooms/add', ClassroomController.AddClassroom);
    router.post('/classrooms/count', ClassroomController.CountClassroom);
    router.post('/classrooms/find', ClassroomController.FindClassroom);
    router.post('/classrooms/add-teacher-id', ClassroomController.AddTeacherToClassroom);

    router.get('/roles/list', RoleController.ListRoles);

    router.post('/query', QueryController);
    return app.use('/api', router);
};

module.exports = initWebRoutes;
