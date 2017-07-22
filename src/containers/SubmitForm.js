import React, { Component } from 'react'

export default class SubmitForm extends Component {
	render() {
		let slot, amt

		return (
			<div>
			<form
			onSubmit={e => {
				e.preventDefault()
				if (!slot.value.trim() || !amt.value.trim()) {
					return
				}

				var user = {
					firstName: 'Harry',
					lastName: 'Tran',
					company: 'Citi',
					table: 7
				}
				var data = {
					userID: '-1437513729',
		            slot: slot.value,
		            bid: amt.value
				}
				var request = new XMLHttpRequest();
				request.open('POST', '/submit', true);
				request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				request.send(JSON.stringify(data));

				slot.value = ''
				amt.value = ''
			}}
			>
			<label>Slot</label>
			<input
			ref={node => {
				slot = node
			}}
			/>
			<br/>

			<label>Bid Amount</label>
			<input
			ref={node => {
				amt = node
			}}
			/>
			<br/>					

			<button type="submit">
			Send Bid
			</button>
			</form>
			</div>
			)
	}
}