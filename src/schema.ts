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
	| "markdown"
	| "number"
	| "money"
	| "boolean"
	| "checkbox"
	| "parent"
	| "object"
	| "select"
	| "status"
	| "multiselect"
	| "date"
	| "datetime"
	| "time"
	| "color"
	| "relation"
	| "asset"
	| "json"
	| "code"
	| "keyvalues"
	| "password"
	// "user": a "weak relation" account picker — renders a combobox sourced from
	// the `account` collection (optionally role-filtered by the consumer) and
	// stores the chosen account id as a SCALAR string in `data.*` (NO formal
	// `__relations__` row). UI-only signal; AJV treats `_html` as opaque.
	| "user";

/**
 * A markdown-editor toolbar button key, or `"|"` for a visual separator. Mirrors
 * stuic's `MarkdownEditor` `ToolbarItem` union (kept local so this shared package
 * stays free of a stuic dependency). Unknown keys are ignored by the editor.
 */
export type MarkdownToolbarItem =
	| "bold"
	| "italic"
	| "heading1"
	| "heading2"
	| "heading3"
	| "heading4"
	| "heading5"
	| "heading6"
	| "link"
	| "image"
	| "bulletList"
	| "orderedList"
	| "blockquote"
	| "codeBlock"
	| "hr"
	| "hardBreak"
	| "undo"
	| "redo"
	| "|";

/** Configuration for relation-type fields in schema */
export interface RelationTypeConfig {
	relation_type: string;
	domain?: string;
	entity?: string;
	cardinality?: number;
	/** Entity type filter (e.g., "default", "top") */
	type?: string;
	/** Allow unknown relations */
	allow_unknown?: boolean;
	/**
	 * When true (and the relation is multi-value, i.e. `cardinality !== 1`), the
	 * admin UI exposes a manual reorder control. The chosen order is persisted as
	 * the relation `sort_order`. No-op for single-cardinality relations.
	 */
	ordered?: boolean;
}

/** Configuration for asset-type fields in schema */
export interface AssetTypeConfig {
	accept?: string | string[];
	maxSize?: number;
	variants?: string[];
}

/** Configuration for select/multiselect/status fields */
export interface SelectConfig {
	/** `intent` (status fields) carries the per-value badge color. */
	options: Array<{ value: string; label: string; intent?: string }>;
	multiple?: boolean;
}

/** Configuration for keyvalues fields */
export interface KeyValuesConfig {
	keyPlaceholder?: string;
	valuePlaceholder?: string;
	addLabel?: string;
	emptyMessage?: string;
}

/**
 * Configuration for `money` fields (`_html.type: "money"`).
 *
 * The value is stored as an INTEGER number of minor units (e.g. cents) — the
 * JSON Schema `type` should be `"integer"`. The UI displays/edits it as a major
 * unit decimal (e.g. dollars): display = stored / `scale`, input = entered *
 * `scale` (rounded). Keeping this in the schema makes "this field is money"
 * authoritative for every surface (list display, form input, import transform)
 * instead of guessing from the field name.
 */
export interface MoneyConfig {
	/** Minor units per major unit. Default 100 (cents → dollars). */
	scale?: number;
	/** Decimal places to display. Default 2. */
	decimals?: number;
	/** Optional ISO currency code, for surfaces that render a symbol (e.g. "USD"). */
	currency?: string;
}

/** Configuration for `textarea` fields (`_html.type: "textarea"`). */
export interface TextareaConfig {
	/** Visible row count. Absent → the compact, input-like default (1 row). A
	 *  higher value makes the field read as a textarea (e.g. a description). */
	rows?: number;
}

/** Configuration for _html schema keyword */
export interface SchemaHtmlConfig {
	/** Field type for UI rendering */
	type?: SchemaHtmlType;
	/** Type-specific configuration */
	_type_config?:
		| RelationTypeConfig
		| AssetTypeConfig
		| SelectConfig
		| KeyValuesConfig
		| MoneyConfig
		| TextareaConfig;

	/** Display label (can be localized) */
	label?: MaybeLocalized<string>;
	/** Display description (can be localized) */
	description?: MaybeLocalized<string>;
	/** Fieldset grouping label (can be localized) */
	_fieldset?: MaybeLocalized<string>;

	/** Order in model form */
	_model_form_order?: number;
	/** Order in data table */
	_data_table_order?: number;

	/** Number of textarea rows */
	rows?: number;
	/**
	 * Markdown editor resting-height floor (CSS length string or px number).
	 * Funneled into `--stuic-markdown-editor-min-height`. Lower it for compact
	 * fields (e.g. a description in a drawer) so the editor doesn't dominate.
	 */
	minHeight?: number | string;
	/** Markdown editor height cap (CSS length string or px number). */
	maxHeight?: number | string;
	/**
	 * Markdown editor toolbar. An ordered array picks exactly which buttons show
	 * (use `"|"` for separators); `[]` hides all formatting buttons (the
	 * Source/Preview toggle still shows). NOTE: `false` is dropped by joy's field
	 * cleanup, so use `[]` to hide — not `false`.
	 */
	toolbar?: boolean | MarkdownToolbarItem[];
	/**
	 * Toolbar shown on mobile / touch devices (the editor ignores `toolbar`
	 * there). Set this too if a custom `toolbar` must also apply on mobile.
	 */
	mobileToolbar?: boolean | MarkdownToolbarItem[];
	/** Input placeholder text */
	placeholder?: string;
	/** Help text */
	help?: string;
	/** Read-only field */
	readonly?: boolean;
	/** Hidden field */
	hidden?: boolean;

	/** UI-specific default (distinct from _default) (typically JSON serialized) */
	_default?: string;
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
	type?:
		| "string"
		| "number"
		| "integer"
		| "boolean"
		| "object"
		| "array"
		| "null";
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
	/** Virtual form-only fields (not persisted, excluded from DB validation) */
	_extra_form_fields?: Record<string, PropertyDefinition>;
}
