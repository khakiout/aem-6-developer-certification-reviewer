import 'babel-polyfill'
import 'materialize-css/dist/css/materialize.css'
import './style/main.less'
import 'materialize-css/dist/js/materialize.js'

import React from 'react'
import { render } from 'react-dom'
import Quiz from './components/Quiz'

render(
  <Quiz />,
  document.getElementById('root')
)
