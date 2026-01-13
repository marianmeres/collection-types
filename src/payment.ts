/**
 * Payment type definitions for e-commerce.
 *
 * Usage with Model:
 * ```typescript
 * import type { Model } from "@marianmeres/collection-types";
 * import type { PaymentData } from "@marianmeres/collection-types";
 * type PaymentModel = Model<PaymentData>;
 * ```
 */

import type { UUID } from "./utils.ts";

/** Payment status */
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

/** Payment data field schema */
export interface PaymentData {
	/** Payment provider name (e.g., "paypal", "stripe") */
	provider: string;
	/** Current payment status */
	status: PaymentStatus;
	/** Payment amount */
	amount: number;
	/** Currency code */
	currency: string;
	/** Provider-specific reference ID */
	provider_reference: string;
	/** Raw provider response data */
	provider_response?: Record<string, unknown>;
	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Payment type identifier */
export type PaymentType = "payment";

// Provider interface types (for implementing payment providers)

/** Result of initiating a payment */
export interface PaymentIntent {
	/** Internal payment ID */
	id: UUID;
	/** URL to redirect customer for payment */
	redirect_url: string;
	/** Provider-specific data */
	provider_data?: Record<string, unknown>;
}

/**
 * Result of capturing/completing a payment.
 * Errors are thrown, not returned.
 */
export interface PaymentResult {
	/** Provider reference ID */
	provider_reference: string;
}

/**
 * Result of a refund operation.
 * Errors are thrown, not returned.
 */
export interface RefundResult {
	/** Refund ID from provider */
	refund_id: string;
}

/**
 * Result of processing a webhook.
 * Errors are thrown, not returned.
 */
export interface WebhookResult {
	/** Event type from provider */
	event_type: string;
	/** Related payment ID */
	payment_id?: UUID;
}
