// note service

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: 'white'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            title: 'Bobi and Me',
            txt: 'Me and Bobi'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            title: 'Get my stuff together',
            txt: 'Getting my shit together'
        }
    },
    {
        id: 'n104',
        createdAt: 1112225,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            title: 'Team America',
            txt: 'America fuck yeah!'
        }
    }
]

const NOTE_KEY = 'noteDB'

_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.txt))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            note = _setNextPrevNoteId(note)
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', txt = '') {
    return {
        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            title: '',
            txt: ''
        }
    }
}

function getDefaultFilter(filterBy = { txt: '' }) {
    return { txt: filterBy.txt }
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        utilService.saveToStorage(NOTE_KEY, gNotes)
    }
}