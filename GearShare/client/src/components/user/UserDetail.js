import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserDetail = () => {
    const { getUserDetails } = useContext(UserProfileContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails().then(setUser);
    }, []);

    return (
        <Container>
            <Row>
                <h1>My Profile</h1>
            </Row>
            <Row>
                <p>Wait... Who are you again???</p>
            </Row>
            <Row>
                <Col>
                    <h4>{user.displayName}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={user.imageLocation} alt="" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h4>Member Since:</h4>
                        </Col>
                        <Col>
                            <p>
                                {
                                    new Date(user.createDateTime)
                                        .toLocaleString("en-US")
                                        .split(", ")[0]
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Full Name:</h4>
                        </Col>
                        <Col>
                            <p>{user.fullName}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Email:</h4>
                        </Col>
                        <Col>
                            <p>{user.email}</p>
                        </Col>
                    </Row>

                    <Button>Update</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDetail;
