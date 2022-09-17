import React, { useState } from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'

import styles from './PaginationBlock.module.css'

function PaginationBlock({ search = '', results, changePages }) {
  const [current, setCurrent] = useState(1)

  const onChangeRated = (page) => {
    changePages(page)
    setCurrent(page)
  }

  const onChange = (page, searchQuery) => {
    changePages(searchQuery, page)
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
          if (!search) {
            onChangeRated(e)
          } else {
            onChange(e, search)
          }
        }}
        total={results}
      />
    </div>
  )
}

PaginationBlock.propTypes = {
  search: PropTypes.string,
  results: PropTypes.number.isRequired,
  changePages: PropTypes.func.isRequired,
}

export default PaginationBlock
