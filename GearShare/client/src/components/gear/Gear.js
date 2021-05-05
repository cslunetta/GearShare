import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap";

const Gear = ({ gear }) => {
    return (
        <Card className="m-4">
            
            {/*
            CSS for darkening an image on hover effect to give the user the feel of a button they can click on.
            https://codepen.io/VectorQuanity/pen/qEeJoK */}
            <Link className="picLink" to={`/geardetails/${gear.id}`}>
                {gear.imageLocation ? (
                    <CardImg
                        top
                        width="100%"
                        src={gear.imageLocation}
                        alt={gear.name}
                    />
                ) : (
                    <CardImg
                        top
                        width="100%"
                        src="https://c.pxhere.com/photos/a6/59/guitar_music_amplifier_ibanez_instrument-103814.jpg!d"
                        srcSet="https://c.pxhere.com/photos/a6/59/guitar_music_amplifier_ibanez_instrument-103814.jpg!d"
                        alt="music, white, guitar, color, instrument, blue, amplifier, electronics, ibanez, Free Images In PxHere"
                    />
                )}
                <div className="overlay"></div>
            </Link>
            <CardBody>
                <CardTitle tag="h4">{gear.name}</CardTitle>
                <CardSubtitle tag="h6" className=" mb-2 text-muted">
                    User: {gear.userProfile.displayName}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {gear.category.name}
                </CardSubtitle>
                <CardText>{gear.description}</CardText>
            </CardBody>
        </Card>
    );
};

export default Gear;
