import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Product Lead',
    bio: 'Passionate about building tools that help teams work smarter and achieve their goals efficiently.',
  },
  {
    name: 'Sarah Martinez',
    role: 'UX Designer',
    bio: 'Creates intuitive experiences that make task management feel effortless and enjoyable.',
  },
  {
    name: 'Jordan Kim',
    role: 'Full Stack Developer',
    bio: 'Builds robust systems that keep your data secure and your workflow seamless.',
  },
  {
    name: 'Taylor Brown',
    role: 'Product Manager',
    bio: 'Ensures TaskFlow evolves with your needs, delivering features that matter most.',
  },
];

const AboutUsPage = () => (
  <div className="container" style={{ display: 'grid', gap: '2rem' }}>
    <section className="hero" style={{ padding: '3rem 2.5rem', marginBottom: '2rem' }}>
      <div style={{ maxWidth: '720px' }}>
        <div className="hero__title-wrapper">
          <h1 className="hero__title" style={{ marginBottom: '1.5rem' }}>
            <span className="hero__title-line">Built for modern teams</span>
            <span className="hero__title-line hero__title-line--highlight">who value efficiency</span>
          </h1>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-light)', lineHeight: 1.7 }}>
          TaskFlow is designed to help teams collaborate seamlessly, stay organized, and achieve more together. We believe productivity tools should be powerful yet simple, helping you focus on what matters most.
        </p>
      </div>
    </section>

    <section className="card" style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h2 className="card__title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>What We Offer</h2>
        <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '1.0625rem' }}>
          We combine real-time collaboration, offline reliability, and smart workflows to help your team stay productive and focused.
        </p>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <article className="card">
          <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 700 }}>Real-time Collaboration</h3>
          <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.7 }}>
            Work together seamlessly with instant updates, shared task boards, and team-wide visibility.
          </p>
        </article>
        <article className="card">
          <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 700 }}>Works Offline</h3>
          <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.7 }}>
            Access your tasks anywhere, anytime. Your data syncs automatically when you reconnect.
          </p>
        </article>
        <article className="card">
          <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 700 }}>Smart Insights</h3>
          <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.7 }}>
            Track progress, identify patterns, and make data-driven decisions to improve your workflow.
          </p>
        </article>
      </div>
    </section>

    <section className="card" style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h2 className="card__title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Meet Our Team</h2>
        <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '1.0625rem' }}>
          A dedicated group of professionals passionate about building tools that make work more efficient and enjoyable.
        </p>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="card"
          >
            <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: '1.125rem', fontWeight: 700 }}>{member.name}</h3>
            <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9375rem', marginTop: '0.25rem' }}>{member.role}</p>
            <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.7, marginTop: '0.75rem', fontSize: '0.9375rem' }}>{member.bio}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="card" style={{ display: 'grid', gap: '1.5rem', alignItems: 'start' }}>
      <h2 className="card__title" style={{ fontSize: '1.75rem', margin: 0 }}>Ready to Get Started?</h2>
      <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.7, fontSize: '1.0625rem' }}>
        Join teams who are already using TaskFlow to streamline their workflow and boost productivity. Start your free trial today and experience the difference.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn">
          Get Started Free
        </Link>
        <Link to="/schedule" className="btn btn--outline">
          View Schedule
        </Link>
      </div>
    </section>
  </div>
);

export default AboutUsPage;
