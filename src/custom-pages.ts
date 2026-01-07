/**
 * Custom Pages Configuration Types (v2 - 3-Level Hierarchy)
 *
 * These types define the structure of the `__joy_custom_pages__` config record
 * stored in the project's config collection.
 *
 * Hierarchy:
 * - Level 1: Group (shown in sidebar with expand/collapse)
 * - Level 2: Page (shown as items within expanded group)
 * - Level 3: Tab (shown as tabs within a page)
 *
 * URL Pattern: #/p/{projectId}/custom/{groupId}/{pageId}?/{tabPath}?
 *
 * @module custom-pages/types
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Tab definition within a page (Level 3).
 * Tabs are rendered as secondary navigation within a page.
 */
export interface CustomPageTab {
	/**
	 * Unique path segment for this tab.
	 * Used in URL: #/p/{projectId}/custom/{groupId}/{pageId}/{path}
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
	 * Whether this is the default tab when page is accessed without tab path.
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
 * Page definition within a group (Level 2).
 * Pages are shown as items within an expanded group in the sidebar.
 */
export interface CustomPageDef {
	/**
	 * Unique identifier for this page within the group.
	 * Used in URL: #/p/{projectId}/custom/{groupId}/{id}
	 * Must match directory name: src/custom-pages/pages/{groupId}/{id}/
	 */
	id: string;

	/**
	 * Display label for the page in navigation.
	 */
	label: MaybeLocalized<string>;

	/**
	 * Human-readable description of what this page does.
	 */
	description?: string;

	/**
	 * Icon identifier for the page.
	 */
	icon?: string;

	/**
	 * Display order within the group (lower = first).
	 * @default 0
	 */
	order?: number;

	/**
	 * Whether this is the default page when group is accessed without page ID.
	 * If no default is specified, the first page by order is used.
	 */
	default?: boolean;

	/**
	 * Whether this page is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Component file name (defaults to "Page" for Page.svelte).
	 */
	component?: string;

	/**
	 * Tabs within this page (Level 3).
	 * If specified and non-empty, the page will show tab navigation.
	 * If empty or undefined, page content is rendered directly.
	 */
	tabs?: CustomPageTab[];
}

/**
 * Navigation metadata for a group.
 */
export interface CustomPageNavMeta {
	/**
	 * Display label in navigation.
	 */
	label: MaybeLocalized<string>;

	/**
	 * Icon identifier (matches ICON_MAP in LeftSidebarNav).
	 */
	icon?: string;

	/**
	 * Display order in the custom pages section (lower = first).
	 * @default 0
	 */
	order?: number;
}

/**
 * Group definition (Level 1).
 * Groups are shown in the sidebar with expand/collapse functionality.
 */
export interface CustomPageGroupDef {
	/**
	 * Unique identifier for this group.
	 * Used in URL: #/p/{projectId}/custom/{id}
	 * Must match directory name: src/custom-pages/pages/{id}/
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
	nav: CustomPageNavMeta;

	/**
	 * Pages within this group (Level 2).
	 */
	pages: CustomPageDef[];

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
 * Navigation section configuration for custom pages.
 */
export interface CustomPagesNavSection {
	/**
	 * Section header label.
	 */
	label?: MaybeLocalized<string>;

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
 * The complete custom pages configuration structure (v2).
 * Stored as the `value` of the `__joy_custom_pages__` config record.
 */
export interface CustomPagesConfig {
	/**
	 * Schema version. Must be 2 for 3-level hierarchy.
	 */
	version: number;

	/**
	 * Array of group definitions (Level 1).
	 */
	groups: CustomPageGroupDef[];

	/**
	 * Section configuration for the navigation.
	 */
	navSection?: CustomPagesNavSection;
}
