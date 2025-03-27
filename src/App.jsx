import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Collection from './components/Collection'
import CollectionList from './components/CollectionList'

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='App-body'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/collection/:id" element={<Collection/>}/>
            <Route path="/collection/page/:page" element={<CollectionList/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
