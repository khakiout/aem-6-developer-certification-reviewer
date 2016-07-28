import 'babel-polyfill'
import 'materialize-css/dist/css/materialize.css'
import './style/main.less'
import './style/print.less'
import 'materialize-css/dist/js/materialize.js'
import './style/main.js'

import React from 'react'
import { render } from 'react-dom'
import Quiz from './components/Quiz'

render(
  <Quiz />,
  document.getElementById('root')
)
