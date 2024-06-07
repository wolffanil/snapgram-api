const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const SaveType = new GraphQLObjectType({
  name: "Save",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat },
  }),
});

module.exports = SaveType;
