import { useRef, useState } from 'react';

import {
    FormGroup,
    Table,
    Button as ButtonBootstrap,
    FormControl,
    Tabs,
    Tab,
    FormLabel,
    Col,
    Row,
} from 'react-bootstrap';

import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as xlsx from 'xlsx';

import Title from '~/components/Title';
import axios from 'axios';
import Loading from '../../../../components/Loading';
import url from '../../../../jsconfig';
function ListSubject() {
    const fileRef = useRef();

    const [showExcel, setShowExcel] = useState(false);
    const [excelHeaderValue, setExcelHeaderValue] = useState([]);
    const [excelBodyValue, setExcelBodyValue] = useState([]);
    const [valueFetch, setValueFetch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = xlsx.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
            data.splice(0, 3);
            const header = data.splice(0, 1);
            setShowExcel(true);
            setExcelHeaderValue(header);
            setExcelBodyValue(data);
        };
        reader.readAsBinaryString(file);
    };
    const handleFetchData = () => {
        setIsLoading(true);
        axios.get(`${url.SERVER_URL}/api/subjects/list`).then((res) => {
            setValueFetch(res.data);
            setIsLoading(false);
        });
    };
    const ExportToExcel = () => {
        const worksheet = xlsx.utils.json_to_sheet(valueFetch);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        xlsx.writeFile(workbook, 'DataSheet.xlsx');
    };
    return (
        <>
            <Title title="Danh sách môn học" />
            <Tabs defaultActiveKey={'list'} transition className="m-3">
                <Tab eventKey={'list'} title="Danh sách môn học">
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
                    <FormGroup as={Col}>
                        <FormLabel>Tra cứu</FormLabel>
                        <br />
                        <ButtonBootstrap variant="primary" onClick={handleFetchData}>
                            Tra cứu
                        </ButtonBootstrap>
                        <ButtonBootstrap
                            variant="primary"
                            className="ms-1"
                            disabled={!valueFetch}
                            onClick={ExportToExcel}
                        >
                            Xuất excel
                        </ButtonBootstrap>
                    </FormGroup>
                    <div className="scroll">
                        {valueFetch ? (
                            <Table striped hover className="table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col" width="200px">
                                            Tên môn
                                        </th>
                                        <th scope="col">MMH</th>
                                        <th scope="col" width="200px">
                                            Khoa
                                        </th>
                                        <th scope="col">Tổng số tiết</th>
                                        <th scope="col">Lý thuyết</th>
                                        <th scope="col">Thực hành</th>
                                        <th scope="col">Bài tập</th>
                                        <th scope="col">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {valueFetch.map((value, index) => (
                                        <tr key={index}>
                                            <th scope="row">{++index}</th>
                                            <td>{value.name}</td>
                                            <td>{value.code}</td>
                                            <td>{value.department}</td>
                                            <td>{value.all}</td>
                                            <td>{value.theory}</td>
                                            <td>{value.practice}</td>
                                            <td>{value.exercise}</td>
                                            <td>
                                                <a
                                                    className="btn btn-primary btn-sm"
                                                    href={`/subjects/edit/${value.id}`}
                                                >
                                                    <FontAwesomeIcon icon={faPenSquare} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <></>
                        )}
                    </div>
                </Tab>
                <Tab eventKey={'import'} title="Import file excel">
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
                    <input type="hidden" value={excelBodyValue} />
                    {showExcel && (
                        <>
                            <Title title="Preview" />
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        {excelHeaderValue[0].map((item, index) => (
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
                                                <th scope="col" key={index}>
                                                    {item}
                                                </th>
                                            ))}
                                            <td>
                                                <a className="btn btn-primary btn-sm" href="/">
                                                    <FontAwesomeIcon icon={faPenSquare} />
                                                </a>
                                            </td>
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

export default ListSubject;
