/*
 * LiskHQ/lisk-service
 * Copyright © 2021 Lisk Foundation
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
module.exports = {
	type: 'moleculer',
	method: 'core.fee.estimates',
	params: {},
	definition: {
		data: {
			feeEstimatePerByte: '=',
			baseFeeById: '=',
			baseFeeByName: '=',
			minFeePerByte: '=',
		},
		meta: {
			lastUpdate: 'meta.updated,number',
			lastBlockHeight: 'meta.blockHeight,number',
			lastBlockId: 'meta.blockId,string',
		},
		links: {},
	},
};
