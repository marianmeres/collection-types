/**
 * Template domain types for the stack-template module.
 *
 * Templates use Handlebars for variable substitution and MJML for email HTML rendering.
 */

// -----------------------------------------------------------------------------
// Template Collection Types
// -----------------------------------------------------------------------------

/** Template model data */
export interface TemplateData {
	slug: string;
	name: string;
	description: string;
	/** Email subject line (Handlebars template) */
	subject: string;
	/** Email body in MJML format (Handlebars template) */
	body_mjml: string;
	/** Plain text email body (Handlebars template) */
	body_text: string;
	/** JSON Schema for template variables validation */
	variables_schema: Record<string, unknown>;
	/** Sample data for template preview */
	sample_data: Record<string, unknown>;
	/** Template language code */
	lang: string;
	/** Whether template is active */
	is_active: boolean;
	/** Index signature for Model<T> compatibility */
	[key: string]: unknown;
}
