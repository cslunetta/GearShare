import { Col, Navbar, NavbarBrand, Row } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <Navbar className="bottom" color="light" light>
                <Col>
                    <Row>
                        <NavbarBrand tag={RRNavLink} to="/">
                            GearShare
                        </NavbarBrand>
                    </Row>
                    <Row>
                        <div>©Christopher Lunetta 2021</div>
                    </Row>
                </Col>
            </Navbar>
        </div>
    );
};

export default Footer;
