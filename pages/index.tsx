import React, {useState, useEffect} from 'react'
import {Divider} from 'antd'
import dynamic from 'next/dynamic';
import requestInstance from 'service/fetch';
import styles from './index.module.css';
import { IArticle } from './interface';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

interface IProps { 
  articles: IArticle[];
  tags: { id: number; title: string }[];
}

const DynamicComponent = dynamic(() => import('components/ListItem'));

export const getServerSideProps = async () => {
  return {
    props: {
      name: 'lwh'
    }
  }
}

const Home = (props: IProps) => {
  console.log(props);
  const tags = [{id: 1, title: '标签1'}, {id: 2, title: '标签2'}];
  const { article } = useStore();
  const [selectTag, setSelectTag] = useState(1);
  const [allArticles] = useState([...article.articleInfoArr]);
  const [showAricles, setShowAricles] = useState([...article.articleInfoArr]);

  const handleSelectTag = (event: any) => {
    const { tagid } = event?.target?.dataset || {};
    setSelectTag(Number(tagid));
  };

  // 过滤出对应标签的文章
  useEffect(() => {
    const newArticles = allArticles.filter((item) => item.tagIds.includes(selectTag));
    setShowAricles(newArticles);
  }, [selectTag, allArticles]);

  return (
    <div>
    <div className={styles.tags} onClick={handleSelectTag}>
      {tags?.map((tag) => (
        <div
          key={tag?.id}
          data-tagid={tag?.id}
          className={`${styles.tag} ${selectTag === tag?.id ? styles.active : ''}`}
        >
          {tag?.title}
        </div>
      ))}
    </div>
    <div className="content-layout">
      {showAricles?.map((article) => (
        <div key={article?.id}>
          <DynamicComponent article={article} />
          <Divider />
        </div>
      ))}
    </div>
  </div>
  )
}

export default observer(Home)