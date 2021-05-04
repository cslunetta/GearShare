import { useContext, useEffect } from "react";
import { CardDeck, Container, Row } from "reactstrap";
import { GearContext } from "../../providers/GearProvider";
import Gear from "./Gear";

const GearList = () => {
    const { gear, getAllPublicGear } = useContext(GearContext);

    useEffect(() => {
        getAllPublicGear();
    }, []);

    return (
        <Container>
            <Row>
                <h1>Recent Activity</h1>
            </Row>
            <Row>
                <p>See Recently added gear by other users</p>
            </Row>
            <CardDeck>
                {gear.map((g) => (
                    <Gear key={g.id} gear={g} />
                ))}
            </CardDeck>
        </Container>
    );
};

export default GearList;
