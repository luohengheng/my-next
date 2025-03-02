import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navs } from './config'
import { Button } from 'antd'
import Login from '@/components/Login'

interface IProp {
}

const NavBar = (props: IProp) => {
  const { pathname, push } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false)

  const navClick = (item: string) => {
    push(item)
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
        <Button className='mr-5' type="primary" onClick={handleLogin}>
          登录
        </Button>
      </div>
      
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
}

export default NavBar