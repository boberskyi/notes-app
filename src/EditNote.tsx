import React from 'react';
import { NoteForm } from './NoteForm.tsx';
import { NoteData, Tag } from './App.tsx';
import { useNote } from './NoteLayout.tsx';

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export const EditNote: React.FC<EditNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
    const note = useNote();

    const handleNoteSubmit = (data: NoteData) => {
        onSubmit(note.id, data);
    };

    return (
        <>
            <h1 className={'mb-4'}>Edit note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={handleNoteSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    );
};