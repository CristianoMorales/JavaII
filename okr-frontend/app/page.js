'use client';

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/objetivos")
      .then(res => res.json())
      .then(setObjetivos)
      .catch(err => console.error("Erro ao buscar objetivos:", err));
  }, []);

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    background: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const progressBarContainer = {
    height: '12px',
    backgroundColor: '#e0e0e0',
    borderRadius: '6px',
    overflow: 'hidden',
    marginTop: '8px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const descriptionStyle = {
    marginBottom: '10px'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Objetivos Principais</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {objetivos.map(obj => (
          <li key={obj.id} style={cardStyle}>
            <div style={titleStyle}>{obj.titulo}</div>
            <div style={descriptionStyle}>{obj.descricao}</div>
            <div>Conclusão: {obj.porcentagemConclusao}%</div>
            <div style={progressBarContainer}>
              <div style={{
                width: `${obj.porcentagemConclusao}%`,
                height: '100%',
                backgroundColor: '#007bff',
                transition: 'width 0.3s'
              }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
