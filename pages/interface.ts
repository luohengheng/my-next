import { IUserInfo } from 'store/userSrtore';

export type IComment = {
  id: number,
  content: string,
  create_time: string,
  update_time: string,
};

export type IArticle = {
  id: number,
  title: string,
  content: string,
  views: number,
  tagIds: number[],
  create_time: string,
  update_time: string,
  user: IUserInfo,
  comments: IComment[],
};

export type IUserInfo = {
  userId?: number | null,
  nickname?: string,
  avatar?: string,
  id?: number,
  job?: string,
  introduce?: string
}

export interface IUserStore {
  userInfo: IUserInfo;
  setUserInfo: (value: IUserInfo) => void;
}
