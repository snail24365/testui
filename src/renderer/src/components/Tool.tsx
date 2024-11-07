import { ArrowLeftOutlined } from '@ant-design/icons'
import { Editor } from '@monaco-editor/react'
import api from '@renderer/axios'
import { queryClient } from '@renderer/main'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Flex, Input, Row, Select, Tabs, Tag, Typography } from 'antd'
import { JsonEditor } from 'json-edit-react'
import React, { useEffect, useState } from 'react'

const style: React.CSSProperties = { border: '1px solid #aaa', padding: '8px 0' }

const targets = ['product', 'library', 'accumulation', 'structure', 'dimension', 'runpair']
const targetPreset: any = {
  library: {
    name: 'library'
  },
  product: {
    name: 'product'
  },

  accumulation: {
    name: 'accumulation'
  },

  structure: {
    name: 'structure'
  },

  dimension: {
    name: 'dimension'
  },

  runpair: {
    name: 'runpair'
  }
}

type Props = {
  target: string
}

const Tool = ({ target }: Props) => {
  // entity
  const { data } = useQuery({
    queryKey: [target],
    queryFn: () => api({ method: 'get', url: `api/${target}`, params: {} })
  })

  const [jsonData, setJsonData] = useState(targetPreset[target] ?? {})

  const { mutate: create } = useMutation<any, Error, any>({
    mutationKey: [],
    mutationFn: async (data) => api({ method: 'post', url: `api/${target}`, params: {}, data }),
    onSuccess: (e, x, y) => {
      console.log('invalidate', target)

      queryClient.invalidateQueries({ queryKey: [target] })
    }
  })
  const [itemId, setItemId] = useState(null)

  if (itemId) {
    return <LibraryView itemId={itemId} setItemId={setItemId} />
  }
  return (
    <Flex vertical>
      <Flex align="center" gap={10} style={{ padding: 5, border: '1px solid silver' }}>
        <Button
          onClick={() => {
            create(jsonData)
          }}
        >
          Create
        </Button>
        <Flex style={{ background: 'white', padding: 2 }}>
          <JsonEditor
            theme={'githubDark'}
            rootName=""
            collapse={({ level }) => level >= 1}
            data={jsonData}
            setData={setJsonData} // optional
            rootFontSize={14}
          />
        </Flex>
      </Flex>
      <Row gutter={[16, 24]}>
        {(data ?? []).map((d) => (
          <Col span={6} key={d.id ?? '-'}>
            <PatchCard target={target} params={{}} d={d} setItemId={setItemId} />
          </Col>
        ))}
      </Row>
    </Flex>
  )
}

const PatchCard = ({
  d,
  target,
  params,
  setItemId
}: {
  d: any
  target: string
  params: any
  setItemId: any
}) => {
  const [jsonData, setJsonData] = useState(d ?? {})
  const id = d.id

  const { mutate: update } = useMutation<any, any, any>({
    mutationKey: [],
    mutationFn: async () =>
      api({ method: 'put', url: `api/${target}/${id}`, params, data: jsonData }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [target] })
  })

  const { mutate: remove } = useMutation({
    mutationKey: [],
    mutationFn: async () => api({ method: 'delete', url: `api/${target}/${id}`, params }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [target] })
  })

  useEffect(() => {
    setJsonData(d)
  }, [d])

  return (
    <Card
      key={d.id}
      title={
        <Flex align="center" justify="space-between">
          <p>{d?.name ?? d?.id ?? '-'}</p>
          <Flex gap={2}>
            {target == 'library' && (
              <Button
                onClick={() => {
                  setItemId(d.id)
                }}
              >
                Open
              </Button>
            )}
            <Button
              onClick={() => {
                update(jsonData)
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                remove()
              }}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      }
      bordered={false}
      style={style}
    >
      <Flex style={{ overflow: 'auto', maxHeight: 300 }}>
        <JsonEditor
          theme={'githubDark'}
          data={jsonData}
          setData={setJsonData}
          collapse={({ level }) => level >= 1}
          rootName=""
          rootFontSize={14}
        />
      </Flex>
    </Card>
  )
}

export default Tool

const LibraryView = ({ itemId, setItemId }: { itemId: string; setItemId: any }) => {
  const tabItems = [
    {
      key: 'variable',
      label: 'Variable',
      children: <VariablePanel libraryId={itemId} />
    },
    {
      key: 'indicator',
      label: 'Indicator',
      children: <IndicatorPanel libraryId={itemId} />
    }
  ]

  return (
    <Flex vertical>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => setItemId(null)}
        style={{ height: 64, width: 48 }}
      />
      <Tabs defaultActiveKey="1" centered style={{ marginBottom: 20 }} items={tabItems}></Tabs>
    </Flex>
  )
}

const VariablePanel = ({ libraryId }: any) => {
  const { data: varaibles } = useQuery({
    queryKey: [`variable_${libraryId}`],
    queryFn: () => {
      return api({ url: 'api/variable', method: 'get', params: { libraryId } })
    }
  })

  const [name, setName] = useState('')

  const { mutate: create } = useMutation<any, Error, any>({
    mutationKey: [],
    mutationFn: async (data) =>
      api({ method: 'post', url: `api/variable`, params: { libraryId }, data }),
    onSuccess: (e, x, y) => {
      queryClient.invalidateQueries({ queryKey: [`variable_${libraryId}`] })
      queryClient.invalidateQueries({ queryKey: ['library'] })
    }
  })

  return (
    <Flex vertical>
      <Flex>
        <Button
          onClick={() => {
            create({ name })
          }}
        >
          Create
        </Button>
        <Input
          placeholder="variable name"
          value={name}
          onChange={(v) => {
            setName(v.target.value)
          }}
        />
      </Flex>
      <Row gutter={[16, 24]}>
        {(varaibles ?? []).map((v) => (
          <Col span={4} key={v.id ?? '-'}>
            <VariableIndicatorCode variable={v} />
          </Col>
        ))}
      </Row>
    </Flex>
  )
}

const VariableIndicatorCode = ({ variable }: { variable: any }) => {
  const [selectedDefId, setSelectedDefId] = useState(null)

  const [formula, setFormula] = useState<string | null>(null)

  useEffect(() => {
    if (variable.id) {
      setSelectedDefId(variable.id)
      setFormula(variable.formula)
    }
  }, [variable])

  return (
    <Flex vertical style={{ border: '1px solid silver' }}>
      <Flex justify="space-between">
        <Typography.Text>{`${variable.name}`} </Typography.Text>
        <Flex>
          <Button>x</Button>
          <Select
            value={selectedDefId}
            onChange={(v) => setSelectedDefId(v)}
            style={{ width: 120 }}
            allowClear
            options={(variable?.variableDefinition ?? []).map((d) => ({
              value: d.indicatorExpression,
              label: d.indicatorExpression ? '--' : d.indicatorExpression
            }))}
            placeholder="select it"
          />
        </Flex>
      </Flex>
      {formula !== null && (
        <Editor
          theme="vs-dark"
          height="450px"
          defaultLanguage="javascript"
          defaultValue={formula}
          // onChange={handleEditorChange}
          // onMount={handleEditorDidMount}
          // beforeMount={handleEditorWillMount}
          // onValidate={handleEditorValidation}
        />
      )}
    </Flex>
  )
}

const IndicatorPanel = ({ libraryId }: any) => {
  const { data: indicators } = useQuery({
    queryKey: ['indicator'],
    queryFn: () => api({ method: 'get', url: `api/indicator`, params: { libraryId } })
  })
  const [name, setName] = useState('')
  const { mutate: create } = useMutation<any, Error, any>({
    mutationKey: ['indicatorCreate'],
    mutationFn: async (data) =>
      api({ method: 'post', url: `api/indicator`, params: { libraryId }, data }),
    onSuccess: (e, x, y) => {
      queryClient.invalidateQueries({ queryKey: [`library`] })
      queryClient.invalidateQueries({ queryKey: ['indicator'] })
    }
  })

  return (
    <Flex vertical>
      <Flex>
        <Button
          onClick={() => {
            create({ name })
          }}
        >
          Create
        </Button>
        <Input
          placeholder="Indicator Name"
          onChange={({ target: { value } }) => {
            setName(value)
          }}
        />
      </Flex>
      <Typography.Text>Indicators </Typography.Text>
      <Flex gap={20}>
        {(indicators ?? []).map((ind) => (
          <Flex style={{ border: '1px solid silver' }}>
            <Tag>{ind.name}</Tag>
            <Button>x</Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
