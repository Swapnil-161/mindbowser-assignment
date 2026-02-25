import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Tech');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [titleLoading, setTitleLoading] = useState(false);
    const [tagsLoading, setTagsLoading] = useState(false);
    const navigate = useNavigate();

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
        if (!content) return toast.warning('Content cannot be empty');

        setSubmitting(true);
        try {
            // Step 1: Generate summary
            const summaryRes = await api.post('/ai/summary', { content });

            // Step 2: Create article
            await api.post('/articles', {
                title,
                category,
                content,
                summary: summaryRes.data.summary,
                tags: tags.split(',').map(tag => tag.trim()).filter(t => t !== '')
            });

            toast.success('Article published successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to publish article');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Card className="professional-card border-0 shadow-lg mx-auto" style={{ maxWidth: '1000px' }}>
                <Card.Body className="p-4 p-md-5">
                    <h2 className="display-6 fw-bolder text-dark mb-2">Publish New Article</h2>
                    <p className="text-muted mb-5 fw-semibold small text-uppercase letter-spacing-1">Share your expertise with the world</p>
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
                                placeholder="Enter a catchy title..."
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
                                        placeholder="react, web, ai..."
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
                                    <><Spinner size="sm" className="me-2" /> Publishing...</>
                                ) : 'Publish Insight'}
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => navigate('/')}
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

export default CreateArticlePage;
