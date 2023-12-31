const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#e3f2fd' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={require('./banklogo.jpeg')} alt="" width="50" height="40" class="d-inline-block align-text-top"/>
                            
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recent Transactions</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;