import { ConfirmCodeHandler } from './confirmcode/confirmcode.handler';
import { FollowHandler } from './follow/follow.handler';
import { SendCodeHandler } from './sendCode/sendCode.handler';
import { LoginHandler } from './login/login.handler';
import { LogoutHandler } from './logout/logout.handler';
import { RemoveFromFollowingHandler } from './removeFromFollowing/removefromfollowing.handler';
import { ResetPasswordeHandler } from './resetPassword/resetPassword.handler';
import { SignUpHandler } from './signup/signup.handler';
import { UnfollowHandler } from './unfollow/unfollow.handler';

export const AuthCommandHandlers = [
    SignUpHandler,
    ConfirmCodeHandler,
    LoginHandler,
    LogoutHandler,
    SendCodeHandler,
    ResetPasswordeHandler,
];

export const UserCommandHandler = [
    FollowHandler,
    UnfollowHandler,
    RemoveFromFollowingHandler
]
