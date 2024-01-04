import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import pacmanLoad from "../components/assets/Pacman.svg";

export default function Details({ url }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  };

  async function fetchTeams() {
    try {
      const { data } = await axios.get(
        `${url}/leagues/${id}/standings`,
        config
      );
      console.log(data, "<<<<<<<<<<<<");
      setTeams(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <main className="px-30 my-15">
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={pacmanLoad} alt="Loading" />
          </div>
        ) : (
          <div className="flex flex-col mt-0 mb-0 items-center p-20 bg-gray-100 shadow">
            {teams && teams.length > 0 ? (
              <table className="table-fixed text-center border-collapse border border-black text-black">
                <thead>
                  <tr>
                    <th className="border border-black px-4 py-2">Rank</th>
                    <th className="border border-black px-4 py-2">Logo</th>

                    <th className="border border-black px-4 py-2">
                      Abbreviation
                    </th>
                    <th className="border border-black px-4 py-2">MP</th>
                    <th className="border border-black px-4 py-2">W</th>
                    <th className="border border-black px-4 py-2">D</th>
                    <th className="border border-black px-4 py-2">L</th>
                    <th className="border border-black px-4 py-2">GF</th>
                    <th className="border border-black px-4 py-2">GA</th>
                    <th className="border border-black px-4 py-2">GD</th>
                    <th className="border border-black px-4 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.team.id}>
                      <td className="border border-black px-4 py-2">
                        {team.stats[10].displayValue}
                      </td>
                      <td className="border border-black">
                        <span className="flex justify-start gap-2 m-2 items-center">
                          <img
                            src={team.team.logos[0].href}
                            className="h-10 w-10 mr-2"
                            alt={`${team.team.name} Logo`}
                          />
                          <h1>{team.team.name}</h1>
                        </span>
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.team.abbreviation}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[0].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[7].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[6].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[1].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[5].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[4].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.stats[2].displayValue}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {team.note?.description || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No teams found</p>
            )}
            <div className="buttons mt-4">
              <Link to="/">
                <button
                  className="btn btn-accent"
                  style={{ backgroundColor: "#b6895b", color: "#fff" }}
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
