/**
 * API types for the collection system.
 * Defines response structures and query syntax.
 */

import type { Collection } from "./collection.ts";
import type { Model } from "./model.ts";
import type { RelationType } from "./relation.ts";

/**
 * Pagination metadata for list responses.
 */
export interface PaginationMeta {
	/** Number of items per page */
	limit: number;
	/** Number of items skipped */
	offset: number;
	/** Total number of items available */
	total?: number;
	/** Whether more items exist beyond this page */
	hasMore?: boolean;
}

/**
 * Standard API response wrapper.
 */
export interface ApiResponse<T = unknown> {
	/** Response payload */
	data: T;
	/** Response metadata */
	meta?: Record<string, unknown>;
}

/**
 * API response for list endpoints with pagination.
 */
export interface ApiListResponse<T = unknown> extends ApiResponse<T[]> {
	/** Pagination and additional metadata */
	meta: PaginationMeta & Record<string, unknown>;
	/** Related data included in response */
	included?: {
		collection?: Record<string, Collection>;
		relation_type?: Record<string, RelationType>;
		model?: Record<string, Model>;
	};
}

/**
 * Query operators for filtering.
 * Mirrored from @marianmeres/condition-builder OPERATOR.
 */
export type QueryOperator =
	| "eq" // equals
	| "neq" // not equals
	| "gt" // greater than
	| "gte" // greater than or equal
	| "lt" // less than
	| "lte" // less than or equal
	| "like" // case-insensitive pattern match
	| "nlike" // not like
	| "match" // regex match
	| "nmatch" // not regex match
	| "is" // is (for null/true/false)
	| "nis" // is not
	| "in" // in array
	| "nin" // not in array
	| "ltree" // ltree path match
	| "ancestor" // ltree ancestor
	| "descendant"; // ltree descendant

/**
 * Single query condition.
 */
export interface QueryCondition {
	/** Field name to filter on */
	field: string;
	/** Comparison operator */
	operator: QueryOperator;
	/** Value to compare against */
	value: unknown;
}

/**
 * Query syntax for list endpoints.
 * Defines filtering, sorting, and pagination.
 */
export interface QuerySyntax {
	/** Filter conditions */
	where?: QueryCondition | QueryCondition[];
	/** Full-text search query */
	search?: string;
	/** Field to sort by */
	order?: string;
	/** Sort ascending (true) or descending (false) */
	asc?: boolean;
	/** Number of items to return */
	limit?: number;
	/** Number of items to skip */
	offset?: number;
}
