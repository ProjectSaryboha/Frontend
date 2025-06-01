import { NavLink } from "react-router-dom"

import module from "./BackButton.module.css"

const ChoiceBoxButton = () => {

    return (
        <NavLink className={module.btn} to="/">Назад</NavLink>
    )
}

export default ChoiceBoxButton