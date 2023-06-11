import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Title from '../../../../components/Title';
import { Col, Row, Table } from 'react-bootstrap';
import Loading from '../../../../components/Loading';
import url from '../../../../jsconfig';
function FindGradeStudent() {
    const match = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [grade, setGrade] = useState([]);
    const [studentID, setStudentID] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${url.SERVER_URL}/api/grade/find-grade-by-student-id`, {
                params: { student_id: match.id },
            })
            .then((res) => {
                setGrade(res.data);
            });
        axios
            .get(`${url.SERVER_URL}/api/students/id`, {
                params: { id: match.id },
            })
            .then((res) => {
                setStudentID([res.data]);
                setIsLoading(false);
            });
    }, []);
    return (
        <>
            <Title title={'Xem điểm'} />
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
        </>
    );
}

export default FindGradeStudent;
