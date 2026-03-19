import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('canvas');

  const tabs = [
    {
      id: 'canvas',
      label: 'Canvas',
      content: (
<div class="p-8 bg-gray-100 text-gray-900">
  <h1 class="text-2xl font-bold mb-4">Análisis CANVAS</h1>
  <p class="mb-4">
    El análisis CANVAS (o también llamado Business Model Canvas) es una herramienta de planificación estratégica desarrollada por Alexander Osterwalder y Yves Pigneur, diseñada para visualizar, analizar y estructurar un modelo de negocio de manera clara y sencilla. Se representa en una cuadrícula dividida en nueve bloques, donde cada bloque abarca un área clave de cualquier negocio. Esta herramienta permite a emprendedores, startups y empresas comprender cómo funciona su modelo de negocio y tomar decisiones estratégicas.
  </p>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Segmentos de Clientes</h2>
    <p class="mb-2">
      Define a quién está dirigido el negocio. Identifica los diferentes tipos de clientes o usuarios a los que el negocio pretende servir, segmentándolos según sus características y necesidades.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Propuesta de Valor</h2>
    <p class="mb-2">
      Describe el valor que el negocio ofrece a sus clientes. Este bloque responde a la pregunta: ¿Qué problema resuelve el negocio o qué necesidades satisface para sus clientes? La propuesta de valor debe distinguirse de la competencia.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Canales</h2>
    <p class="mb-2">
      Explica cómo se entregan los productos o servicios al cliente. Aquí se detallan los canales de comunicación, distribución y venta que se utilizan para interactuar y llegar al cliente.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Relación con los Clientes</h2>
    <p class="mb-2">
      Describe cómo la empresa interactúa y mantiene su relación con cada segmento de clientes. Puede incluir soporte personalizado, servicio automatizado, o comunidades, dependiendo del tipo de relación que mejor se adapte al negocio.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Fuentes de Ingresos</h2>
    <p class="mb-2">
      Define cómo genera ingresos el negocio, ya sea mediante la venta directa, suscripciones, rentas, licencias, publicidad u otros. Cada segmento de clientes puede tener sus propias fuentes de ingresos.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Recursos Clave</h2>
    <p class="mb-2">
      Especifica los recursos indispensables para que el negocio funcione. Estos recursos pueden ser físicos, humanos, intelectuales o financieros, y son necesarios para ofrecer la propuesta de valor y operar en los canales.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Actividades Clave</h2>
    <p class="mb-2">
      Enumera las acciones o procesos esenciales que el negocio debe realizar para funcionar correctamente y cumplir su propuesta de valor.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Socios Clave</h2>
    <p class="mb-2">
      Incluye los proveedores, aliados y otros socios externos que permiten a la empresa alcanzar sus objetivos y mejorar su modelo de negocio.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Estructura de Costos</h2>
    <p class="mb-2">
      Identifica los costos fijos y variables asociados con la operación del negocio. Aquí se consideran los gastos de producción, distribución, marketing y cualquier otro aspecto que genere un costo para la empresa.
    </p>
  </div>
</div>
      ),
    },
    {
      id: 'foda',
      label: 'FODA',
      content: (
        <div class="p-8 bg-gray-100 text-gray-900">
        <h1 class="text-2xl font-bold mb-4">Análisis FODA</h1>
        <p class="mb-4">
          El análisis FODA (también conocido como SWOT por sus siglas en inglés) es una herramienta de análisis estratégico que permite evaluar los elementos internos y externos que afectan a una empresa, proyecto o situación específica. Su objetivo es identificar las fortalezas, oportunidades, debilidades y amenazas para poder tomar decisiones informadas y formular estrategias efectivas.
        </p>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Fortalezas (F)</h2>
          <p class="mb-2">
            Representan los aspectos internos y positivos de la empresa o proyecto. Son los recursos, capacidades o ventajas competitivas que le dan una posición favorable en el mercado. Ejemplos de fortalezas pueden ser una marca reconocida, un equipo de trabajo altamente capacitado, o tecnología avanzada.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Oportunidades (O)</h2>
          <p class="mb-2">
            Son factores externos y positivos que pueden ser aprovechados para el crecimiento o la mejora de la organización. Incluyen tendencias del mercado, cambios en las necesidades de los clientes, avances tecnológicos, y cualquier otro aspecto del entorno externo que pueda favorecer a la empresa.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Debilidades (D)</h2>
          <p class="mb-2">
            Son factores internos que limitan o perjudican el desempeño de la empresa o proyecto. Las debilidades pueden incluir falta de recursos, deficiencias en la infraestructura, problemas en la organización, o una baja presencia de marca, y representan áreas que necesitan mejora o atención.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Amenazas (A)</h2>
          <p class="mb-2">
            Son factores externos que podrían afectar negativamente el desempeño o los objetivos de la empresa. Las amenazas pueden incluir la competencia, cambios en la regulación, crisis económicas, o cambios en las preferencias de los consumidores.
          </p>
        </div>
      </div>
      ),
    },
    { id: 'porter', label: 'Porter',
        content: 
        <div class="p-8 bg-gray-100 text-gray-900">
      <h1 class="text-2xl font-bold mb-4">Las Cinco Fuerzas de Porter</h1>
      <p class="mb-4">
        El modelo de las Cinco Fuerzas de Porter es una herramienta estratégica utilizada para analizar la competencia dentro de una industria. Desarrollado por Michael Porter, el modelo identifica cinco fuerzas clave que afectan la competitividad y la rentabilidad de las empresas. Estas fuerzas son fundamentales para entender la dinámica de la industria y formular estrategias efectivas. A continuación, se describen las cinco fuerzas:
      </p>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">1. Amenaza de Nuevos Competidores</h2>
        <p class="mb-2">
          Esta fuerza se refiere a la facilidad con que nuevas empresas pueden ingresar al mercado y competir con las empresas existentes. Si las barreras de entrada son bajas, la competencia aumentará, lo que reducirá la rentabilidad de las empresas establecidas. Las barreras de entrada incluyen factores como el capital necesario, la lealtad de los clientes, la regulación y el acceso a canales de distribución.
        </p>
      </div>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">2. Poder de Negociación de los Proveedores</h2>
        <p class="mb-2">
          El poder de negociación de los proveedores determina la capacidad que tienen los proveedores para influir en los precios de los insumos. Si un número limitado de proveedores controla los recursos clave, estos pueden imponer precios más altos y reducir la rentabilidad de las empresas compradoras. Esto es especialmente relevante en industrias donde los proveedores ofrecen productos o servicios diferenciados.
        </p>
      </div>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">3. Poder de Negociación de los Compradores</h2>
        <p class="mb-2">
          El poder de negociación de los compradores se refiere a la capacidad de los clientes para influir en los precios y las condiciones de venta. Cuando los compradores tienen muchas opciones, su poder de negociación aumenta, lo que obliga a las empresas a reducir precios o mejorar la calidad para mantenerse competitivas.
        </p>
      </div>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">4. Amenaza de Productos o Servicios Sustitutos</h2>
        <p class="mb-2">
          Esta fuerza mide la posibilidad de que los clientes opten por productos o servicios alternativos que puedan satisfacer la misma necesidad. Cuantos más sustitutos haya, mayor será la presión sobre las empresas para que mantengan precios competitivos. El desarrollo de tecnología o cambios en los gustos de los consumidores pueden aumentar esta amenaza.
        </p>
      </div>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">5. Rivalidad entre los Competidores Existentes</h2>
        <p class="mb-2">
          La rivalidad en la industria se refiere al nivel de competencia entre las empresas que ya están establecidas. Si la competencia es alta, las empresas deben luchar por una cuota de mercado, lo que puede llevar a guerras de precios y a menores márgenes de ganancia. La rivalidad depende de factores como la cantidad de competidores, la tasa de crecimiento del mercado y las barreras de salida.
        </p>
      </div>
    
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">En resumen:</h2>
        <ul class="list-disc pl-5">
          <li>La amenaza de nuevos competidores depende de las barreras de entrada.</li>
          <li>El poder de negociación de los proveedores se ve influenciado por su control sobre los recursos clave.</li>
          <li>El poder de negociación de los compradores afecta los precios y las condiciones de venta.</li>
          <li>La amenaza de productos sustitutos aumenta la competencia en el mercado.</li>
          <li>La rivalidad entre los competidores existentes impacta en los márgenes de ganancia y las estrategias de mercado.</li>
        </ul>
      </div>
    
      <p class="mb-4">
        El análisis de las Cinco Fuerzas de Porter es útil para entender las dinámicas competitivas de una industria y para ayudar a las empresas a desarrollar estrategias que mejoren su posición en el mercado, enfrentándose a las presiones de estas fuerzas.
      </p>
    </div>
    },
    {
      id: 'pestel',
      label: 'PESTEL',
      content: (
<div class="p-8 bg-gray-100 text-gray-900">
  <h1 class="text-2xl font-bold mb-4">Análisis PESTEL</h1>
  <p class="mb-4">
    El análisis PESTEL es una herramienta de evaluación estratégica que se utiliza para identificar y analizar los factores externos que pueden influir en el entorno en el que opera una organización. La metodología PESTEL desglosa los factores en seis categorías, cada una representada por una letra de la sigla:
  </p>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Políticos (P)</h2>
    <p class="mb-2">
      Estos factores incluyen políticas gubernamentales, estabilidad política, regulaciones fiscales y comerciales, acuerdos internacionales y el nivel de corrupción. Este análisis ayuda a entender cómo las políticas del gobierno pueden afectar a la organización.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Económicos (E)</h2>
    <p class="mb-2">
      Evalúa la situación económica que puede influir en el mercado y en la organización. Factores como el crecimiento económico, la inflación, las tasas de interés, el tipo de cambio y el nivel de empleo afectan el poder adquisitivo de los consumidores y los costos de la organización.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Sociales (S)</h2>
    <p class="mb-2">
      Analiza aspectos demográficos, culturales y sociales que afectan la demanda de productos o servicios y la forma en que una organización opera. Factores como el estilo de vida, los valores culturales, las tendencias en salud, la educación y la conciencia ambiental forman parte de este análisis.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Tecnológicos (T)</h2>
    <p class="mb-2">
      Examina el impacto de los avances tecnológicos y la innovación en el sector de la organización. Esto incluye el desarrollo de nuevas tecnologías, la automatización, la digitalización y el gasto en investigación y desarrollo (I+D).
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Ecológicos (E)</h2>
    <p class="mb-2">
      Se enfoca en el entorno y en cómo los factores ambientales afectan la operación y la sostenibilidad de una organización. Aquí se incluyen el cambio climático, la sostenibilidad, el manejo de residuos y la regulación ambiental.
    </p>
  </div>

  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Legales (L)</h2>
    <p class="mb-2">
      Abarca las leyes y regulaciones que afectan a la organización. Estos pueden incluir leyes laborales, regulaciones de salud y seguridad, normas de protección al consumidor y derechos de propiedad intelectual.
    </p>
  </div>

  <p class="mb-4">
    Cada factor PESTEL puede tener un impacto positivo o negativo en la organización. Este análisis permite a las empresas anticiparse a posibles amenazas y aprovechar oportunidades del entorno, facilitando la toma de decisiones estratégicas más informadas.
  </p>
</div>
      ),
    },
    {
      id: 'tam',
      label: 'TAM/SAM/SOM',
      content: (
        <div class="p-8 bg-gray-100 text-gray-900">
        <h1 class="text-2xl font-bold mb-4">Análisis TAM, SAM y SOM</h1>
        <p class="mb-4">
          El análisis TAM, SAM y SOM es un marco que permite evaluar el potencial de mercado para un producto o servicio. Cada término representa un nivel de mercado más específico, lo que ayuda a las empresas a dimensionar su oportunidad de negocio, priorizar sus objetivos de mercado y establecer estrategias de crecimiento. A continuación, se describen cada uno:
        </p>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">TAM (Total Addressable Market)</h2>
          <p class="mb-2">
            Este es el mercado total disponible, o el tamaño completo del mercado para un producto o servicio, en el caso de que una empresa alcanzara una cobertura del 100% sin restricciones. Representa el potencial de ingresos máximo si el producto satisficiera a todos los clientes posibles dentro del mercado global. Es una estimación amplia y generalmente idealista, que se utiliza para entender el tamaño completo del mercado.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">SAM (Serviceable Available Market)</h2>
          <p class="mb-2">
            Este es el mercado accesible disponible, es decir, el segmento del TAM al que la empresa puede realmente dirigirse debido a factores específicos como la geografía, la capacidad de servicio, los canales de distribución, y otras limitaciones. SAM representa el tamaño del mercado que la empresa puede abordar con sus productos o servicios actuales y los recursos disponibles.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">SOM (Serviceable Obtainable Market)</h2>
          <p class="mb-2">
            Este es el mercado accesible y obtenible, o la parte del SAM que la empresa puede razonablemente capturar en el corto o mediano plazo, considerando sus capacidades, recursos y competencia. SOM es el objetivo de mercado realista que se espera alcanzar, por lo que es la cifra más precisa para proyectar ingresos y definir objetivos de ventas.
          </p>
        </div>
      
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">En resumen:</h2>
          <ul class="list-disc pl-5">
            <li>TAM mide el tamaño total del mercado sin limitaciones.</li>
            <li>SAM mide el tamaño del mercado accesible en función de la capacidad de la empresa.</li>
            <li>SOM mide el tamaño del mercado que la empresa puede efectivamente capturar.</li>
          </ul>
        </div>
      
        <p class="mb-4">
          Este análisis es útil en la planificación estratégica, ya que ayuda a visualizar el alcance y las oportunidades de crecimiento en el mercado y a decidir en qué segmentos enfocar los recursos.
        </p>
      </div>
      ),
    },

  
];

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold p-6 text-gray-900">Modelos utilizados:</h2>
        {/* Botones de las pestañas */}
        <div className="flex border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`text-[8px] md:text-base tab-button px-4 py-2 focus:outline-none border-b-2 ${
                activeTab === tab.id ? 'border-blue-500 text-black' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de las pestañas */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? '' : 'hidden'}`}
          >
            <h2 className="text-xl font-semibold mb-2">Análisis {tab.label}</h2>
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
