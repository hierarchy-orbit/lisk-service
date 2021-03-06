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
const accountsSource = require('../../../sources/version2/accounts');
const envelope = require('../../../sources/version2/mappings/stdEnvelope');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/accounts',
	rpcMethod: 'get.accounts',
	tags: ['Accounts'],
	params: {
		address: { optional: true, type: 'string', min: 3, max: 41, pattern: /^lsk([a-hjkm-z]|[2-9]){38}$/ },
		publickey: { optional: true, type: 'string', min: 64, max: 64, pattern: /^([A-Fa-f0-9]{2}){32}$/ },
		username: { optional: true, type: 'string', min: 1, max: 20, pattern: /^[a-z0-9!@$&_.]{1,20}$/ },
		isDelegate: { optional: true, type: 'boolean', min: 1, pattern: /^(true|false)$/ },
		limit: { optional: true, type: 'number', min: 1, max: 100, default: 10, pattern: /^\b((?:[1-9][0-9]?)|100)\b$/ },
		offset: { optional: true, type: 'number', min: 0, default: 0, pattern: /^\b([0-9][0-9]*)\b$/ },
		sort: {
			optional: true,
			type: 'string',
			enum: ['balance:asc', 'balance:desc', 'rank:asc', 'rank:desc'],
			default: 'balance:desc',
		},
	},
	source: accountsSource,
	envelope,
};
