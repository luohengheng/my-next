import userStore, {IUserStore} from "./userSrtore";
import articleStore, {IArticleStore} from "./articleStore";

export interface IStore {
    user: IUserStore;
    article: IArticleStore;
}

export default function createStore(initalValue: Record<any, any>): () => IStore {
    return () => {
        return {
            user: {...userStore(), ...initalValue?.user},
            article: {...articleStore(), ...initalValue?.article}
        }
    }
}