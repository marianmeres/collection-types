/**
 * Customer Sections Configuration Types (3-Level Hierarchy)
 *
 * These types define the structure for the customer area in the admin SPA.
 * Mirrors the CustomPagesConfig structure for consistency.
 *
 * Hierarchy:
 * - Level 1: Group (e.g., "account", "billing", "support")
 * - Level 2: Section (e.g., "profile", "password", "orders")
 * - Level 3: Tab (optional, within a section)
 *
 * URL Pattern: #/p/{projectId}/customer/{groupId}/{sectionId}?/{tabPath}?
 *
 * @module customer-sections/types
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Tab definition within a section (Level 3).
 * Mirrors CustomPageTab for consistency.
 */
export interface CustomerSectionTab {
	/**
	 * Unique path segment for this tab.
	 * Used in URL: #/p/{projectId}/customer/{groupId}/{sectionId}/{path}
	 */
	path: string;

	/**
	 * Display label for the tab.
	 */
	label: MaybeLocalized<string>;

	/**
	 * Icon identifier for the tab.
	 */
	icon?: string;

	/**
	 * Display order (lower = first).
	 * @default 0
	 */
	order?: number;

	/**
	 * Whether this is the default tab when section is accessed without tab path.
	 * If no default is specified, the first tab by order is used.
	 */
	default?: boolean;

	/**
	 * Component file name within _tabs/ directory.
	 * Defaults to capitalized path if not specified.
	 * @example "Overview" for "_tabs/Overview.svelte"
	 */
	component?: string;
}

/**
 * Section definition within a group (Level 2).
 * Mirrors CustomPageDef for consistency.
 */
export interface CustomerSectionDef {
	/**
	 * Unique identifier for this section within the group.
	 * Used in URL: #/p/{projectId}/customer/{groupId}/{id}
	 * Must match directory name: src/routes/customer/groups/{groupId}/{id}/
	 */
	id: string;

	/**
	 * Display label for the section in navigation.
	 */
	label: MaybeLocalized<string>;

	/**
	 * Human-readable description of what this section does.
	 */
	description?: string;

	/**
	 * Icon identifier for the section.
	 */
	icon?: string;

	/**
	 * Display order within the group (lower = first).
	 * @default 0
	 */
	order?: number;

	/**
	 * Whether this is the default section when group is accessed without section ID.
	 * If no default is specified, the first section by order is used.
	 */
	default?: boolean;

	/**
	 * Whether this section is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Component file name (defaults to "Page" for Page.svelte).
	 */
	component?: string;

	/**
	 * Tabs within this section (Level 3).
	 * If specified and non-empty, the section will show tab navigation.
	 * If empty or undefined, section content is rendered directly.
	 */
	tabs?: CustomerSectionTab[];
}

/**
 * Navigation metadata for a customer group.
 * Mirrors CustomPageNavMeta for consistency.
 */
export interface CustomerGroupNavMeta {
	/**
	 * Display label in navigation.
	 */
	label: MaybeLocalized<string>;

	/**
	 * Icon identifier (matches ICON_MAP in sidebar).
	 */
	icon?: string;

	/**
	 * Display order in the customer area section (lower = first).
	 * @default 0
	 */
	order?: number;
}

/**
 * Group definition (Level 1).
 * Mirrors CustomPageGroupDef for consistency.
 */
export interface CustomerGroupDef {
	/**
	 * Unique identifier for this group.
	 * Used in URL: #/p/{projectId}/customer/{id}
	 * Must match directory name: src/routes/customer/groups/{id}/
	 */
	id: string;

	/**
	 * Human-readable description of this group.
	 */
	description?: string;

	/**
	 * Whether this group is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Navigation metadata for the group.
	 */
	nav: CustomerGroupNavMeta;

	/**
	 * Sections within this group (Level 2).
	 */
	sections: CustomerSectionDef[];

	/**
	 * Priority for route matching (higher = checked first).
	 * @default 0
	 */
	priority?: number;

	/**
	 * Required permissions to access this group.
	 * If specified, user must have at least one of these permissions.
	 */
	permissions?: string[];
}

/**
 * Navigation section configuration for customer area.
 * Mirrors CustomPagesNavSection for consistency.
 */
export interface CustomerSectionsNavSection {
	/**
	 * Section header label.
	 */
	label?: MaybeLocalized<string>;

	/**
	 * Section icon.
	 */
	icon?: string;

	/**
	 * Section display order relative to other nav sections.
	 */
	order?: number;

	/**
	 * Whether to show a divider above this section.
	 */
	divider?: boolean;
}

/**
 * The complete customer sections configuration structure.
 * Mirrors CustomPagesConfig for consistency.
 */
export interface CustomerSectionsConfig {
	/**
	 * Schema version.
	 */
	version: number;

	/**
	 * Array of group definitions (Level 1).
	 */
	groups: CustomerGroupDef[];

	/**
	 * Section configuration for the navigation.
	 */
	navSection?: CustomerSectionsNavSection;
}
