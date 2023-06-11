import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, FormGroup, FormLabel, FormSelect, Row, Button, Table, FormControl } from 'react-bootstrap';
import Title from '~/components/Title';
import url from '../../../../jsconfig';
function AddGrade() {
    const [classes, setClasses] = useState('');
    const [classSelect, setClassSelect] = useState('');
    const [subjects, setSubjects] = useState('');
    const [students, setStudents] = useState('');
    const [dataP, setDataP] = useState([]);
    const [idArr, setIdArr] = useState([]);
    const [subSubmit, setSubSubmit] = useState('');
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });
    useEffect(() => {
        axios.post(`${url.SERVER_URL}/api/query`, ['classes']).then((res) => {
            setClasses(res.data.classes);
        });
    }, []);
    useEffect(() => {
        axios.get(`${url.SERVER_URL}/api/subjects/list`).then((res) => {
            setSubjects(res.data);
        });
    }, []);
    const handleChangeClass = (e) => {
        setClassSelect(e.target.value);
    };

    const handleFetchData = () => {
        axios
            .get(`${url.SERVER_URL}/api/students/by-class`, {
                params: { classes: classSelect },
            })
            .then((res) => {
                setStudents(res.data);
                const d = [];
                const id = [];
                res.data.map((data) => {
                    const st = { id: data.id };
                    d.push(st);
                    id.push(data.id);
                    return 0;
                });
                setDataP(d);
                setIdArr(id);
            });
    };

    const handleChange = (e, id) => {
        for (let x in dataP) {
            if (id === dataP[x].id) {
                setDataP([
                    ...dataP,
                    {
                        ...dataP[x],
                        id: id,
                        [e.target.name]: e.target.value,
                        subject: subSubmit,
                        class: classSelect,
                    },
                ]);
            }
        }
    };
    const handleChangeSubject = (e) => {
        setSubSubmit(e.target.value);
    };
    const handleClick = () => {
        const data = [];
        idArr.map((id) => {
            let lastElement = dataP.findLast((item) => item.id === id);
            data.push(lastElement);
            return 0;
        });
        axios.post(`${url.SERVER_URL}/api/grades/add`, data).then((res) => {
            setMessage({
                err: res.data.code === 200 ? false : true,
                mess: res.data.message,
            });
        });
    };
    return (
        <>
            <Title title="Thêm điểm" />
            {message.mess ? <div className={message.err ? 'text-danger' : 'text-success'}>{message.mess}</div> : <></>}
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Học phần</FormLabel>
                    <FormSelect onChange={handleChangeSubject}>
                        <option>Chọn học phần</option>
                        {subjects ? (
                            subjects.map((subject) => (
                                <option value={subject.id} key={subject.id}>
                                    {subject.name}
                                </option>
                            ))
                        ) : (
                            <></>
                        )}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Lớp</FormLabel>
                    <FormSelect onChange={handleChangeClass}>
                        <option>Chọn lớp</option>
                        {classes ? (
                            classes.map((nClass, index) => <option key={nClass.id}>{nClass.name}</option>)
                        ) : (
                            <></>
                        )}
                    </FormSelect>
                </FormGroup>
            </Row>
            <Button variant="primary" onClick={handleFetchData} className="m-3">
                {' '}
                Lấy danh sách học viên
            </Button>
            <Table striped hover>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Họ và Tên</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col" width="80px">
                            TP1
                        </th>
                        <th scope="col" width="80px">
                            TP2
                        </th>
                        <th scope="col" width="80px">
                            Thi L1
                        </th>
                        <th scope="col" width="80px">
                            Thi L2
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {students ? (
                        students.map((student, index) => {
                            return (
                                <tr key={student.id}>
                                    <th scope="row">{++index}</th>
                                    <td>{student.name}</td>
                                    <td>{student.code}</td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="grade1"
                                            min={0}
                                            max={10}
                                            onChange={(e) => handleChange(e, student.id)}
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="grade2"
                                            min={0}
                                            max={10}
                                            onChange={(e) => handleChange(e, student.id)}
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="exam1"
                                            min={0}
                                            max={10}
                                            onChange={(e) => handleChange(e, student.id)}
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="exam2"
                                            min={0}
                                            max={10}
                                            onChange={(e) => handleChange(e, student.id)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleClick} className="btn btn-primary mt-3">
                Thêm điểm
            </Button>
        </>
    );
}

export default AddGrade;
