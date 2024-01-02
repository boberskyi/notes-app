import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {NoteData, Tag} from "./App.tsx";
import { v1 } from "uuid";

type NoteFormType = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag:Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>
export const NoteForm = ({onSubmit, onAddTag, availableTags, title = '', markdown = '', tags = []}: NoteFormType) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate('..')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId={"title"}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                onCreateOption={label => {
                                    const newTag = {id: v1(), label};
                                    onAddTag(newTag);
                                    setSelectedTags(prev => [...(prev ?? []), newTag]);
                                }}
                                value={selectedTags?.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                options={availableTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value}
                                    }))
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId={'markdown'}>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={'textarea'} rows={15} ref={markdownRef} defaultValue={markdown}/>
                </Form.Group>
                <Stack className="justify-content-end" direction={"horizontal"} gap={2}>
                    <Button type={"submit"} variant={"primary"}>Save</Button>
                    <Link to={'..'}>
                        <Button type={"button"} variant={"outline-secondary"}>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
};