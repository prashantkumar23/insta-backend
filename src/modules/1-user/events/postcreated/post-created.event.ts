export class PostCreatedEvent {
  constructor(
    public readonly username: string,
    public readonly postId: string) {}
}
