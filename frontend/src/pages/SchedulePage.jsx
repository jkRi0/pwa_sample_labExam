import { useMemo, useState } from 'react';
import dayjs from '../utils/dayjs.js';
import { useTasks } from '../hooks/useTasks.js';

const TrainingSessionsPage = () => {
  const { tasks, status } = useTasks();

  const sessions = useMemo(
    () =>
      tasks
        .filter((task) => task.dueDate)
        .sort((a, b) => dayjs(a.dueDate).valueOf() - dayjs(b.dueDate).valueOf()),
    [tasks]
  );

  const nextSession = sessions[0];

  const sessionsBySport = useMemo(() => {
    const counts = sessions.reduce((acc, task) => {
      const key = task.sport || 'Multi-sport';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([sport, count]) => ({ sport, count }))
      .sort((a, b) => b.count - a.count);
  }, [sessions]);

  const [showFullList, setShowFullList] = useState(false);

  return (
    <div className="container" style={{ display: 'grid', gap: '2rem' }}>
      <section className="hero" style={{ padding: '3rem 2.5rem', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '720px' }}>
          <div className="hero__title-wrapper">
            <h1 className="hero__title" style={{ marginBottom: '1.5rem' }}>
              <span className="hero__title-line">Your complete schedule</span>
              <span className="hero__title-line hero__title-line--highlight">at a glance</span>
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-light)', lineHeight: 1.7 }}>
            Stay organized with a clear view of all your upcoming tasks and sessions. Manage your schedule efficiently and never miss an important deadline.
          </p>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <h2 className="card__title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Next on the court</h2>
          {status === 'loading' ? <p>Loading sessions...</p> : null}
          {nextSession ? (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'grid',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <p style={{ margin: 0, color: 'var(--color-text)', fontWeight: 700, fontSize: '1.125rem' }}>{nextSession.title}</p>
              <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9375rem' }}>
                {dayjs(nextSession.dueDate).format('dddd · MMM D · h:mm A')}
              </p>
              <p style={{ margin: 0, color: 'var(--color-text)', fontSize: '0.9375rem' }}>
                Focus sport: <strong>{nextSession.sport || 'All disciplines'}</strong>
              </p>
            </div>
          ) : (
            <p>No upcoming sessions yet. Add due dates from the dashboard to build momentum.</p>
          )}
        </div>

        <div>
          <h2 className="card__title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Volume by sport</h2>
          {sessionsBySport.length ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {sessionsBySport.map(({ sport, count }) => (
                <li
                  key={sport}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--color-surface)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{sport}</span>
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.9375rem' }}>{count} session{count > 1 ? 's' : ''}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Once you attach due dates to tasks, the full calendar will populate automatically.</p>
          )}
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h2 className="card__title" style={{ fontSize: '1.5rem', margin: 0 }}>Complete schedule</h2>
          {sessions.length > 4 ? (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowFullList((prev) => !prev)}
              style={{ padding: '0.4rem 0.75rem' }}
            >
              {showFullList ? 'Show fewer' : 'Show all'}
            </button>
          ) : null}
        </div>
        {sessions.length ? (
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
            {(showFullList ? sessions : sessions.slice(0, 4)).map((task) => (
              <li
                key={task._id}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gap: '0.5rem',
                  background: 'var(--color-surface)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <p style={{ margin: 0, color: 'var(--color-text)', fontWeight: 700, fontSize: '1.0625rem' }}>{task.title}</p>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9375rem' }}>{task.sport || 'Multi-sport focus'}</p>
                <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                  {dayjs(task.dueDate).format('ddd, MMM D, YYYY · h:mm A')}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p>Once you attach due dates to tasks, the full calendar will populate automatically.</p>
        )}
      </section>
    </div>
  );
};

export default TrainingSessionsPage;
