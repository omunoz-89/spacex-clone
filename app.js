const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MONGOOSE
mongoose.connect('mongodb://localhost/spacexClone', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
});

db.on('error', () => {
    console.log(`MongoDB Error`);
});

// Models
const Roadster = require('./models/roadster');
const Core = require('./models/core');


// ROUTES
app.get('/', (req, res) => {
    res.json({ message: 'SEI 412 Space X Clone'});
});

app.get('/roadster', (req, res) => {
    const fetchRoadsters = async () => {
        Roadster.find({}, (err, roadsters) => {
            if (err) console.log(err);
            console.log(roadsters);
            res.json(roadsters);
        });
    }
    
    fetchRoadsters();
})

app.get('/core', (req, res) => {
    const fetchCore = async () => {
        Core.find({}, (err, core) => {
            if (err) console.log(err);
            console.log(core);
            res.json(core);
        });
    }
    
    fetchCore();
})

app.get('/roadster/:id', (req, res) => {
    let _id = req.params.id;// pass down to function when called
    const fetchRoadster = (_id) => {
        Roadster.findOne({ _id }, (err, roadster) => {
            if (err) console.log(err);
            console.log(roadster);
            // response with json
            res.json(roadster);
        })
    }
    fetchRoadster(_id)
})

app.put('/roadster/:id/edit', (req, res) => {
    let _id = req.params.id;
    let name = req.body.name;
    const updateRoadster = async(_id,name) => {
        Roadster.findOneAndUpdate({ _id}, {name}, { new: true }, (err,roadster) => {
            console.log(roadster)
            res.redirect(`/roadster/${_id}`)
        })
    }
    updateRoadster(_id,name)
})

app.listen(PORT, () => {
    console.log(`You are now listening to the smooth sounds of ${PORT} 🎧`);
});