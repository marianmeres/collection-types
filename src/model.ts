/**
 * Model types for the collection system.
 * Defines the structure of model records at different layers (input, output, database).
 */

import type { UUID, ISODateString, LtreePath, UserData, MaybeLocalized } from "./utils.ts";

/**
 * Input DTO for creating/updating a model.
 * Contains user-provided fields for model creation.
 */
export interface ModelDTOIn {
	/** Model type within collection */
	type?: string;
	/** Parent model ID for hierarchy */
	parent_id?: UUID | null;
	/** Unique path identifier (ltree format) */
	path?: LtreePath | null;
	/** Folder for organization */
	folder?: string | null;
	/** Tags for categorization */
	tags?: string[];
	/** User-defined data */
	data?: UserData;
	/** User-defined metadata */
	meta?: UserData;
	/** Whether model is hidden from listings */
	is_unlisted?: boolean;
	/** Whether model can be deleted */
	is_deletable?: boolean;
	/** Whether model is read-only */
	is_readonly?: boolean;
	/** Whether model is starred/favorited */
	is_starred?: boolean;
	/** Whether model is enabled/active */
	is_enabled?: boolean;
	/** Color flags */
	red?: boolean;
	orange?: boolean;
	yellow?: boolean;
	green?: boolean;
	blue?: boolean;
	purple?: boolean;
	gray?: boolean;
}

/**
 * Output DTO for model responses.
 * Extends input fields with server-generated identifiers and timestamps.
 */
export interface ModelDTOOut extends ModelDTOIn {
	/** Unique model identifier */
	model_id: UUID;
	/** Collection this model belongs to */
	collection_id: UUID;
	/** Auto-generated label from schema _label_source fields */
	_label?: MaybeLocalized<string> | null;
	/** Computed label for hierarchy display */
	_hierarchy_label?: string | null;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
}

/**
 * Full database row representation of a model.
 * Includes internal fields for search indexing and REST control.
 */
export interface ModelDbRow extends ModelDTOOut {
	/** @internal Disables REST API access */
	__is_rest_disabled?: boolean;
	/** @internal Structured search index data */
	__searchable?: Record<string, unknown>;
	/** @internal Full-text search string */
	__searchable2?: string;
	/** @internal Cached hierarchy path for ancestor queries */
	__hierarchy_path?: LtreePath | null;
}

/**
 * Model data with relation definitions for upsert operations.
 * The __relations__ field is processed separately during save.
 */
export interface ModelUpsertData extends ModelDbRow {
	/** Relations to save with model (relation_type -> array of related model IDs) */
	__relations__?: Record<string, UUID[]>;
}

/**
 * Primary Model type with generic data typing.
 * Use Model<MyDataType> for type-safe data access.
 *
 * @example
 * ```typescript
 * interface BookData {
 *   title: string;
 *   author: string;
 *   isbn: string;
 * }
 * type Book = Model<BookData>;
 * ```
 */
export type Model<TData extends UserData = UserData> = ModelDbRow & { data: TData };
