/**
 * External domain metadata for descriptor collections.
 *
 * When using weak relations for cross-domain references, the `related_collection_id`
 * must point to a valid collection (NOT NULL constraint). We create "descriptor
 * collections" that contain no models but carry metadata about the external domain.
 *
 * UI tooling reads this metadata to understand cross-domain references:
 * - Check `meta.__external_domain__` to identify descriptor collections
 * - Use `external_domain` and `external_adapter_prefix` to resolve the target
 * - The actual foreign model_id is stored in `weak_related_id` on the relation
 *
 * @example
 * ```typescript
 * import type { ExternalDomainMeta } from "@marianmeres/collection-types";
 *
 * // Create a descriptor collection
 * const extAccount = await sc.createIfNotExists({
 *   path: "_ext_account",
 *   types: [],  // no models stored
 *   is_unlisted: true,
 *   is_readonly: true,
 *   meta: {
 *     __external_domain__: true,
 *     external_domain: "account",
 *     external_adapter_prefix: "account_",
 *     external_collection_path: "account",
 *     description: "Cross-domain reference to stack-account",
 *   } satisfies ExternalDomainMeta,
 * });
 * ```
 */
export interface ExternalDomainMeta {
	/** Marker flag - always true for descriptor collections */
	__external_domain__: true;
	/** External domain name (e.g., "account", "customer", "order") */
	external_domain: string;
	/** Table prefix of the external adapter (e.g., "account_", "customer_") */
	external_adapter_prefix: string;
	/** Collection path in the external domain (e.g., "account", "customer") */
	external_collection_path: string;
	/** Human-readable description */
	description?: string;
}

/**
 * Type guard to check if collection meta indicates an external domain descriptor.
 *
 * @example
 * ```typescript
 * if (isExternalDomainMeta(collection.meta)) {
 *   console.log(`External domain: ${collection.meta.external_domain}`);
 * }
 * ```
 */
export function isExternalDomainMeta(meta: unknown): meta is ExternalDomainMeta {
	return (
		typeof meta === "object" &&
		meta !== null &&
		"__external_domain__" in meta &&
		(meta as ExternalDomainMeta).__external_domain__ === true
	);
}
