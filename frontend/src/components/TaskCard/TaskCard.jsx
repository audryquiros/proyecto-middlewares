import './TaskCard.css';

export default function TaskCard({ task }) {
  return (
    <article className="task-card">
      <div>
        <span className="id">#{task.id}</span>
        <h3>{task.titulo}</h3>
      </div>
      <span className={`priority ${task.prioridad}`}>
        {task.prioridad}
      </span>
    </article>
  );
}
