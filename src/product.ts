/**
 * Product domain types for the stack-product module.
 *
 * Includes product and category collection types.
 */

import type { MaybeLocalized } from "./utils.ts";

// -----------------------------------------------------------------------------
// Product Collection Types
// -----------------------------------------------------------------------------

/** Product model data */
export interface ProductData {
	name: string;
	sku?: string;
	/** Price in cents (integer) */
	price?: number;
	slug?: string;
	short_description?: MaybeLocalized<string>;
	description?: MaybeLocalized<string>;
	/** Whether product has an associated image */
	has_image?: boolean;
	custom?: Record<string, unknown>;
	// UI-only fields (relation placeholders, never stored in data)
	category?: never;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

// -----------------------------------------------------------------------------
// Category Collection Types
// -----------------------------------------------------------------------------

/** Category model data */
export interface CategoryData {
	name: string;
	slug?: string;
	short_description?: MaybeLocalized<string>;
	description?: MaybeLocalized<string>;
	custom?: Record<string, unknown>;
	// UI-only fields (relation placeholders, never stored in data)
	images?: never;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
