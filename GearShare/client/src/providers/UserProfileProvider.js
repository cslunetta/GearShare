import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";
  const history = useHistory();

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      }).then(history.push('/'));
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => { 
        if(resp.ok)
        {
          return resp.json()
        }
        
        throw new Error("Not valid")
      })
    )
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const getAllProfiles = () => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
    })
  }

  const deactivateUserById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/DeactivateUserById/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }

  const getUserProfileById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetUserProfileById/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
    )
  }

  const getDeactivatedUserProfiles = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetDeactivatedUserProfiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
    )
  }

  const reactivateUserById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/ReactivateUserById/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }

  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken, getUserProfile, getAllProfiles, deactivateUserById, getUserProfileById, getDeactivatedUserProfiles, reactivateUserById }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark"/>}
    </UserProfileContext.Provider>
  );
}