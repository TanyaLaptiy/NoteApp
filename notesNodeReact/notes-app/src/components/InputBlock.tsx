import React from "react";
import { NoteInterface } from "../App";

interface InputBlockProps {
    selectedNote: NoteInterface | null,
    title: string,
    content: string,
    handleUpdateNote: (prop: any) => void,
    handleAddNewNote: (prop: any) => void,
    setTitle: (prop: any) => void,
    setContent: (prop: any) => void,
    setSelectedNote: (prop: any) => void,
}

export const InputBlock: React.FC<InputBlockProps> = (props: InputBlockProps): React.ReactElement => {

    const handleCansel = () => {
        props.setTitle("");
        props.setContent("");
        props.setSelectedNote(null);
    }

    return (
        <form className="note-form"
            onSubmit={(event) => props.selectedNote ? props.handleUpdateNote(event) : props.handleAddNewNote(event)}>
            <input
                value={props.title}
                onChange={(event) => props.setTitle(event.target.value)}
                placeholder='Заголовок'
                required>
            </input>
            <textarea
                value={props.content}
                onChange={(event) => props.setContent(event.target.value)}
                placeholder='Текст'
                rows={10}
                required>
            </textarea>
            {props.selectedNote ? (<div className="edit-buttons">
                <button id='save' type='submit'>
                    Сохранить
                </button>
                <button id='cansel' onClick={handleCansel}>
                    Отменить
                </button>
            </div>)
                : (<button type='submit'>
                    Добавить заметку
                </button>)}
        </form>
    )
}
