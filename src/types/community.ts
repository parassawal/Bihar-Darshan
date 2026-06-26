export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  iconImage: string;
  createdBy: string;
  creatorName: string;
  status: string;
  memberCount: number;
  members?: string[];
  createdAt: unknown;
}

export interface PostData {
  id: string;
  communityId: string;
  communityName: string;
  title: string;
  body: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  likes: number;
  dislikes: number;
  shares: number;
  likedBy: string[];
  dislikedBy: string[];
  createdAt: { seconds: number } | null;
}
