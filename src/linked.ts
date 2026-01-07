/**
 * Linked Configuration Types
 *
 * Types for the linked models feature - a configuration-driven system
 * for displaying models that are implicitly linked via metadata matching
 * rather than explicit relation records.
 *
 * Used by:
 * - Joy admin (frontend configuration consumption)
 * - Backend (configuration storage and bootstrap)
 *
 * @module linked
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Comparison operators supported for matching conditions.
 * Maps to @marianmeres/condition-builder OPERATOR enum.
 */
export type LinkedOperator =
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
export type LinkedValueSource = "literal" | "model_field";

/**
 * A single matching condition for linked models.
 *
 * @example
 * // Match models where data.custom.sku equals source model's sku field
 * {
 *   target_field: "data.custom.sku",
 *   operator: "eq",
 *   value_source: "model_field",
 *   value: "sku"
 * }
 */
export interface LinkedCondition {
	/**
	 * The field path on the target model to match against.
	 * Examples: "type", "data.custom.sku", "folder", "tags"
	 */
	target_field: string;

	/** Comparison operator */
	operator: LinkedOperator;

	/** How to interpret the value */
	value_source: LinkedValueSource;

	/**
	 * The value to match:
	 * - If value_source is "literal": the actual value to compare
	 * - If value_source is "model_field": dot-path to source model field
	 */
	value: string | number | boolean;
}

/**
 * Upload configuration for linked models.
 * When present, enables file upload capability.
 */
export interface LinkedUploadConfig {
	/**
	 * Auto-populate custom fields from parent model during upload.
	 * Key: target field path (e.g., "custom.sku")
	 * Value: source model field path (e.g., "sku")
	 */
	auto_fill_custom: Record<string, string>;

	/**
	 * Target type to use for uploads.
	 * @default target_query.type
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
 * Unlink configuration for linked models.
 * Defines how to remove the link between target and source model.
 */
export interface LinkedUnlinkConfig {
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
 * Target query configuration within a rule.
 */
export interface LinkedQueryConfig {
	/**
	 * Target domain to query.
	 * @default "asset"
	 */
	domain?: string;

	/**
	 * Target entity/collection to query.
	 * @default "asset"
	 */
	entity?: string;

	/**
	 * Target type filter (e.g., "product-image").
	 * If specified, adds `type:eq:<value>` to conditions.
	 */
	type?: string;

	/**
	 * Conditions to build the target query.
	 * Combined with AND logic.
	 */
	conditions: LinkedCondition[];

	/**
	 * Always include these base conditions.
	 * @default [{ target_field: "is_enabled", operator: "eq", value_source: "literal", value: true }]
	 */
	base_conditions?: LinkedCondition[];
}

/**
 * Match context configuration.
 * Defines when a rule should be applied.
 */
export interface LinkedMatchConfig {
	/** Domain to match (e.g., "product") */
	domain?: string;
	/** Entity/collection to match (e.g., "product", "category") */
	entity?: string;
	/** Type to match (e.g., "default", "variant") */
	type?: string;
}

/**
 * Display options for rendering linked items.
 * Used both as global defaults and per-rule overrides.
 */
export interface LinkedDisplayOptions {
	/** Maximum number of items to show (default: 20) */
	limit?: number;
	/** Grid column count (default: 4) */
	columns?: number;
	/** Whether to show filenames below items (default: true) */
	show_filename?: boolean;
	/** Thumbnail variant size (default: "sm") */
	thumbnail_variant?: "xs" | "sm" | "lg";
}

/**
 * Configuration for the "Referenced By" feature.
 * Shows which other models reference the current model via reverse lookup.
 */
export interface ReverseLinkedConfig {
	/** Collections that display reverse linked lookups UI */
	enabled_collections: Array<{
		domain: string;
		entity: string;
		type?: string;
	}>;
}

/**
 * A single linked rule configuration.
 * Defines when and how to show/manage linked models for a specific model context.
 */
export interface LinkedRule {
	/** Unique identifier for this rule */
	id: string;

	/** Human-readable label (supports localization) */
	label: MaybeLocalized<string>;

	/** Optional description */
	description?: MaybeLocalized<string>;

	/** When to apply this rule (AND logic, omitted = any) */
	match: LinkedMatchConfig;

	/** Target query configuration */
	target_query: LinkedQueryConfig;

	/** Upload configuration - enables CRUD mode when present */
	upload?: LinkedUploadConfig;

	/** Unlink configuration - defines how to remove links */
	unlink?: LinkedUnlinkConfig;

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

	/** Display options for rendering (optional, falls back to config defaults) */
	display?: LinkedDisplayOptions;
}

/**
 * The complete linked configuration structure.
 * Stored as the value of the `__joy_linked__` config record.
 */
export interface LinkedConfig {
	/**
	 * Schema version for future migrations.
	 */
	version: number;

	/**
	 * Array of linked rules.
	 */
	rules: LinkedRule[];

	/** Global default display options (individual rules can override) */
	defaults?: LinkedDisplayOptions;

	/** Configuration for reverse lookups ("referenced by" feature) */
	reverse?: ReverseLinkedConfig;
}
