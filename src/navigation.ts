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
		types: CollectionTypeEntry[]; // Types within this collection
	}>;
}

/**
 * Navigation configuration stored in __joy_nav_cms__ model.
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

// =============================================================================
// Unified Area Navigation Types
// =============================================================================

/**
 * Area identifiers for the admin SPA.
 * Each area represents a distinct section of the application with its own
 * routing pattern and navigation structure.
 */
export type AreaId = "cms" | "custom" | "customer" | "extra";

/**
 * Base nav item structure shared across all areas.
 * Designed to support hierarchical navigation (groups, pages, tabs).
 */
export interface AreaNavItem {
	/** Unique identifier for this nav item within its parent */
	id: string;
	/** Display label */
	label: MaybeLocalized<string>;
	/** Navigation href (relative to area prefix) */
	href?: string;
	/** Icon identifier */
	icon?: string;
	/** Display order (lower = first) */
	order?: number;
	/** Required permissions to see this item */
	permissions?: string[];
	/** Children for hierarchical nav (groups → pages → tabs) */
	children?: AreaNavItem[];
	/**
	 * Area-specific metadata.
	 * CMS: { domain, entity, type, types: CollectionTypeEntry[] }
	 * Custom: { description, component, tabs }
	 * Customer: { section }
	 * Extra: {}
	 */
	meta?: Record<string, unknown>;
}

/**
 * Area-specific navigation configuration.
 */
export interface AreaNavConfig {
	/** Whether this area is enabled for the project */
	enabled: boolean;
	/**
	 * Permissions required to see this area at all (area-level gating).
	 * User needs at least ONE of these permissions to see the area.
	 * This is separate from item-level permissions which filter content within the area.
	 */
	requiredPermissions?: string[];
	/** Section header configuration in sidebar */
	section?: {
		label?: MaybeLocalized<string>;
		icon?: string;
		/** Display order relative to other area sections */
		order?: number;
	};
	/** Navigation items for this area */
	items: AreaNavItem[];
}

/**
 * Unified navigation response from server.
 * Single endpoint serves all area navigation for a project.
 *
 * URL pattern: GET /api/{projectId}/nav
 */
export interface UnifiedNavResponse {
	/** Schema version for future migrations */
	version: number;
	/**
	 * Default landing configuration when accessing project root.
	 * If not specified, falls back to first enabled area.
	 */
	landing?: {
		/** Target area */
		area: AreaId;
		/** Optional specific route within area (e.g., "dashboard/main" for custom) */
		route?: string;
	};
	/** Per-area navigation configuration */
	areas: Partial<Record<AreaId, AreaNavConfig>>;
}
