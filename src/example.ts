/**
 * Example domain types for the stack-example reference module.
 *
 * These types are used for testing and demonstrating all collection features
 * including multiple model types, relations, and various field types.
 */

import type { MaybeLocalized } from "./utils.ts";

// -----------------------------------------------------------------------------
// Example Collection Types
// -----------------------------------------------------------------------------

/** Example model data - default type */
export interface ExampleDataDefault {
	name: string;
	description?: MaybeLocalized<string>;
	slug: string;
	release_date?: string;
	status?: "draft" | "published" | "archived";
	custom?: Record<string, unknown>;
	// UI-only fields (relation placeholders, never stored in data)
	comments?: never;
	images?: never;
	global_asset?: never;
	owner?: never;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}

/** Example model data - foo type (extends default with string field) */
export interface ExampleDataFoo extends ExampleDataDefault {
	foo_specific?: string;
}

/** Example model data - bar type (extends default with number and date fields) */
export interface ExampleDataBar extends ExampleDataDefault {
	bar_specific?: number;
	bar_date?: string;
}

/** Union of all example data types */
export type ExampleData = ExampleDataDefault | ExampleDataFoo | ExampleDataBar;

// -----------------------------------------------------------------------------
// Comment Collection Types
// -----------------------------------------------------------------------------

/** Comment model data for testing strong and linked relations */
export interface CommentData {
	body: string;
	author_name?: string;
	created_at?: string;
	/** Links to examples with matching slug (for linked relation testing) */
	example_slug?: string;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
