/**
 * Form Routes Configuration Types
 *
 * These types define the structure of the `__joy_form_routes__` config record
 * stored in the project's config collection. They establish a contract for
 * overriding default ModelForm submission endpoints.
 *
 * @module form-routes/types
 */

/**
 * HTTP methods that can be overridden.
 */
export type HttpMethod = "POST" | "PUT" | "DELETE";

/**
 * Matching context for a form route rule.
 * All specified fields must match (AND logic).
 * Use "*" for wildcard matching.
 * Omitted fields match any value (equivalent to "*").
 */
export interface FormRouteMatch {
	/** Domain to match (e.g., "product", "*") */
	domain?: string;
	/** Entity/collection to match (e.g., "product", "category", "*") */
	entity?: string;
	/** Type to match (e.g., "default", "variant", "*") */
	type?: string;
	/** HTTP method to match (e.g., "POST", "PUT", "DELETE", "*") */
	method?: HttpMethod | "*";
}

/**
 * A single form route override rule.
 */
export interface FormRouteRule {
	/**
	 * Unique identifier for this rule.
	 */
	id: string;

	/**
	 * Human-readable description of what this rule does.
	 */
	description?: string;

	/**
	 * Matching context: when to apply this rule.
	 */
	match: FormRouteMatch;

	/**
	 * The custom endpoint URL to use instead of the default.
	 * Can include placeholders: {domain}, {entity}, {type}, {id}
	 *
	 * @example "/api/custom/products/{id}/special-save"
	 * @example "/custom/{domain}/{entity}/submit"
	 */
	endpoint: string;

	/**
	 * Whether this rule is enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Priority for this rule (higher = checked first).
	 * When multiple rules match, the highest priority wins.
	 * @default 0
	 */
	priority?: number;
}

/**
 * The complete form routes configuration structure.
 * Stored as the `value` of the `__joy_form_routes__` config record.
 */
export interface FormRoutesConfig {
	/**
	 * Schema version for future migrations.
	 * @default 1
	 */
	version: number;

	/**
	 * Array of form route override rules.
	 */
	rules: FormRouteRule[];
}

/**
 * Context passed to the route lookup function.
 */
export interface FormRouteContext {
	domain: string;
	entity: string;
	type: string;
	method: HttpMethod;
	id?: string;
}
