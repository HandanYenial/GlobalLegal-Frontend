import React from "react";
import { render } from "@testing-library/react";
import LawsuitCardList from "./LawsuitCardList";
import { UserProvider } from "../testUtils";

//snapshot test
it ("matches snapshot" , function(){
    let lawsuits = [{title:"Criminal Lawsuit 1",
                    description:'This is a criminal lawsuit',
                    comment:'Open',
                    location:'New York',
                    categoryName:'criminal law',
                    created_at:'2019-01-01',
                    updated_at:'2019-01-01'
                    },
                    {title:"Criminal Lawsuit 2",
                    description:'This is a criminal lawsuit',
                    comment:'Open',
                    location:'New York',
                    categoryName:'criminal law',
                    created_at:'2019-01-01',
                    updated_at:'2019-01-01'
                    }];
    const { asFragment } = render(
        <UserProvider>
            <LawsuitCardList lawsuits={lawsuits}/>
        </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
});