/**
 * Session and Cart type definitions for e-commerce.
 *
 * Usage with Model:
 * ```typescript
 * import type { Model } from "@marianmeres/collection-types";
 * import type { SessionData } from "@marianmeres/collection-types";
 * type SessionModel = Model<SessionData>;
 * ```
 */

import type { UUID } from "./utils.ts";

/** Single cart item */
export interface CartItem {
	/** Product model_id reference */
	product_id: UUID;
	/** Quantity in cart */
	quantity: number;
	// variant_id?: UUID;  // future
}

/** Cart contents */
export interface CartData {
	items: CartItem[];
}

/** Single wishlist item */
export interface WishlistItem {
	/** Product reference */
	product_id: UUID;
	/** Timestamp when item was added */
	added_at?: number;
}

/** Wishlist contents */
export interface WishlistData {
	items: WishlistItem[];
}

/** Session data field schema */
export interface SessionData {
	cart: CartData;
	wishlist: WishlistData;
	// recently_viewed?: UUID[];  // future
	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Session type identifier */
export type SessionType = "session";
