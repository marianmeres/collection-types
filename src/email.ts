/**
 * Email domain types for the stack-email module.
 *
 * Email log types for audit trail of sent emails.
 */

// -----------------------------------------------------------------------------
// Email Log Collection Types
// -----------------------------------------------------------------------------

/** Email status values */
export type EmailStatus = "queued" | "sent" | "failed";

/** Email model data (audit log entry) */
export interface EmailData {
	to?: string;
	from?: string;
	subject?: string;
	body_html?: string;
	body_text?: string;
	reply_to?: string;
	cc?: string;
	bcc?: string;
	/** Email delivery status */
	status?: EmailStatus;
	/** Transport used (e.g., "smtp", "sendgrid") */
	transport?: string;
	/** Timestamp when email was sent */
	sent_at?: string;
	/** Error message if delivery failed */
	error?: string;
	/** External ID from email provider */
	external_id?: string;
	/** Job UID for async email processing */
	job_uid?: string;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
