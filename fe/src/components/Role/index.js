import { forwardRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Col, Row, Button as BootstrapButton } from 'react-bootstrap';
import Image from '../Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.setItem('role_symbol', '0');
        navigate('/');
    };
    return (
        <span className="d-flex flex-column bg-light border rounded-3">
            <Button to="/home">Cài đặt</Button>
            <BootstrapButton onClick={handleLogOut}>Đăng xuất</BootstrapButton>
        </span>
    );
};

const Icon = forwardRef((props, ref) => {
    return <FontAwesomeIcon ref={ref} icon={faCircleChevronDown} />;
});

const Role = ({ showDropdown, name, role }) => {
    return (
        <Row className="mb-3 mt-3">
            <Col lg={3}>
                <Image isAvatar isMale alt="avatar" />
            </Col>
            <Col lg={8}>
                <Row>
                    <Col lg={8}>
                        <Row>{name}</Row>
                        <Row>{role}</Row>
                    </Col>
                    <Col lg={2}>
                        {showDropdown && (
                            <div>
                                <Tippy
                                    placement="bottom"
                                    interactive
                                    delay="300"
                                    render={(attrs) => <Dropdown tabIndex="-1" {...attrs} />}
                                >
                                    <span>
                                        {' '}
                                        <Icon />
                                    </span>
                                </Tippy>
                            </div>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Role;
