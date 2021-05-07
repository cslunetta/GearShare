import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BorrowContext = createContext();

export const BorrowProvider = (props) => {
    const apiUrl = "/api/Borrow";
    const [borrow, setBorrow] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getBorrowById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    };

    const GetBorrowByGearIdForCurrentUser = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/gearId/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json()).then((res) => console.log(res))
        );
    };

    // get a list of items by user id of the gear itself.
    const getAllBorrowedByGearCurrentUser = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetAllBorrowedByGearUserId`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json)
                .then(setBorrow)
        );
    };

    // get a list of items borrowed by the current user
    const getCurrentUsersBorrowed = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetCurrentUsersBorrowed`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json)
                .then(setBorrow)
        );
    };

    const addBorrowed = (borrow) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(borrow),
            })
            // .then((res) => res.json())
        );
    };

    const updateBorrowed = (borrow) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${borrow.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(borrow),
            })
        );
    };

    return (
        <BorrowContext.Provider
            value={{
                borrow,
                setBorrow,
                getBorrowById,
                GetBorrowByGearIdForCurrentUser,
                getAllBorrowedByGearCurrentUser,
                getCurrentUsersBorrowed,
                addBorrowed,
                updateBorrowed,
            }}
        >
            {props.children}
        </BorrowContext.Provider>
    );
};
