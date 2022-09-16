import React, { useState } from 'react'
import { Pagination } from 'antd'

import styles from './PaginationBlock.module.css'

function PaginationBlock({ search, results, changePages }) {
  const [current, setCurrent] = useState(1)

  const onChange = (page, search) => {
    changePages(search, page)
    setCurrent(page)
  }

  return (
    <div className={styles.pagination}>
      <Pagination
        showSizeChanger={false}
        pageSize={20}
        size="small"
        current={current}
        onChange={(e) => {
          onChange(e, search)
        }}
        total={results}
      />
    </div>
  )
}

export default PaginationBlock
