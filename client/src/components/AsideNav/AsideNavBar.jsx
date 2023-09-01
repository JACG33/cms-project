import { NavLink } from "react-router-dom"
import { Logo } from "../Svg/Svg"

const AsideNavBar = () => {
  return (
    <aside className="aside">
      <Logo css={"m-auto py-4 w-[100px]"} hei={100} wid={100}/>
      <ul className="aside__wrapper">
        <NavLink className={"aside__wrapper__item "} to={"contenido"}>Contenido</NavLink>
        <NavLink className={"aside__wrapper__item "} to={"addcontenido"} >Añadir Contenido</NavLink>
        <NavLink className={"aside__wrapper__item "} to={"uploads"} >Uploads</NavLink>
        <NavLink className={"aside__wrapper__item "} to={"categorias"} >Categorias</NavLink>
      </ul>
    </aside>
  )
}

export default AsideNavBar