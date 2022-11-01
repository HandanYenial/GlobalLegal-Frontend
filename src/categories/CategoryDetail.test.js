import React from "react";
import Category from "./CategoryDetail"; //import the component
import { render } from "@testing-library/react"; //render is a function that will render the component and return the result
import { MemoryRouter , Route } from "react-router-dom"; //MemoryRouter is a component that will render the component without any routing
import { UserProvider } from "../testUtils"; //provide user for testing

//Smoke test
it("renders without crashing", function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Category/>
            </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
it("matches snapshot", function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Route path="/category/:handle">
                <Category/>
                </Route>
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});