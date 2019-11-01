const express = require('express');
const actionModel = require('../data/helpers/actionModel')
const projectModel = require('../data/helpers/projectModel')

const actionRouter = express.Router();

// CREATE Requests

actionRouter.post('/', validateProjectId, validateBody, (req,res) => {
   // const { description, notes} = req.body
    actionModel.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server Error'})
    })
})


// READ Requests
actionRouter.get('/', (req,res) => {
    actionModel.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(() => {
        res.status(500).json({ error: 'Server Error'})
    })
})

actionRouter.get('/project_id', (req,res) => {
    const project_id = req.params.id;

    
})

// UPDATE Requests





// DELETE Requests



// Middleware 

function validateProjectId(req, res, next) {
    const id = req.body.project_id
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

};

function validateBody(req, res, next) {
    if(req.body.description === undefined || req.body.notes === undefined) {
        res.status(400).json({ error: 'Please provide a description and notes for action'})
    } else {
        next();
    }
}

module.exports = actionRouter;