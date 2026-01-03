/**
 * Account domain types for the stack-account module.
 *
 * Includes account, password, and token collection types.
 */

// -----------------------------------------------------------------------------
// Account Collection Types
// -----------------------------------------------------------------------------

/** Account model data */
export interface AccountData {
	email: string;
	roles?: string[];
	isVerified?: boolean;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

// -----------------------------------------------------------------------------
// Password Collection Types
// -----------------------------------------------------------------------------

/** Password model data (stores hashed passwords) */
export interface PasswordData {
	hash: string;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

// -----------------------------------------------------------------------------
// Token Collection Types
// -----------------------------------------------------------------------------

/** Token model data (for auth tokens) */
export interface TokenData {
	validFrom?: string;
	validUntil?: string;
	roles?: string[];
	jwt?: string;
	email?: string;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
