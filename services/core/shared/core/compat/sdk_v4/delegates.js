/*
 * LiskHQ/lisk-service
 * Copyright © 2020 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
const { Utils } = require('lisk-service-framework');
const coreApi = require('./coreApi');

const ObjectUtilService = Utils.Data;

const { isProperObject } = ObjectUtilService;

const getDelegates = async params => {
	const delegates = {
		data: [],
		meta: {},
	};

	const punishmentHeight = 780000;
	const response = await coreApi.getDelegates(params);
	if (response.data) delegates.data = response.data;
	if (response.meta) delegates.meta = response.meta;

	delegates.data.map((delegate, index) => {
		delegate.account = {
			address: delegate.address,
			publicKey: delegate.publicKey,
		};

		const adder = (acc, curr) => Number(acc) + Number(curr.amount);
		const totalVotes = delegate.votes.reduce(adder, 0);
		const selfVotes = delegate.votes
			.filter(vote => vote.delegateAddress === delegate.address).reduce(adder, 0);

		delegate.delegateWeight = Math.min(10 * selfVotes, totalVotes);
		delegate.vote = delegate.delegateWeight;
		delegate.totalVotesReceived = totalVotes - selfVotes;
		delegate.isBanned = delegate.delegate.isBanned;
		delegate.pomHeights = delegate.delegate.pomHeights
			.sort((a, b) => a - b).reverse().slice(0, 5)
			.map(height => ({ start: height, end: height + punishmentHeight }));
		delegate.lastForgedHeight = delegate.delegate.lastForgedHeight;
		delegate.consecutiveMissedBlocks = delegate.delegate.consecutiveMissedBlocks;

		// Required for proper indexing in PouchDB
		// Rank appropriately recalculated in the abstraction layer based on delegateWeight/address
		delegate.rank = params.offset + index + 1;

		return delegate;
	});

	return delegates;
};

const getNextForgers = async params => {
	const result = await coreApi.getNextForgers(params);
	return isProperObject(result) && Array.isArray(result.data) ? result : [];
};


module.exports = {
	getDelegates,
	getNextForgers,
};
