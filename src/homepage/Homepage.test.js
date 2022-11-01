import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";

//UserProvider : provides user for testing
//MemoryRouter : provides routing for testing
//Home : component to test

//smoke test
it("renders without crashing" , function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
});

//snapshot test
it("matches the snapshot" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();
});

//it matches the snapshot when logged in:
it ("matches the snapshot when logged in" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();
});