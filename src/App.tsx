import {Welcome} from "./pages/welcome/Welcome";
import React, {useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Topics} from "./pages/topics/Topics";
import {FinishSetup} from "./pages/finishSetup/FinishSetup";
import {Profile} from "./pages/profile/Profile";
import {TopicsEditor} from "./pages/topicsEditor/TopicsEditor";
import {Autorization} from "./pages/autorization/Autorization";


export type PathType = "autorization" | "welcome" | "topics"| "finishSetup" | "profile" | "topicsEditor";

export type PagePropsType = {
    setPath: (path: PathType) => void
}

function App() {

    const [path,setPath] = useState<PathType>("autorization")

    switch (path) {
        case "autorization":
            return <Autorization setPath={setPath}/>
        case "welcome":
            return <Welcome setPath={setPath}/>
        case "topics":
            return <Topics setPath={setPath}/>
        case "finishSetup":
            return <FinishSetup setPath={setPath}/>
        case "profile":
            return <Profile setPath={setPath}/>
        case "topicsEditor":
            return <TopicsEditor setPath={setPath}/>
    }
}

export default App;
