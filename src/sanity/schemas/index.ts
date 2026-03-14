/**
 * Sanity CMS Schema Index
 *
 * Import and register all schemas here. These schemas define the content
 * types available in Sanity Studio for this project.
 *
 * Usage: In your sanity.config.ts, import this array:
 *   import { schemaTypes } from './sanity/schemas'
 *   schema: { types: schemaTypes }
 */

import holding from "./holding";
import post from "./post";
import category from "./category";

export const schemaTypes = [holding, post, category];
