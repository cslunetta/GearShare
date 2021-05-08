import { Button } from "reactstrap";

const Borrow = ({ borrow, myrequests }) => {
    return (
        <tr>
            <td>{borrow.gear.name}</td>
            <td>{borrow.gear.category.name}</td>
            <td>{borrow.gear.userProfile.displayName}</td>
            <td>
                {myrequests ? (
                    borrow.borrow.statusId
                ) : (
                    <>
                        <Button>Accept</Button>
                        <Button>Decline</Button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default Borrow;
