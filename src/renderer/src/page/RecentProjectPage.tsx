import React from 'react'
import { useDispatch } from 'react-redux'
import { setRecentProject } from '../recentProjectSlice'
import { useNavigate } from 'react-router-dom'

const RecentProjectPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Sample recent projects list (you might fetch this from an API or localStorage)
  const recentProjects = ['/path/to/project1', '/path/to/project2', '/path/to/project3']

  const handleSelectProject = (filePath: string) => {
    dispatch(setRecentProject(filePath)) // Store the selected project in Redux
    navigate('/main') // Navigate to MainPage
  }

  return (
    <div>
      <h1>Recent Projects</h1>
      <ul>
        {recentProjects.map((project, index) => (
          <li key={index}>
            <button onClick={() => handleSelectProject(project)}>Open {project}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentProjectPage
