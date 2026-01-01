/**
 * Linked Assets Configuration Types
 *
 * Types for the linked assets feature - a configuration-driven system
 * for displaying assets that are implicitly linked via metadata matching
 * rather than explicit relation records.
 *
 * Used by:
 * - Joy admin (frontend configuration consumption)
 * - Backend (configuration storage and bootstrap)
 *
 * @module linked-assets
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Comparison operators supported for matching conditions.
 * Maps to @marianmeres/condition-builder OPERATOR enum.
 */
export type LinkedAssetOperator =
	| "eq" // equals
	| "neq" // not equals
	| "lt" // less than
	| "lte" // less than or equal
	| "gt" // greater than
	| "gte" // greater than or equal
	| "like" // SQL LIKE pattern match
	| "ilike" // case-insensitive LIKE
	| "in" // value in array
	| "nin" // value not in array
	| "?" // JSON contains (for arrays like tags)
	| "descendant"; // folder path descendant match

/**
 * Value source: where to get the value for matching.
 * - "literal": use the value as-is
 * - "model_field": extract from current model's data using dot-path
 */
export type LinkedAssetValueSource = "literal" | "model_field";

/**
 * A single matching condition for linked assets.
 *
 * @example
 * // Match assets where data.custom.sku equals model's sku field
 * {
 *   asset_field: "data.custom.sku",
 *   operator: "eq",
 *   value_source: "model_field",
 *   value: "sku"
 * }
 */
export interface LinkedAssetCondition {
	/**
	 * The field path on the asset model to match against.
	 * Examples: "type", "data.custom.sku", "folder", "tags"
	 */
	asset_field: string;

	/** Comparison operator */
	operator: LinkedAssetOperator;

	/** How to interpret the value */
	value_source: LinkedAssetValueSource;

	/**
	 * The value to match:
	 * - If value_source is "literal": the actual value to compare
	 * - If value_source is "model_field": dot-path to model field
	 */
	value: string | number | boolean;
}

/**
 * Upload configuration for linked assets.
 * When present, enables file upload capability.
 */
export interface LinkedAssetUploadConfig {
	/**
	 * Auto-populate custom fields from parent model during upload.
	 * Key: asset field path (e.g., "custom.sku")
	 * Value: model field path (e.g., "sku")
	 */
	auto_fill_custom: Record<string, string>;

	/**
	 * Asset type to use for uploads.
	 * @default asset_query.type
	 */
	type?: string;

	/**
	 * Accepted file types (MIME patterns).
	 * @default "image/*"
	 */
	accept?: string;

	/**
	 * Maximum number of files (-1 for unlimited).
	 * @default -1
	 */
	cardinality?: number;
}

/**
 * Unlink configuration for linked assets.
 * Defines how to remove the link between asset and parent model.
 */
export interface LinkedAssetUnlinkConfig {
	/**
	 * Which custom field to clear when unlinking.
	 * Should match a key from upload.auto_fill_custom.
	 */
	field: string;

	/**
	 * Require confirmation before unlinking.
	 * @default true
	 */
	confirm?: boolean;
}

/**
 * Asset query configuration within a rule.
 */
export interface LinkedAssetQueryConfig {
	/**
	 * Asset domain to query.
	 * @default "asset"
	 */
	domain?: string;

	/**
	 * Asset entity/collection to query.
	 * @default "asset"
	 */
	entity?: string;

	/**
	 * Asset type filter (e.g., "product-image").
	 * If specified, adds `type:eq:<value>` to conditions.
	 */
	type?: string;

	/**
	 * Conditions to build the asset query.
	 * Combined with AND logic.
	 */
	conditions: LinkedAssetCondition[];

	/**
	 * Always include these base conditions.
	 * @default [{ asset_field: "is_enabled", operator: "eq", value_source: "literal", value: true }]
	 */
	base_conditions?: LinkedAssetCondition[];
}

/**
 * Match context configuration.
 * Defines when a rule should be applied.
 */
export interface LinkedAssetMatchConfig {
	/** Domain to match (e.g., "product") */
	domain?: string;
	/** Entity/collection to match (e.g., "product", "category") */
	entity?: string;
	/** Type to match (e.g., "default", "variant") */
	type?: string;
}

/**
 * A single linked assets rule configuration.
 * Defines when and how to show/manage linked assets for a specific model context.
 */
export interface LinkedAssetRule {
	/** Unique identifier for this rule */
	id: string;

	/** Human-readable label (supports localization) */
	label: MaybeLocalized<string>;

	/** Optional description */
	description?: MaybeLocalized<string>;

	/** When to apply this rule (AND logic, omitted = any) */
	match: LinkedAssetMatchConfig;

	/** Asset query configuration */
	asset_query: LinkedAssetQueryConfig;

	/** Upload configuration - enables CRUD mode when present */
	upload?: LinkedAssetUploadConfig;

	/** Unlink configuration - defines how to remove links */
	unlink?: LinkedAssetUnlinkConfig;

	/**
	 * Whether this rule is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Sort order when multiple rules match (lower = earlier).
	 * @default 0
	 */
	order?: number;
}

/**
 * The complete linked assets configuration structure.
 * Stored as the value of the `__joy_linked_assets__` config record.
 */
export interface LinkedAssetsConfig {
	/**
	 * Schema version for future migrations.
	 */
	version: number;

	/**
	 * Array of linked asset rules.
	 */
	rules: LinkedAssetRule[];
}
