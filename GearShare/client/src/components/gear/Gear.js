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
            <CardImg top width="100%" src="" alt="" />
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
