/**
 * Navigation-related types for admin UI left nav generation.
 *
 * Architecture: domain / entity / type / model-instance
 *
 * - Domain: A @marianmeres/collection instance (workspace module like "stack-example")
 * - Entity: A collection record with unique path (e.g., "example", "comment", "_ext_asset")
 * - Type: A schema key within an entity (e.g., "default", "foo", "bar")
 *
 * Navigation generates one item per entity (not per type).
 * Types are displayed as tabs within the entity screen.
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Type entry within a collection, used for navigation generation.
 */
export interface CollectionTypeEntry {
	name: string; // Type name (e.g., "default", "foo")
	schemaTitle?: MaybeLocalized<string>; // Per-type _title from schema
}

/**
 * Registry entry for a domain module, built at server startup.
 * Contains collection metadata needed for navigation generation.
 */
export interface ModuleRegistryEntry {
	domain: string;
	mount: string;
	domainLabel?: MaybeLocalized<string>; // From primary collection's schemaTitle
	collections: Array<{
		id: string;
		entity: string;
		permission: string; // e.g., "product:read"
		primaryEntity?: boolean; // Marks this collection as source for domainLabel
		schemaTitle?: MaybeLocalized<string>; // Collection-level title (fallback)
		types: CollectionTypeEntry[]; // Types within this collection
	}>;
}

/**
 * Navigation configuration stored in __nav_config__ model.
 * Allows customization of auto-generated navigation.
 */
export interface NavConfig {
	/**
	 * Override settings for specific items.
	 * Key formats (checked in order of specificity):
	 * - "domain/entity" - Override specific entity
	 * - "domain" - Override all entities in domain
	 */
	overrides?: Record<
		string,
		{
			label?: MaybeLocalized<string>;
			order?: number;
			icon?: string;
			group?: MaybeLocalized<string>;
			groupIcon?: string;
			folder?: string; // Optional: sub-folder path
		}
	>;
	/**
	 * Hide items from nav. Supports:
	 * - "domain" - Hide entire domain
	 * - "domain/entity" - Hide specific entity
	 *
	 * Note: Entities with path starting with "_" are automatically hidden.
	 */
	hidden?: string[];
	/** Add custom navigation items not tied to collections */
	custom?: Array<{
		label: MaybeLocalized<string>;
		href: string;
		order?: number;
		icon?: string;
		group?: MaybeLocalized<string>;
		groupIcon?: string;
		permission?: string; // RBAC permission required
	}>;
}

/**
 * Output navigation item matching admin UI NavItemDef type.
 *
 * Each item represents one entity (collection), not a type.
 * The `type` field contains the resolved target type ("default" if exists, else first available).
 */
export interface NavItemDef {
	label?: MaybeLocalized<string>;
	href?: string;
	domain?: string;
	entity?: string;
	/** Target type for href - "default" if exists, otherwise first available type */
	type?: string;
	id?: string;
	folder?: string;
	icon?: string;
	group?: MaybeLocalized<string>;
	groupIcon?: string;
}
