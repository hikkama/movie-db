import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

function NoInternetConnection({ children }) {
  const [isOnline, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)
  }, [])

  window.addEventListener('online', () => {
    setOnline(true)
  })

  window.addEventListener('offline', () => {
    setOnline(false)
  })

  if (isOnline) {
    return children
  }
  return (
    <Alert
      style={{ width: '500px', margin: '100px auto' }}
      message="No Internet Connection. Please try again later."
      type="error"
      showIcon
    />
  )
}

NoInternetConnection.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NoInternetConnection
