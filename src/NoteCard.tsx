import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Tag } from './App.tsx';
import { Badge, Stack } from 'react-bootstrap';
import styles from './Notelist.module.css';

type NoteCardProps = {
    id: string;
    title: string;
    tags: Tag[];
};

export const NoteCard: React.FC<NoteCardProps> = ({ id, title, tags }) => {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className={'align-items-center justify-content-center h-100'}>
                    <span className={'fs-5'}>{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map((tag) => (
                                <Badge className={'text-truncate'} key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    );
};