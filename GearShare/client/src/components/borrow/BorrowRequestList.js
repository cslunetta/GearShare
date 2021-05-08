import { useContext, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Col, Container, Navbar, NavLink, Row, Table } from "reactstrap";
import { BorrowContext } from "../../providers/BorrowProvider";
import Borrow from "./Borrow";

export const BorrowRequestList = () => {
    const { borrow, getCurrentUsersBorrowed } = useContext(BorrowContext);

    useEffect(() => {
        getCurrentUsersBorrowed();
    }, []);

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
            <Table hover>
                <thead className="mt-5">
                    <th>
                        <h4>Name</h4>
                    </th>
                    <th>
                        <h4>Category</h4>
                    </th>
                    <th>
                        <h4>User</h4>
                    </th>
                    <th>
                        <h4>Status</h4>
                    </th>
                </thead>
                <tbody>
                    {borrow.map((b) => (
                        <Borrow key={b.id} borrow={b} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
