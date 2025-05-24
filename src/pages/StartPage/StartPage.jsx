import { NavLink } from "react-router-dom"

import module from "./StartPage.module.css"

const StartPage = () => {
    return (
        <div className={module.container}>
            <div className={module.linkContainer}>
                <NavLink className={module.link} to="/home">Аналіз тенденцій цін на продукти у супермаркетах</NavLink>
            </div>
        </div>
    )
}

export default StartPage