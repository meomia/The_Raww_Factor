//import React from 'react';

interface Stat {
    value: string;
    label: string;
}

const statistics: Stat[] = [
    { value: '300+', label: 'Dinosaurs rehomed' },
    { value: '15', label: 'Species available' },
    { value: '24/7', label: 'Expert support' },
    { value: '10+', label: 'Years of research' },
];

export function StatisticsBanner() {
    return (
        <section className="py-5" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="container text-center" >
                <div className="row g-4" >
                    {statistics.map((stat) => (
                        <div key={stat.label} className="col-6 col-md-3" >
                            <h2 className="fw-bolder text-accent" > {stat.value} </h2>
                            <p className="text-muted"> {stat.label} </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}