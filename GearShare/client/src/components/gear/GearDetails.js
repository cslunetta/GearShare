import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Col, Container, Row, Button } from "reactstrap";
import { GearContext } from "../../providers/GearProvider";

const GearDetails = () => {
    const { getGearById, deleteGear, getCurrentUsersGear } = useContext(
        GearContext
    );
    const [gear, setGear] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    useEffect(() => {
        getGearById(id).then(setGear);
    }, []);

    const DetailButtons = () => {
        if (currentUser.id === gear.userProfileId) {
            return (
                <>
                    <Button onClick={() => history.push(`/mygear/edit/${id}`)}>
                        Edit
                    </Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </>
            );
        } else {
            return (
                <>
                    <Button>Request</Button>
                </>
            );
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${gear.name}?`)) {
            deleteGear(gear.id).then(getCurrentUsersGear);
            history.push("/mygear");
        }
    };

    return (
        <Container>
            <Row>
                <h1>Gear Details</h1>
            </Row>
            <Row>
                <h4>Name: {gear.name}</h4>
            </Row>
            <Row>
                <h4>Category: {gear.category?.name}</h4>
            </Row>
            <Row>
                <h4>User: {gear.userProfile?.displayName}</h4>
            </Row>
            <Row>
                <Col>
                    {gear.imageLocation ? (
                        <img
                            width="100%"
                            src={gear.imageLocation}
                            alt={gear.name}
                        />
                    ) : (
                        <img
                            width="100%"
                            src="https://c.pxhere.com/photos/a6/59/guitar_music_amplifier_ibanez_instrument-103814.jpg!d"
                            srcSet="https://c.pxhere.com/photos/a6/59/guitar_music_amplifier_ibanez_instrument-103814.jpg!d"
                            alt="music, white, guitar, color, instrument, blue, amplifier, electronics, ibanez, Free Images In PxHere"
                        />
                    )}
                </Col>
                <Col>
                    <p>{gear.description}</p>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <DetailButtons />
                </Col>
            </Row>
        </Container>
    );
};

export default GearDetails;
