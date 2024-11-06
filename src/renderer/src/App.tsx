import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import RecentProjectPage from './page/RecentProjectPage'
import MainPage from './page/MainPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect default route ("/") to "/recent-projects" */}
        <Route path="/" element={<Navigate to="/recent-projects" />} />

        {/* Define other routes */}
        <Route path="/recent-projects" element={<RecentProjectPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App
