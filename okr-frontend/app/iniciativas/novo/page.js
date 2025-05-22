'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaIniciativa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [porcentagemConclusao, setPorcentagemConclusao] = useState(0);
  const [krId, setKrId] = useState('');
  const [krs, setKrs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/krs')
      .then(res => res.json())
      .then(data => setKrs(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const iniciativa = {
      titulo,
      descricao,
      porcentagemConclusao,
      resultadoChave: { id: krId }
    };

    const res = await fetch('http://localhost:8080/api/iniciativas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(iniciativa),
    });

    if (res.ok) {
      router.push('/iniciativas');
    } else {
      alert('Erro ao criar Iniciativa');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Nova Iniciativa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label><br />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Porcentagem de Conclusão (%):</label><br />
          <input
            type="number"
            value={porcentagemConclusao}
            onChange={(e) => setPorcentagemConclusao(Number(e.target.value))}
            min="0"
            max="100"
            required
          />
        </div>
        <div>
          <label>Resultado-Chave:</label><br />
          <select value={krId} onChange={(e) => setKrId(e.target.value)} required>
            <option value="">Selecione um KR</option>
            {krs.map((kr) => (
              <option key={kr.id} value={kr.id}>
                {kr.descricao}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Iniciativa</button>
      </form>
    </div>
  );
}
