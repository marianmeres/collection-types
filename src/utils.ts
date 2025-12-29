/**
 * Utility types for the collection system.
 * Includes branded types for compile-time safety and common helper types.
 */

/** UUID string type */
export type UUID = string;

/** ISO 8601 date string type */
export type ISODateString = string;

/** PostgreSQL ltree path type */
export type LtreePath = string;

/** Value that may be localized with language keys */
export type MaybeLocalized<T> = T | Record<string, T>;

/** JSON-compatible primitive */
export type JsonPrimitive = string | number | boolean | null;

/** JSON-compatible object */
export type JsonObject = { [key: string]: JsonValue };

/** JSON-compatible array */
export type JsonArray = JsonValue[];

/** JSON-compatible value (recursive) */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/** User-provided flexible data */
export type UserData = Record<string, unknown>;

/** Helper to create a branded type */
export type Brand<T, B extends string> = T & { readonly __brand: B };
