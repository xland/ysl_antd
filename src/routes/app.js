import React from 'react'
import { connect } from 'dva'
import Frame from '../components/Frame'


function App ({ children, location, dispatch, app, loading }) {
  return (
    <div>
      <Frame path={location.pathname} />
      <div style={{position:"absolute",top:"46px",left:"180px",right:"0px",bottom:"0px",
        padding:"6px",background:"#FFFFFF",
        overflowX:"hidden",overflowY:"scroll"}}>
        {children}
      </div>
    </div>
  )
}

export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App)
