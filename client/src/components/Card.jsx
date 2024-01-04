import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Card({ league, url, fetchbookss }) {
  const navigate = useNavigate();

  // async function handleDelete(id) {
  //   try {
  //     await axios.delete(`${url}/apis/rent-room/lodgings/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.access_token}`,
  //       },
  //     });

  //     Swal.fire({
  //       title: "Delete success",
  //       icon: "success",
  //     });

  //     fetchbookss();
  //   } catch (error) {
  //     Swal.fire({
  //       title: error.response.data.error,
  //       icon: "error",
  //     });
  //   }
  // }

  function handleDetail(id) {
    navigate(`/${id}/standings`);
  }

  // function handleEdit(id) {
  //   navigate(`/edit/${id}`);
  // }

  // function handlePatch(id) {
  //   navigate(`/patch/${id}`)
  // }

  return (
    <>
      <div
        className="card bg-gray-300 shadow flex flex-col items-center p-4"
        style={{ borderColor: "#b6895b", borderWidth: "5px" }}
      >
        <div className="mb-2">
          <img
            src={league.logos.light}
            alt="books image"
            className="object-cover w-48 h-48 rounded-lg"
          />
        </div>
        <div className="flex flex-row items-center mb-1">
          <button
            onClick={() => handleDetail(league.id)}
            className="btn btn-accent btn-sm m-1"
          >
            Detail
          </button>
        </div>
        <div className="card-body flex-1 text-center">
          <b className="text-black font-bold">{league.name}</b>
          <p className="text-black">{league.abbr}</p>
        </div>
      </div>
    </>
  );
}
