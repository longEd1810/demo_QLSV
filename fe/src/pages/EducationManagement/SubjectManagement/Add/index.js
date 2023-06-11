import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Title from '../../../../components/Title';
import url from '../../../../jsconfig';
function AddSubject() {
    const navigate = useNavigate();
    const [department, setDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        code: ' ',
        department: '   ',
        all: '',
        theory: '',
        practice: '',
        exercise: '',
    });
    useEffect(() => {
        axios.post(`${url.SERVER_URL}/api/query`, ['departments']).then((res) => {
            setDepartment(res.data.departments);
        });
    }, []);
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleClick = (e) => {
        e.preventDefault();
        axios.post(`${url.SERVER_URL}/api/subjects/add`, formData).then((res) => {
            res.data.code === 200 ? navigate('/subjects/list') : setMessage(res.data.message);
        });
    };
    return (
        <Form>
            <Title title={'Thêm môn học'} />
            {message ? <div className="text-danger">{message}</div> : <></>}
            <Row>
                <FormGroup as={Col} controlId="formSubjectName">
                    <FormLabel>Tên môn</FormLabel>
                    <FormControl type="text" placeholder="Nhập Tên môn" name="name" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col} controlId="formSubjectId">
                    <FormLabel>Mã học phần</FormLabel>
                    <FormControl type="text" placeholder="Nhập Mã học phần" name="code" onChange={handleChange} />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Khoa</FormLabel>
                    <FormSelect name="department" onChange={handleChange}>
                        <option>Chọn khoa</option>
                        {department ? (
                            department.map((dep, index) => <option key={dep.id}>{dep.name}</option>)
                        ) : (
                            <option>Chọn khoa</option>
                        )}
                    </FormSelect>
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col} controlId="formAll">
                    <FormLabel>Tổng số tiết</FormLabel>
                    <FormControl type="number" placeholder="Nhập Tổng số tiết" name="all" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col} controlId="formTheory">
                    <FormLabel>Số tiết lý thuyết</FormLabel>
                    <FormControl
                        type="number"
                        placeholder="Nhập Số tiết lý thuyết"
                        name="theory"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup as={Col} controlId="formPractice">
                    <FormLabel>Số tiết thực hành</FormLabel>
                    <FormControl
                        type="number"
                        placeholder="Nhập Số tiết thực hành"
                        name="practice"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup as={Col} controlId="formExercise">
                    <FormLabel>Số tiết bài tập</FormLabel>
                    <FormControl
                        type="number"
                        placeholder="Nhập Số tiết bài tập"
                        name="exercise"
                        onChange={handleChange}
                    />
                </FormGroup>
            </Row>
            <Button variant="primary" className="m-3" onClick={handleClick}>
                Thêm môn học
            </Button>
        </Form>
    );
}

export default AddSubject;
