import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import GearList from "./gear/GearList";
import { GearProvider } from "../providers/GearProvider";
import MyGearList from "./gear/MyGearList";
import GearDetails from "./gear/GearDetails";
import GearForm from "./gear/GearForm";
import { CategoryProvider } from "../providers/CategoryProvider";
import { BorrowRequestList } from "./borrow/BorrowRequestList";
import { BorrowProvider } from "../providers/BorrowProvider";

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
                    <Route path="/mygear" exact>
                        <MyGearList />
                    </Route>

                    <BorrowProvider>
                        <Route path={`/geardetails/:id`}>
                            <GearDetails />
                        </Route>

                        <Route path={`/gearrequests/myrequests`}>
                            <BorrowRequestList myrequests />
                        </Route>

                        <Route path={`/gearrequests/mygear`}>
                            <BorrowRequestList />
                        </Route>
                    </BorrowProvider>

                    <CategoryProvider>
                        <Route path="/mygear/Create">
                            <GearForm />
                        </Route>

                        <Route path={`/mygear/edit/:gearId`}>
                            <GearForm />
                        </Route>
                    </CategoryProvider>
                </GearProvider>
            </Switch>
        </main>
    );
}
