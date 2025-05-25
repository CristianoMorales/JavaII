/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaIniciativa() {
  // Estados controlados para os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [porcentagemConclusao, setPorcentagemConclusao] = useState(0);
  const [krId, setKrId] = useState('');
  const [krs, setKrs] = useState([]); // Lista de KRs disponíveis
  const router = useRouter();

  // Carrega os KRs ao montar o componente
  useEffect(() => {
    fetch('http://localhost:8080/api/krs')
      .then(res => res.json()) // converte a resposta em JSON
      .then(data => setKrs(data)); // guarda os dados no estado
  }, []);

  // Função para enviar os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o reload da página

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

    // Redireciona se o envio for bem-sucedido
    if (res.ok) {
      router.push('/iniciativas');
    } else {
      alert('Erro ao criar Iniciativa');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Nova Iniciativa</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          background: '#f9f9f9',
          maxWidth: '600px'
        }}
      >
        {/* Campo Título */}
        <div style={{ marginBottom: '15px' }}>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Descrição */}
        <div style={{ marginBottom: '15px' }}>
          <label>Descrição:</label><br />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Porcentagem */}
        <div style={{ marginBottom: '15px' }}>
          <label>Porcentagem de Conclusão (%):</label><br />
          <input
            type="number"
            value={porcentagemConclusao}
            onChange={(e) => setPorcentagemConclusao(Number(e.target.value))}
            min="0"
            max="100"
            required
            style={{ padding: '8px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Select com KRs */}
        <div style={{ marginBottom: '15px' }}>
          <label>Resultado-Chave:</label><br />
          <select
            value={krId}
            onChange={(e) => setKrId(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecione um KR</option>
            {krs.map((kr) => (
              <option key={kr.id} value={kr.id}>
                {kr.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Criar Iniciativa
        </button>
      </form>
    </div>
  );
}
