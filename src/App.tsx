import {Navigate, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import {NewNote} from "./NewNote.tsx";
import {useLocalStorage} from "./useLocalStorage.ts";
import {useMemo} from 'react';
import {v1} from 'uuid';
import {NoteList} from './NoteList.tsx';
import {NoteLayout} from "./NoteLayout.tsx";
import {Note} from './Note.tsx';
import {EditNote} from "./EditNote.tsx";

export type Note = {
    id: string
} & NoteData

export type NoteData = {
    title: string,
    markdown: string,
    tags: Tag[]
}

export type RawNote = {
    id: string
} & RawNoteData;

export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[]
}


export type Tag = {
    id: string,
    label: string
}
export const App = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {
                ...note, tags: tags.filter(tag => {
                    return note.tagIds.includes(tag.id)
                })
            }
        })
    }, [notes, tags]);

    const onCreateNote = ({tags, ...data}: NoteData) => {
        setNotes(prevNotes => {
            return [...prevNotes, {
                ...data,
                id: v1(),
                tagIds: tags.map(tag => tag.id)
            }]
        })
    }

    const onUpdateNote = (id: string, {tags, ...data}:NoteData) => {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if(note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map(tag => tag.id)
                    }
                } else {
                    return note;
                }
            })
        })
    }

    const onDeleteNote = (id:string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }

    const addTag = (tag: Tag) => {
        setTags(prev => [...prev, tag]);
    }


    return (
        <Container className={'my-4'}>
            <Routes>
                <Route path={'/'} element={<NoteList notes={notesWithTags} availableTags={tags}/>}/>
                <Route path={'/new'} element={<NewNote onSubmit={onCreateNote}
                                                       onAddTag={addTag}
                                                       availableTags={tags}
                />}/>
                <Route path={'/:id'} element={<NoteLayout notes={notesWithTags}/>}>
                    <Route index element={<Note onDelete={onDeleteNote}/>}/>
                    <Route path={'edit'} element={<EditNote onSubmit={onUpdateNote}
                                                            onAddTag={addTag}
                                                            availableTags={tags} />}
                    />
                </Route>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </Container>
    )
}

export default App
