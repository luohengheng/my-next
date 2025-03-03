import Link from "next/link";
import Image from "next/image";
import { IArticle } from "pages/interface";
import { Avatar } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { markdownToTxt } from "markdown-to-txt";
import styles from "./index.module.css";
import { useRouter } from "next/router";

interface IProps {
  article: IArticle;
}
const ListItem = (props: IProps) => {
  const { push } = useRouter();
  const { article } = props;
  const { user } = article;

  return (
    <div
      className={styles.container}
      onClick={() => {
        window.sessionStorage.setItem("articleId", JSON.stringify(article));
        push(`/article/${article.id}`);
      }}
    >
      <div className={styles.article}>
        <div className={styles.userInfo}>
          <span className={styles.name}>{user?.nickname}</span>
          <span className={styles.date}>1990-01-01</span>
        </div>
        <h4 className={styles.title}>{article?.title}</h4>
        <p className={styles.content}>{markdownToTxt(article?.content)}</p>
        <div className={styles.statistics}>
          <EyeOutlined />
          <span className={styles.item}>{article?.views}</span>
        </div>
      </div>
      <Avatar src={user?.avatar} size={48} />
    </div>
  );
};

export default ListItem;
