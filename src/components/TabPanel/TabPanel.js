import React from 'react'
import { Tabs } from 'antd'

function TabPanel() {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={[
        {
          label: 'Search',
          key: '1',
        },
        {
          label: 'Rated',
          key: '2',
        },
      ]}
    />
  )
}

export default TabPanel
