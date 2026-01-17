/**
 * Country type definitions for geographic reference data.
 *
 * Countries are stored in the project domain and referenced
 * via weak relations from customer addresses.
 */

import type { MaybeLocalized } from "./utils.ts";

/** Country data field schema */
export interface CountryData {
	/** ISO 3166-1 alpha-2 code (e.g., "US", "GB") - used as path for uniqueness */
	code: string;
	/** Display name - can be a plain string or localized object (e.g., { en: "United States", de: "Vereinigte Staaten" }) */
	name: MaybeLocalized<string>;
	/** Phone prefix with + (e.g., "+1", "+44") */
	phone_prefix?: string;
	/** Flag emoji (e.g., "🇺🇸") */
	flag?: string;
	/** Extensible metadata for future fields */
	custom?: Record<string, unknown>;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

/** Country type identifier */
export type CountryType = "default";
