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
          path: 'sys/account',
          name: 'sys/account',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./page/sys/account'))
            }, 'sys/account')
          },
        },{
          path: 'sys/role',
          name: 'sys/role',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./page/sys/role'))
            }, 'sys/role')
          },
        },{
          path: 'hrm/department',
          name: 'hrm/department',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./page/hrm/department'))
            }, 'hrm/department')
          },
        },{
          path: 'hrm/employee',
          name: 'hrm/employee',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./page/hrm/employee'))
            }, 'hrm/employee')
          },
        },{
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
