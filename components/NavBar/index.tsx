import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'store/index'
import { navs } from './config'
import { Button, Dropdown, Avatar, message } from 'antd'
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import Login from 'components/Login'
import { observer } from 'mobx-react-lite'

interface IProp {
}

const NavBar = (props: IProp) => {
  const { pathname, push } = useRouter();
  const store = useStore() 
  const { userId, avatar } = store.user.userInfo;
  const [isShowLogin, setIsShowLogin] = useState(false)

  const navClick = (item: string) => {
    if (userId) {
      push(item);
    } else {
      message.warning('请先登录');
    }
  }

  const handleGotoEditorPage = () => {
    push('/editor/new')
  }

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  const handleLogout = () => {
    store.user.setUserInfo({});
  };

  const handleGotoPersonalPage = () => {
    push(`/user/${userId}`);
  };

  const renderDropDownMenu = () => {
    return {
      items: [
        {
          key: '1',
          label: (
            <div onClick={handleGotoPersonalPage}>
              <HomeOutlined />
              个人主页
            </div>
          ),
        },{
          key: '2',
          label: (
            <div onClick={handleLogout}>
              <LoginOutlined />
              退出系统
            </div>
          ),
        },
      ]
    }
  }

  return (
    <div className='navBarWrap h-[60px] bg-white flex items-center justify-center border-b-[#f1f1f1] border-b border-solid'>
      <section className="text-3xl font-[bolder] mr-[60px]">BLOG-C</section>
      {navs?.map((i, index) => (
        <div
          onClick={() => navClick(i.value)}
          key={index}
          className={`cursor-pointer text-lg  px-5 py-0 ${pathname === i?.value ? 'text-[#1e80ff]' : 'text-[#515767]'}`}>
          {i?.label}
        </div>
      ))}

      <div className='ml-[150px]'>
        <Button className='mr-5' onClick={handleGotoEditorPage}>写文章</Button>

        {userId ? (
          <>
            <Dropdown menu={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button  className='mr-5' type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </div>
      
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
}

export default observer(NavBar)