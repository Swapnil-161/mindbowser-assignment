import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Container, Table, Button, Spinner, Badge, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DashboardPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchMyArticles();
    }, []);

    const fetchMyArticles = async () => {
        try {
            const res = await api.get('/articles/my');
            setArticles(res.data);
        } catch (error) {
            toast.error('Failed to fetch your articles');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (article) => {
        setArticleToDelete(article);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!articleToDelete) return;

        setDeleting(true);
        try {
            await api.delete(`/articles/${articleToDelete.id}`);
            setArticles(articles.filter(a => a.id !== articleToDelete.id));
            toast.success('Article removed successfully');
            setShowDeleteModal(false);
        } catch (error) {
            toast.error('Failed to delete article');
        } finally {
            setDeleting(false);
            setArticleToDelete(null);
        }
    };

    return (
        <Container className="py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
                <div>
                    <h2 className="display-6 fw-bolder text-dark mb-1">Knowledge Workspace</h2>
                    <p className="text-muted mb-0 fw-semibold small text-uppercase letter-spacing-1">Manage your professional insights</p>
                </div>
                <Button as={Link} to="/create" className="btn-crispy btn-crispy-primary shadow-sm hover-lift">
                    + Publish New Insight
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Fetching your workspace...</p>
                </div>
            ) : articles.length > 0 ? (
                <div className="professional-card border-0 shadow-lg overflow-hidden bg-white">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted small text-uppercase fw-bold">Title</th>
                                <th className="py-3 text-muted small text-uppercase fw-bold text-center">Category</th>
                                <th className="py-3 text-muted small text-uppercase fw-bold text-center">Published Date</th>
                                <th className="pe-4 py-3 text-muted small text-uppercase fw-bold text-end">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map(article => (
                                <tr key={article.id}>
                                    <td className="ps-4">
                                        <Link to={`/article/${article.id}`} className="fw-bold text-dark text-decoration-none hover-link">
                                            {article.title}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <Badge pill bg="primary-soft" className="text-primary border border-primary-subtle">
                                            {article.category}
                                        </Badge>
                                    </td>
                                    <td className="text-center text-muted small">
                                        {new Date(article.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="pe-4 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button as={Link} to={`/edit/${article.id}`} className="btn-crispy btn-crispy-outline py-1 px-3" size="sm">
                                                Edit
                                            </Button>
                                            <Button variant="outline-danger" className="btn-crispy py-1 px-3 border-danger-subtle" size="sm" onClick={() => handleDeleteClick(article)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-5 bg-light rounded-4 border border-2 border-dashed">
                    <div className="display-6 text-muted mb-3">📭</div>
                    <p className="text-muted mb-4">You haven't published any articles yet.</p>
                    <Button as={Link} to="/create" variant="primary" className="fw-bold px-4">
                        Start Writing
                    </Button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold">Remove Article?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    Are you sure you want to delete <span className="fw-bold text-danger">"{articleToDelete?.title}"</span>?
                    This action cannot be undone.
                </Modal.Body>
                <Modal.Footer className="border-0 bg-light">
                    <Button variant="link" className="text-muted text-decoration-none" onClick={() => setShowDeleteModal(false)}>
                        Keep Article
                    </Button>
                    <Button variant="danger" className="fw-bold px-4" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? <><Spinner size="sm" className="me-1" /> Deleting...</> : 'Confirm Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;
