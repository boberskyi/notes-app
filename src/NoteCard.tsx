import Card from "react-bootstrap/esm/Card";
import {Tag} from "./App.tsx";
import {Link} from "react-router-dom";
import styles from "./Notelist.module.css";
import {Badge, Stack} from "react-bootstrap";

type NoteCardProps = {
    id: string
    title: string
    tags: Tag[]
}
export const NoteCard = ({id, title, tags}: NoteCardProps) => {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className={'align-items-center justify-content-center h-100'}>
                    <span className={'fs-5'}>{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge className={'text-truncate'} key={tag.id}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    );
};