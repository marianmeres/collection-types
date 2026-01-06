/**
 * Type-safe schema builder utilities.
 *
 * Provides compile-time validation that JSON Schema property keys
 * match the corresponding TypeScript interface.
 */

import type { MaybeLocalized } from "./utils.ts";
import type { PropertyDefinition } from "./schema.ts";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * Removes index signature from a type, keeping only explicitly defined keys.
 * This allows createObjectSchema to validate keys even when the interface
 * has [key: string]: unknown for Model<T> compatibility.
 */
type KnownKeys<T> = {
	[K in keyof T as string extends K
		? never
		: number extends K
			? never
			: K]: T[K];
};

/** Type-safe schema properties - only known keys from T allowed */
type SchemaProperties<T> = {
	[K in keyof KnownKeys<T>]?: PropertyDefinition;
};

/** Type-safe object schema definition */
export type ObjectSchema<T> = {
	type: "object";
	required?: (keyof KnownKeys<T>)[];
	properties: SchemaProperties<T>;
	additionalProperties?: boolean;
	_title?: MaybeLocalized<string>;
	_description?: MaybeLocalized<string>;
	_searchable?: boolean;
	/** Virtual form-only fields (not persisted, excluded from DB validation) */
	_extra_form_fields?: Record<string, PropertyDefinition>;
};

/** Extended schema (loose typing for __extends patterns) */
export type ExtendedSchema = {
	__extends: string;
	properties?: Record<string, PropertyDefinition>;
	_title?: MaybeLocalized<string>;
	_description?: MaybeLocalized<string>;
};

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

/**
 * Create a type-safe object schema.
 * TypeScript will error if property keys don't exist in T.
 *
 * @example
 * ```typescript
 * import { createObjectSchema } from "@marianmeres/collection-types";
 *
 * interface ProductData {
 *   name: string;
 *   price: number;
 * }
 *
 * const schema = createObjectSchema<ProductData>({
 *   type: "object",
 *   required: ["name", "price"],
 *   properties: {
 *     name: { type: "string" },     // OK
 *     price: { type: "number" },    // OK
 *     namex: { type: "string" },    // Error: 'namex' not in ProductData
 *   },
 * });
 * ```
 */
export function createObjectSchema<T>(schema: ObjectSchema<T>): ObjectSchema<T> {
	return schema;
}
