export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
        },
        {
            name: 'resumeUrl',
            title: 'Resume URL',
            type: 'url',
        },
        {
            name: 'resumeAssetId',
            title: 'Resume Asset ID',
            type: 'string',
        },
        {
            name: 'updatedAt',
            title: 'Last Updated',
            type: 'datetime',
        }
    ],
}
