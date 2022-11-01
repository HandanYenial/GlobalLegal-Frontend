import React from "react";
import { render } from "@testing-library/react";
import Categories from "./CategoryList";

it ("renders without crashing" , function(){
    render(<Categories/>);
});

it ("matches the snapshot" , function(){
    const { asFragment } = render(<Categories/>);
    expect(asFragment()).toMatchSnapshot();
});