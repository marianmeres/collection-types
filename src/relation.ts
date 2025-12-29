/**
 * Relation types for the collection system.
 * Relations link models across collections with typed relationships.
 */

import type { UUID, ISODateString, UserData } from "./utils.ts";

/**
 * Input DTO for creating/updating a relation type.
 * A RelationType defines a typed relationship between models from different collections.
 *
 * @example
 * ```typescript
 * const input: RelationTypeDTOIn = {
 *   relation_type: "author",
 *   model_collection_id: "books",
 *   related_collection_id: "people",
 * };
 * ```
 */
export interface RelationTypeDTOIn {
	/** Project identifier */
	project_id?: UUID;
	/** Unique relation type name (business key) */
	relation_type?: string;
	/** Collection ID of the "from" models */
	model_collection_id?: UUID;
	/** Collection ID of the "to" models (for strong relations) */
	related_collection_id?: UUID;
	/** Optional type filter for related models */
	related_collection_model_type?: string;
	/** Maximum number of relations allowed (-1 for unlimited) */
	cardinality?: number;
	/** Cardinality on the model side (1 = one-to-many, -1 = many-to-many) */
	model_cardinality?: number;
	/** Cardinality on the related side */
	related_cardinality?: number;
	/** Whether relation type is hidden from listings */
	is_unlisted?: boolean;
	/** Whether relation type can be deleted */
	is_deletable?: boolean;
	/** Whether relation type is read-only */
	is_readonly?: boolean;
	/** Additional metadata */
	meta?: UserData;
}

/**
 * Output DTO for relation type responses.
 */
export interface RelationTypeDTOOut extends RelationTypeDTOIn {
	/** Unique relation type identifier */
	_relation_type_id: UUID;
	/** Maximum number of relations allowed (-1 for unlimited, default -1) */
	cardinality: number;
	/** Cardinality on the model side (1 = one-to-many, -1 = many-to-many, default -1) */
	model_cardinality: number;
	/** Cardinality on the related side (default -1) */
	related_cardinality: number;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
}

/**
 * Full database row representation of a relation type.
 */
export interface RelationTypeDbRow extends RelationTypeDTOOut {
	/** @internal Disables REST API access */
	__is_rest_disabled: boolean;
}

/**
 * Primary RelationType type alias.
 */
export type RelationType = RelationTypeDbRow;

/**
 * Input DTO for creating/updating a relation instance.
 * A Relation is a link between two models through a RelationType.
 *
 * @example
 * ```typescript
 * const input: RelationDTOIn = {
 *   related_id: "uuid-of-related-model",
 *   sort_order: 1,
 * };
 * ```
 */
export interface RelationDTOIn {
	/** UUID of the strongly-related model (must exist in related collection) */
	related_id?: UUID;
	/** Arbitrary string for weak references (when related item doesn't exist as model) */
	weak_related_id?: string;
	/** Sort order for displaying relations */
	sort_order?: number;
	/** Whether relation is hidden from listings */
	is_unlisted?: boolean;
	/** Whether relation can be deleted */
	is_deletable?: boolean;
	/** Whether relation is read-only */
	is_readonly?: boolean;
	/** Additional metadata */
	meta?: UserData;
}

/**
 * Output DTO for relation responses.
 */
export interface RelationDTOOut extends RelationDTOIn {
	/** Unique relation identifier */
	relation_id: UUID;
	/** Relation type identifier */
	_relation_type_id: UUID;
	/** Source model identifier */
	model_id: UUID;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
}

/**
 * Full database row representation of a relation.
 */
export interface RelationDbRow extends RelationDTOOut {}

/**
 * Primary Relation type alias.
 */
export type Relation = RelationDbRow;
