import { useEffect } from 'react';
import TaskForm from './TaskForm.jsx';

const TaskModal = ({ isOpen, initialValues, onClose, onSubmit, submitLabel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1000,
          maxWidth: '540px',
          width: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '2.5rem',
          border: '1px solid var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--color-surface-hover)',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: 'var(--color-muted)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            width: '32px',
            height: '32px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-danger)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-surface-hover)';
            e.currentTarget.style.color = 'var(--color-muted)';
          }}
        >
          ✕
        </button>

        {/* Form Title */}
        <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: '1.5rem', color: 'var(--color-text)', fontWeight: 700, letterSpacing: '-0.01em' }}>
          {initialValues ? 'Edit Task' : 'Create New Task'}
        </h2>

        {/* Form */}
        <div style={{ marginTop: '1.5rem' }}>
          <TaskForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={onClose}
            submitLabel={submitLabel}
          />
        </div>
      </div>
    </>
  );
};

export default TaskModal;
