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
 * Account auth flags advertised to the SPA so it can show/hide registration
 * UI without an extra round trip. Populated server-side from the same boot
 * options that drive `createAccountApp` / `bootstrapAccount`.
 */
export interface JoyAuthMeta {
	/** Whether `POST /account/register` is enabled. Drives the Sign-up tab. */
	allowSelfRegistration: boolean;
	/** Whether OAuth providers may create new accounts (vs login-only). */
	allowOAuthRegistration: boolean;
	/** Whether the email verification gate is on (drives the OTP step). */
	requireVerifiedEmail: boolean;
}

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
	 * Base URL for serving asset files, resolved from the server's storage adapter config.
	 * When a remote storage adapter is configured, this points to the remote server.
	 * Otherwise falls back to the local `/api/asset/static/` path.
	 */
	assetBaseUrl?: string;

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
	 * User pages configuration from `__joy_user_pages__`.
	 * 3-level hierarchy: Group -> Page -> Tab.
	 */
	userPages: AreaPagesConfig | null;

	/**
	 * Account auth flags. Optional for back-compat — older servers may omit it.
	 */
	auth?: JoyAuthMeta;
}
