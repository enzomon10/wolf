import React from "react";

const ExperienceCards = () => {
  const experienceData = [
    {
      title: "Corrientes Emprende 2016",
      organization: "CodaSDE",
      details: "Finalista Corrientes Emprende 2016 con el proyecto CodaSDE",
    },
    {
      title: "Pasantía - 2018",
      organization: "Talez S.R.L.",
      details: "Puesto Administrativo",
    },
    {
      title: "Corrientes Emprende 2019",
      organization: "CodaSDE",
      details: "Finalista Corrientes Emprende 2019 con el proyecto CodaSDE",
    },
    {
        title: "PAC Reactivación Productiva 2020",
        organization: "CodaSDE",
        details: "Finalista PAC Reactivación Productiva con proyecto CodaSDE",
      },
    {
      title: "Emprendedor - 2018-Actualidad",
      organization: "CodaSDE",
      details: "Emprendedor en CodaSDE desde el 2018",
    },
    {
      title: "Depto. de desarrollo tecnológico - 2023-Actualidad",
      organization: "Subsecretaría de industria",
      details: "Becado (programación, redes y proyectos)",
    },

  ];

  return (
    <div className="p-8 bg-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Experiencia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col items-start hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{exp.title}</h2>
            <h3 className="text-lg text-gray-700 mb-1">{exp.organization}</h3>
            <p className="text-gray-500">{exp.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCards;
