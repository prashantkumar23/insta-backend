import {
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";
import {
  DeleteResult,
  BulkWriteOptions,
  AnyBulkWriteOperation,
  BulkWriteResult,
  ObjectId,
} from "mongodb";
import {
  FilterQuery,
  HydratedDocument,
  LeanDocument,
  Model,
  UpdateQuery,
  MongooseBulkWriteOptions,
  QueryOptions,
} from "mongoose";

import { EntitySchemaFactory } from "./entity-schema.factory";
import { IdentifiableEntitySchema } from "./identifiable-entity.schema";

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >
  ) { }

  async findOne<T>(
    entityFilterQuery: FilterQuery<TSchema>,
    updateFilterQuery?: UpdateQuery<TSchema> | null,
    options?: QueryOptions<TSchema> | null
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne<TSchema>(
      entityFilterQuery,
      updateFilterQuery,
      options ? options : { lean: true }
    );

    if (!entityDocument) {
      // throw new NotFoundException('Entity was not found.');
      return null;
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  async find(
    entityFilterQuery?: FilterQuery<TSchema>,
    options?: QueryOptions<TSchema> | null,
    limit?: number
  ): Promise<TEntity[]> {
    return (
      //@ts-ignore
      (
        await this.entityModel
          .find(entityFilterQuery, options, { lean: true })
          .limit(limit)
      ).map((entityDocument) =>
        this.entitySchemaFactory.createFromSchema(entityDocument)
      )
    );
  }

  async create(entity: TEntity): Promise<any> {
    return await new this.entityModel(
      this.entitySchemaFactory.create(entity)
    ).save();
  }

  async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity
  ): Promise<void> {
    const updatedEntityDocument = await this.entityModel.findOneAndReplace(
      entityFilterQuery,
      this.entitySchemaFactory.create(
        entity
      ) as unknown as LeanDocument<TSchema>,
      {
        new: true,
        useFindAndModify: false,
        lean: true,
      }
    );

    if (!updatedEntityDocument) {
      throw new NotFoundException("Unable to find the entity to replace.");
    }
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TSchema>,
    updateFilterQuery: UpdateQuery<TSchema> | UpdateQuery<TSchema>[]
  ): Promise<HydratedDocument<TSchema, {}, {}> | NotFoundException> {
    const updatedEntityDocument = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateFilterQuery,
      {
        returnDocument: "after",
      }
    );

    console.log("updatedEntityDocument", updatedEntityDocument);

    if (!updatedEntityDocument) {
      throw new NotFoundException("Unable to find the entity to update.");
    }

    return updatedEntityDocument;
  }

  async delete(
    entityFilterQuery: FilterQuery<TSchema>
  ): Promise<DeleteResult | UnprocessableEntityException> {
    const deletedEntityDocument = await this.entityModel.deleteOne(
      entityFilterQuery
    );

    console.log("Deleted Entity Document", deletedEntityDocument);

    if (!deletedEntityDocument.acknowledged) {
      throw new UnprocessableEntityException(
        "Unable to find the entity to delete"
      );
    }

    return deletedEntityDocument;
  }

  async bulkWrite(
    writes: Array<AnyBulkWriteOperation>,
    options?: BulkWriteOptions & MongooseBulkWriteOptions
  ): Promise<BulkWriteResult | any> {
    // @ts-ignore
    const updateManyEntityDocument = await this.entityModel.bulkWrite(writes,options);
    console.log("updateManyEntityDocument", updateManyEntityDocument);
    return updateManyEntityDocument;
  }

  async followandUnfollowUpdate(
    entityFilterQuery1: FilterQuery<TSchema>,
    updateFilterQuery1: UpdateQuery<TSchema>,
    entityFilterQuery2: FilterQuery<TSchema>,
    updateFilterQuery2: UpdateQuery<TSchema>
  ): Promise<HydratedDocument<TSchema, {}, {}>[] | NotFoundException> {
    const updatedEntityDocumentOne = await this.entityModel.findOneAndUpdate(
      entityFilterQuery1,
      updateFilterQuery1,
      {
        returnDocument: "after",
      }
    );

    const updatedEntityDocumentTwo = await this.entityModel.findOneAndUpdate(
      entityFilterQuery2,
      updateFilterQuery2,
      {
        returnDocument: "after",
      }
    );

    console.log(updatedEntityDocumentOne, updatedEntityDocumentTwo);
    if (!updatedEntityDocumentOne || !updatedEntityDocumentTwo) {
      throw new NotFoundException("Unable to find the entity to update.");
    }

    return [updatedEntityDocumentOne, updatedEntityDocumentTwo];
  }

  async searchFunc({ searchTerm }: { searchTerm: string }): Promise<TEntity[]> {
    return await this.entityModel.aggregate([
      {
        $search: {
          index: "username_index",
          autocomplete: {
            query: searchTerm,
            path: "username",
            fuzzy: {
              maxEdits: 1,
            },
            tokenOrder: "sequential",
          },
        },
      },

      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          pic: 1,
        },
      },

      {
        $limit: 10,
      },
    ]);
  }

  async getSpecificPostById(postId: string, userId: string): Promise<any> {
    try {
      let res = await this.entityModel
        .findOne(
          { _id: new ObjectId(postId) },
          { s3bucketObjectIds: 0, updatedAt: 0 }
        )
        .lean()
        .populate({
          path: "userId",
          select: {
            _id: 1,
            name: 1,
            username: 1,
            pic: 1,
          },
        })
        .populate({
          path: "commentIds",
          select: {
            postId: 0,
            updatedAt: 0,
            likes: 0,
            wasLikeByMe: 0,
          },
          populate: {
            path: "whoCommented",
            select: {
              _id: 1,
              name: 1,
              username: 1,
              pic: 1,
            },
          },
        })
        .exec();

      if (res) {
        res = {
          ...res,
          //@ts-ignore
          wasLikeByMe: res.likeIds.find((ele) => ele.toString() === userId)
            ? true
            : false,
        };
        return res;
      }

      return res;
    } catch (err) {
      console.log("getSpecificPost", err);
      return err;
    }
  }

  async getUserPostByUsername(
    userId: string,
    limit: number,
    skip: number
  ): Promise<any> {
    try {

      // TODO: Implement count function

      let res = await this.entityModel
        .find(
          { userId: new ObjectId(userId) },
          {
            userId: 0,
            caption: 0,
            likes: 0,
            likeIds: 0,
            postUrl: 0,
            comments: 0,
            commentIds: 0,
            s3bucketObjectIds: 0,
            wasLikeByMe: 0,
            createdAt: 0,
            updatedAt: 0,
          },
          { limit, skip }
        )
        .lean()
        .sort({ createdAt: -1 })
        .exec();

      if (res) {
        const updatedPosts = res.map((post) => {
          //@ts-ignore
          let url = post.imageUrl.split("/");
          url = url[url.length - 1];

          let updatedPost = {
            _id: post._id.toString(),
            imageUrl: "https://d7cbio25mx5nv.cloudfront.net/" + url,
          };

          return updatedPost
        });

        return updatedPosts
      }

      return [];
    } catch (err) {
      console.log("getUserPostByUsername", err);
      return err;
    }
  }

  // TODO: Find a better way to query it
  async getFeedPosts(
    userId: string,
    limit: number,
    skip: number
  ): Promise<any> {
    try {
      let findObj = {};

      if (userId) {
        findObj = { userId };
      }

      let res = await this.entityModel
        .find(
          {},
          {
            // likeIds: 0,
            commentIds: 0,
            updatedAt: 0,
            s3bucketObjectIds: 0,
          },
          { limit, skip }
        )
        .lean()
        .populate({
          path: "userId",
          select: {
            _id: 1,
            name: 1,
            username: 1,
            pic: 1,
          },
        })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      let count = await this.entityModel.count({});

      //@ts-ignore
      const posts = res.map((post) => {
        //@ts-ignore
        let url = post.imageUrl!.split("/");

        url = url[url.length - 1];
        let newPost = {
          id: post._id.toString(),
          user: {
            //@ts-ignore
            id: post.userId._id.toString(),
            //@ts-ignore
            name: post.userId.name,
            //@ts-ignore
            username: post.userId.username,
            //@ts-ignore
            pic: post.userId.pic,
          },
          //@ts-ignore
          caption: post.caption,
          //@ts-ignore
          likes: post.likes,
          //@ts-ignore
          likeIds: post.likeIds,
          //@ts-ignore
          comments: post.comments,
          //@ts-ignore
          postUrl: post.Url,
          //@ts-ignore
          createdAt: post.createdAt.toString(),
          //@ts-ignore
          imageUrl: "https://d7cbio25mx5nv.cloudfront.net/" + url,
          //@ts-ignore
          wasLikeByMe: post.wasLikeByMe,
        };

        // console.log("newPost.likeIds", newPost.likeIds)

        newPost = {
          ...newPost,
          wasLikeByMe: newPost.likeIds.find((id) => id.toString() === userId)
            ? true
            : false,
        };

        return newPost;
      });

      // console.log("getFeedPost Res", posts)
      return { posts, count };
    } catch (err) {
      // console.log("getFeedPost", err)
      return err;
    }
  }
}
