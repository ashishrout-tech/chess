"use client"

import { RecoilRoot } from "recoil";

interface Props {
    component: any
}

const Layout2 = (props: Props) => {
    const { component } = props;
    
    return (
        <>
            <RecoilRoot>
                {component}
            </RecoilRoot>
        </>
    );
}

export default Layout2;