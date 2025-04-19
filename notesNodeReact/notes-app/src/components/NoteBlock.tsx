import React from "react";
import { NoteInterface } from "../App";

interface NoteBlockProps {
    note: NoteInterface,
    handleNoteClick: (note: NoteInterface) => void,
    deleteNote: (event: any, id: number) => void,
    handleSetCompleted: (event: any, id: number) => void,
}

export const NoteBlock: React.FC<NoteBlockProps> = (props: NoteBlockProps): React.ReactElement => {
    return (
        <div className='note-item' key={props.note.id}>
            <div className='note-header'>

                <button className="edit-button" onClick={() => props.handleNoteClick(props.note)}>Редактировать</button>
                <button className="delete-button" onClick={(event) => props.deleteNote(event, props.note.id)}>X</button>
            </div>
            <h2>{props.note.title}</h2>
            <div className="text"><p>{props.note.content}</p></div>

            <div className='note-footer'>
                <div className='completed-checkbox'>
                    <input type="checkbox" checked={props.note.completed} onChange={(event) => props.handleSetCompleted(event.target.checked, props.note.id)} />
                    <label>Выполнено</label>
                </div>
            </div>
        </div>
    )
}