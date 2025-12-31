/**
 * Schema types for the collection system.
 * Defines JSON Schema extensions and UI configuration.
 */

import type { MaybeLocalized } from "./utils.ts";

/** HTML field type for UI rendering */
export type SchemaHtmlType =
	| "text"
	| "textarea"
	| "wysiwyg"
	| "number"
	| "boolean"
	| "select"
	| "multiselect"
	| "date"
	| "datetime"
	| "time"
	| "color"
	| "relation"
	| "asset"
	| "json"
	| "code"
	| "keyvalues";

/** Configuration for relation-type fields in schema */
export interface RelationTypeConfig {
	relation_type: string;
	domain?: string;
	entity?: string;
	cardinality?: number;
}

/** Configuration for asset-type fields in schema */
export interface AssetTypeConfig {
	accept?: string[];
	maxSize?: number;
	variants?: string[];
}

/** Configuration for select/multiselect fields */
export interface SelectConfig {
	options: Array<{ value: string; label: string }>;
	multiple?: boolean;
}

/** Configuration for keyvalues fields */
export interface KeyValuesConfig {
	keyPlaceholder?: string;
	valuePlaceholder?: string;
	addLabel?: string;
	emptyMessage?: string;
}

/** Configuration for _html schema keyword */
export interface SchemaHtmlConfig {
	type: SchemaHtmlType;
	_type_config?: RelationTypeConfig | AssetTypeConfig | SelectConfig | KeyValuesConfig;
	rows?: number;
	placeholder?: string;
	help?: string;
	readonly?: boolean;
	hidden?: boolean;
}

/**
 * Custom JSON Schema keywords for collection system.
 * These extend standard JSON Schema with collection-specific metadata.
 */
export interface CustomSchemaKeywords {
	/** Default value for property */
	_default?: unknown;
	/** UI hint configuration object */
	_html?: SchemaHtmlConfig | Record<string, unknown>;
	/** Property title for display (can be localized) */
	_title?: MaybeLocalized<string>;
	/** Property description for display (can be localized) */
	_description?: MaybeLocalized<string>;
	/** Property used as model label (number, priority 1=highest) */
	_label_source?: number | boolean;
	/** Allow building hierarchy from label slashes */
	_label_source_allow_build_hierarchy?: boolean;
	/** Path uniqueness constraint */
	_unique?: boolean;
	/** Include in full-text search (boolean or array of locale codes) */
	_searchable?: boolean | string[];
	/** Array of filters to apply before indexing */
	_searchable_filters?: Array<string | { name: string }>;
	/** Type ordering */
	_order?: number;
}

/**
 * Property definition extending JSON Schema with custom keywords.
 * Used in collection schemas to define model fields.
 */
export interface PropertyDefinition extends CustomSchemaKeywords {
	type?: "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";
	format?: string;
	enum?: unknown[];
	items?: PropertyDefinition;
	properties?: Record<string, PropertyDefinition>;
	required?: string[];
	minimum?: number;
	maximum?: number;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	default?: unknown;
	/** Additional properties constraint (JSON Schema) */
	additionalProperties?: boolean | PropertyDefinition;
	/** Union type (JSON Schema oneOf) */
	oneOf?: PropertyDefinition[];
	/** Constant value (JSON Schema const) */
	const?: unknown;
	/** Custom: inherit from another type definition */
	__extends?: string;
}

/**
 * Model type definition within a collection.
 * Defines the schema for a specific model type.
 */
export interface ModelDefinition {
	properties: Record<string, PropertyDefinition>;
	required?: string[];
}
