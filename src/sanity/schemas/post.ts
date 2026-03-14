/**
 * Sanity CMS Schema: Blog Post
 *
 * This schema defines the structure for blog/insights posts in Sanity Studio.
 * Supports rich text (Portable Text), video embeds, and embedded chart references.
 *
 * Fields map to the BlogPost interface in src/lib/mockData/blog.ts
 */

const post = {
    name: "post",
    title: "Blog Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            description: "Short summary shown on blog cards (max ~200 chars)",
        },
        {
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "mainImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                },
            ],
        },
        {
            name: "videoUrl",
            title: "Video URL (YouTube/Vimeo embed)",
            type: "url",
            description:
                "If provided, the post will feature a sticky video player that follows the reader as they scroll.",
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                            { title: "Code", value: "code" },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                },
                {
                    name: "dataTable",
                    title: "Data Table",
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Table Title",
                            type: "string",
                        },
                        {
                            name: "headers",
                            title: "Column Headers",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        {
                            name: "rows",
                            title: "Table Rows",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        {
                                            name: "cells",
                                            title: "Cells",
                                            type: "array",
                                            of: [{ type: "string" }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "chartEmbed",
                    title: "Chart Embed",
                    type: "object",
                    fields: [
                        {
                            name: "chartType",
                            title: "Chart Type",
                            type: "string",
                            options: {
                                list: ["line", "bar", "area", "pie"],
                            },
                        },
                        {
                            name: "data",
                            title: "Chart Data (JSON)",
                            type: "text",
                            rows: 8,
                            description: "JSON array of data points for the chart",
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                },
            ],
        },
    ],
    orderings: [
        {
            title: "Published (Newest)",
            name: "pubDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "mainImage",
        },
    },
};

export default post;
