/**
 * Adapter types for the collection system.
 * Defines database query provider and adapter configuration.
 */

/**
 * Generic database query result.
 * Modeled after pg.QueryResult but adapter-agnostic.
 */
export interface DbQueryResult<T = Record<string, unknown>> {
	/** Result rows */
	rows: T[];
	/** Number of rows affected (for INSERT/UPDATE/DELETE) */
	rowCount?: number;
}

/**
 * Database query provider interface.
 * Abstracts the underlying database implementation.
 */
export interface QueryProvider {
	/** Query provider type */
	type: "pg" | "sqlite";
	/** Execute a query and return results */
	query(sql: string, params?: unknown[]): Promise<DbQueryResult>;
	/** Execute a query with cursor-style row iteration */
	each(
		sql: string,
		params: unknown[],
		onRow: (row: Record<string, unknown>) => Promise<void>
	): Promise<void>;
}

/**
 * Adapter configuration options.
 */
export interface AdapterOptions {
	/** Prefix for table names */
	tablePrefix: string;
	/** SQL to execute before initialization */
	preInitSql: string;
	/** SQL to execute after initialization */
	postInitSql: string;
	/** Custom SQL for userland initialization */
	customPreInitSql: string;
	/** Foreign key constraint to project table */
	projectIdFk: null | { table: string; column: string };
	/** Reset all data before initialization (tests only) */
	resetAll: boolean;
}
