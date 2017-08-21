import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../configureStore'
import DashboardRootContainer from './DashboardRootContainer'
import BidSubmissionRootContainer from './BidSubmissionRootContainer'
import AdminBidRootContainer from './AdminBidRootContainer'
import * as Cookies from "js-cookie";

let curAuth = Cookies.get('sytyAuth')
const store = configureStore({user:{isLoggedIn: curAuth != undefined}})

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Route exact path="/" component={BidSubmissionRootContainer} />
						<Route exact path="/dashboard" component={DashboardRootContainer} />
						<Route exact path="/adminBid" component={AdminBidRootContainer} />
					</div>
				</Router>
			</Provider>
			)
	}
}