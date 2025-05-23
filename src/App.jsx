import HomePage from "./pages/HomePage/HomePage";
import StartPage from "./pages/StartPage/StartPage";

import { Route, Routes } from "react-router-dom"


function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<StartPage />} />
                <Route path='/home' element={<HomePage />} />
            </Routes>
        </>
    );
};

export default App