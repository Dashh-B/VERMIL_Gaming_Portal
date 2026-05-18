import { motion } from 'framer-motion';

function ProgressCircle({ value }) {

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width="90" height="90">

            <circle
                cx="45"
                cy="45"
                r={radius}
                stroke="#333"
                strokeWidth="7"
                fill="none"
            />

            <circle
                cx="45"
                cy="45"
                r={radius}
                stroke="#8b0000"
                strokeWidth="7"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: '0.5s' }}
            />

            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill="white"
            >
                {value}%
            </text>

        </svg>
    );
}

function StatusPage() {

    const servers = [
        { id: 1, name: 'Paris-01', status: 92 },
        { id: 2, name: 'Vienna-02', status: 77 },
        { id: 3, name: 'Prague-03', status: 54 }
    ];

    return (
        <div className="container py-5 text-light">

            <h1 className="mb-5">Статус серверов</h1>

            <div className="row g-4">

                {servers.map(server => (

                    <div className="col-md-4" key={server.id}>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="card bg-dark border-secondary text-center p-4"
                        >

                            <h3 className="mb-4 text-danger">
                                {server.name}
                            </h3>

                            <div className="d-flex justify-content-center">
                                <ProgressCircle value={server.status} />
                            </div>

                        </motion.div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default StatusPage;