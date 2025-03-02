import userStore, {IUserStore} from "./userSrtore";

export interface IStore {
    user: IUserStore;
}

export default function createStore(initalValue: Record<any, any>): () => IStore {
    return () => {
        return {
            user: {...userStore(), ...initalValue?.user}
        }
    }
}