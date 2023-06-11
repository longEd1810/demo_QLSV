const { generateUID } = require('../services/generateUID');
const { addTeacher, listTeacher, getTeacherById, updateTeacher } = require('../services/CRUD');

const AddTeacher = async (req, res) => {
    const body = req.body;
    body.id = generateUID(20);

    body.name = `${body.firstname.trim() + ' ' + body.lastname.trim()}`;
    const result = await addTeacher(body);
    result
        ? res.status(200).json({ code: 200, message: 'Create teacher success' })
        : res.status(401).json({ code: 401, message: 'Error' });
};
const ListTeacher = async (req, res) => {
    const teachers = await listTeacher();
    const tch = [];
    teachers.map((teacher) => {
        tch.push({
            id: teacher.id,
            code: teacher.code,
            name: teacher.name,
            gender: teacher.gender,
            department: teacher.department,
        });
    });
    res.status(200).send(tch);
};
const GetTeacherById = async (req, res) => {
    const id = req.query.id;
    const teacher = await getTeacherById(id);
    res.status(200).send(teacher[0]);
};
const UpdateTeacher = async (req, res) => {
    const body = req.body;
    body.name = `${body.firstname.trim() + ' ' + body.lastname.trim()}`;
    body.gender = Number(body.gender);
    const { id, firstname, lastname, ...other } = body;
    const resultQ = await updateTeacher(id, other);
    resultQ
        ? res.status(200).json({ code: 200, message: 'Update teacher successfully' })
        : res.status(401).json({ code: 401, message: 'Error' });
};
module.exports = {
    AddTeacher,
    ListTeacher,
    GetTeacherById,
    UpdateTeacher,
};
