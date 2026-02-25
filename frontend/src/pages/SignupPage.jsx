import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signup(username, email, password);
            await login(email, password);
            toast.success('Account created successfully! Welcome ✨');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
            toast.error('Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5 d-flex align-items-center" style={{ minHeight: '90vh' }}>
            <Row className="justify-content-center w-100 m-0">
                <Col xs={12} sm={10} md={7} lg={6} xl={5}>
                    <Card className="professional-card border-0 shadow-lg p-3">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-5">
                                <div className="d-inline-block p-3 bg-primary-soft rounded-circle mb-3">
                                    <span className="fs-1">🚀</span>
                                </div>
                                <h2 className="fw-bold text-dark mb-1">Join the Elite</h2>
                                <p className="text-muted small fw-semibold">Begin your expert knowledge sharing journey</p>
                            </div>

                            {error && <Alert variant="danger" className="py-2 small border-0 shadow-sm">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="johndoe"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                className="py-3 px-4 bg-light border-0 rounded-4"
                                                style={{ fontSize: '0.9rem' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
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
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Choose Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Min. 8 characters"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="py-3 px-4 bg-light border-0 rounded-4"
                                                style={{ fontSize: '0.9rem' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button
                                    type="submit"
                                    className="w-100 btn-crispy btn-crispy-primary py-3 rounded-pill mb-4"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <><Spinner size="sm" className="me-2" /> Initializing Account...</>
                                    ) : 'Create Your Account'}
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="small text-muted mb-0">Already a member?</p>
                                <Link to="/login" className="fw-bold text-primary text-decoration-none hover-underline">Sign In Instead</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <p className="text-center mt-4 text-muted small">
                        By joining, you agree to our professional data standards.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupPage;
