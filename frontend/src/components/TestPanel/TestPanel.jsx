import './TestPanel.css';

const tests = [
  ['GET /api/tasks', '200 · Lista de tareas'],
  ['GET /api/tasks/999', '404 · Tarea no encontrada'],
  ['POST sin token', '401 · Token no proporcionado'],
  ['POST sin título', '400 · Errores de validación'],
  ['POST válido', '201 · Tarea creada'],
  ['DELETE como user', '403 · Sin permisos'],
  ['DELETE como admin', '200 · Tarea eliminada'],
  ['Ruta inexistente', '404 · Ruta no encontrada']
];

export default function TestPanel({ onTest, loading }) {
  return (
    <section className="card">
      <div className="test-header">
        <div>
          <h2>Pruebas de la práctica</h2>
          <p>Ejecuta las 8 pruebas solicitadas.</p>
        </div>
        <span className="count">8 pruebas</span>
      </div>

      <div className="test-list">
        {tests.map(([title, result], index) => (
          <button
            key={title}
            className="test"
            disabled={loading}
            onClick={() => onTest(index + 1)}
          >
            <span className="number">{index + 1}</span>
            <span>
              <strong>{title}</strong>
              <small>{result}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
