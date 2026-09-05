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
	/**
	 * Preferred UI/email language (ISO-639-1). Absent on accounts created before
	 * the field existed, and on any account whose stored value the deployment no
	 * longer offers — both cases resolve to the app default at READ time. Never
	 * rewrite it in place to "repair" it: a narrowing that is later widened back
	 * would have silently destroyed the user's real preference.
	 */
	locale?: string;
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

// -----------------------------------------------------------------------------
// OAuth Connection Collection Types
// -----------------------------------------------------------------------------

/** Supported OAuth provider names */
export type OAuthProvider =
	| "google"
	| "microsoft"
	| "facebook"
	| "apple"
	| "twitter";

/** OAuth connection model data (links accounts to OAuth providers) */
export interface OAuthConnectionData {
	/** OAuth provider name */
	provider: OAuthProvider;
	/** Provider's unique user ID */
	provider_user_id: string;
	/** User's email from provider (for display/reference) */
	email?: string;
	/** Provider's display name for the user */
	display_name?: string;
	/** Provider's avatar URL */
	avatar_url?: string;
	/** Access token (for provider API calls) */
	access_token?: string;
	/** Refresh token (for token refresh) */
	refresh_token?: string;
	/** Token expiry timestamp (ISO string) */
	token_expires_at?: string;
	/** Additional provider-specific data */
	provider_data?: Record<string, unknown>;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
