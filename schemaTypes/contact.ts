import {defineField, defineType} from 'sanity'

export const contacts = defineType({
  name: 'contacts',
  title: 'Contacts',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titele',
      type: 'string',
    }),

    defineField({
      name: 'fullname',
      title: 'Full Name',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'number',
      title: 'Number',
      type: 'text',
    }),
    defineField({
      name: 'createat',
      title: 'Create At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
