const express = require('express');

const app = express();

app.use(express.json()); // Para recibir los datos de la request y parsea los datos del body a json.



let notes = [{
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    }
];



app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }

});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
    const note = request.body;
    console.log(note);

    if (!note || !note.content) {
        return response.status(400).json({
            error: "note.content is missing"
        });
    }

    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids);

    const newNote = {
        id: maxId + 1,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important !== 'undefined' ? note.important : false
    }

    notes = [...notes, newNote];

    response.json(newNote);
});



const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server running in port ', PORT)
});