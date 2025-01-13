import { Injectable } from '@nestjs/common';

export interface VideoMetadata {
  snippet: {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    userId: string;
    userNickname: string;
    isOwner: boolean;
    isSubscribed: boolean;
    canSubscribe: boolean;
  };
}

@Injectable()
export class VideoService {
  constructor() {}

  getVideoMetadatasDummy(maxResults: number = 5): VideoMetadata[] {
    const sampleData: VideoMetadata[] = [
      {
        snippet: {
          videoId: 'sundaymorning',
          title: 'there is only one sun',
          thumbnailUrl:
            'https://i.ytimg.com/vi/hObAvaxlQ7o/hq720_2.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGADYAQHiAQoIGBACGAY4AUAB8AEB-AHeBIACuAiKAgwIABABGGUgWyhIMA8=&rs=AOn4CLDJNWWB1GEO3pC6oXAhcW9acVIxYA',
          publishedAt: '2024-01-06',
          userId: '@sunrise',
          userNickname: '선쩔tv',
          isOwner: true,
          isSubscribed: true,
          canSubscribe: true,
        },
      },
    ];
    const results = maxResults ? sampleData.slice(0, maxResults) : sampleData;

    return results;
  }
}
