export interface IFeeds {
  character_id: number;
  characters: { name: string };
  contents: string;
  created_at: string;
  deleted_at?: null | string;
  feed_comments: [
    {
      users: { username: string };
      contents: string;
    },
  ];

  feed_images: { image_url: string };
  id: number;
  isLiked: number;
  likes: [{ id: number; user_id: number; feed_id: number }];
  title: string;
  updated_at?: string;
}

export interface IFeedState {
  feeds: IFeeds[];
  isLoading: boolean;
  error: Error | null;
}

export interface IQuery {
  limit: number;
  offset: number;
}
