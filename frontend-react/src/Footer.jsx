function Footer() {
  return (
    <footer
  className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat text-white px-6 py-10 flex flex-col"
style={{ backgroundImage: "url('/tecno.jpg')" }}
>
{/* Capa oscura para mejorar la lectura */}
<div className="absolute inset-0 bg-black/60"></div>

{/* Contenido del footer */}
<div className="relative z-10 max-w-6xl mx-auto">

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

    {/* Marca */}
    <div>
      <h2 className="text-xl font-bold mb-3">
        TechStore Pro
      </h2>

      <p className="text-sm text-gray-200">
        Tecnología y accesorios para todos tus proyectos.
      </p>
    </div>

    {/* Enlaces */}
    <div>
      <h3 className="font-semibold mb-3">
        Navegación
      </h3>

      <ul className="space-y-2 text-sm text-gray-200">
        <li>
          <a href="#" className="hover:text-white transition">
            Inicio
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Productos
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Ofertas
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Contacto
          </a>
        </li>
      </ul>
    </div>

    {/* Ayuda */}
    <div>
      <h3 className="font-semibold mb-3">
        Ayuda
      </h3>

      <ul className="space-y-2 text-sm text-gray-200">
        <li>
          <a href="#" className="hover:text-white transition">
            Preguntas frecuentes
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Envíos
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Devoluciones
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition">
            Términos y condiciones
          </a>
        </li>
      </ul>
    </div>

    {/* Contacto */}
    <div>
      <h3 className="font-semibold mb-3">
        Contacto
      </h3>

      <p className="text-sm text-gray-200">
        📧 contacto@techstore.com
      </p>

      <p className="text-sm text-gray-200 mt-2">
        📞 +57 300 123 4567
      </p>

      <p className="text-sm text-gray-200 mt-2">
        📍 Colombia
      </p>
    </div>

  </div>

  {/* Copyright */}
  <div className="border-t border-white/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

    <p className="text-sm">
      © 2026 TechStore Pro
    </p>

    <p className="text-sm text-gray-300">
      Hecho con Tailwind CSS
    </p>

  </div>

</div>
</footer>
  

  )
} 
   
export default Footer