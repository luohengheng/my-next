import { IArticle } from "pages/interface";

export interface IArticleStore {
    articleInfoArr: IArticle[];
    setArticleInfoArr: (value: IArticle, index?: number) => void;
}

const articleStore = (): IArticleStore => {
    return {
        articleInfoArr: [
            {
                id: 1,
                title: '标题1',
                content: "标题1正文",
                views: 100, 
                tagIds: [1],
                create_time: '2025-01-01',
                update_time: '2025-01-01',
                user: {
                    id: 1,
                    nickname: '用户1',
                    avatar: 'https://picsum.photos/200/300'
                },              
                comments: []
            },
            {
                id: 2,
                title: '标题2',
                content: "标题2正文",
                views: 100, 
                tagIds: [1],
                create_time: '2025-01-01',
                update_time: '2025-01-01',
                user: {
                    id: 2,
                    nickname: '用户2',
                    avatar: 'https://picsum.photos/200/300'
                },              
                comments: []
            }
        ],
        setArticleInfoArr: function (value, index) {
            if (index && index < this.articleInfoArr.length) {
                this.articleInfoArr[index] = { ...this.articleInfoArr[index], ...value }
            } else {
                this.articleInfoArr.push(value)
            }
        }
    }
}
export default articleStore