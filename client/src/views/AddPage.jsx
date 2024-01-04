import ProductForm from "../components/ProductForm";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function ProductsForm({ url }) {
    const navigate = useNavigate()
    async function handleSubmit(e, name, description, photo) {
        e.preventDefault()
        try {
            const dataAdded = { name, description, photo }

            const { data } = await axios.post(`${url}/add-forums`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(data);
            navigate('/')
        } catch (error) {
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }

    return (
        <>
            <ProductForm url={url} handleSubmit={handleSubmit} nameProp="Add Forum" />
        </>
    )
}