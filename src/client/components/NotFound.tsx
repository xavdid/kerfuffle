import * as React from 'react'
import config from '../../server/config'
const mediaTypes = Object.keys(config).sort()

export default () => {
  return (
    <div>
      <h2>Four Oh Four</h2>
      <p>Hit a tab above to go a valid media type instead.</p>
    </div>
  )
}
