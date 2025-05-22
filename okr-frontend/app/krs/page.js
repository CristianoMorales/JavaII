'use client';

import { useEffect, useState } from 'react';

export default function KRsPage() {
  const [krs, setKRs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/krs')
      .then(res => res.json())
      .then(data => setKRs(data))
      .catch(err => console.error('Erro ao buscar KRs:', err));
  }, []);

  return (
    <div>
      <a href="/krs/novo">
  <button style={{ marginBottom: '1rem' }}>➕ Criar Novo KR</button>
</a>
      <h1>Resultado-Chave (KRs)</h1>
      {krs.length === 0 ? (
        <p>Nenhum KR encontrado.</p>
      ) : (
        <ul>
          {krs.map(kr => (
            <li key={kr.id}>
              <strong>{kr.descricao}</strong><br />
              Meta: {kr.meta}<br />
              Conclusão: {kr.porcentagemConclusao}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
