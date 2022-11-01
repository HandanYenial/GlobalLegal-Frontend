import React from "react";
import { render } from "@testing-library/react";
import Lawsuits from "./LawsuitList"

it ("renders without crashing", function(){
    render(<Lawsuits />);
});

it("matches with snapshot", function(){
    const { asFragment } = render(<Lawsuits />);
    expect(asFragment()).toMatchSnapshot();
});