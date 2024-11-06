import React from 'react'
import { useDispatch } from 'react-redux'
import { clearRecentProject } from '../recentProjectSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@renderer/store'
import { Tabs, Select, Button } from 'antd'

const { TabPane } = Tabs
const { Option } = Select

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get the recent project file path from the Redux state
  const recentProjectFilePath = useAppSelector((state) => state.recentProject.recentProjectFilePath)

  const handleGoBackToRecentProjects = () => {
    dispatch(clearRecentProject()) // Optionally clear the selected project
    navigate('/recent-projects') // Navigate back to the RecentProjectPage
  }

  // Handle Play button click
  const handlePlayClick = () => {
    console.log('Play button clicked')
  }

  return (
    <div>
      {/* Select boxes and Play button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        {/* First Select Box */}
        <Select defaultValue="Option1" style={{ width: 200 }}>
          <Option value="Option1">Option 1</Option>
          <Option value="Option2">Option 2</Option>
          <Option value="Option3">Option 3</Option>
        </Select>

        {/* Second Select Box */}
        <Select defaultValue="OptionA" style={{ width: 200 }}>
          <Option value="OptionA">Option A</Option>
          <Option value="OptionB">Option B</Option>
          <Option value="OptionC">Option C</Option>
        </Select>

        {/* Play Button */}
        <Button type="primary" onClick={handlePlayClick}>
          Play
        </Button>
      </div>

      {/* Ant Design Tabs Component */}
      <Tabs defaultActiveKey="1" style={{ marginBottom: 20 }}>
        <TabPane tab="Product" key="1">
          <p>Product Tab Content</p>
        </TabPane>
        <TabPane tab="Libs" key="2">
          <p>Libs Tab Content</p>
        </TabPane>
        <TabPane tab="Vars Indi" key="3">
          <p>Vars Indi Tab Content</p>
        </TabPane>
        <TabPane tab="Accum" key="4">
          <p>Accum Tab Content</p>
        </TabPane>
        <TabPane tab="Struc" key="5">
          <p>Struc Tab Content</p>
        </TabPane>
        <TabPane tab="Runset" key="6">
          <p>Runset Tab Content</p>
        </TabPane>
        <TabPane tab="Dimension" key="7">
          <p>Dimension Tab Content</p>
        </TabPane>
        <TabPane tab="History" key="8">
          <p>History Tab Content</p>
        </TabPane>
        <TabPane tab="Runpair" key="9">
          <p>Runpair Tab Content</p>
        </TabPane>
        bbh
      </Tabs>

      {/* Main Content */}
      <h1>Main Page</h1>
      {recentProjectFilePath ? (
        <div>
          <h2>Recent Project:</h2>
          <p>{recentProjectFilePath}</p>
          <button onClick={handleGoBackToRecentProjects}>Go back to Recent Projects</button>
        </div>
      ) : (
        <div>
          <p>No project selected.</p>
          <button onClick={handleGoBackToRecentProjects}>Go to Recent Projects</button>
        </div>
      )}
    </div>
  )
}

export default MainPage
