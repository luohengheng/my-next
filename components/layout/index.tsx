import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { Button } from 'antd'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='layoutWrap w-full h-screen'>
        <NavBar />
        <main>{children}</main>
        <Button>2222</Button>
        <Footer />
    </div>
  )
}

export default Layout