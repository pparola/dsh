import React from "react";

import bgImage from "assets/img/back3.jpg";

export default function Home() {
console.log('ffff',bgImage);
    return (

        <img src={bgImage} alt={"Background"} style={{ width:'100%', height: '100%'}}></img>
    );
};