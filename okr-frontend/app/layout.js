export const metadata = {
  title: 'Sistema de OKRs',
  description: 'Aplicação de Gestão de Objetivos e Resultados-Chave',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
          <a href="/" style={{ marginRight: '1rem' }}>Início</a>
          <a href="/objetivos" style={{ marginRight: '1rem' }}>Objetivos</a>
          <a href="/krs" style={{ marginRight: '1rem' }}>KRs</a>
          <a href="/iniciativas">Iniciativas</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
