'use client'
import React from 'react'
import ButtonSubmit from './ButtonSubmit'
import useCustomerRouter from '@/hooks/useCustomerRouter'

const SearchForm = () => {
    const { pushQuery, query} = useCustomerRouter()

    async function handleSearch(formData){
        const search = formData.get('search')
        pushQuery({search, page: 1})
    }

    return (
        <form action={handleSearch} className='space-x-2'>
            <input
                type="search"
                name="search"
                placeholder='search'
                defaultValue={query.search || ''}
            />

            <ButtonSubmit value="search" /> 
        </form>
    )
}

export default SearchForm