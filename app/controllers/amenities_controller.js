const express = require('express')
const router = express.Router()
const { Amenities } = require('../models/amenities')
const { authenticate } = require('../middleware/authenticate')

router.get('/', authenticate, (req, res) => {
    Amenities.find()
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Amenities.findOne({
        user: req.user._id,
        _id: id
    })
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticate, (req, res) => {
    const body = req.body
    const amenitie = new Amenities(body)
    amenitie.user = req.user._id
    amenitie.save()
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id
    const body = req.body
    Amenities.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true })
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Amenities.findOneAndDelete({
        _id: id,
        user: req.user._id
    })
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(amenitie)
        })
})

module.exports = {
    amenitiesRouter: router
}