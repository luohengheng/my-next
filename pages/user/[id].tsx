import React from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { Button, Avatar, Divider } from "antd";
import {
  CodeOutlined,
  FireOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import ListItem from "components/ListItem";
import { useStore } from "store";
import { useRouter } from "next/router";

// export async function getStaticPaths() {
// user/[id]
//   const db = await prepareConnection();
//   const users = await db.getRepository(User).find();
//   const userIds = users?.map((user) => ({ params: { id: String(user?.id) } }));

//   // [{params: 1}, {params: 2}, {params: 3}]
//   return {
//     paths: userIds,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps({ params }: { params: any }) {
//   const userId = params?.id;
//   const db = await prepareConnection();
//   const user = await db.getRepository(User).findOne({
//     where: {
//       id: Number(userId),
//     },
//   });
//   const articles = await db.getRepository(Article).find({
//     where: {
//       user: {
//         id: Number(userId),
//       },
//     },
//     relations: ['user', 'tags'],
//   });

//   return {
//     props: {
//       userInfo: JSON.parse(JSON.stringify(user)),
//       articles: JSON.parse(JSON.stringify(articles)),
//     },
//   };
// }

// export async function getServerSideProps({ params }: { params: any }) {
//   const userId = params?.id;
//   const db = await prepareConnection();
//   const user = await db.getRepository(User).findOne({
//     where: {
//       id: Number(userId),
//     },
//   });
//   const articles = await db.getRepository(Article).find({
//     where: {
//       user: {
//         id: Number(userId),
//       },
//     },
//     relations: ['user', 'tags'],
//   });

//   return {
//     props: {
//       userInfo: JSON.parse(JSON.stringify(user)),
//       articles: JSON.parse(JSON.stringify(articles)),
//     },
//   };
// }

const UserDetail = (props: any) => {
  const { id } = useRouter().query;
  const store = useStore();
  const { userInfo = {} } = store.user;
  const articles = store.article.articleInfoArr.filter(
    (i) => i.userId === Number(id)
  );
  const viewsCount = articles?.reduce(
    (prev: any, next: any) => prev + next?.views,
    0
  );

  return (
    <div className="w-[1080px] flex justify-between mx-auto my-0">
      <div className="w-[820px] bg-white p-5">
        <div className="flex justify-start items-center relative">
          <Avatar className="mr-[50px]" src={userInfo?.avatar} size={90} />
          <div>
            <div className="text-xl font-[bolder] mb-2">
              {userInfo?.nickname}
            </div>
            <div className="text-[#72777b] text-xs flex items-center mb-[5px]">
              <CodeOutlined /> {userInfo?.job}
            </div>
            <div className="text-[#72777b] text-xs flex items-center mb-[5px]">
              <FireOutlined /> {userInfo?.introduce}
            </div>
          </div>
          <Link href="/user/profile">
            <Button className="absolute right-0">编辑个人资料</Button>
          </Link>
        </div>
        <Divider />
        <div>
          {articles?.map((article: any, index: number) => (
            <div key={index}>
              <ListItem article={article} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <div className=" w-60 h-[180px] bg-white">
        <div className="h-[180px]">
          <div className="h-[50px] text-base font-[bold] flex items-center p-5 border-b-[#f3f3f3] border-b border-solid">
            个人成就
          </div>
          <div className="p-5">
            <div className="flex items-center mb-2.5">
              <FundViewOutlined />
              <span>共创作 {articles?.length} 篇文章</span>
            </div>
            <div className="flex items-center mb-2.5">
              <FundViewOutlined />
              <span>文章被阅读 {viewsCount} 次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UserDetail);
