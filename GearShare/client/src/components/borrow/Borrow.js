import { useContext } from "react";
import { Button } from "reactstrap";
import { BorrowContext } from "../../providers/BorrowProvider";

const Borrow = ({ borrow, myrequests }) => {
    const { updateBorrowed, getAllBorrowedByGearCurrentUser } = useContext(
        BorrowContext
    );

    const handleAccept = () => {
        if (
            window.confirm(
                `Confirm ${borrow.borrow.userProfile.displayName} can borrow `
            )
        ) {
            updateBorrowed({
                id: borrow.borrow.id,
                statusId: 1,
            }).then(getAllBorrowedByGearCurrentUser);
        }
    };

    const handleDecline = () => {
        if (
            window.confirm(
                `Deny Request from ${borrow.borrow.userProfile.displayName}`
            )
        ) {
            updateBorrowed({
                id: borrow.borrow.id,
                statusId: 2,
            }).then(getAllBorrowedByGearCurrentUser);
        }
    };

    const RequestButtons = () => {
        if (borrow.borrow.statusId === 1) {
            return (
                <>
                    <Button disabled>Accepted</Button>
                </>
            );
        } else if (borrow.borrow.statusId === 2) {
            return (
                <>
                    <Button disabled>Declined</Button>
                </>
            );
        } else {
            return (
                <>
                    <Button onClick={handleAccept}>Accept</Button>
                    <Button onClick={handleDecline}>Decline</Button>
                </>
            );
        }
    };

    const StatusInfo = () => {
        if (borrow.borrow.statusId === 1) {
            return "Accepted";
        } else if (borrow.borrow.statusId === 2) {
            return "Denied";
        } else {
            return "Pending";
        }
    };

    return (
        <tr>
            <td>{borrow.gear.name}</td>
            <td>{borrow.gear.category.name}</td>
            <td>{borrow.gear.userProfile.displayName}</td>
            <td>{myrequests ? <StatusInfo /> : <RequestButtons />}</td>
        </tr>
    );
};

export default Borrow;
