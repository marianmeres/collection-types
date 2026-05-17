/**
 * Customer and Address type definitions for e-commerce.
 *
 * Usage with Model:
 * ```typescript
 * import type { Model } from "@marianmeres/collection-types";
 * import type { CustomerData, AddressData } from "@marianmeres/collection-types";
 * type CustomerModel = Model<CustomerData>;
 * type AddressModel = Model<AddressData>;
 * ```
 */

/** Customer data field schema */
export interface CustomerData {
	/** Customer email */
	email: string;
	/** Customer first name */
	first_name: string;
	/** Customer last name */
	last_name: string;
	/** Phone number */
	phone?: string;
	/** True if customer has no linked account */
	guest: boolean;
	/** Marketing consent */
	accepts_marketing: boolean;

	// B2B fields
	/** Company name for B2B customers */
	company_name?: string;
	/** Tax identification number */
	tax_id?: string;
	/** VAT number for EU businesses */
	vat_number?: string;

	// Extensible preferences
	/** Project-specific customer preferences */
	custom?: Record<string, unknown>;

	/**
	 * Guest-session identifier (X-Session-ID at the time the customer row
	 * was created), stamped only when the customer is created without an
	 * authenticated subject (i.e. `owner_id IS NULL`, `guest: true`). Acts
	 * as a lookup key for the explicit "claim guest customer" flow when
	 * the visitor later registers/logs in. Never set for owned customers.
	 */
	guest_session_id?: string;

	// UI-only fields (relation placeholders, never stored in data)
	addresses?: never;

	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Address data field schema */
export interface AddressData {
	/** User-friendly label (e.g., "Home", "Work") */
	label?: string;
	/** Recipient name */
	name: string;
	/** Street address */
	street: string;
	/** City */
	city: string;
	/** Postal/ZIP code */
	postal_code: string;
	/** Country code (ISO alpha-2 from the stuic ≥ 3.85 picker; legacy rows
	 *  may still hold free-text values like "United States"). */
	country: string;
	/**
	 * State / region / province. Optional at the schema level; the checkout
	 * flow enforces it for US addresses (substantive for tax + shipping
	 * carrier). Free text — no enum today; see plan for future US-state
	 * dropdown follow-up.
	 */
	state_or_region?: string;
	/** Contact phone */
	phone?: string;
	/** Whether this is the default address for its type */
	is_default: boolean;

	// UI-only fields (relation placeholders, never stored in data)
	/** Country relation (UI-only, stored in relations table) */
	country_rel?: never;

	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Address type identifier (used as model type in collection) */
export type AddressType = "shipping" | "billing";

/** Customer type identifier */
export type CustomerType = "customer";
