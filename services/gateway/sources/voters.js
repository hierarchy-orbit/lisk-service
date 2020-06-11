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
const voter = require('./mappings/voter');

module.exports = {
	type: 'moleculer',
	method: 'core.accounts.voters',
	params: {
		anyId: 'account_id',
		address: '=',
		username: '=',
		publicKey: 'publickey',
		secondPublicKey: 'secpubkey',
		limit: '=',
		offset: '=',
	},
	definition: {
		data: ['data', voter],
		meta: {
			count: '=,number',
			offset: '=,number',
			total: '=,number',
		},
		links: {},
	},
};
