import React from "react";
import CategoryCard from "./CategoryCard"; //import the component
import { render } from "@testing-library/react"; //render is a function that will render the component and return the result
import { MemoryRouter } from "react-router-dom"; //MemoryRouter is a component that will render the component without any routing

//Smoke test:
it("renders without crashing", () => {
    render(
        <MemoryRouter>
        <CategoryCard />
        </MemoryRouter>
    );
});

//snapshot test:
it("matches snapshot", function(){
    const { asFragment } = render(
        <MemoryRouter>
        <CategoryCard />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});