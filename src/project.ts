/**
 * Project domain types for the stack-project module.
 *
 * Includes config collection types with default, _system, and _rbac subtypes.
 */

// -----------------------------------------------------------------------------
// Config Collection Types
// -----------------------------------------------------------------------------

/** Config model data - default type */
export interface ConfigDataDefault {
	key: string;
	value?: unknown;
	internal_description?: string;
	custom?: Record<string, unknown>;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

/** Permission definition for RBAC */
export interface RbacPermission {
	name: string;
	description?: string;
}

/** Role definition for RBAC */
export interface RbacRole {
	name: string;
	description?: string;
	permissions?: string[];
}

/** Group definition for RBAC */
export interface RbacGroup {
	name: string;
	description?: string;
	roles?: string[];
}

/** Config model data - _rbac type (extends default) */
export interface ConfigDataRbac extends ConfigDataDefault {
	groups?: RbacGroup[];
	roles?: RbacRole[];
	permissions?: RbacPermission[];
}

/** Union of all config data types */
export type ConfigData = ConfigDataDefault | ConfigDataRbac;

// -----------------------------------------------------------------------------
// Delivery Options Types (for checkout)
// -----------------------------------------------------------------------------

/** Single delivery option */
export interface DeliveryOption {
	/** Unique identifier */
	id: string;
	/** Display name */
	name: string;
	/** Description shown to customer */
	description?: string;
	/** Base price in cents */
	price: number;
	/** Estimated delivery time (e.g., "2-3 business days") */
	estimated_time?: string;
	/** Whether this option is currently available */
	is_active: boolean;
	/** Sort order for display */
	sort_order: number;
	/** Optional: minimum order amount for this option (in cents) */
	min_order_amount?: number;
	/** Optional: free shipping threshold (in cents) */
	free_above?: number;
}

/** Delivery options configuration (stored in project config) */
export interface DeliveryOptionsConfig {
	/** Default currency for prices */
	currency: string;
	/** Available delivery options */
	options: DeliveryOption[];
	/** Default option ID when none selected */
	default_option_id?: string;
}
