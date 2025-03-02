import React from 'react'
import {Divider} from 'antd'
import dynamic from 'next/dynamic';
import requestInstance from 'service/fetch';

export interface INewItem {
  url: string;
  title: string;
  time: string;
  imgUrl: string
}

interface IProps { 
  list: INewItem[]
}

const DynamicComponent = dynamic(() => import('@/components/ListItem'));

export const getServerSideProps = async () => {
  const url = 'https://news.baidu.com/widget?id=LocalNews&ajax=json&t=1740888309889';

  const response = await requestInstance(url);
  console.log('list', response?.data?.LocalNews?.data?.rows?.first)

  return {
    props: {
      list: response?.data?.LocalNews?.data?.rows?.first || []
    }
  }
}

const Home = ({list}: IProps) => {
  return (
    <div>
      {/* <div className="h-10 text-center flex items-center justify-center" onClick={handleSelectTag}>
        {tags?.map((tag) => (
          <div
            key={tag?.id}
            data-tagid={tag?.id}
            className={
              `h-[30px] bg-white flex items-center text-xs cursor-pointer mr-2.5 p-2.5 rounded-[5px]
              ${selectTag === tag?.id ? 'bg-[#007fff] text-white' : ''}`}
          >
            {tag?.title}
          </div>
        ))}
      </div> */}
      <div className="content-layout">
        {list?.map((item, index) => (
          <div key={index}>
            {/* <ListItem article={article} /> */}
            <DynamicComponent item={item} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home