const express = require('express')
const router = express.Router()

const Work = require('../models/task.model')
const { generateTaskMethods } = require('../services')
const taskCrud = generateTaskMethods(Work)
const { validateDbId, raiseRecord404Error } = require('../middlewares');


router.get('/', (req, res, next) => {
    taskCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId, (req, res, next) => {
    taskCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    const newRecord = {
        task: req.body.task,
        date: req.body.date,
        document: req.body.document,
        observation: req.body.observation,
    }
    taskCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    const udpatedRecord = {
        task: req.body.task,
        date: req.body.date,
        document: req.body.document,
        observation: req.body.observation,
        phase: req.body.phase,
    }
    taskCrud.update(req.params.id, udpatedRecord)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/:id', validateDbId, (req, res) => {
    taskCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})


module.exports = router