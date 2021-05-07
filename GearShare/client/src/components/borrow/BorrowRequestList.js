import { NavLink as RRNavLink } from "react-router-dom";
import { Col, Container, Navbar, NavItem, NavLink, Row } from "reactstrap";
import Gear from "../gear/Gear";

export const BorrowRequestList = () => {
    return (
        <Container>
            <Row>
                <h1>Gear Requests</h1>
            </Row>
            <Row>
                <Navbar>
                    <div>
                        <NavLink tag={RRNavLink} to="/gearrequests/myrequests">
                            My Requests
                        </NavLink>
                    </div>
                    <div>
                        <NavLink tag={RRNavLink} to="/gearrequests/mygear">
                            My Gear
                        </NavLink>
                    </div>
                </Navbar>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h4>Name</h4>
                </Col>
                <Col>
                    <h4>Category</h4>
                </Col>
                <Col>
                    <h4>User</h4>
                </Col>
                <Col>
                    <h4>Status</h4>
                </Col>
            </Row>
            {/* {borrow.map((b) => (
                <Borrow key={b.id} borrow={b} />
            ))} */}
        </Container>
    );
};
