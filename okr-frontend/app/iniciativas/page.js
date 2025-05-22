'use client';

import { useEffect, useState } from 'react';

export default function IniciativasPage() {
  const [iniciativas, setIniciativas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/iniciativas')
      .then(res => res.json())
      .then(data => setIniciativas(data))
      .catch(err => console.error('Erro ao buscar Iniciativas:', err));
  }, []);

  return (
    <div>
      <a href="/iniciativas/novo">
  <button style={{ marginBottom: '1rem' }}>➕ Criar Nova Iniciativa</button>
</a>
      <h1>Iniciativas</h1>
      {iniciativas.length === 0 ? (
        <p>Nenhuma iniciativa encontrada.</p>
      ) : (
        <ul>
          {iniciativas.map(ini => (
            <li key={ini.id}>
              <strong>{ini.titulo}</strong><br />
              {ini.descricao}<br />
              Conclusão: {ini.porcentagemConclusao}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
