import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import GearList from "./gear/GearList";
import { GearProvider } from "../providers/GearProvider";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? (
                        <GearProvider>
                            <GearList />
                        </GearProvider>
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <GearProvider>
                    <Route path="/mygear">
                        <GearList />
                    </Route>
                </GearProvider>
            </Switch>
        </main>
    );
}
