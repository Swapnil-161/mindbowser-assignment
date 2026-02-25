import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { Container, Row, Col, Form, Button, Dropdown, Spinner, Card } from 'react-bootstrap';

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, [category]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/articles', {
                params: { category, search }
            });
            setArticles(res.data);
        } catch (error) {
            console.error('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchArticles();
    };

    return (
        <>
            <section className="bg-white py-5 pt-lg-6 border-bottom mb-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start">
                            <h1 className="display-3 fw-bolder mb-3 text-dark">
                                Share the <span className="text-gradient">Future</span> of Knowledge
                            </h1>
                            <p className="lead text-muted mb-4 pe-lg-5">
                                Join a exclusive community of experts. Create, refine, and discover curated insights with the power of artificial intelligence.
                            </p>
                            <Form onSubmit={handleSearch} className="mb-4">
                                <div className="p-1 bg-white border rounded-pill shadow-sm d-flex align-items-center">
                                    <Form.Control
                                        type="text"
                                        placeholder="Find topics, experts, articles..."
                                        className="border-0 shadow-none ps-4 bg-transparent"
                                        style={{ height: '50px' }}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button type="submit" className="btn-crispy btn-crispy-primary rounded-pill px-4 me-1">
                                        Search
                                    </Button>
                                </div>
                            </Form>
                            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                                <span className="small text-muted fw-semibold">Popular:</span>
                                {['AI', 'Vite', 'React', 'Backend'].map(tag => (
                                    <span key={tag} className="small fw-bold text-primary cursor-pointer hover-underline">#{tag}</span>
                                ))}
                            </div>
                        </Col>
                        <Col lg={6} className="d-none d-lg-block">
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Hero"
                                    className="img-fluid rounded-block shadow-lg"
                                    style={{ borderRadius: '2rem' }}
                                />
                                <div className="position-absolute bottom-0 start-0 mb-n3 ms-n3 p-4 bg-white shadow-lg rounded-4 d-none d-xl-block" style={{ width: '200px' }}>
                                    <div className="fw-bold mb-1">5k+ Articles</div>
                                    <div className="small text-muted">Trusted by developers worldwide</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="pb-5">
                <Row>
                    <Col lg={3} className="mb-4">
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <div className="mb-4">
                                <h6 className="fw-bold text-uppercase text-muted small mb-3 letter-spacing-1">Refine Content</h6>
                                <div className="d-flex flex-column gap-1">
                                    {['', 'Tech', 'AI', 'Backend', 'Frontend', 'DevOps'].map(cat => (
                                        <Button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            variant={category === cat ? "primary" : "link"}
                                            className={`text-start text-decoration-none fw-semibold rounded-3 py-2 px-3 ${category === cat ? "shadow-sm" : "text-dark"}`}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {cat || 'All Articles'}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Card className="border-0 bg-dark text-white p-4 rounded-4 shadow-sm">
                                <h6 className="fw-bold mb-2">Curate with AI</h6>
                                <p className="small text-light opacity-75 mb-3">Improve your writing instantly with our integrated AI features.</p>
                                <Button size="sm" variant="light" as={Link} to="/create" className="fw-bold rounded-pill w-100">Try Now</Button>
                            </Card>
                        </div>
                    </Col>

                    <Col lg={9}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0">{category || 'Recent'} Postings</h4>
                            <div className="text-muted small">Showing {articles.length} results</div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-2 text-muted fw-semibold">Discovering insights...</p>
                            </div>
                        ) : articles.length > 0 ? (
                            <Row className="g-4">
                                {articles.map(article => (
                                    <Col key={article.id} xs={12} md={6}>
                                        <ArticleCard article={article} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center py-5 bg-white rounded-4 border">
                                <div className="display-1 mb-3">🔍</div>
                                <h5 className="fw-bold">No matches found</h5>
                                <p className="text-muted">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
