import RenderProjects from "../components/Streamlit";

function AnalisisDeDatos() {
  return (
    <>
      <div className="p-8 bg-gray-100 text-gray-900 text-base md:text-lg">
        <h1 className="text-2xl font-bold mb-4">Análisis de Datos</h1>

        <p className="mb-4">
          Desde Emprender Corrientes podemos ayudarte a visualizar tus datos
          para facilitar la toma de decisiones futuras. Partiendo desde la
          lectura de una o múltiples tablas de Excel que hayas recopilado, o su
          creación, para que recopiles a futuro, vamos a generar visualizaciones
          que serán de utilidad en diversos tipos de tomas de decisiones, como
          pueden ser:
        </p>

        <div className="mb-6">
          <ul className="list-disc pl-5">
            <li className="mt-4">
              <span className="font-bold">
                Identificar productos más y menos vendidos:
              </span>{" "}
              Enfocar esfuerzos de marketing o promociones en los productos más
              populares y evaluar si retirar los menos vendidos.
            </li>
            <li className="mt-2">
              <span className="font-bold">
                Definir estrategias de descuento:
              </span>{" "}
              Ofrecer promociones en productos con inventario excedente o para
              impulsar ventas en temporadas bajas.
            </li>
            <li className="mt-2">
              <span className="font-bold">Controlar el inventario:</span> Evitar
              sobrecompras o productos que no se vendan rápido para reducir
              costos de almacenamiento.
            </li>
            <li className="mt-2">
              <span className="font-bold">
                Establecer un presupuesto mensual:
              </span>{" "}
              Asignar montos fijos para gastos operativos, marketing y ahorros
              según ingresos.
            </li>
            <li className="mt-2">
              <span className="font-bold">Determinar reinversiones:</span>{" "}
              Decidir cuánto de las ganancias reinvertir en inventario,
              herramientas o marketing para crecer.
            </li>
          </ul>
        </div>

        <p className="mb-4">
          Las herramientas utilizadas para entender esos datos son las
          siguientes:
        </p>

        <div className="mb-6">
          <div className="sm:mx-4 md:mx-16 lg:mx-20 xl:mx-36">
            <h2 className="text-xl font-semibold mb-2">Power BI</h2>
            <p className="mb-2">
              Esta poderosa herramienta nos permite trabajar con diversas tablas
              en simultaneo, cruzando los datos y generando visualizaciones que
              son interactivas y a las cuáles se les puede aplicar filtros.
            </p>
            <h2 className="text-xl font-semibold mt-4 mb-4">
              Tablero de ejemplo:
            </h2>

            <div className="mx-auto overflow-hidden rounded-lg border bg-white">
              {/* 4:3 en mobile, 16:9 desde md */}
              <div className="relative w-full sm:pt-[75%] md:pt-[56.25%] pt-[75%]">
                <iframe
                  title="Ingresos"
                  src="https://app.powerbi.com/view?r=eyJrIjoiYzExOGM2Y2QtOWE1Ni00MGVlLTkxYzEtNGY1YWNiZjMwYTEwIiwidCI6ImVmNGQyMzkyLTYxODMtNDE5OS1iNzdjLTk2MWE1NDlhOWMxNSIsImMiOjR9&pageName=bfe18aafc4b0e8de20d6"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mx-4 md:mx-16 lg:mx-20 xl:mx-36">
          <h2 className="text-xl font-semibold mb-2">Streamlit</h2>
          <p className="mb-2">
            También para casos más complejos como datos con geolocalización
            geográfica es una posibilidad generar visualizaciones en Python y
            Streamlit que te van a permitir ver los datos y analizarlos
            geográficamente.
          </p>

          <p className="mb-2">
            En el siguiente ejemplo podés ingresar el nombre de una localidad o
            barrio de Corrientes y ver los resultados electorales en ese área.
          </p>

          {/* Acá se embeben tus dos apps de Fly (Elecciones y Parques) */}
          <RenderProjects />
        </div>
      </div>
    </>
  );
}

export default AnalisisDeDatos;
