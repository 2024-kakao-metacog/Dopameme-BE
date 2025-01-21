export class Video {
  userId: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  isCrawl: boolean;
  publishedAt: Date;
}

export class VideoMock {
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  publishedAt: Date;
  userId: string;
  userNickname: string;
  isOwner: boolean;
  isSubscribed: boolean;
  canSubscribe: boolean;
}
