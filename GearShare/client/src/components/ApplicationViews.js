import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import GearList from "./gear/GearList";
import { GearProvider } from "../providers/GearProvider";
import MyGearList from "./gear/MyGearList";
import GearDetails from "./gear/GearDetails";

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
                        <MyGearList />
                    </Route>

                    <Route path={`/geardetails/:id`}>
                        <GearDetails />
                    </Route>
                    
                </GearProvider>
            </Switch>
        </main>
    );
}
