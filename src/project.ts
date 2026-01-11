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
