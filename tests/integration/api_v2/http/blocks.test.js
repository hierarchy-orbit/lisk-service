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
/* eslint-disable quotes, quote-props, comma-dangle */
const config = require('../../../config');
const { api } = require('../../../helpers/api');

const baseUrl = config.SERVICE_ENDPOINT;
const baseUrlV2 = `${baseUrl}/api/v2`;
const endpoint = `${baseUrlV2}/blocks`;

const {
	goodRequestSchema,
	badRequestSchema,
	wrongInputParamSchema,
	metaSchema,
} = require('../../../schemas/httpGenerics.schema');

const {
	blockSchemaVersion5,
} = require('../../../schemas/block.schema');

describe('Blocks API', () => {
	let refBlock;
	let refDelegate;
	beforeAll(async () => {
		[refBlock] = (await api.get(`${endpoint}?limit=1`)).data;
		[refDelegate] = (await api.get(`${baseUrlV2}/accounts?isDelegate=true&limit=1`)).data;
	});

	describe('GET /blocks', () => {
		it('returns list of blocks when called with no params', async () => {
			const response = await api.get(`${endpoint}?limit=1`);
			expect(response).toMap(goodRequestSchema);
			expect(response.data.length).toEqual(1);
			response.data.forEach(block => expect(block).toMap(blockSchemaVersion5));
			expect(response.meta).toMap(metaSchema);
		});

		it('known block by block ID -> ok', async () => {
			const response = await api.get(`${endpoint}?blockId=${refBlock.id}`);
			expect(response).toMap(goodRequestSchema);
			expect(response.data.length).toEqual(1);
			response.data.forEach(block => expect(block).toMap(blockSchemaVersion5));
			expect(response.meta).toMap(metaSchema);
		});

		it('known block by height -> ok', async () => {
			const response = await api.get(`${endpoint}?height=1`);
			expect(response).toMap(goodRequestSchema);
			expect(response.data.length).toEqual(1);
			expect(response.data[0].height).toEqual(1);
			response.data.forEach(block => expect(block).toMap(blockSchemaVersion5));
			expect(response.meta).toMap(metaSchema);
		});

		it('known block by account -> ok', async () => {
			const response = await api.get(`${endpoint}?generatorAddress=${refDelegate.summary.address}`);
			expect(response).toMap(goodRequestSchema);
			response.data.forEach(block => {
				expect(block).toMap(blockSchemaVersion5);
				// expect(block.generatorAddress).toEqual(refDelegate.summary.address);
			});
			expect(response.meta).toMap(metaSchema);
		});

		it('known block by publickey -> ok', async () => {
			const response = await api.get(`${endpoint}?generatorPublicKey=${refDelegate.summary.publicKey}`);
			expect(response).toMap(goodRequestSchema);
			response.data.forEach(block => {
				expect(block).toMap(blockSchemaVersion5);
				expect(block.generatorPublicKey).toEqual(refDelegate.summary.publicKey);
			});
			expect(response.meta).toMap(metaSchema);
		});

		it('known block by username -> ok', async () => {
			const response = await api.get(`${endpoint}?generatorUsername=${refDelegate.summary.username}`);
			expect(response).toMap(goodRequestSchema);
			response.data.forEach(block => {
				expect(block).toMap(blockSchemaVersion5);
				// expect(block.generatorUsername).toEqual(refDelegate.summary.username);
			});
			expect(response.meta).toMap(metaSchema);
		});

		it('limit=0 -> 400', async () => {
			const response = await api.get(`${endpoint}?limit=0`, 400);
			expect(response).toMap(badRequestSchema);
		});

		it('non-existent height -> 500', async () => {
			const response = await api.get(`${endpoint}?height=2000000000`, 500);
			expect(response).toMap(badRequestSchema);
		});

		it('invalid query parameter -> 400', async () => {
			const response = await api.get(`${endpoint}?block=12602944501676077162`, 400);
			expect(response).toMap(wrongInputParamSchema);
		});
	});
});
