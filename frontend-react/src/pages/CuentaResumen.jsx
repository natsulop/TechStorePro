import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import useApi from "../hooks/useApi.js";
import TarjetaDato from "../components/TarjetaDato.jsx";
import GraficoBarras from "../components/GraficoBarras.jsx";
import TimelinePedido, { PASOS, textoEstado } from "../components/TimelinePedido.jsx";
import { formatearPrecio } from "../utils/precio.js";

function CuentaResumen() {
  const { usuario } = useContext(AuthContext);
  const { datos: pedidos, cargando, error } = useApi("/api/ordenes");

  if (cargando) return <p className="py-10 text-gray-700">Cargando tu resumen...</p>;
  if (error) return <p className="py-10 text-red-600">{error}</p>;

  // Todo lo de abajo se calcula desde la Lista de pedidos: no se guarda nada aparte.
  const totalGastado = pedidos.reduce((suma, pedido) => suma + pedido.total, 0);
  const enCurso = pedidos.filter((pedido) => pedido.estado !==
    "entregado").length;
  const ultimo = pedidos[0];

  const porEstado = PASOS.map((paso) => ({
    etiqueta: paso.texto,
    valor: pedidos.filter((pedido) => pedido.estado === paso.estado).length,
  }));

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Resumen</p>
        <h1 className="font-display text-4xl tracking-tight mt-3">
          Hola, {usuario}<span className="text-accent">.</span>
        </h1>
      </header>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <TarjetaDato titulo="Pedidos" valor={pedidos.length} detalle="en total" />
        <TarjetaDato titulo="Total gastado" valor={formatearPrecio(totalGastado)} detalle="en todas tus compras" />
        <TarjetaDato titulo="En curso" valor={enCurso} detalle="pedidos que todavía no se entregan" />
        <TarjetaDato
          titulo="Último pedido"
          valor={
            ultimo
              ? new Date(ultimo.createdAt).toLocaleDateString("es-CO", {
                  day: "numeric", month: "short"
                })
              : "—"
          }
          detalle={ultimo ? textoEstado(ultimo.estado) : "Aún no compras"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GraficoBarras datos={porEstado} />

        <div className="border border-gray-300 rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="font-display font-bold text-lg">Tu último pedido</h3>
          {ultimo ? (
            <>
              <TimelinePedido estado={ultimo.estado} />
              <Link to={`/cuenta/pedidos/${ultimo.id}`} className="text-sm text-gray-700 underline">
                Ver todos mis pedidos
              </Link>
            </>
          ) : (
            <p className="text-gray-700">Cuando hagas una compra, la verás aquí.</p>
          )}
          <Link to="/productos" className="text-sm text-gray-700 underline">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CuentaResumen;