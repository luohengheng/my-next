import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button, message, Select } from "antd";
import { useRouter } from "next/router";
import { useStore } from "store/index";
import request from "service/fetch";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const NewEditor = () => {
  const store = useStore();
  const { push } = useRouter();
  const { userId } = store.user.userInfo;
  const { setArticleInfoArr } = store.article;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagIds, setTagIds] = useState([]);
  const [allTags, setAllTags] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    setAllTags([{ id: 1, title: "标签1" }, { id: 2, title: "标签2" }]);
  }, []);

  const handlePublish = () => {
    if (!title) {
      message.warning("请输入文章标题");
      return;
    }

    console.log(title, content, tagIds);
    store.article.setArticleInfoArr({
      title,
      content,
      tagIds,
      userId: userId as number
    })
    userId ? push(`/user/${userId}`) : push('/')
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };

  const handleContentChange = (content: any) => {
    setContent(content);
  };

  const handleSelectTag = (value: []) => {
    setTagIds(value);
  };

  return (
    <div className="mx-auto my-0">
      <div className="flex">
        <Input
          className="w-4/5"
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        />
        <Select
          className="w-[15%]"
          mode="multiple"
          allowClear
          placeholder="请选择标签"
          onChange={handleSelectTag}
        >
          {allTags?.map((tag: any) => (
            <Select.Option key={tag?.id} value={tag?.id}>
              {tag?.title}
            </Select.Option>
          ))}
        </Select>
        <Button className="w-[5%]" type="primary" onClick={handlePublish}>
          发布
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </div>
  );
};

NewEditor.layout = null;

export default observer(NewEditor);
