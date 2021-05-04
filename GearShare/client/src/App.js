import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header.js";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <UserProfileProvider>
                <Header />
                <div className="applicationViews">
                    <ApplicationViews />
                </div>
                <Footer />
            </UserProfileProvider>
        </Router>
    );
}

export default App;
