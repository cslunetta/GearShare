import { useContext, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Col, Container, Navbar, NavLink, Row, Table } from "reactstrap";
import { BorrowContext } from "../../providers/BorrowProvider";
import Borrow from "./Borrow";

export const BorrowRequestList = ({ myrequests }) => {
    const { borrow, getCurrentUsersBorrowed, getAllBorrowedByGearCurrentUser } = useContext(BorrowContext);

    useEffect(() => {
        if (myrequests)
        {
            getCurrentUsersBorrowed();
        } else {
            getAllBorrowedByGearCurrentUser();
        }
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
                            {myrequests ? <b>My Requests</b> : "My Requests"}
                        </NavLink>
                    </div>
                    <div>
                        <NavLink tag={RRNavLink} to="/gearrequests/mygear">
                        {myrequests ? "My Gear" : <b>My Gear</b>}
                        </NavLink>
                    </div>
                </Navbar>
            </Row>
            <Table hover className="mt-5">
                <thead>
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
                        <Borrow key={b.id} borrow={b} myrequests={myrequests} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
