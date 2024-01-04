// import { useEffect, useState } from "react";
// import axios from 'axios';
// import Swal from "sweetalert2";

// export default function ProductsForm({ setPage }) {
//     const token = localStorage.access_token
//     const [name, setName] = useState("")
//     const [facility, setFacility] = useState("")
//     const [roomCapacity, setRoomCapacity] = useState(0)
//     const [imgUrl, setImgUrl] = useState("")
//     const [location, setLocation] = useState("")
//     const [typeId, setTypeId] = useState("")
//     const [types, setTypes] = useState([]);
//     const url = 'https://phase2-aio.vercel.app'

//     async function fetchTypes() {
//         try {
//             const { data } = await axios.get(`${url}/apis/rent-room/types`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setTypes(data.data);
//         } catch (error) {
//             Swal.fire({
//                 icon: "error",
//                 title: error.response.data.error
//             });
//         }
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const addedData = { name, facility, roomCapacity: +roomCapacity, imgUrl, location, typeId };
//         try {
//             const { data } = await axios.post(`${url}/apis/rent-room/lodgings`, addedData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log(data.data);
//             setPage('home')
//         } catch (error) {
//             console.log(error);
//             Swal.fire({
//                 icon: "error",
//                 title: error.response.data.error
//             });
//         }
//     }

//     useEffect(() => {
//         fetchTypes();
//     }, [])

//     return (<>
//         <form className=" grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Name</span>
//                 </label>
//                 <input
//                     onChange={(e) => setName(e.target.value)}
//                     type="text"
//                     placeholder="Name"
//                     className="w-full input input-bordered input-primary"
//                 />
//             </div>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Facility</span>
//                 </label>
//                 <input
//                     onChange={(e) => setFacility(e.target.value)}
//                     type="text"
//                     placeholder="Enter Description"
//                     className="w-full input input-bordered input-primary"
//                 />
//             </div>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Room Capacity</span>
//                 </label>
//                 <input
//                     onChange={(e) => setRoomCapacity(e.target.value)}
//                     type="number"
//                     placeholder="Enter Price"
//                     className="w-full input input-bordered input-primary"
//                 />
//             </div>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Location</span>
//                 </label>
//                 <input
//                     onChange={(e) => setLocation(e.target.value)}
//                     type="text"
//                     placeholder="Enter Stock"
//                     className="w-full input input-bordered input-primary"
//                 />
//             </div>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Image (URL)</span>
//                 </label>
//                 <input
//                     onChange={(e) => setImgUrl(e.target.value)}
//                     type="text"
//                     placeholder="Image URL"
//                     className="w-full input input-bordered input-primary"
//                 />
//                 {/* <a href="" class="text-xs ml-1 text-gray-600 hover:text-primary">Want to upload a file instead?</a> */}
//             </div>
//             <div>
//                 <label className="label">
//                     <span className="text-base label-text">Type</span>
//                 </label>
//                 <select
//                     className="w-full input input-bordered input-primary"
//                     onChange={(e) => setTypeId(e.target.value)}
//                     name="category"
//                     id=""
//                 >
//                     {types.map(c => {
//                         return <option key={c.id} value={c.id}>{c.name}</option>
//                     })}
//                 </select>
//             </div>
//             <div>
//                 <button className="btn btn-accent">Add New Product</button>
//             </div>
//         </form>
//     </>)
// }

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductsForm({ url, handleSubmit, forum, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (forum) {
      setName(forum.name);
      setDescription(forum.description);
      setPhoto(forum.photo);
    }
  }, [forum]);

  // async function fetchTypes() {
  //     try {
  //         const { data } = await axios.get(`${url}/forums`, {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.access_token}`
  //             }
  //         })
  //         setTypes(data.data)
  //     } catch (error) {
  //         Swal.fire({
  //             title: error.response.data.error,
  //             icon: "error"
  //         });
  //     }
  // }

  // useEffect(() => {
  //     fetchTypes()
  // }, [])

  return (
    <>
      <form
        className=" grid grid-cols-2 gap-4 mt-20"
        onSubmit={(e) => handleSubmit(e, name, description, photo)}
      >
        <div>
          <label className="label">
            <span className="text-base label-text">Name</span>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="w-full input input-bordered input-primary"
            value={name}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Description</span>
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter Description"
            className="w-full input input-bordered input-primary"
            value={description}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Photo</span>
          </label>
          <input
            onChange={(e) => setPhoto(e.target.value)}
            type="text"
            placeholder="Enter Photo"
            className="w-full input input-bordered input-primary"
            value={photo}
          />
        </div>
        <div>
          <button type="submit" className="w-full btn btn-accent">
            {nameProp}
          </button>
        </div>
      </form>
    </>
  );
}
