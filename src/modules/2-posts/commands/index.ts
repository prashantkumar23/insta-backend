import { CreatePostHandler } from './createpost/createpost.handler';
import { DeletePostHandler } from './deletepost/deletepost.handler';
import { LikePostHandler } from './likepost/likepost.handler';
import { UnlikePostHandler } from './unlikepost/unlikepost.handler';

export const PostCommandHandlers = [
    CreatePostHandler,
    LikePostHandler,
    UnlikePostHandler,
    DeletePostHandler
];
