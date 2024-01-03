import React from 'react';
import { NoteForm } from './NoteForm.tsx';
import { NoteData, Tag } from './App.tsx';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export const NewNote: React.FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
    return (
        <>
            <h1 className={'mb-4'}>New note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    );
};