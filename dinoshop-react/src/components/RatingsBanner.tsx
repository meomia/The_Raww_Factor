interface Rating {
    name: string;
    comment: string;
}

const ratings: Rating[] = [
    {
        name: 'Karen Durant',
        comment: 'Ever since I got a little T-rex my teenagers have been acting so nicely, they really love it!',
    },
    {
        name: 'Peter Pandus',
        comment: 'At fashion week a Pterodactyl is a must! I trained mine to film me — personal drone is a totally new vibe!',
    },
];

export function RatingsBanner() {
    return (
        <section className="py-5" style={{backgroundColor:'var(--bg)'}}>
            <div className="container">
                <h2 className="text-center mb-3">What our Survivors say?</h2>
                <p className="text-center text-muted mb-5">
                    Legit reviews from our Dino Tamers and Masters.
                </p>

                <div className="row g-4">
                    {ratings.map((rating) => (
                    <div key = {rating.name} className = "col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex gap-3 align-items-center">
                                <div style={{
                                    width: 60, height:60, borderRadius: '50%',
                                    background: 'var(--surface2)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0, }}>
                                    <i className="bi bi-person-fill" style={{fontSize: '1.8rem', color:'var(--accent)' }}/>
                                </div>
                                <div>
                                    <h5 className="mb-1">{rating.name}</h5>
                                    <p className="text-warning mb-2">★★★★★</p>
                                    <p className="mb-0 text-muted">{rating.comment}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
