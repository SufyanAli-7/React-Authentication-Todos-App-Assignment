import Page404 from '@/components/Misc/Page404'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'

const Index = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos/*' element={<Todos />} />
        <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default Index