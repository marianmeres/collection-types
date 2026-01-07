/**
 * Base configuration interface for Joy admin UI.
 * Extensible via index signature - consumers can add custom fields.
 *
 * @example
 * ```ts
 * // Extend with custom fields
 * interface MyJoyConfig extends JoyConfig {
 *   myCustomField: string;
 *   stuic: {
 *     DismissibleMessage: {
 *       theme: "red" | "blue"; // Stricter typing
 *     };
 *   };
 * }
 * ```
 */
export interface JoyConfig {
	/** Project/app title */
	title?: string;

	/** Stuic component configuration overrides */
	stuic?: {
		DismissibleMessage?: {
			/** Theme color for dismissible messages */
			theme?: string;
		};
		[component: string]: Record<string, unknown> | undefined;
	};

	/** Index signature for custom extensions */
	[key: string]: unknown;
}
