import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/global.css';

const API = 'http://localhost:3000/api';

export default function App() {
  const [token, setToken] = useState('abc123');
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  async function loadTasks() {
    try {
      const res = await axios.get(`${API}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data);
      setMessage(`Cargadas ${res.data.length} tareas.`);
    } catch (e) {
      setMessage(e.response?.data?.message || 'Error al cargar tareas');
    }
  }

  async function runTests() {
    const tests = [];
    const call = async (label, method, url, config = {}) => {
      try {
        const r = await axios({ method, url: `${API}${url}`, ...config });
        tests.push({ label, status: r.status, result: 'OK' });
      } catch (e) {
        tests.push({ label, status: e.response?.status || 'ERR', result: e.response?.data?.message || 'Error' });
      }
      setTasks([]);
      return tests;
    };

    await call('GET /tasks', 'get', '/tasks', { headers: { Authorization: 'Bearer abc123' } });
    await call('GET /tasks/999', 'get', '/tasks/999', { headers: { Authorization: 'Bearer abc123' } });
    await call('POST sin token', 'post', '/tasks', { data: { titulo: 'Prueba' } });
    await call('POST sin título', 'post', '/tasks', { headers: { Authorization: 'Bearer abc123' }, data: {} });
    await call('POST válida', 'post', '/tasks', {
      headers: { Authorization: 'Bearer abc123' },
      data: { titulo: `Prueba ${Date.now()}`, prioridad: 'media', categoriaId: 1 }
    });
    await call('DELETE como user', 'delete', '/tasks/1', { headers: { Authorization: 'Bearer xyz789' } });
    await call('DELETE como admin', 'delete', '/tasks/9999', { headers: { Authorization: 'Bearer abc123' } });
    await call('Ruta inexistente', 'get', '/ruta-que-no-existe');
    setMessage(JSON.stringify(tests, null, 2));
    loadTasks();
  }

  useEffect(() => { loadTasks(); }, []);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="badge">Sequelize + Express + SQLite</span>
          <h1>Práctica de Middlewares</h1>
          <p>Panel para probar autenticación, validación, autorización y respuestas de la API.</p>
        </div>
        <div className="auth">
          <label>Token</label>
          <input value={token} onChange={e => setToken(e.target.value)} />
          <button onClick={loadTasks}>Cargar tareas</button>
          <button className="secondary" onClick={runTests}>Ejecutar pruebas</button>
        </div>
      </section>

      <section className="card">
        <h2>Tareas</h2>
        <div className="grid">
          {tasks.map(t => (
            <article className="task" key={t.id}>
              <div className="row"><strong>#{t.id} {t.titulo}</strong><span>{t.prioridad}</span></div>
              <p>{t.descripcion || 'Sin descripción'}</p>
              <small>Estado: {t.estado} · Usuario: {t.usuario?.nombre || '-'} · Categoría: {t.categoria?.nombre || 'Sin categoría'}</small>
              <small>Vencimiento: {t.fechaVencimiento || 'Sin fecha'}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Resultado de pruebas</h2>
        <pre>{message || 'Ejecuta las pruebas para ver resultados.'}</pre>
      </section>
    </main>
  );
}
