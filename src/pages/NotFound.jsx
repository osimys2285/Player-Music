function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '12px',
      fontFamily: 'Nunito, sans-serif',
    }}>
      <h2 style={{ fontSize: '64px', color: '#7c3aed', margin: 0 }}>404</h2>
      <p style={{ color: '#9ca3af' }}>Страница не найдена</p>
      <a href="/" style={{
        marginTop: '8px',
        background: '#7c3aed',
        color: '#fff',
        padding: '10px 28px',
        borderRadius: '20px',
        fontWeight: '700',
        textDecoration: 'none',
        fontSize: '14px',
      }}>
        На главную
      </a>
    </div>
  )
}

export default NotFound