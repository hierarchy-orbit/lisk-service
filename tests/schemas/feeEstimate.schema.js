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
import Joi from 'joi';

const feeEstimateSchema = {
	feeEstimatePerByte: Joi.object({
		low: Joi.number().min(0).required(),
		medium: Joi.number().min(0).required(),
		high: Joi.number().min(0).required(),
	}).required(),
};

const metaSchema = {
	updated: Joi.number().integer().min(1).required(),
	blockHeight: Joi.number().integer().min(1).required(),
	blockId: Joi.string().required(),
};

const goodRequestSchema = {
	data: Joi.object(feeEstimateSchema).required(),
	meta: Joi.object(metaSchema).required(),
	links: Joi.object().optional(),
};

module.exports = {
	feeEstimateSchema: Joi.object(feeEstimateSchema).required(),
	metaSchema: Joi.object(metaSchema).required(),
	goodRequestSchema: Joi.object(goodRequestSchema).required(),
};
