import express from "express"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());


app.get("/api/notes", async(req, res) => {
    const response = await fetch('https://680384540a99cb7408ec3849.mockapi.io/note');
    const noteList = await response.json();
    res.json(noteList);
})

app.post("/api/notes", async(req, res) => {
    const {title, content, completed} = req.body;
    if(!content || !title){
        res.status(400).send("Не введен текст заметки");
    }
    try {
        const response = await fetch('https://680384540a99cb7408ec3849.mockapi.io/note', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: title,
              content: content,
              completed: completed,
            })
          });
          const note = await response.json();
          res.json(note);
    } catch (err) {
        res.status(500).send("Не удалось добавить заметку");
    }
})

app.put("/api/notes/:id", async(req, res)=>{
    const {title, content, completed} = req.body;
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
       res.status(400).send("Не корректный ID заметки");
    }
    try {
        const response = await  fetch(`https://680384540a99cb7408ec3849.mockapi.io/note/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                content,
                completed,
            })
         });
         const note = await response.json();
         res.json(note);
    } catch (err) {
        res.status(500).send("Не удалось изменить заметку");
    }
})

app.delete("/api/notes/:id", async(req, res)=>{
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
       res.status(400).send("Не корректный ID заметки");
    }
    try {
        fetch(`https://680384540a99cb7408ec3849.mockapi.io/note/${id}`,  {
            method: 'DELETE',
          });
          res.status(204).send();
    } catch (err) {
        res.status(500).send("Не удалось изменить заметку");
    }
})

app.listen(5000, () => {
    console.log("Приложение запущено, порт: 5000")
});