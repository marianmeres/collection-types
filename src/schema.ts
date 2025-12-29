/**
 * Schema types for the collection system.
 * Defines JSON Schema extensions and UI configuration.
 */

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
	| "code";

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

/** Configuration for _html schema keyword */
export interface SchemaHtmlConfig {
	type: SchemaHtmlType;
	_type_config?: RelationTypeConfig | AssetTypeConfig | SelectConfig;
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
	_html?: SchemaHtmlConfig;
	/** Property title for display */
	_title?: string;
	/** Property description for display */
	_description?: string;
	/** Property used as model label (number, priority 1=highest) */
	_label_source?: number;
	/** Allow building hierarchy from label slashes */
	_label_source_allow_build_hierarchy?: boolean;
	/** Path uniqueness constraint */
	_unique?: boolean;
	/** Include in full-text search */
	_searchable?: boolean;
	/** Array of filters to apply before indexing */
	_searchable_filters?: string[];
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
}

/**
 * Model type definition within a collection.
 * Defines the schema for a specific model type.
 */
export interface ModelDefinition {
	properties: Record<string, PropertyDefinition>;
	required?: string[];
}
