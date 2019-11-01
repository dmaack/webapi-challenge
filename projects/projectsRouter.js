const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const projectRouter = express.Router();

// CREATE Requests
projectRouter.post('/', validateProjectBody, (req,res) => {
    //const { name, description } = req.body;

    projectModel.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server error'})
    })
   
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

projectRouter.get('/:id', validateProjectId, (req,res) => {
    const id = req.params.id;

    projectModel.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server error'})
    })
})

projectRouter.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;

    projectModel.getProjectActions(id)
    .then(actions => {
        if(actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ error: 'No actions for this project ID'})
        }
    })
    .catch(() => {
        res.status(500).json({error: 'Server error'})
    })
})


// UPDATE Requests
projectRouter.put('/:id', validateProjectBody, (req,res) => {
    const id = req.params.id;
    const updates = req.body;

    projectModel.update(id, updates)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server error'})
    })
})


// DELETE Requests
projectRouter.delete('/:id', validateProjectId, (req,res) => {
    const id = req.params.id;

    projectModel.remove(id)
    .then(() => {
        res.status(200).send(`You successfully deleted the PROJECT with ID ${id}`)
    })
    .catch(() => {
        res.status(500).json({error: 'Server error'})
    })
})

//Middleware

function validateProjectBody(req, res, next) {

    if(!req.body.name || !req.body.description) {
        res.status(400).json({ error: 'Please provide a name AND description for your project'})
    } else {
        next()
    }
}

function validateProjectId(req, res, next) {
    const id = req.params.id
    
    if(id) {
        projectModel.get(id)
        .then(project =>{
            if(project) {
                next();
            } else {
                res.status(400).json({ message: "invalid project id" })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'server error'})
        })
    } else {
        next()
    }

}

module.exports = projectRouter;