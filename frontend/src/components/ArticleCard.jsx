import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';

const ArticleCard = ({ article }) => {
    return (
        <Card className="professional-card border-0">
            <Card.Body className="d-flex flex-column p-4">
                <div className="mb-2">
                    <Badge className="tag-badge text-uppercase">
                        {article.category}
                    </Badge>
                </div>
                <Card.Title className="fw-bold fs-5 mb-2 line-clamp-2 crispy-text">
                    <Link to={`/article/${article.id}`} className="text-decoration-none text-dark">
                        {article.title}
                    </Link>
                </Card.Title>
                <Card.Text className="text-muted small mb-4 line-clamp-2 flex-grow-1 crispy-text">
                    {article.summary || (article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                </Card.Text>

                <div className="d-flex align-items-center mt-auto pt-3 border-top">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-2" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                        {article.author?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="small flex-grow-1">
                        <div className="fw-semibold text-dark lh-1 mb-1">{article.author?.username}</div>
                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>{new Date(article.createdAt).toLocaleDateString()}</div>
                    </div>
                    <Link to={`/article/${article.id}`} className="text-primary text-decoration-none fw-bold small">
                        Read →
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ArticleCard;
