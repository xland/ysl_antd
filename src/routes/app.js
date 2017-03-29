import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Frame from '../components/Frame'
import Login from './login'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin } from 'antd'
import { classnames } from '../utils'
import '../components/layout/common.less'

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

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App)
