import { NavLink } from "react-router-dom"

const AsideNavBar = () => {
  return (
    <aside className="aside">
      <img className="m-auto py-4" src="/img/jacg.png" alt="" width={100}/>
      <ul className="aside__wrapper">
        <NavLink className={"aside__wrapper__item "} to={"contenido"}>Contenido</NavLink>
        <NavLink className={"aside__wrapper__item "} to={"addcontenido"} >Añadir Contenido</NavLink>
        <NavLink className={"aside__wrapper__item "} to={"uploads"} >Uploads</NavLink>
      </ul>
    </aside>
  )
}

export default AsideNavBar