import React from 'react'
import BiddingSlot from './BiddingSlot'

const BiddingSlotBox = ({slots, onSlotClick}) => {
	return (
			<div className="row slot-row">
				{
					slots.map((entry, key) =>
							<BiddingSlot key={entry.index} 
							index={entry.index} 
							bid={entry.highestBid}
							bidder={entry.highestBidders && entry.highestBidders.length && entry.highestBidders[0].firstName} 
							onSlotClick={(e)=> onSlotClick(e, entry.index + 1, entry.highestBid)} />
						)
				}
			</div>
		)
}

export default BiddingSlotBox