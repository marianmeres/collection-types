/**
 * Order type definitions for e-commerce.
 *
 * Usage with Model:
 * ```typescript
 * import type { Model } from "@marianmeres/collection-types";
 * import type { OrderData, OrderEventData } from "@marianmeres/collection-types";
 * type OrderModel = Model<OrderData>;
 * type OrderEventModel = Model<OrderEventData>;
 * ```
 */

import type { AddressData } from "./customer.ts";
import type { UUID } from "./utils.ts";

/** Order status progression */
export type OrderStatus =
	| "pending"
	| "paid"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

/** Checkout stages for tracking progress */
export type CheckoutStage =
	| "cart"
	| "addresses"
	| "delivery"
	| "confirm"
	| "payment"
	| "complete";

/** Single order line item (snapshot at purchase time) */
export interface OrderLineItem {
	/** Product model_id for reference */
	product_id: UUID;
	/** Product SKU (snapshot) */
	sku?: string;
	/** Product name (snapshot) */
	name: string;
	/** Unit price at purchase time (snapshot) */
	price: number;
	/** Quantity ordered */
	quantity: number;
}

/** Order price totals */
export interface OrderTotals {
	/** Sum of line items before tax/shipping/discounts */
	subtotal: number;
	/** Tax amount */
	tax: number;
	/** Shipping cost */
	shipping: number;
	/** Discount amount */
	discount: number;
	/** Final total */
	total: number;
}

/** Delivery option snapshot at checkout time */
export interface DeliveryOptionSnapshot {
	id: string;
	name: string;
	price: number;
	estimated_time?: string;
}

/** Order data field schema */
export interface OrderData {
	/** Current order status */
	status: OrderStatus;
	/** Line items (snapshots) */
	items: OrderLineItem[];
	/** Currency code (e.g., "EUR", "USD") */
	currency: string;
	/** Price totals */
	totals: OrderTotals;
	/** Shipping address (embedded snapshot, set during checkout) */
	shipping_address?: AddressData;
	/** Billing address (embedded snapshot, set during checkout) */
	billing_address?: AddressData;
	/** Order notes */
	notes?: string;

	// Checkout-specific fields
	/** Selected delivery option ID */
	delivery_option_id?: string;
	/** Delivery option snapshot at checkout time */
	delivery_option?: DeliveryOptionSnapshot;
	/** Customer email (for tracking, especially guest checkout) */
	customer_email?: string;
	/** Current checkout stage */
	checkout_stage?: CheckoutStage;

	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Order event types for audit trail */
export type OrderEventType =
	| "created"
	| "status_changed"
	| "payment_added"
	| "note_added"
	| "cancelled";

/** Actor who triggered an order event */
export interface OrderEventActor {
	/** Actor type */
	type: "customer" | "admin" | "system";
	/** Actor ID (account_id or customer_id) */
	id?: UUID;
}

/** Order event data field schema (audit trail) */
export interface OrderEventData {
	/** Type of event */
	event_type: OrderEventType;
	/** Previous status (for status_changed) */
	previous_status?: OrderStatus;
	/** New status (for status_changed) */
	new_status?: OrderStatus;
	/** Who triggered the event */
	actor: OrderEventActor;
	/** Additional event details */
	details?: Record<string, unknown>;
	/** Index signature for compatibility with UserData */
	[key: string]: unknown;
}

/** Order type identifier */
export type OrderType = "order";

/** Order event type identifier */
export type OrderEventModelType = "event";

/** Result of order creation, includes server-assigned metadata */
export interface OrderCreateResult {
	/** Server-assigned model ID */
	model_id: UUID;
	/** The order data payload */
	data: OrderData;
}
