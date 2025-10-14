import {React , useState} from 'react'
import FormModals from '../../component/FormModals/FormModals'
import Navbar from '../../component/Navbar/Navbar'

const AddNewMovie = () => {
  const [page,setPage] = useState('Movie');
  return (
    <div>
      <Navbar/>
      <FormModals/>
    </div>
  )
}

export default AddNewMovie
