import React, {useState} from 'react';
import {Welcome} from "./pages/welcome/Welcome";

const options = ['The Godfather', 'Pulp Fiction'];

function App() {
    const [value, setValue] = useState("");

    return (
        <Welcome/>
    );
}

export default App;
