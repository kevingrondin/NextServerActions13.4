'use client'
import React from 'react'
import useCustomerRouter from '@/hooks/useCustomerRouter'

const Sort = () => {
    const { pushQuery, query } = useCustomerRouter()
    
    return(
        <div>
            Sort
            <select 
                value={query.sort || 'createdAt' }
                onChange={e => pushQuery({sort: e.target.value })}
            >
                <option value="createdAt">A - Z</option>
                <option value="-createdAt">Z - A</option>
            </select>
        </div>
    )
}

export default Sort