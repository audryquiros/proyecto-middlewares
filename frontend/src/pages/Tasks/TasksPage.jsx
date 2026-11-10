import {useEffect,useState} from 'react';
import './TasksPage.css';

const tests=[
['GET /api/tasks','200 · listar tareas'],
['GET /api/tasks/999','404 · no encontrada'],
['POST sin token','401 · sin autenticación'],
['POST sin título','400 · validación'],
['POST válido','201 · crear tarea'],
['DELETE como user','403 · sin permisos'],
['DELETE como admin','200 · eliminar'],
['Ruta inexistente','404 · error']
];

export default function TasksPage(){
 const [tasks,setTasks]=useState([]);
 const [result,setResult]=useState(null);
 const [token,setToken]=useState('abc123');
 const [titulo,setTitulo]=useState('');
 const [prioridad,setPrioridad]=useState('media');
 const [loading,setLoading]=useState(false);

 async function refresh(){
   const r=await fetch('/api/tasks'); const d=await r.json(); setTasks(d);
 }
 useEffect(()=>{refresh()},[]);

 async function test(n){
   setLoading(true); let r;
   try{
    if(n===1) r=await fetch('/api/tasks');
    if(n===2) r=await fetch('/api/tasks/999');
    if(n===3) r=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({titulo:'Sin token'})});
    if(n===4) r=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer abc123'},body:JSON.stringify({prioridad:'alta'})});
    if(n===5) r=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({titulo:titulo||'Nueva tarea de prueba',prioridad})});
    if(n===6) r=await fetch('/api/tasks/1',{method:'DELETE',headers:{Authorization:'Bearer xyz789'}});
    if(n===7) r=await fetch('/api/tasks/1',{method:'DELETE',headers:{Authorization:'Bearer abc123'}});
    if(n===8) r=await fetch('/api/no-existe');
    const d=await r.json(); setResult({status:r.status,data:d});
    if(n===1||n===5||n===7) refresh();
   }catch(e){setResult({status:'ERR',data:{error:'No se pudo conectar con el backend'}})}
   setLoading(false);
 }

 return <div className="page">
  <header>
   <span>NODE.JS · EXPRESS · SQLITE</span>
   <h1>Práctica de Middlewares</h1>
   <p>API de tareas con autenticación, roles y base de datos relacional.</p>
  </header>

  <main>
   <section className="card users">
    <div><h2>Usuario para las pruebas</h2><p>Selecciona el token que usará la prueba de creación.</p></div>
    <div className="user-buttons">
     <button className={token==='abc123'?'active':''} onClick={()=>setToken('abc123')}>Ana · admin<br/><small>abc123</small></button>
     <button className={token==='xyz789'?'active':''} onClick={()=>setToken('xyz789')}>Luis · user<br/><small>xyz789</small></button>
    </div>
   </section>

   <div className="grid">
    <section className="card">
     <h2>8 pruebas</h2><p>Ejecuta las pruebas solicitadas.</p>
     <div className="tests">{tests.map((t,i)=><button disabled={loading} onClick={()=>test(i+1)} key={t[0]}><b>{i+1}</b><span>{t[0]}<small>{t[1]}</small></span></button>)}</div>
    </section>

    <section className="right">
     <section className="card">
      <h2>Crear tarea</h2><p>Se relaciona con el usuario autenticado.</p>
      <input placeholder="Título" value={titulo} onChange={e=>setTitulo(e.target.value)}/>
      <select value={prioridad} onChange={e=>setPrioridad(e.target.value)}>
       <option>baja</option><option>media</option><option>alta</option>
      </select>
     </section>

     <section className="card result">
      <div className="row"><div><h2>Resultado</h2><p>Respuesta de Express.</p></div>{result&&<b>HTTP {result.status}</b>}</div>
      <pre>{result?JSON.stringify(result.data,null,2):'Ejecuta una prueba para ver la respuesta.'}</pre>
     </section>

     <section className="card">
      <div className="row"><div><h2>Tareas</h2><p>Datos provenientes de SQLite.</p></div><button onClick={refresh}>Actualizar</button></div>
      <div className="tasks">{tasks.map(t=><article key={t.id}><div><small>#{t.id} · {t.categoria||'Sin categoría'}</small><h3>{t.titulo}</h3><p>{t.usuario} · {t.rol} · {t.estado}</p></div><strong>{t.prioridad}</strong></article>)}</div>
     </section>
    </section>
   </div>
  </main>
 </div>
}