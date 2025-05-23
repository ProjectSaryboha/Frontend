import { NavLink } from "react-router-dom"

import module from "./StartPage.module.css"

const StartPage = () => {
    return (
        <NavLink className={module.link} to="/home">Home</NavLink>
    )
}

export default StartPage