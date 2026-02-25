import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
            toast.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5 d-flex align-items-center" style={{ minHeight: '90vh' }}>
            <Row className="justify-content-center w-100 m-0">
                <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                    <Card className="professional-card border-0 shadow-lg p-3">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-5">
                                <div className="d-inline-block p-3 bg-primary-soft rounded-circle mb-3">
                                    <span className="fs-1">🔐</span>
                                </div>
                                <h2 className="fw-bold text-dark mb-1">Welcome Back</h2>
                                <p className="text-muted small fw-semibold">Enter your credentials to continue</p>
                            </div>

                            {error && <Alert variant="danger" className="py-2 small border-0 shadow-sm">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="py-3 px-4 bg-light border-0 rounded-4"
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <div className="d-flex justify-content-between">
                                        <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Password</Form.Label>
                                        <Link to="#" className="small text-primary text-decoration-none fw-bold">Forgot?</Link>
                                    </div>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="py-3 px-4 bg-light border-0 rounded-4"
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100 btn-crispy btn-crispy-primary py-3 rounded-pill mb-4"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <><Spinner size="sm" className="me-2" /> Authenticating...</>
                                    ) : 'Sign In'}
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="small text-muted mb-0">Don't have an account yet?</p>
                                <Link to="/signup" className="fw-bold text-primary text-decoration-none hover-underline">Create an Account</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <p className="text-center mt-4 text-muted small">
                        &copy; 2026 KnowledgeAiAssist. Professional Article Network.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
