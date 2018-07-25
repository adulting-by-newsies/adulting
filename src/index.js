import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import Slider from './components/Homepage/Slider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
