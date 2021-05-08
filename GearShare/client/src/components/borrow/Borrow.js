const Borrow = ({ borrow }) => {
    console.log(borrow)

    return (
        <tr>
            <td>{borrow.gear.name}</td>
            <td>{borrow.gear.category.name}</td>
            <td>{borrow.gear.userProfile.displayName}</td>
            <td>{borrow.borrow.statusId}</td>
        </tr>
    );
};

export default Borrow;
