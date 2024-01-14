const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require("./todo");
const {mongo} = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(r => console.log("Database connected")).catch(e => console.log(e));

const app = express();

app.use(cors())

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const PORT =  process.env.PORT || 3000;

app.post('/new', async (req, res) => {
    const {title, description} = req.body;

    const todo = new Todo({
        title,
        description
    });

    await todo.save();

    res.status(201).json({
        "message": "Todo created successfully",
        ...todo,
    });
})

app.get('/', (req, res) => {
    const todos = Todo.find({}).then(r => {
        res.status(200).json({
            "message": "Todos fetched successfully",
            todos: r,
        });
    }).catch(e => {
        res.status(500).json({
            "message": "An error occurred",
            error: e,
        });
    });
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;

    await Todo.findByIdAndDelete(new mongo.ObjectId(id), {});
    res.status(200).json({
        "message": "Todo deleted successfully",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});