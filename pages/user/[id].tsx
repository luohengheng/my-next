import React from 'react'
import { useRouter } from 'next/router'

interface IProps {

}

const User = (props: IProps) => {
    const router = useRouter()
    console.log('router')

    return (
        <div>User</div>
    )
}

export default User