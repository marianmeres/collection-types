/**
 * Joy Response Types
 *
 * Unified response type for the `/joy` endpoint that consolidates
 * all static configuration in a single request.
 *
 * @module joy-response
 */

import type { AreaPagesConfig } from "./area-pages.ts";
import type { FormRoutesConfig } from "./form-routes.ts";
import type { JoyConfig } from "./joy-config.ts";
import type { LinkedConfig } from "./linked.ts";

/**
 * Consolidated Joy configuration response.
 * Single endpoint replaces 5 individual config fetches.
 *
 * All config fields except `config` are nullable - they may not be
 * configured for all projects.
 */
export interface JoyResponse {
	/**
	 * Schema version for future migrations.
	 */
	version: number;

	/**
	 * App configuration from `__joy_config__`.
	 * Contains UI settings like title, theme overrides, etc.
	 */
	config: JoyConfig;

	/**
	 * Linked field rules from `__joy_linked__`.
	 * Defines implicit linking relationships between models.
	 */
	linked: LinkedConfig | null;

	/**
	 * Form route overrides from `__joy_form_routes__`.
	 * Allows custom API endpoints for form submissions.
	 */
	formRoutes: FormRoutesConfig | null;

	/**
	 * Custom pages configuration from `__joy_custom_pages__`.
	 * 3-level hierarchy: Group -> Page -> Tab.
	 */
	customPages: AreaPagesConfig | null;

	/**
	 * Customer pages configuration from `__joy_customer_pages__`.
	 * 3-level hierarchy: Group -> Page -> Tab.
	 */
	customerPages: AreaPagesConfig | null;
}
