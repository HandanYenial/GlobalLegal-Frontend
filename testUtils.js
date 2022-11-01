import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

const UserProvider =
    ({ children, currentUser = demoUser, hasAddedLawsuit = () => false }) => (
    <UserContext.Provider value={{ currentUser, hasAddedLawsuit }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
