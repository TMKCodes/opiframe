const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

let books = []; // Tämä on kirjalista, joka tallennetaan serveriin.

// Haetaan kirjat listasta
app.get("/api/admin/books", (req, res) => {
    res.status(200).send(books);
});

// Lisätään kirja listaan
app.post("/api/admin/books", (req, res) => {
    if(books.length == 0) {
        req.body.id = 1;
    } else {
        req.body.id = books[books.length - 1].id + 1;
    }
    books.push({
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        year : parseInt(req.body.year),
        genre : req.body.genre,
        loaned : req.body.loaned
    });
    res.send(books);
});

// Poistetaan kirja listalta.
app.delete("/api/admin/books/:id", (req, res) => {
    let id = parseInt(req.params.id);
    tempBooks = books.filter(book => book.id !== id);
    if(tempBooks.length == books.length) {
        res.status(404).send({"message" : "Book not found"});
    } else {
        books = tempBooks;
        res.status(200).send(books);
    }
});

// Muutetaan kirjaa listassa.
app.put("/api/admin/books/:id", (req, res) => {
    books = books.map(book => {
        if (book.id === req.params.id) {
            return { ...book, ...req.body};
        }
        return book;
    });
    res.send(books);
});


// Haetaan lainattavat kirjat.
app.get("/api/user/books", (req, res) => {
    res.status(200).send(books.filter(book => book.loaned !== true));
});

// Hae kaikki kirjat.
app.get("/api/admin/all", (req, res) => {
    res.status(200).send(books);
});

// Lainaa kirjan.
app.put("/api/user/books/:id", (req, res) => {
    books[books.findIndex(book => book.id == parseInt(req.params.id))].loaned = true;
    res.status(200).send(books);
});

// Kuunnellaan HTTP porttia
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});