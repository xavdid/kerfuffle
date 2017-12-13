import * as React from 'react'

export default (props: { loading: boolean; click: () => void }) => {
  return (
    // i don't think nextbook works now
    <button className="btn btn-default btn-lg spaced" onClick={props.click}>
      <i className={`fa fa-refresh fa-2x ${props.loading ? 'fa-spin' : ''}`} />
    </button>
  )
}
