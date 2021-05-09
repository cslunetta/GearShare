import React, { useState, useContext, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    if (isLoggedIn === true) {
        // This is returning JSON
        const userProfile = sessionStorage.getItem("userProfile");
        // Parsing the JSON returned above into an object so we can use it
        var currentUser = JSON.parse(userProfile);
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    GearShare
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/mygear">
                                        My Gear
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={RRNavLink}
                                        to="/gearrequests/myrequests"
                                    >
                                        Gear Requests
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn && (
                            <>
                                <NavbarText>
                                    Hello {currentUser.displayName}
                                </NavbarText>
                                <NavItem
                                    aria-current="page"
                                    className="nav-link"
                                    style={{ cursor: "pointer" }}
                                    onClick={logout}
                                >
                                    Logout
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
