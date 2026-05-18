export const serviceSchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 6,
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      options: {
        list: [
          { title: 'Sports Massage', value: 'sports-massage' },
          { title: 'Deep Tissue', value: 'deep-tissue' },
          { title: 'Thai Massage', value: 'thai-massage' },
          { title: 'Swedish Massage', value: 'swedish-massage' },
          { title: 'Abhyanga', value: 'abhyanga' },
          { title: 'Reflexology', value: 'reflexology' },
          { title: 'Sport Stretching', value: 'sport-stretching' },
          { title: 'Hatha Yoga', value: 'hatha-yoga' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'image',
    },
  },
};
