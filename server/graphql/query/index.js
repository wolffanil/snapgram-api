const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
} = require("graphql");
const PostType = require("../schemas/post.schema");
const Post = require("../../post/post.model");

// const PostsResultType = new GraphQLObjectType({
//   name: "PostsResult",
//   fields: () => ({
//     posts: { type: new GraphQLList(PostType) },
//     page: { type: GraphQLInt },
//   }),
// });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        q: { type: GraphQLString },
      },

      async resolve(parent, args) {
        if (args.q) {
          const regex = new RegExp(args.q, "i");
          const queryPosts = await Post.find({
            $or: [{ caption: { $regex: regex } }, { tags: { $in: [regex] } }],
          })
            .sort({ createdAt: -1 })
            .lean();

          return queryPosts;
        }
        const { page, limit } = args;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 2;

        const skip = (pageNumber - 1) * pageSize;

        const posts = await Post.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(pageSize)
          .lean();

        // const totalPosts = await Post.countDocuments();
        // const hasMore = skip + pageSize < totalPosts;

        // return { posts, hasMore };
        return posts;
      },
    },

    post: {
      type: PostType,
      args: { postId: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Post.findById(args.postId).lean();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
