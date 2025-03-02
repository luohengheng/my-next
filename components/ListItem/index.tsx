import Link from 'next/link';
import Image from 'next/image';
import { INewItem } from '@/pages/index';

interface IProps {
    item: INewItem;
}
const ListItem = ({ item }: IProps) => {

    return (
        <Link href={'/article/11'}>
            <div className='bg-white flex items-center justify-between cursor-pointer mx-[atuo] my-0 p-2.5'>
                <div className='w-[90%]'>
                    <div className='flex items-center mb-2.5'>
                        <span className='text-[#4e5969] hover:underline hover:text-[#1e80ff]'>{item?.title}</span>
                    </div>
                    <Image src={item?.imgUrl} alt='' width={200} height={100} unoptimized />
                </div>
            </div>
        </Link>
    );
};

export default ListItem;
