/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
'use client';

import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 

export default function IniciativasPage() {
  const [iniciativas, setIniciativas] = useState([]);  // Lista de iniciativas
  const [porcentagemEdicao, setPorcentagemEdicao] = useState({});  // Armazena edições individuais de %
  const router = useRouter();

  // Carrega as iniciativas ao montar o componente
  useEffect(() => {
    fetch('http://localhost:8080/api/iniciativas')
      .then(res => res.json())
      .then(data => setIniciativas(data));
  }, []);

  // Deleta uma iniciativa
  const deletarIniciativa = async (id) => {
    await fetch(`http://localhost:8080/api/iniciativas/${id}`, {
      method: 'DELETE'
    });
    setIniciativas(iniciativas.filter(i => i.id !== id));
  };

  // Atualiza a porcentagem de conclusão
  const atualizarPorcentagem = async (id) => {
    const iniciativa = iniciativas.find(i => i.id === id);
    const novaPorcentagem = parseFloat(porcentagemEdicao[id]);

    const atualizado = {
      ...iniciativa,
      porcentagemConclusao: novaPorcentagem
    };

    const res = await fetch(`http://localhost:8080/api/iniciativas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atualizado)
    });

    if (res.ok) {
      const atualizadas = iniciativas.map(i => i.id === id ? atualizado : i);
      setIniciativas(atualizadas);
      setPorcentagemEdicao({ ...porcentagemEdicao, [id]: '' });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Iniciativas</h1>
      <button
        onClick={() => router.push('/iniciativas/novo')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
      >
        Criar Nova Iniciativa
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {iniciativas.map(i => (
          <li key={i.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            background: '#f9f9f9'
          }}>
            <div><strong>{i.titulo}</strong></div>
            <div>{i.descricao}</div>
            <div>Concluído: {i.porcentagemConclusao.toFixed(2)}%</div>

            <div style={{ marginTop: '10px' }}>
              <input
                type="number"
                min={0}
                max={100}
                value={porcentagemEdicao[i.id] || ''}
                onChange={e => setPorcentagemEdicao({ ...porcentagemEdicao, [i.id]: e.target.value })}
                placeholder="Nova %"
                style={{ padding: '6px', marginRight: '8px', width: '100px' }}
              />
              <button
                onClick={() => atualizarPorcentagem(i.id)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  marginRight: '8px',
                  cursor: 'pointer'
                }}
              >
                Atualizar %
              </button>
              <button
                onClick={() => deletarIniciativa(i.id)}
                style={{
                  backgroundColor: '#ff6961',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
