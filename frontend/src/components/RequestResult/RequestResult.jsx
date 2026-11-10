import './RequestResult.css';

export default function RequestResult({ result, loading }) {
  return (
    <section className="card result-card">
      <div className="result-header">
        <div>
          <h2>Resultado</h2>
          <p>Respuesta recibida desde Express.</p>
        </div>

        {result && (
          <span className={result.ok ? 'status success' : 'status error'}>
            HTTP {result.status}
          </span>
        )}
      </div>

      {loading ? (
        <div className="message">Procesando petición...</div>
      ) : result ? (
        <pre>{JSON.stringify(result.data, null, 2)}</pre>
      ) : (
        <div className="message">
          Ejecuta una prueba para ver la respuesta.
        </div>
      )}
    </section>
  );
}
