interface TeamMember {
    name: string;
    role: string;
}

const team: TeamMember[] = [
    { name: 'Dina', role: 'Dinosaur cloning researcher' },
    { name: 'Daria', role: 'Professional dinosaur trainer' },
    { name: 'Vanilla', role: 'Archaeology department manager' },
    { name: 'Leonie', role: 'Dinosaur health department manager' },
    { name: 'Angeline', role: 'Dinosaur safety expert' }
];

export function TeamBanner() {
    return (
        <section className="py-5 text-center" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="container">
                <h2 className="mb-5">The Rawwr Team</h2>
                <div className="row g-4 justify-content-center">
                    {team.map((member) => (
                        <div key={member.name} className="col-6 col-md-4 col-lg">
                            <div style={{
                                width: 90, height: 90, borderRadius: '50%',
                                background: 'var(--surface2)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                            }}>
                                <i className="bi bi-person-fill" style={{ fontSize: '2.5rem', color: 'var(--accent)' }} />
                            </div>
                            <h5>{member.name}</h5>
                            <p className="text-muted">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}