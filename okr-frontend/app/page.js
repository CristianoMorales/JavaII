'use client';

import { useEffect, useState } from "react";

export default function ObjetivosPage() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/objetivos")
      .then(res => res.json())
      .then(data => setObjetivos(data))
      .catch(err => console.error("Erro ao buscar objetivos:", err));
  }, []);

  return (
    <div>
      <h2>Lista de Objetivos</h2>
      <ul>
        {objetivos.map(obj => (
          <li key={obj.id}>
            <strong>{obj.titulo}</strong>: {obj.descricao} – {obj.porcentagemConclusao}%
          </li>
        ))}
      </ul>
    </div>
  );
}
