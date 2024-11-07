import React from 'react'
import { useDispatch } from 'react-redux'
import { setRecentProject } from '../recentProjectSlice'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@renderer/axios'
import { Badge, Button, Flex, Tag } from 'antd'

const RecentProjectPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: recentProjects } = useQuery({
    queryKey: ['recent-project'],
    queryFn: () => api({ url: 'api/service/workspace/recent', method: 'get' })
  })

  const handleSelectProject = ({ name, workspaceFilePath }: any) => {
    api({
      url: 'api/service/workspace/open',
      params: { workspaceFilePath, userName: 'test' },
      method: 'post'
    }).then((x) => {
      dispatch(setRecentProject(workspaceFilePath)) // Store the selected project in Redux
      navigate('/main') // Navigate to MainPage
    })
  }

  return (
    <div>
      <h1>Recent Projects</h1>
      <ul>
        {(recentProjects ?? []).map((project, index) => (
          <Flex key={index} gap={5} align="center">
            <Tag color="geekblue">Project</Tag>
            <Button onClick={() => handleSelectProject(project)}>{project.name}</Button>
          </Flex>
        ))}
      </ul>
    </div>
  )
}

export default RecentProjectPage
