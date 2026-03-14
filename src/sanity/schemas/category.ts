/**
 * Sanity CMS Schema: Category
 *
 * Simple taxonomy type used by both blog posts and portfolio holdings.
 */

const category = {
    name: "category",
    title: "Category",
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
                maxLength: 64,
            },
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
        },
    ],
};

export default category;
