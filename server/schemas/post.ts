type PostPreviewType = {
  title: string
  authorName: string
  authorUserName: string
  media: string
}

export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (Rule: any) => Rule.unique(),
    },

    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.text',
      authorName: 'author.name',
      authorUserName: 'author.username',
      media: 'photo',
    },
    prepare(selection: PostPreviewType) {
      const {title, authorName, authorUserName, media} = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUserName})`,
        media,
      }
    },
  },
}
