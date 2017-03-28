import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'sys/func',
          name: 'sys/func',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sys_func'))
              cb(null, require('./page/sys/func'))
            }, 'sys/func')
          },
        },{
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            }, 'dashboard')
          },
        }, {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users'))
            }, 'users')
          },
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            }, 'ui-ico')
          },
        }, {
          path: 'ui/search',
          name: 'ui/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'))
            }, 'ui-search')
          },
        }, {
          path: 'ui/dropOption',
          name: 'ui/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/dropOption'))
            }, 'ui-dropOption')
          },
        }, {
          path: 'ui/layer',
          name: 'ui/layer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/layer'))
            }, 'ui-layer')
          },
        }, {
          path: 'ui/dataTable',
          name: 'ui/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/dataTable'))
            }, 'ui-dataTable')
          },
        }, {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
