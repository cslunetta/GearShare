import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const apiUrl = "/api/Category";
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllCategories = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setCategories)
        );
    };

    const getCategoryById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                setCategories,
                getAllCategories,
                getCategoryById,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};
