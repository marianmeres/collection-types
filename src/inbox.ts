/**
 * Inbox message type definitions for the `@marianmeres/stack-inbox` notification inbox.
 *
 * Usage with Model:
 * ```typescript
 * import type { Model, InboxMessageData } from "@marianmeres/collection-types";
 * type InboxMessageModel = Model<InboxMessageData>;
 * ```
 */

/** Discriminator for how a message's content is rendered. */
export type InboxContentType = "typed" | "freeform";

/** Origin of a message. */
export type InboxSenderKind = "system" | "user";

/** Relative importance; reserved for future prioritized/pinned rendering. */
export type InboxPriority = "low" | "normal" | "high";

/**
 * One recipient's own copy of a notification (denormalized model). The collection
 * is owner-scoped: `owner_id` (a collection column, NOT a data field) is the
 * recipient account id. Broadcasts materialize one row per recipient, all sharing
 * the same `broadcast_id`.
 */
export interface InboxMessageData {
	/**
	 * "typed" => render from i18n `template` + `template_data`;
	 * "freeform" => show `title`/`body` verbatim.
	 */
	content_type: InboxContentType;

	// --- typed content (content_type === "typed") ---
	/** i18n key base, e.g. "order_processed" → console renders `inbox.msg.order_processed.{title,body}`. */
	template?: string;
	/** Interpolation values for the typed template. */
	template_data?: Record<string, unknown>;

	// --- freeform content (content_type === "freeform") ---
	/** Freeform title (as authored). */
	title?: string;
	/** Freeform body (as authored). */
	body?: string;
	/** Author's language tag (display hint only; freeform is not translated). */
	lang?: string;

	// --- sender / grouping ---
	/** Sender account id; `null` for system-originated messages. */
	sender_id?: string | null;
	/** "system" (automated) or "user" (a person sent it). */
	sender_kind: InboxSenderKind;
	/** Groups all per-recipient copies of one logical send (recall/edit seam). */
	broadcast_id?: string | null;

	// --- lifecycle ---
	/** Reserved; minimal use in v1. */
	priority?: InboxPriority;
	/** Optional auto-expiry (ISO 8601). Expired messages are hidden from the inbox. */
	expires_at?: string | null;

	// --- recipient state (the only fields a recipient mutates) ---
	/** ISO timestamp when the recipient marked it read; null/absent = unread. */
	read_at?: string | null;
	/** ISO timestamp when the recipient archived it; null/absent = in the inbox. */
	archived_at?: string | null;

	/** Index signature for `Model<T>` compatibility. */
	[key: string]: unknown;
}
