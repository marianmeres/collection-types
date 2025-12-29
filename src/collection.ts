/**
 * Collection types for the collection system.
 * Collections are containers for models with schema definitions.
 */

import type { UUID, ISODateString, LtreePath, UserData } from "./utils.ts";
import type { PropertyDefinition } from "./schema.ts";

/**
 * Definition for a folder within a collection.
 * Folders organize models hierarchically.
 */
export interface FolderDefinition {
	label?: string;
	description?: string;
	color?: string;
}

/**
 * Definition for a tag within a collection.
 * Tags provide cross-cutting categorization.
 */
export interface TagDefinition {
	label?: string;
	color?: string;
}

/**
 * Input DTO for creating/updating a collection.
 */
export interface CollectionDTOIn {
	/** Unique path identifier (ltree format) */
	path: LtreePath;
	/** Maximum number of models allowed (-1 for unlimited) */
	cardinality?: number;
	/** Model types allowed in this collection */
	types?: string[];
	/** JSON Schema definitions per model type */
	schemas?: Record<string, Record<string, PropertyDefinition>>;
	/** Default values per model type */
	defaults?: Record<string, UserData>;
	/** User-defined data */
	data?: UserData;
	/** User-defined metadata */
	meta?: UserData;
	/** Whether collection is hidden from listings */
	is_unlisted?: boolean;
	/** Whether collection can be deleted */
	is_deletable?: boolean;
	/** Whether collection is read-only */
	is_readonly?: boolean;
	/** Folder definitions */
	folders?: Record<string, FolderDefinition>;
	/** Tag definitions */
	tags?: Record<string, TagDefinition>;
}

/**
 * Output DTO for collection responses.
 * Extends input fields with server-generated identifiers.
 */
export interface CollectionDTOOut extends CollectionDTOIn {
	/** Unique collection identifier */
	collection_id: UUID;
	/** Project this collection belongs to */
	project_id: UUID;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
}

/**
 * Full database row representation of a collection.
 */
export interface CollectionDbRow extends CollectionDTOOut {
	/** @internal Disables REST API access for entire collection */
	__is_rest_disabled?: boolean;
}

/**
 * Primary Collection type alias.
 */
export type Collection = CollectionDbRow;
