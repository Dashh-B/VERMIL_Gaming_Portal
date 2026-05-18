function HomePage() {
    return (
        <div className="container py-5">

            <div className="hero-section p-5 rounded-4 mb-5">

                <h1 className="display-3 fw-bold text-danger mb-3">
                    VERMIL Chronicles
                </h1>

                <p className="lead text-light">
                    Серия мрачных RPG о выживании нечисти в Европе XVII века.
                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 border-secondary">
                        <div className="card-body">
                            <h3>Crimson Etiquette</h3>
                            <p>История аристократки-вампира среди политических интриг Парижа.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 border-secondary">
                        <div className="card-body">
                            <h3>Moontrade</h3>
                            <p>Приключение купца-оборотня по охваченной хаосом Европе.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 border-secondary">
                        <div className="card-body">
                            <h3>VERMIL III</h3>
                            <p>Создайте собственного героя и переживите падение тайного мира.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default HomePage;