import React, { useEffect, useState } from 'react';
import './App.css';
import { InputBlock } from './components/InputBlock';
import { FilterBlock } from './components/FilterBlock';
import { NoteBlock } from './components/NoteBlock';

export interface NoteInterface {
  id: number,
  title: string,
  content: string,
  completed: boolean,
}

function App() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteInterface[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);
  const [filterTypeNotes, setFilterNotes] = useState<number>(1)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const notes: any[] = await response.json();
        setNotes(notes);
        setFilteredNotes(notes);
      } catch (err) {
        alert("Произошла ошибка при загрузке заметок");
      }
    };
    fetchNotes();
  }, [])

  const handleNoteClick = (note: NoteInterface) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      );
      const updatedNote = await response.json();

      const updatedNotedList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note);

      setNotes(updatedNotedList);
      setTitle("");
      setContent("");
      setSelectedNote(null);

    } catch (err) {
      alert("Произошла ошибка при изменении заметки");
    }
  }

  const handleAddNewNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            content,
            completed: false
          })
        }
      );
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setFilteredNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Произошла ошибка при создании заметки");
    }
  }

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      )
      const updatedNotes = notes.filter((note) =>
        note.id !== noteId);

      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    } catch (err) {

    }
  }

  const handleSetCompleted = async (checked: boolean, id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            completed: checked,
          })
        }
      );
      const updatedNote = await response.json();
      const updatedNotedList = notes.map((note) =>
        note.id === id ? updatedNote : note);

      setNotes(updatedNotedList);
      setFilteredNotes(updatedNotedList);

    } catch (err) {
      alert("Произошла ошибка при выполнении заметки");
    }
  }

  const handleFilterList = (filterType: number) => {
    setFilterNotes(filterType);
    if (filterType === 1) {
      setFilteredNotes(notes);
    }
    if (filterType === 2) {
      const unCompletedNotes = notes.filter((note: NoteInterface) => !note.completed);
      setFilteredNotes(unCompletedNotes);
    }
    if (filterType === 3) {
      const unCompletedNotes = notes.filter((note: NoteInterface) => note.completed);
      setFilteredNotes(unCompletedNotes);
    }
  }

  return (
    <div>
      <div className='app-container'>

        <div>
          <InputBlock selectedNote={selectedNote} title={title} content={content}
            handleUpdateNote={handleUpdateNote} handleAddNewNote={handleAddNewNote}
            setTitle={setTitle} setContent={setContent} setSelectedNote={setSelectedNote} />
          <div className='filter-block'>
            <FilterBlock filterTypeNotes={filterTypeNotes} handleFilterList={handleFilterList} />
          </div>
        </div>

        <div className='notes-grid'>
          {filteredNotes.map((note) => (
            <NoteBlock note={note} handleNoteClick={handleNoteClick} deleteNote={deleteNote} handleSetCompleted={handleSetCompleted} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
