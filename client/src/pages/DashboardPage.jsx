import { useMemo, useState, useEffect } from 'react';
import TaskModal from '../components/TaskModal.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTasks } from '../hooks/useTasks.js';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx';

const DashboardPage = () => {
  const { 
    tasks, 
    status, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    upcomingTasks,
    syncOfflineTasks
  } = useTasks();
  
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOnline, wasOffline } = useNetworkStatus();
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  
  // Handle network status changes and sync tasks when coming back online
  useEffect(() => {
    if (!isOnline) {
      setShowOfflineBanner(true);
    } else if (wasOffline) {
      // Start syncing when coming back online
      const syncTasks = async () => {
        try {
          await syncOfflineTasks();
          toast.success('Tasks synced successfully!');
        } catch (err) {
          console.error('Error syncing tasks:', err);
          toast.error('Failed to sync tasks. Some changes may not be saved.');
        } finally {
          // Keep showing the banner briefly after syncing
          const timer = setTimeout(() => {
            setShowOfflineBanner(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      };
      syncTasks();
    } else {
      setShowOfflineBanner(false);
    }
  }, [isOnline, wasOffline, syncOfflineTasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
    const pending = total - completed - inProgress;
    return { total, completed, inProgress, pending };
  }, [tasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editingTask) {
        const result = await updateTask(editingTask._id, payload);
        if (result.success) {
          setEditingTask(null);
          setShowModal(false);
          if (!isOnline) {
            toast.info('Changes will be synced when you are back online');
          }
        } else if (!isOnline) {
          toast.error('Failed to save changes offline. Please try again when online.');
        }
        return result;
      }

      const result = await createTask(payload);
      if (result.success) {
        setShowModal(false);
        if (!isOnline) {
          toast.info('Task will be synced when you are back online');
        }
      } else if (!isOnline) {
        toast.error('Failed to create task offline. Please try again when online.');
      }
      return result;
    } catch (err) {
      console.error('Error saving task:', err);
      throw err;
    }
  };

  const handleDeleteRequest = (task) => {
    setDeleteTarget(task);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const result = await deleteTask(deleteTarget._id);

      if (result.success) {
        if (result.offline) {
          toast.info('Deletion queued. It will sync when you reconnect.');
        } else {
          toast.success('Task deleted successfully.');
        }
      } else {
        toast.error(result.error || 'Failed to delete task. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setShowModal(false);
  };

  const statCards = [
    { label: 'All Tasks', value: stats.total, color: '#10b981' },
    { label: 'Completed', value: stats.completed, color: '#059669' },
    { label: 'In Progress', value: stats.inProgress, color: '#f59e0b' },
    { label: 'Upcoming', value: upcomingTasks.length, color: '#ef4444' },
  ];

  return (
    <div className="dashboard">
      {showOfflineBanner && (
        <div className="offline-banner" style={{
          background: isOnline ? '#d1fae5' : '#fef3c7',
          color: isOnline ? '#065f46' : '#92400e',
          padding: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: 500
        }}>
          {isOnline 
            ? "✓ Syncing your latest updates..." 
            : "⚠ You're currently offline. Your recent tasks are still available. Changes will sync automatically when you reconnect."}
        </div>
      )}

      {/* Top Section: Stats (2x2) on left, Upcoming Tasks on right */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 320px',
        gap: '2rem',
        marginBottom: '2.5rem',
        alignItems: 'start'
      }}
      className="dashboard-top-section"
      >
        {/* Left: Stat Cards (2x2 grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem'
        }}>
          {statCards.map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--color-surface)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}26, 0 4px 12px rgba(0, 0, 0, 0.1)`;
              e.currentTarget.style.borderColor = `${stat.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
            >
              <p style={{ margin: '0 0 0.75rem 0', color: 'var(--color-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
              <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: stat.color, letterSpacing: '-0.02em' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Upcoming Tasks */}
        <div style={{
          background: 'var(--color-surface)',
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          position: 'sticky',
          top: '100px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
        >
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
            Upcoming Tasks
          </h3>
          {upcomingTasks.length ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.875rem' }}>
              {upcomingTasks.slice(0, 5).map((task) => (
                <li key={task._id} style={{
                  fontSize: '0.9375rem',
                  padding: '1rem',
                  background: 'var(--color-surface-hover)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface-hover)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>
                    {task.title}
                  </div>
                  <div style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                    Due in {task.dueInDays} day{task.dueInDays === 1 ? '' : 's'}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>No upcoming tasks</p>
          )}
        </div>
      </div>

      {/* Bottom Section: Task Cards Full Width */}
      <div style={{ display: 'grid', gap: '2rem' }}>
        {error ? <div className="alert" style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', border: '1px solid #fecaca' }}>{error}</div> : null}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-text)', fontWeight: 700, letterSpacing: '-0.01em' }}>
            {status === 'loading' ? 'Loading tasks...' : `My Tasks (${tasks.length})`}
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            + Add New Task
          </button>
        </div>

        <TaskList 
          tasks={upcomingTasks} 
          onEdit={handleEdit} 
          onDelete={handleDeleteRequest} 
          loading={status === 'loading'}
          error={error}
        />
      </div>

      <TaskModal
        isOpen={showModal}
        initialValues={editingTask}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        submitLabel={editingTask ? 'Update' : 'Create'}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isProcessing={isDeleting}
      />
    </div>
  );
};

export default DashboardPage;
