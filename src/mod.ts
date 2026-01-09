/**
 * @module @marianmeres/collection-types
 *
 * Type definitions and schema utilities for the collection management system.
 *
 * Includes:
 * - Core types: Model, Collection, Relation, Schema
 * - Domain types: Account, Product, Order, Customer, Session, etc.
 * - Schema builder: createObjectSchema<T>() for type-safe schema definitions
 *
 * @example
 * ```typescript
 * // Type-only imports
 * import type {
 *   Model,
 *   Collection,
 *   UUID,
 *   ProductData,
 *   CustomerData,
 * } from "@marianmeres/collection-types";
 *
 * // Schema builder (runtime import)
 * import {
 *   createObjectSchema,
 *   type ExtendedSchema,
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

// Linked models (metadata-based linking configuration)
export * from "./linked.ts";

// Adapter (database layer)
export * from "./adapter.ts";

// E-commerce domain types
export * from "./session.ts";
export * from "./customer.ts";
export * from "./order.ts";
export * from "./payment.ts";

// Cross-domain reference support
export * from "./external-domain.ts";

// Account domain types
export * from "./account.ts";

// Product domain types
export * from "./product.ts";

// Project/config domain types
export * from "./project.ts";

// Template domain types
export * from "./template.ts";

// Email domain types
export * from "./email.ts";

// Example domain types (reference implementation)
export * from "./example.ts";

// Schema builder utilities (type-safe schema definitions)
export * from "./schema-builder.ts";

// Navigation types (admin UI)
export * from "./navigation.ts";

// Form Routes Configuration Types (admin UI)
export * from "./form-routes.ts";

// Area Pages Configuration Types (unified custom/customer pages - admin UI)
export * from "./area-pages.ts";

// Joy Config Types (admin UI)
export * from "./joy-config.ts";

// Joy Response Types (unified config endpoint)
export * from "./joy-response.ts";
