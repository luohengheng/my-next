import { IUserStore } from "pages/interface";
const userStore = (): IUserStore => {
    return {
        userInfo: {
            id: 0,
            userId: 1,
            nickname: "测试数据",
            avatar: "https://www.imooc.com/static/img/index/logo2020.png",
        },
        setUserInfo: function (value) {
            this.userInfo = value
        }
    }
}

export default userStore;