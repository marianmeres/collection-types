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
	/** Customer display name */
	name: string;
	/** Phone number */
	phone?: string;
	/** True if customer has no linked account */
	guest: boolean;
	/** Marketing consent */
	accepts_marketing: boolean;
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
	/** Country code or name */
	country: string;
	/** Contact phone */
	phone?: string;
	/** Whether this is the default address for its type */
	is_default: boolean;
	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Address type identifier (used as model type in collection) */
export type AddressType = "shipping" | "billing";

/** Customer type identifier */
export type CustomerType = "customer";
