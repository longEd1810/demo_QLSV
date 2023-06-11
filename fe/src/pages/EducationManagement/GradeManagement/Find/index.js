import axios from 'axios';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    Col,
    FormGroup,
    FormLabel,
    Tab,
    Tabs,
    Button as ButtonBootstrap,
    Table,
    FormControl,
    Row,
    FormSelect,
} from 'react-bootstrap';
import * as xlsx from 'xlsx';
import Search from '~/components/Search';
import Title from '~/components/Title';
import Loading from '~/components/Loading';
import url from '../../../../jsconfig';
function FindGrade() {
    const [showExcel, setShowExcel] = useState(false);
    const [excelHeaderValue, setExcelHeaderValue] = useState([]);
    const [excelBodyValue, setExcelBodyValue] = useState([]);
    const [classes, setClasses] = useState('');
    const [classSelect, setClassSelect] = useState('');
    const [student, setStudent] = useState('');
    const [studentSelect, setStudentSelect] = useState('');
    const [grade, setGrade] = useState([]);
    const [studentID, setStudentID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const valueFetch = false;

    const fileRef = useRef();
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = xlsx.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

            data.splice(0, 1);
            const header = data.splice(0, 2);
            setShowExcel(true);
            setExcelHeaderValue(header);
            setExcelBodyValue(data);
        };
        reader.readAsBinaryString(file);
    };
    useEffect(() => {
        setIsLoading(true);
        axios.post(`${url.SERVER_URL}/api/query`, ['classes']).then((res) => {
            setClasses(res.data.classes);
            setIsLoading(false);
        });
    }, []);
    const handleChangeClass = (e) => {
        setClassSelect(e.target.value);
    };
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${url.SERVER_URL}/api/students/by-class`, {
                params: { classes: classSelect },
            })
            .then((res) => {
                setStudent(res.data);
                setIsLoading(false);
            });
    }, [classSelect]);
    const handleChangeStudent = (e) => {
        setStudentSelect(e.target.value);
    };
    const handleClickToFindGrade = () => {
        setIsLoading(true);
        axios
            .get(`${url.SERVER_URL}/api/grade/find-grade-by-student-id`, {
                params: { student_id: studentSelect },
            })
            .then((res) => {
                setGrade(res.data);
            });
        axios
            .get(`${url.SERVER_URL}/api/students/id`, {
                params: { id: studentSelect },
            })
            .then((res) => {
                setStudentID([res.data]);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Title title={'Tra cứu điểm'} />
            <Tabs defaultActiveKey={'find'} transition className="m-3">
                <Tab eventKey={'find'} title="Tra cứu điểm">
                    {isLoading ? (
                        <Row>
                            <Col></Col>
                            <Col>
                                <Loading />
                            </Col>{' '}
                            <Col></Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    <Row>
                        <FormGroup as={Col}>
                            <FormLabel>Lớp</FormLabel>
                            <FormSelect onChange={handleChangeClass}>
                                <option>Chọn lớp</option>
                                {classes ? classes.map((c) => <option key={c.id}>{c.name}</option>) : <></>}
                            </FormSelect>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Học viên</FormLabel>
                            <FormSelect onChange={handleChangeStudent}>
                                <option>Chọn học viên</option>
                                {student ? (
                                    student.map((std) => (
                                        <option key={std.id} value={std.id}>
                                            {std.name}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </FormSelect>
                        </FormGroup>
                    </Row>
                    <FormGroup as={Col}>
                        <FormLabel>Tra cứu</FormLabel>
                        <br />
                        <ButtonBootstrap
                            variant="primary"
                            className="btn btn-primary mb-3"
                            onClick={handleClickToFindGrade}
                        >
                            Tra cứu
                        </ButtonBootstrap>
                        <ButtonBootstrap
                            variant="primary"
                            className="btn btn-primary mb-3 ms-1"
                            type="submit"
                            disabled={!valueFetch}
                        >
                            Xuất excel
                        </ButtonBootstrap>
                    </FormGroup>
                    {studentID ? (
                        <div className="scroll">
                            <Table striped hover bordered className="text-center table-responsive">
                                <thead>
                                    <tr>
                                        <th colSpan="4" scope="colgroup">
                                            Học viên
                                        </th>
                                        {grade ? (
                                            grade.map((sbj, index) => (
                                                <th colSpan="5" scope="colgroup" key={index}>
                                                    {sbj.name}
                                                </th>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                    <tr>
                                        <td>STT</td>
                                        <td>MSV</td>
                                        <td style={{ width: '100px' }}>Họ Tên</td>
                                        <td>Lớp</td>
                                        {grade ? (
                                            grade.map((sbj, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <td>TP1</td>
                                                        <td>TP2</td>
                                                        <td>THI</td>
                                                        <td>TKHP</td>
                                                        <td>Chữ</td>
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {studentID ? (
                                            studentID.map((std, index) => (
                                                <React.Fragment key={index}>
                                                    <th scope="row">{++index}</th>
                                                    <th>{std.code}</th>
                                                    <th>{std.name}</th>
                                                    <th>{std.class}</th>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                        {grade ? (
                                            grade.map((grd, index) => (
                                                <React.Fragment key={index}>
                                                    <th>{grd.grade.grade1}</th>
                                                    <th>{grd.grade.grade2}</th>
                                                    <th>
                                                        {grd.grade.exam2
                                                            ? `${grd.grade.exam1}|${grd.grade.exam2}`
                                                            : grd.grade.exam1}
                                                    </th>
                                                    <th>
                                                        {grd.grade.average2
                                                            ? `${grd.grade.average1}|${grd.grade.average2}`
                                                            : grd.grade.average1}
                                                    </th>
                                                    <th>
                                                        {grd.grade.letter2
                                                            ? `${grd.grade.letter1}|${grd.grade.letter2}`
                                                            : grd.grade.letter1}
                                                    </th>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <> </>
                    )}
                </Tab>
                <Tab eventKey={'import'} title="Import file excel">
                    <Search showStudentSelect showSubjectSelect />
                    <FormGroup>
                        <ButtonBootstrap onClick={() => fileRef.current.click()} className="m-2">
                            Nhập file excel
                        </ButtonBootstrap>
                        <FormControl
                            type="file"
                            ref={fileRef}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="d-none"
                            onChange={handleChangeFile}
                        />
                    </FormGroup>
                    {showExcel && (
                        <>
                            <Title title="Preview" />
                            <Table striped hover bordered className="text-center">
                                <col />
                                <colgroup span="2"></colgroup>
                                <colgroup span="2"></colgroup>
                                <thead>
                                    <tr>
                                        {excelHeaderValue[0].map((item, index) => (
                                            <>
                                                {index === 0 ? (
                                                    <th colSpan="12" scope="colgroup" key={index}>
                                                        {item}
                                                    </th>
                                                ) : (
                                                    <th colSpan="5" key={index}>
                                                        {item}
                                                    </th>
                                                )}
                                            </>
                                        ))}
                                    </tr>
                                    <tr>
                                        {excelHeaderValue[1].map((item, index) => (
                                            <th scope="col" key={index}>
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelBodyValue.map((items, index) => (
                                        <tr key={index}>
                                            {items.map((item, index) => (
                                                <th key={index}>{item}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Tab>
            </Tabs>
        </>
    );
}

export default FindGrade;
