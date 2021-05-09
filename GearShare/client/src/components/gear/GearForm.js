import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { GearContext } from "../../providers/GearProvider";

const GearForm = () => {
    const { addGear, getGearById, updateGear } = useContext(GearContext);
    const { categories, getAllCategories } = useContext(CategoryContext);

    const [gear, setGear] = useState({
        name: "",
        categoryId: 0,
        isPublic: Boolean,
        description: "",
        purchaseDate: "",
        imageLocation: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    const { gearId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (e) => {
        const newGear = { ...gear };
        newGear[e.target.id] = e.target.value;
        setGear(newGear);
    };

    const handleSave = () => {
        if (parseInt(gear.categoryId) === 0) {
            window.alert("Please select a Category");
        } else {
            setIsLoading(true);
            if (gearId) {
                updateGear({
                    name: gear.name,
                    description: gear.description,
                    imageLocation: gear.imageLocation,
                    createDateTime: gear.createDateTime,
                    purchaseDate: gear.purchaseDate,
                    isPublic: Boolean(gear.isPublic),
                    categoryId: parseInt(gear.categoryId),
                    userProfileId: gear.userProfileId,
                    id: gear.id,
                }).then(() => history.push(`/geardetails/${gear.id}`));
            } else {
                const purchaseDate = () => {
                    if (gear.purchaseDate) {
                        return gear.purchaseDate;
                    }
                    return null;
                };
                addGear({
                    name: gear.name,
                    categoryId: parseInt(gear.categoryId),
                    isPublic: Boolean(gear.isPublic),
                    description: gear.description,
                    purchaseDate: purchaseDate,
                    imageLocation: gear.imageLocation,
                }).then(() => history.push(`/mygear`));
            }
        }
    };

    useEffect(() => {
        getAllCategories().then(() => {
            if (gearId) {
                getGearById(gearId).then((gear) => {
                    setGear(gear);
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <Container>
            <h1>{gearId ? "Edit Gear" : "Add Gear"}</h1>
            <p>
                {gearId
                    ? "Lets update with new info!"
                    : "Got something new to play with or an old toy to share?"}
            </p>
            <Card>
                <CardBody>
                    <h4>
                        {gearId ? "Update" : "Add new gear to your profile"}
                    </h4>
                    <Form>
                        <fieldset>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="name">Name: </Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            onChange={
                                                handleControlledInputChange
                                            }
                                            required
                                            autoFocus
                                            className="form-control"
                                            placeholder="Name"
                                            value={gear.name}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="category">Category: </Label>
                                        <Input
                                            type="select"
                                            id="categoryId"
                                            onChange={
                                                handleControlledInputChange
                                            }
                                            required
                                            className="form-control"
                                            value={gear.categoryId}
                                        >
                                            <option value="0">
                                                Select a Category
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="isPublic">
                                            {gearId
                                                ? gear.isPublic
                                                    ? "Current Status: Public"
                                                    : "Private"
                                                : "Status: "}
                                        </Label>
                                        <Input
                                            type="select"
                                            id="isPublic"
                                            onChange={
                                                handleControlledInputChange
                                            }
                                            required
                                            className="form-control"
                                            value={`${gear.isPublic}`}
                                        >
                                            <option>Privacy Options...</option>
                                            <option name="1" value="true">
                                                Public
                                            </option>
                                            <option
                                                name="0"
                                                id="isPublic"
                                                value=""
                                            >
                                                Private
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="description">Description: </Label>
                                <Input
                                    type="textarea"
                                    id="description"
                                    onChange={handleControlledInputChange}
                                    required
                                    className="form-control"
                                    placeholder="Description"
                                    value={gear.description}
                                    rows="4"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="purchaseDate">Purchase Date:</Label>
                                <Input
                                    type="date"
                                    id="purchaseDate"
                                    onChange={handleControlledInputChange}
                                    className="form-control"
                                    value={gear.purchaseDate.split("T")[0]}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageLocation">Image</Label>
                                <Input
                                    id="imageLocation"
                                    type="file"
                                    onChange={handleControlledInputChange}
                                    // className="form-control"
                                    value={gear.imageLocation}
                                />
                                <FormText color="muted">
                                    Upload a picture of your gear
                                </FormText>
                            </FormGroup>
                            <Button
                                disabled={isLoading}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSave();
                                }}
                            >
                                {gearId ? "Save" : "Add"}
                            </Button>
                        </fieldset>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default GearForm;
