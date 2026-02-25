import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Container, Badge, Spinner, Button, Card } from 'react-bootstrap';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const res = await api.get(`/articles/${id}`);
            setArticle(res.data);
        } catch (error) {
            console.error('Failed to fetch article');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading article...</p>
        </div>
    );

    if (!article) return (
        <Container className="py-5 text-center">
            <h3 className="text-danger">Article not found</h3>
            <Button as={Link} to="/" variant="link">Back to Home</Button>
        </Container>
    );

    return (
        <Container className="py-5">
            <div className="mx-auto" style={{ maxWidth: '850px' }}>
                <header className="mb-5">
                    <div className="d-flex justify-content-center mb-4">
                        <Badge className="tag-badge text-uppercase">
                            {article.category}
                        </Badge>
                    </div>
                    <h1 className="display-3 fw-bolder text-dark mb-4 text-center line-height-sm">
                        <span className="text-gradient">{article.title}</span>
                    </h1>

                    <div className="d-flex align-items-center justify-content-center gap-4 py-4 border-top border-bottom">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm" style={{ width: '56px', height: '56px', fontSize: '1.4rem' }}>
                                {article.author?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="fw-bold fs-5 lh-1 mb-1">{article.author?.username}</div>
                                <div className="text-muted small">Content Expert</div>
                            </div>
                        </div>
                        <div className="vr d-none d-sm-block"></div>
                        <div className="text-muted small">
                            <div className="mb-1 fw-semibold">Published {new Date(article.createdAt).toLocaleDateString()}</div>
                            <div>{article.content ? Math.ceil(article.content.split(' ').length / 200) : 1} min read</div>
                        </div>
                    </div>
                </header>

                {article.summary && (
                    <Card className="border-0 bg-dark text-white p-4 p-md-5 rounded-5 shadow-lg mb-5 position-relative overflow-hidden">
                        <div className="position-absolute top-0 end-0 p-4 opacity-10 display-1 fw-bold">AI</div>
                        <div className="position-relative z-index-1">
                            <h6 className="fw-bold text-uppercase letter-spacing-2 text-primary mb-3">Executive Summary</h6>
                            <p className="lead mb-0 fs-5 opacity-90" style={{ fontStyle: 'italic', fontWeight: '500' }}>
                                "{article.summary}"
                            </p>
                        </div>
                    </Card>
                )}

                <article
                    className="quill-content mb-5 pb-5 border-bottom px-2"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <footer className="pb-5">
                    <div className="mb-5 bg-light p-4 rounded-4 border">
                        <h6 className="fw-bold text-dark text-uppercase small mb-3 letter-spacing-1">Discovery Tags</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {article.Tags?.map(tag => (
                                <Badge key={tag.id} className="tag-badge fs-6">#{tag.name}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <Button as={Link} to="/" className="btn-crispy btn-crispy-outline rounded-pill px-5">
                            ← Discover more articles
                        </Button>
                    </div>
                </footer>
            </div>
        </Container>
    );
};

export default ArticleDetailPage;
