import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const GearContext = createContext();

export const GearProvider = (props) => {
    const apiUrl = "/api/Gear";
    const [gear, setGear] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllPublicGear = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setGear)
        );
    };

    const getCurrentUsersGear = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetGearByUserId?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setGear)
        );
    };

    const getGearById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    };

    const addGear = (gear) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gear),
            }).then((res) => res.json())
        );
    };

    const updateGear = (gear) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gear),
            }).then(getCurrentUsersGear)
        );
    };

    // const deleteGear

    return (
        <GearContext.Provider
            value={{
                gear,
                setGear,
                getAllPublicGear,
                getCurrentUsersGear,
                getGearById,
                addGear,
                updateGear,
                // deleteGear,
            }}
        >
            {props.children}
        </GearContext.Provider>
    );
};
