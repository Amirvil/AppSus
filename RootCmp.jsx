const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { NoteHeader } from './cmps/NoteHeader.jsx'
import { NoteNav } from './cmps/NoteNav.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { NoteIndex } from './pages/NoteIndex.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp container">
            <NoteHeader />
            <NoteNav />
            <NoteIndex />
            <UserMsg />
        </section>
    </Router>
}
