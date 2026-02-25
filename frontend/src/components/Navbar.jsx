import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

const NavigationBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isAuthPage) {
        return (
            <Navbar expand="lg" className="glass-nav sticky-top py-3 border-bottom" variant="light">
                <Container className="justify-content-center position-relative">
                    <Button
                        as={Link}
                        to="/"
                        variant="link"
                        className="position-absolute start-0 ms-3 text-dark text-decoration-none fw-bold d-none d-md-flex align-items-center gap-1"
                    >
                        <span>←</span> Home
                    </Button>

                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center mx-0">
                        <span className="me-2">💡</span>
                        KnowledgeAiAssist
                    </Navbar.Brand>

                    <div className="position-absolute end-0 me-3 d-none d-md-block">
                        {location.pathname === '/login' ? (
                            <Button as={Link} to="/signup" className="btn-crispy btn-crispy-primary shadow-sm px-4">
                                Join Now
                            </Button>
                        ) : (
                            <Button as={Link} to="/login" className="btn-crispy btn-crispy-outline text-dark border-0 px-4">
                                Sign In
                            </Button>
                        )}
                    </div>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar
            expand="lg"
            className={`fixed-top px-lg-4 py-3 transition-all ${isHomePage
                ? (scrolled ? 'glass-nav py-2' : 'bg-transparent border-0')
                : 'glass-nav border-bottom'
                }`}
            variant="light"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <span className="me-2">💡</span>
                    KnowledgeAiAssist
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Nav.Link as={Link} to="/" className="fw-semibold px-3">Home</Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="fw-semibold px-3">Dashboard</Nav.Link>
                                <Button
                                    as={Link}
                                    to="/create"
                                    className="btn-crispy btn-crispy-primary ms-lg-2"
                                >
                                    Write Article
                                </Button>
                                <NavDropdown
                                    title={
                                        <div className="profile-trigger ms-2">
                                            <div className="avatar-circle">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="username d-none d-md-block">
                                                {user.username}
                                            </span>
                                        </div>
                                    }
                                    id="user-dropdown"
                                    align="end"
                                    className="crispy-dropdown no-caret"
                                >
                                    <NavDropdown.Item onClick={() => navigate('/dashboard')}>
                                        <span className="me-2">📊</span> My Portal
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                        <span className="me-2">🚪</span> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <div className="d-flex gap-3 ms-lg-3 align-items-center">
                                {location.pathname !== '/login' && (
                                    <Button as={Link} to="/login" className="btn-crispy btn-crispy-outline border-0 text-dark px-3 mt-1 mt-lg-0">
                                        Sign In
                                    </Button>
                                )}
                                {location.pathname !== '/signup' && (
                                    <Button as={Link} to="/signup" className="btn-crispy btn-crispy-primary shadow-sm">
                                        {location.pathname === '/login' ? 'Create Account' : 'Join Now'}
                                    </Button>
                                )}
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
