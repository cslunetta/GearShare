import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserForm = () => {
    const history = useHistory();

    const { getUserDetails, updateUserProfile } = useContext(UserProfileContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails().then(setUser);
    }, []);

    const handleControlledInputChange = (e) => {
        const newUser = { ...user };
        newUser[e.target.id] = e.target.value;
        setUser(newUser);
    };

    const handleSave = () => {
        updateUserProfile({
            displayName: user.displayName,
            imageLocation: user.imageLocation,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }).then(() => history.push(`/userprofiledetails`));
    };

    return (
        <Container>
            <Row>
                <h1>My Profile</h1>
            </Row>
            <Row>
                <p>Wait... Who are you again???</p>
            </Row>
            <Row>
                <div>
                    <Label hidden />
                    <Input
                        type="text"
                        id="displayName"
                        onChange={handleControlledInputChange}
                        value={user.displayName}
                    />
                </div>
            </Row>
            <Row>
                <Col>
                    <img src={user.imageLocation} alt="" />
                    <Label hidden />
                    <Input
                        type="text"
                        id="imageLocation"
                        onChange={handleControlledInputChange}
                        value={user.imageLocation}
                    />
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
                            <Row>
                                <Col>
                                    <Label hidden />
                                    <Input
                                        type="text"
                                        id="firstName"
                                        onChange={handleControlledInputChange}
                                        value={user.firstName}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        onChange={handleControlledInputChange}
                                        value={user.lastName}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Button onClick={handleSave}>Save</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
