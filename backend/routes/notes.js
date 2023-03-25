const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

router.post('/addnote', async (req, res) => {
    try {
        const { title, description } = req.body
        const note = new Note({
            title, 
            description
        })
        await note.save()
        res.status(201).json(note)
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Failed to create note' })
    }
})

router.get ('/notes', async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Cant get notes'})
    }
})

router.get ('/notes/:id', async(req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found' })
        }
        res.json(note)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

router.patch ('/notes/:id', async(req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found' })
        }
        const { title, description } = req.body
        note.title = title || note.title;
        note.description = description || note.description;
        await note.save()
        res.json(note)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Note not updated' })
    }
})

router.delete('/notes/:id', async(req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found' })
        }
        await note.deleteOne()
        res.json({ message: 'Note deleted successfully'})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: 'cant delete note'})
    }
})

module.exports = router