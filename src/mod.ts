/**
 * @module @marianmeres/collection-types
 *
 * Type definitions for the collection management system.
 * Pure interfaces with no runtime code - safe for type-only imports.
 *
 * @example
 * ```typescript
 * import type {
 *   Model,
 *   Collection,
 *   Relation,
 *   RelationType,
 *   PropertyDefinition,
 *   ApiResponse,
 *   UUID,
 * } from "@marianmeres/collection-types";
 * ```
 */

// Utils (branded types, helpers)
export * from "./utils.ts";

// Core entities
export * from "./model.ts";
export * from "./collection.ts";
export * from "./relation.ts";

// Schema system
export * from "./schema.ts";

// API layer
export * from "./api.ts";

// Assets
export * from "./asset.ts";

// Linked Assets (metadata-based linking configuration)
export * from "./linked-assets.ts";

// Adapter (database layer)
export * from "./adapter.ts";

// E-commerce domain types
export * from "./session.ts";
export * from "./customer.ts";
export * from "./order.ts";
export * from "./payment.ts";

// Cross-domain reference support
export * from "./external-domain.ts";

// Example domain types (reference implementation)
export * from "./example.ts";

// Schema builder utilities (type-safe schema definitions)
export * from "./schema-builder.ts";
