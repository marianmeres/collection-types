/**
 * Custom Pages Configuration Types
 *
 * These types define the structure of the `__joy_custom_pages__` config record
 * stored in the project's config collection. They establish a contract for
 * defining project-specific custom UI pages with lazy loading support.
 *
 * @module custom-pages/types
 */

import type { MaybeLocalized } from "./utils.ts";

/**
 * Nested route definition within a custom page.
 * Supports tabs, wizard steps, or multi-step flows.
 */
export interface CustomPageNestedRoute {
	/**
	 * Unique path segment (e.g., "overview", "settings", "step-1").
	 * Used in URL: #/p/{projectId}/custom/{pageId}/{path}
	 */
	path: string;

	/**
	 * Display label for navigation (tabs, breadcrumbs).
	 */
	label: MaybeLocalized<string>;

	/**
	 * Icon identifier for the tab/step.
	 */
	icon?: string;

	/**
	 * Display order (lower = first).
	 * @default 0
	 */
	order?: number;

	/**
	 * Whether this is the default route when parent page is accessed.
	 * If no default is specified, the first route by order is used.
	 */
	default?: boolean;

	/**
	 * Component file name within _routes/ directory.
	 * Defaults to path if not specified.
	 * @example "Overview" for "_routes/Overview.svelte"
	 */
	component?: string;
}

/**
 * Navigation metadata for a custom page.
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

	/**
	 * Optional grouping label for organizing multiple custom pages.
	 */
	group?: MaybeLocalized<string>;

	/**
	 * Icon for the group header.
	 */
	groupIcon?: string;
}

/**
 * A single custom page definition.
 */
export interface CustomPageDef {
	/**
	 * Unique identifier for this page.
	 * Used in URL: #/p/{projectId}/custom/{id}
	 * Must match directory name in src/custom-pages/pages/{id}/
	 */
	id: string;

	/**
	 * Human-readable description of what this page does.
	 */
	description?: string;

	/**
	 * Route pattern for this page.
	 * Supports parameters: /reports/[reportType]
	 * Defaults to "/{id}" if not specified.
	 */
	route?: string;

	/**
	 * Navigation metadata.
	 */
	nav: CustomPageNavMeta;

	/**
	 * Nested routes (tabs, wizard steps, etc.)
	 * If specified, the page component receives an `activeNestedRoute` prop.
	 */
	nestedRoutes?: CustomPageNestedRoute[];

	/**
	 * Whether this page is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Priority for route matching (higher = checked first).
	 * Prevents conflicts with more generic routes.
	 * @default 0
	 */
	priority?: number;

	/**
	 * Required permissions to access this page.
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
 * The complete custom pages configuration structure.
 * Stored as the `value` of the `__joy_custom_pages__` config record.
 */
export interface CustomPagesConfig {
	/**
	 * Schema version for future migrations.
	 * @default 1
	 */
	version: number;

	/**
	 * Array of custom page definitions.
	 */
	pages: CustomPageDef[];

	/**
	 * Section configuration for the navigation.
	 */
	navSection?: CustomPagesNavSection;
}
