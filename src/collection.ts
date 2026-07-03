/**
 * Collection types for the collection system.
 * Collections are containers for models with schema definitions.
 */

import type { ISODateString, LtreePath, UserData, UUID } from "./utils.ts";
import type { PropertyDefinition } from "./schema.ts";

/**
 * Defines how ownership (`owner_id`) behaves for a collection.
 *
 * - `null` — not owner-scoped (default, current behavior)
 * - `"optional"` — owner_id can be set but isn't required
 * - `"required"` — owner_id must be set on every model in this collection
 * - `"auto"` — owner_id is automatically set from request context on create
 *              (and required — reject creates without it)
 */
export type OwnerIdMode = "optional" | "required" | "auto" | null;

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
	[key: string]: unknown;
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
	schemas?: Record<string, PropertyDefinition>;
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
	/**
	 * Folder definitions per model type. Outer key is the model type (or the
	 * special `"__common__"` bucket applied to every type); inner key is the
	 * folder (ltree) label. Mirrors {@link tags}; this is the shape the server
	 * reads in `ServiceModel.findAllFolders` (`coll.folders["__common__" | type]`).
	 */
	folders?: Record<string, Record<string, FolderDefinition>>;
	/** Tag definitions per model type (outer key = model type / `"__common__"`). */
	tags?: Record<string, Record<string, TagDefinition>>;
	/** Ownership mode for models in this collection */
	owner_id_mode?: OwnerIdMode;
	/**
	 * Lightweight-mode kill switch — when `false`, this collection cannot
	 * participate in relations. Defaults to `true`. **Immutable after creation.**
	 */
	__is_relations_enabled?: boolean;
	/**
	 * Lightweight-mode kill switch — when `false`, hierarchy machinery
	 * (`parent_id`, `__hierarchy_path`, `depth`, cycle detection) is skipped.
	 * `parent_id` in write payloads is rejected. Defaults to `true`.
	 * **Immutable after creation.**
	 */
	__is_hierarchy_enabled?: boolean;
	/**
	 * Lightweight-mode kill switch — when `false`, the fulltext indexing path
	 * (`__searchable`, generated tsvectors) is skipped. The
	 * `data` GIN index remains active, so `data @>` / `data ?` queries still
	 * work. Defaults to `true`. **Immutable after creation.**
	 */
	__is_fulltext_enabled?: boolean;
	/**
	 * When `true`, every model created in this collection gets an auto-generated,
	 * unique-per-collection, readonly short `code` (uppercase Crockford base32).
	 * Defaults to `false`. **Immutable after creation** — retrofit an existing
	 * collection via the collection package's `ServiceMaintenance.enableCode`.
	 */
	__is_code_enabled?: boolean;
	/**
	 * Length of generated `code`s (uppercase Crockford base32). Defaults to 6
	 * when unset; longer values lower collision probability at scale.
	 */
	__code_length?: number | null;
}

/**
 * Output DTO for collection responses.
 * Extends input fields with server-generated identifiers.
 */
export interface CollectionDTOOut extends CollectionDTOIn {
	/** Unique collection identifier */
	collection_id: UUID;
	/** Tenant this collection belongs to */
	tenant_id: string;
	/** Unique path identifier (ltree format) */
	path: LtreePath;
	/** Maximum number of models allowed (-1 for unlimited, default -1) */
	cardinality: number;
	/** Model types allowed in this collection (default ["default"]) */
	types: string[];
	/** JSON Schema definitions per model type */
	schemas: Record<string, PropertyDefinition>;
	/** Default values per model type */
	defaults: Record<string, UserData>;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
	/** Ownership mode for models in this collection (default null = not owner-scoped) */
	owner_id_mode: OwnerIdMode;
	/** Lightweight-mode kill switch — relations subsystem. Immutable. */
	__is_relations_enabled: boolean;
	/** Lightweight-mode kill switch — hierarchy subsystem. Immutable. */
	__is_hierarchy_enabled: boolean;
	/** Lightweight-mode kill switch — fulltext subsystem. Immutable. */
	__is_fulltext_enabled: boolean;
	/** Human-friendly `code` feature flag. Immutable after creation. */
	__is_code_enabled: boolean;
	/** Generated `code` length (null = default of 6). */
	__code_length: number | null;
}

/**
 * Full database row representation of a collection.
 */
export interface CollectionDbRow extends CollectionDTOOut {
	/** @internal Disables REST API access for entire collection */
	__is_rest_disabled: boolean;
}

/**
 * Primary Collection type alias.
 */
export type Collection = CollectionDbRow;
