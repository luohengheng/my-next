import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Input, Button, message, Divider } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "store/index";
import MarkDown from "markdown-to-jsx";
import styles from "./index.module.css";
import {IUserInfo, IArticle} from "pages/interface";


interface IProps {
  article: IArticle;
}

// export async function getServerSideProps({ params }: any) {}

const ArticleDetail = (props: IProps) => {
  const {query} = useRouter();
  const { id } = query;
  const [inputVal, setInputVal] = useState("");
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState<IArticle | null>(null);
  const {user} = useStore();
  const [loginUserInfo, setLoginUserInfo] = useState<IUserInfo | null>(user?.userInfo);

  useEffect(() => {
    const article = JSON.parse(window.sessionStorage.getItem("articleId") || "{}");
    setArticle(article)
    setComments(article?.comments || []);
  }, []);

  const handleComment = () => {
    
  };

  return (
    <div>
      <div className="content-layout">
        <h2 className={styles.title}>{article?.title}</h2>
        <div className={styles.user}>
          <Avatar src={loginUserInfo?.avatar} size={50} />
          <div className={styles.info}>
            <div className={styles.name}>{loginUserInfo?.nickname}</div>
            <div className={styles.date}>
              <div>
                {article?.update_time}
              </div>
              <div>阅读 {article?.views}</div>
              {Number(loginUserInfo?.userId) === Number(id) && (
                <Link href={`/editor/${article?.id}`}>编辑</Link>
              )}
            </div>
          </div>
        </div>
        <MarkDown className={styles.markdown}>{article?.content as string}</MarkDown>
      </div>
      <div className={styles.divider}></div>
      <div className="content-layout">
        <div className={styles.comment}>
          <h3>评论</h3>
          {loginUserInfo?.userId && (
            <div className={styles.enter}>
              <Avatar src={loginUserInfo?.avatar} size={40} />
              <div className={styles.content}>
                <Input.TextArea
                  placeholder="请输入评论"
                  rows={4}
                  value={inputVal}
                  onChange={(event) => setInputVal(event?.target?.value)}
                />
                <Button type="primary" onClick={handleComment}>
                  发表评论
                </Button>
              </div>
            </div>
          )}
          <Divider />
          <div className={styles.display}>
            {comments?.map((comment: any) => (
              <div className={styles.wrapper} key={comment?.id}>
                <Avatar src={comment?.user?.avatar} size={40} />
                <div className={styles.info}>
                  <div className={styles.name}>
                    <div>{comment?.user?.nickname}</div>
                    <div className={styles.date}>
                      {comment?.update_time}
                    </div>
                  </div>
                  <div className={styles.content}>{comment?.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ArticleDetail);
