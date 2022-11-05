import { CreateCommentHandler } from './createComments/createcomment.handler';
import { DeleteCommenttHandler } from './deleteComments/deletecomment.handler';

export const CommentCommandHandlers = [
    CreateCommentHandler,
    DeleteCommenttHandler
];
