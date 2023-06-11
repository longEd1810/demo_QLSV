import { Col, Row } from 'react-bootstrap';

import Button from '~/components/Button';
import Title from '~/components/Title';
import { useSelector } from 'react-redux';

function GradeManagement() {
    const user = useSelector((state) => state.mainReducer.user.user);

    return (
        <>
            <Title title={'Quản lý điểm'} />
            {user.role_symbol === '2' ? (
                <Button to={`/grades/find/${user.id}`} primary>
                    {' '}
                    Xem điểm
                </Button>
            ) : (
                <Row>
                    <Col>
                        <Button to="/grades/add" primary>
                            {' '}
                            Thêm điểm
                        </Button>
                    </Col>
                    <Col>
                        <Button to="/grades/find" primary>
                            {' '}
                            Tra cứu điểm
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default GradeManagement;
