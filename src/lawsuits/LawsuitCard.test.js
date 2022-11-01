import React from "react";
import { render } from "@testing-library/react";
import LawsuitCard from "./LawsuitCard";
import { UserProvider } from "../testUtils";

//snapshot test
it ("matches snapshot" , function(){
    let item = {title:"Criminal Lawsuit 1",
                description:'This is a criminal lawsuit',
                comment:'Open',
                location:'New York',
                categoryName:'criminal law',
                created_at:'2019-01-01',
                updated_at:'2019-01-01'
                };
    const { asFragment } = render(
        <UserProvider>
            <LawsuitCard item={item}/>
        </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
});