import {FaEdit, FaTrash} from 'react-icons/fa'
import { IoAddCircleOutline } from "react-icons/io5";

const Myblogs = () => {
  return (
    <div className="w-3/4 h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">my blogs.</h2>
      <hr />
      <div>

        <div className='w-full flex'>
          <div className="w-11/12 h-40 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-s-md">
            <h3>Title</h3>
            <h4>Author<span> - date posted</span></h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos tempore repellendus officia atque tenetur illum laborum iure sequi voluptate provident, distinctio consequuntur ut nemo. Ullam quisquam ut neque exercitationem maiores.
            Natus, voluptatum. Quas, modi fugiat consectetur earum impedit odio magnam suscipit at laudantium vel deserunt perspiciatis odit. Amet quo laudantium dicta mollitia consequatur. Facilis, provident! Vel quasi voluptatum nostrum voluptatibus.
            Provident hic sed aliquam eius eaque id architecto doloribus quo harum quam similique officiis voluptates quia, enim dolor, voluptatem corrupti magni eos officia magnam qui explicabo obcaecati. Dignissimos, asperiores excepturi.
            Cumque, sit. Eum expedita quisquam provident aliquam! Possimus veritatis nemo alias error enim saepe aut odit maiores. Sequi facere voluptates id totam ipsum impedit dolore, omnis ratione tempore aperiam maxime.
            Aperiam expedita ipsum omnis neque obcaecati ullam placeat perspiciatis, cumque autem corrupti non delectus unde voluptatum corporis animi accusantium magnam dicta aut recusandae consequuntur debitis illum officiis similique molestiae? Dolore.</p>
          </div>
          <div className='w-1/12 h-40 my-5 flex flex-col justify-evenly items-center bg-slate-200 rounded-e-md'>
            <FaEdit className='cursor-pointer' />
            <FaTrash className='text-red-600 cursor-pointer' />
          </div>
        </div>

        <div className='w-full flex'>
          <div className="w-11/12 h-40 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-s-md">
            <h3>Title</h3>
            <h4>Author<span> - date posted</span></h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos tempore repellendus officia atque tenetur illum laborum iure sequi voluptate provident, distinctio consequuntur ut nemo. Ullam quisquam ut neque exercitationem maiores.
            Natus, voluptatum. Quas, modi fugiat consectetur earum impedit odio magnam suscipit at laudantium vel deserunt perspiciatis odit. Amet quo laudantium dicta mollitia consequatur. Facilis, provident! Vel quasi voluptatum nostrum voluptatibus.
            Provident hic sed aliquam eius eaque id architecto doloribus quo harum quam similique officiis voluptates quia, enim dolor, voluptatem corrupti magni eos officia magnam qui explicabo obcaecati. Dignissimos, asperiores excepturi.
            Cumque, sit. Eum expedita quisquam provident aliquam! Possimus veritatis nemo alias error enim saepe aut odit maiores. Sequi facere voluptates id totam ipsum impedit dolore, omnis ratione tempore aperiam maxime.
            Aperiam expedita ipsum omnis neque obcaecati ullam placeat perspiciatis, cumque autem corrupti non delectus unde voluptatum corporis animi accusantium magnam dicta aut recusandae consequuntur debitis illum officiis similique molestiae? Dolore.</p>
          </div>
          <div className='w-1/12 h-40 my-5 flex flex-col justify-evenly items-center bg-slate-200 rounded-e-md'>
            <FaEdit className='cursor-pointer' />
            <FaTrash className='text-red-600 cursor-pointer' />
          </div>
        </div>

        <div className='w-full flex'>
          <div className="w-11/12 h-40 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-s-md">
            <h3>Title</h3>
            <h4>Author<span> - date posted</span></h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos tempore repellendus officia atque tenetur illum laborum iure sequi voluptate provident, distinctio consequuntur ut nemo. Ullam quisquam ut neque exercitationem maiores.
            Natus, voluptatum. Quas, modi fugiat consectetur earum impedit odio magnam suscipit at laudantium vel deserunt perspiciatis odit. Amet quo laudantium dicta mollitia consequatur. Facilis, provident! Vel quasi voluptatum nostrum voluptatibus.
            Provident hic sed aliquam eius eaque id architecto doloribus quo harum quam similique officiis voluptates quia, enim dolor, voluptatem corrupti magni eos officia magnam qui explicabo obcaecati. Dignissimos, asperiores excepturi.
            Cumque, sit. Eum expedita quisquam provident aliquam! Possimus veritatis nemo alias error enim saepe aut odit maiores. Sequi facere voluptates id totam ipsum impedit dolore, omnis ratione tempore aperiam maxime.
            Aperiam expedita ipsum omnis neque obcaecati ullam placeat perspiciatis, cumque autem corrupti non delectus unde voluptatum corporis animi accusantium magnam dicta aut recusandae consequuntur debitis illum officiis similique molestiae? Dolore.</p>
          </div>
          <div className='w-1/12 h-40 my-5 flex flex-col justify-evenly items-center bg-slate-200 rounded-e-md'>
            <FaEdit className='cursor-pointer' />
            <FaTrash className='text-red-600 cursor-pointer' />
          </div>
        </div>

      </div>



      <button className='p-3 w-32 flex self-end items-center justify-evenly text-white bg-emerald-500 fixed rounded-full bottom-10 right-10 z-10'>
        <IoAddCircleOutline className='text-2xl font-bold text-white' /> create.
      </button>
    </div>
  )
}

export default Myblogs