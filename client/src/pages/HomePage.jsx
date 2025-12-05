import { Link } from 'react-router-dom';
import InstallPrompt from '../components/InstallPrompt.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';

const highlights = [
  {
    title: 'Real-time Sync',
    description: 'Stay connected with your team through instant updates and seamless collaboration.',
  },
  {
    title: 'Works Offline',
    description: 'Access your tasks anywhere, anytime—even without an internet connection.',
  },
  {
    title: 'Smart Insights',
    description: 'Track progress, analyze patterns, and make data-driven decisions effortlessly.',
  },
  {
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security and privacy controls.',
  },
];

const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <div className="container home-page">
      <section className="hero">
        <div style={{ maxWidth: '720px' }}>
          <div className="hero__title-wrapper">
            <span className="hero__badge">✨ New & Improved</span>
            <h1 className="hero__title">
              <span className="hero__title-line">Transform your workflow</span>
              <span className="hero__title-line hero__title-line--highlight">with intelligent task management</span>
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-light)', lineHeight: 1.7, marginTop: '2rem' }}>
            TaskFlow empowers teams to manage tasks, track progress, and collaborate seamlessly—whether you're online or offline.
          </p>
          <div className="hero__cta" style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <Link to={user ? '/dashboard' : '/register'} className="btn">
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Link>
            <Link to="/schedule" className="btn btn--outline">
              View Schedule
            </Link>
            <Link to="/about" className="btn btn--outline">
              Learn More
            </Link>
            <InstallPrompt />
          </div>
        </div>
      </section>

      <section>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem', color: 'var(--color-text)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Powerful Features for Modern Teams
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to manage tasks efficiently and collaborate seamlessly
          </p>
        </div>
        <div className="card-grid">
          {highlights.map((item, idx) => {
            const colors = ['#10b981', '#059669', '#34d399', '#f59e0b'];
            return (
              <article key={item.title} className="card">
                <h2 className="card__title">{item.title}</h2>
                <p style={{ color: 'var(--color-text-light)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
