'use client'
import useCustomerRouter from '@/hooks/useCustomerRouter'
import react from 'react'

const Pagination = ({totalPage}) => {
    const newArray = [...Array(totalPage)].map((_, i) => i + 1)

    const { pushQuery, query } = useCustomerRouter()

    return (
        <div className='flex space-x-2'>
            {
                newArray.map(page => (
                    <button className={`${query.page || 1 === page ? 'red' : ''}`} key={page} onClick={() => pushQuery({page})}>
                        {page}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination