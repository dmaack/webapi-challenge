const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const projectRouter = express.Router();

// CREATE Requests

projectRouter.post('/', (req,res) => {
    const { name, description } = req.body;

    if(!name || ! description) {
        res.status(400).json({error: "Please provide a name and description for the project."})
    } else {
        projectModel.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
    }
   
})


// READ Requests
projectRouter.get('/', (req,res) => {
    projectModel.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server Error'})
    })
})

projectRouter.get('/:d', (req, res) => {
    const id = req.params.id;

    projectModel.getProjectActions(id)
    .then()
    .catch()
})

// UPDATE Requests



// DELETE Requests

module.exports = projectRouter;