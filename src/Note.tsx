import React from 'react';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNote } from './NoteLayout.tsx';

type NoteProps = {
    onDelete: (id: string) => void;
};

export const Note: React.FC<NoteProps> = ({ onDelete }) => {
    const note = useNote();
    const navigate = useNavigate();

    const handleDelete = () => {
        onDelete(note.id);
        navigate('/');
    };

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {note.tags.map((tag) => (
                                <Badge className={'text-truncate'} key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button variant="outline-danger" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Link to={'/'}>
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    );
};