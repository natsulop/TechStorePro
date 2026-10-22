import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./Authcontext";
import  BadgeCarrito from "./BadgeCarrito"

function Navbar() {
  const ubicacion = useLocation();
  const {items, vaciarCarrito} = useContext(CartContext);
  const {usuario } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
      <div className="text-xl font-extrabold text-verde">
        TechStore Pro
      </div>

      <ul className="hidden md:flex gap-6 text-sm font-semibold text-texto-dim">
        <li>
          <Link
           to="/"
           className={ubicacion.pathname === "/" ? "text-verde font-extrabold" : ""}
           >Inicio</Link>
        </li>

        <li>
          <Link 
          to="/productos"
          className={ubicacion.pathname === "/" ? "text-verde font-extrabold" : ""}
          >Productos</Link>
        </li>

        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>

        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-texto-dim">
          carrito: {items.length}
        </span>
        <BadgeCarrito/>
        {items.length > 0 && (
          <button 
          onClick={vaciarCarrito}
          className="text-xs text-red-600 underline"
          >
            Vaciar
          </button>
        )}
        {usuario? (
          <span className="text-sm font-bold text-verde">
            Hola, {usuario}
          </span>
        ):(
          <button className="bg-verde text-white py-2 px-5 rounded-lg font-bold text-sm">
          Ingresar
        </button>

        )}
     
      </div>
    </nav>
  );
}

export default Navbar;