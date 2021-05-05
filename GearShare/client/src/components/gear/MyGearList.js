import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, CardDeck, Container, Row } from "reactstrap";
import { GearContext } from "../../providers/GearProvider";
import Gear from "./Gear";

const MyGearList = () => {
    const { gear, getCurrentUsersGear } = useContext(GearContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const id = currentUser.id;
    const history = useHistory();

    useEffect(() => {
        getCurrentUsersGear(id);
    }, []);

    return (
        <Container>
            <Row>
                <h1>My Gear</h1>
            </Row>
            <Row>
                <p>Here is what you have told us about!</p>
            </Row>
            <Row>
                <Button onClick={() => history.push("/mygear/create")}>Add Gear</Button>
            </Row>
            <CardDeck>
                {gear.map((g) => (
                    <Gear key={g.id} gear={g} />
                ))}
            </CardDeck>
        </Container>
    );
};

export default MyGearList;
