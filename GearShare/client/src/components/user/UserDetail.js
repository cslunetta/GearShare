import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Col, Container, Row } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserDetail = () => {
    const { getUserDetails } = useContext(UserProfileContext);
    const [user, setUser] = useState({});
    const history = useHistory();

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
                    <h4>{user.displayName}</h4>
            </Row>
            <Row>
                <Col>
                    {user.imageLocation ? (
                        <img className="detailImage" src={user.imageLocation} alt="" />
                    ) : (
                        <img className="detailImage"
                            src="https://blogs.3ds.com/northamerica/wp-content/uploads/sites/4/2019/08/Robots-Square-300x300.jpg"
                            srcSet="https://blogs.3ds.com/northamerica/wp-content/uploads/sites/4/2019/08/Robots-Square-300x300.jpg"
                            alt=""
                        />
                    )}
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
                            <h4>Email:</h4>
                        </Col>
                        <Col>
                            <p>{user.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Name:</h4>
                        </Col>
                        <Col>
                            <p>{user.fullName}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button onClick={() => history.push("userprofiledetails/update")}>Update</Button>
                        </Col>
                    </Row>
        </Container>
    );
};

export default UserDetail;
