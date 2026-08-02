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
	/**
	 * Cumulative amount refunded so far, in the same units as {@link amount}.
	 * Absent or `0` = nothing refunded.
	 *
	 * A value **below** `amount` is a PARTIAL refund, and `status` deliberately
	 * stays `"completed"` in that case — a partially refunded payment is still a
	 * completed one. So `status === "refunded"` answers "was ALL of it
	 * returned?", and this field answers "was ANY of it returned?". Reading the
	 * former as the latter is wrong the moment a partial refund happens.
	 */
	refunded_amount?: number;
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

/** Configuration for initiating a payment */
export interface PaymentInitConfig {
	/** Payment provider identifier (e.g. "stripe", "paypal") */
	provider: string;
	/** Amount in smallest currency unit (e.g. cents) */
	amount: number;
	/** ISO 4217 currency code */
	currency: string;
	/** URL to redirect after payment completion */
	return_url?: string;
	/** Provider-specific additional configuration */
	[key: string]: unknown;
}

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
	/** Optional provider verification summary (e.g. PayPal payer email/id,
	 *  capture status, seller-protection eligibility) surfaced for admin review.
	 *  Provider-specific keys; undefined when the provider supplies none. */
	verification?: Record<string, unknown>;
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
