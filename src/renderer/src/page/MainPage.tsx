import Tool from '@renderer/components/Tool'
import { useAppSelector } from '@renderer/store'
import { Button, Flex, Select, Switch, Tabs, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearRecentProject } from '../recentProjectSlice'
import { ArrowLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const recentProjectFilePath = useAppSelector((state) => state.recentProject.recentProjectFilePath)

  useEffect(() => {
    if (!recentProjectFilePath) navigate('/recent-projects')
  }, [recentProjectFilePath])

  const handleGoBackToRecentProjects = () => {
    dispatch(clearRecentProject())
    navigate('/recent-projects')
  }

  const handlePlayClick = () => {
    console.log('Play button clicked')
  }
  const tabItems = [
    {
      key: 'library',
      label: 'Library',
      children: <Tool target="library" />
    },
    {
      key: 'product',
      label: 'Product',
      children: <Tool target="product" />
    },
    {
      key: 'accum',
      label: 'Accumulation',
      children: <Tool target="accumulation" />
    },
    {
      key: 'struc',
      label: 'Structure',
      children: <Tool target="structure" />
    },
    {
      key: 'runset',
      label: 'Runsetting',
      children: <Tool target="runsetting" />
    },
    {
      key: 'dimension',
      label: 'Dimension',
      children: <Tool target="dimension" />
    },
    {
      key: 'runpair',
      label: 'Runpair',
      children: <Tool target="runpair" />
    }
  ]

  return (
    <div>
      <Flex align="center" gap={10}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBackToRecentProjects}
          style={{ height: 64, width: 48 }}
        />
        <Flex align="stretch" style={{ height: 64 }} gap={8}>
          <Flex vertical>
            <Select defaultValue="Option1" style={{ width: 200 }}>
              <Option value="Option1">Structure 1</Option>
              <Option value="Option2">Structure 2</Option>
              <Option value="Option3">Structure 3</Option>
            </Select>
            <Select defaultValue="OptionA" style={{ width: 200 }}>
              <Option value="OptionA">RunSet A</Option>
              <Option value="OptionB">RunSet B</Option>
              <Option value="OptionC">RunSet C</Option>
            </Select>
          </Flex>
          <Button
            type="primary"
            onClick={handlePlayClick}
            style={{ height: '100%', background: 'green', width: 48 }}
            icon={<CaretRightOutlined />}
          ></Button>
        </Flex>
        <Flex align="center">
          <Flex vertical>
            <Typography>Current WS : </Typography>
            <Typography.Text type="success">{recentProjectFilePath}</Typography.Text>
          </Flex>
        </Flex>
        <Flex align="center" gap={1}>
          <Typography>Dev</Typography>
          <Switch></Switch>
        </Flex>
        <Flex align="center" gap={1}>
          <Typography>Show Create</Typography>
          <Switch></Switch>
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1" centered style={{ marginBottom: 20 }} items={tabItems} />
    </div>
  )
}

export default MainPage
