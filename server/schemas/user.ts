export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username', // Sanity Studio UI에서 보는 이름
      name: 'username', // 실제 백엔드/데이터베이스에서 접근할 때 사용하는 이름(key)
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (Rule: any) => Rule.unique(),
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}], // userId = id
      validation: (Rule: any) => Rule.unique(),
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}], // postId = id
      validation: (Rule: any) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
