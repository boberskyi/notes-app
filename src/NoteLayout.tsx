import React from 'react';
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Note } from './App.tsx';

type NoteLayoutProps = {
    notes: Note[];
};

export const NoteLayout: React.FC<NoteLayoutProps> = ({ notes }: NoteLayoutProps) => {
    const { id } = useParams();
    const note = notes.find((n) => n.id === id);

    return note ? <Outlet context={note} /> : <Navigate to="/" replace />;
};

export const useNote = () => {
    return useOutletContext<Note>();
};