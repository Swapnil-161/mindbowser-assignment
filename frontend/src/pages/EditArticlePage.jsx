import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditArticlePage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Tech');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [titleLoading, setTitleLoading] = useState(false);
    const [tagsLoading, setTagsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const handleSuggestTitle = async () => {
        if (!content) return toast.warning('Please write some content first');
        setTitleLoading(true);
        try {
            const res = await api.post('/ai/suggest-title', { content });
            if (res.data.title) {
                setTitle(res.data.title);
                toast.success('Title suggested! ✨');
            }
        } catch (error) {
            toast.error('Failed to suggest title');
        } finally {
            setTitleLoading(false);
        }
    };

    const handleSuggestTags = async () => {
        if (!content) return toast.warning('Please write some content first');
        setTagsLoading(true);
        try {
            const res = await api.post('/ai/suggest-tags', { content });
            const tagArray = Array.isArray(res.data.tags) ? res.data.tags : [];
            setTags(tagArray.join(', '));
            toast.success('Tags suggested! 🏷️');
        } catch (error) {
            toast.error('Failed to suggest tags');
        } finally {
            setTagsLoading(false);
        }
    };

    const fetchArticle = async () => {
        try {
            const res = await api.get(`/articles/${id}`);
            setTitle(res.data.title);
            setCategory(res.data.category);
            setContent(res.data.content);
            setTags(res.data.Tags.map(t => t.name).join(', '));
        } catch (error) {
            toast.error('Failed to fetch article details');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleImproveWithAI = async () => {
        if (!content) return toast.warning('Please write some content first');
        setAiLoading(true);
        try {
            const res = await api.post('/ai/improve', { content });
            setContent(res.data.improvedContent);
            toast.success('Content improved with AI ✨');
        } catch (error) {
            toast.error('AI improvement failed');
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.put(`/articles/${id}`, {
                title,
                category,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(t => t !== '')
            });
            toast.success('Article updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to update article');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading article details...</p>
        </div>
    );

    return (
        <Container className="py-5">
            <Card className="professional-card border-0 shadow-lg mx-auto" style={{ maxWidth: '1000px' }}>
                <Card.Body className="p-4 p-md-5">
                    <h2 className="display-6 fw-bolder text-dark mb-2">Edit Insight</h2>
                    <p className="text-muted mb-5 fw-semibold small text-uppercase letter-spacing-1">Refine your professional contribution</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="fw-bold mb-0">Article Title</Form.Label>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 text-decoration-none text-primary fw-bold"
                                    onClick={handleSuggestTitle}
                                    disabled={titleLoading || aiLoading}
                                >
                                    {titleLoading ? <Spinner size="sm" /> : 'Suggest Title ✨'}
                                </Button>
                            </div>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="py-3 px-4 bg-light border-0 rounded-4"
                                style={{ fontSize: '1.1rem' }}
                            />
                        </Form.Group>

                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Category</Form.Label>
                                    <Form.Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="py-3 px-4 bg-light border-0 rounded-4"
                                    >
                                        <option>Tech</option>
                                        <option>AI</option>
                                        <option>Backend</option>
                                        <option>Frontend</option>
                                        <option>DevOps</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Form.Label className="fw-bold mb-0">Tags (comma separated)</Form.Label>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-decoration-none text-info fw-bold"
                                            onClick={handleSuggestTags}
                                            disabled={tagsLoading || aiLoading}
                                        >
                                            {tagsLoading ? <Spinner size="sm" /> : 'Suggest Tags 🏷️'}
                                        </Button>
                                    </div>
                                    <Form.Control
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="py-3 px-4 bg-light border-0 rounded-4"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-5 quill-editor-container">
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-2 gap-2">
                                <Form.Label className="fw-bold mb-0">Content</Form.Label>
                                <Button
                                    type="button"
                                    onClick={handleImproveWithAI}
                                    disabled={aiLoading}
                                    className="btn-crispy btn-ai-magic"
                                >
                                    {aiLoading ? (
                                        <><Spinner size="sm" className="me-1" /> Refining content...</>
                                    ) : (
                                        <>Improve with AI ✨</>
                                    )}
                                </Button>
                            </div>
                            <div className="table-responsive border rounded overflow-hidden">
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </Form.Group>

                        <div className="d-flex flex-wrap gap-3 pt-4 border-top">
                            <Button
                                type="submit"
                                className="btn-crispy btn-crispy-primary px-5"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <><Spinner size="sm" className="me-2" /> Saving Changes...</>
                                ) : 'Save Changes'}
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => navigate('/dashboard')}
                                className="text-muted text-decoration-none fw-bold"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container >
    );
};

export default EditArticlePage;
