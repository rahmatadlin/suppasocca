import Card from "../components/Card";
import ForumCard from "../components/ForumCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import pacmanLoad from "../components/assets/Pacman.svg";


export default function HomePage({ url }) {
  const [names, setNames] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [news, setNews] = useState([]);
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPages] = useState(1);
  const [query, setQuery] = useState({
    search: "",
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  };

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${url}/read-user`, config);
      // console.log(data);
      setNames(data);
      // setTotalPages(data.data.pagination.totalPage); // Set total pages
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  async function fetchLeagues() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/leagues`, config);
      // console.log(data);
      setLeagues(data);
      // setTotalPages(data.data.pagination.totalPage); // Set total pages
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchForums() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/forums`, config);
      console.log(data, "00000000");
      // console.log(data);
      setForums(data);
      // setTotalPages(data.data.pagination.totalPage); // Set total pages
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchNews() {
    try {
      const { data } = await axios.get(`${url}/news`, config);
      // console.log(data, "<<<<<<<<<<");
      setNews(data);
      // setTotalPages(data.data.pagination.totalPage); // Set total pages
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchNews();
    fetchLeagues();
    fetchForums();
    fetchUsers();
  }, []); // Fetch products when the page changes

  // useEffect(() => {
  //   console.log(
  //     "ini proses re-render, akan dijalakan setiap ada sesuatu yang berubah dalam komponen ini"
  //   );
  // }, [loading, leagues]);

  // functions to handle query params
  async function updateQuery(newQuery) {
    const { search } = newQuery;
    let newURL = `${url}/leagues?`;
    if (search) newURL += `q=${search}`;

    try {
      const { data } = await axios.get(newURL, config);
      setLeagues(data);
      setQuery(newQuery);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }
  // // Handle page change
  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  // search
  function searchOnChange(event) {
    let newSearch = event.target.value;
    setSearch(newSearch);
  }

  function applySearch(event) {
    event.preventDefault();
    let newQuery = { ...query, search };
    updateQuery(newQuery);
  }

  // useEffect(() => {
  //   return () => {
  //     console.log(
  //       "ini adalah proses unmounted,akan dijalankan ketika penggantian komponen"
  //     );
  //     setCurrentPage(1); // Reset ke halaman utama
  //   };
  // }, []);

  return (
    <>
      <div id="PAGE-HOME" className="p-10">
        {/* Display welcome message */}
        {/* search */}
        {/* <form className="flex justify-center items-center mt-20">
          <input
            type="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
            className="input input-bordered input-accent w-24 md:w-auto mx-1 input-sm"
            onChange={searchOnChange}
          />
          <button
            onClick={applySearch}
            type="submit"
            className="btn btn-ghost btn-circle"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form> */}

        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={pacmanLoad} alt="Loading" />
          </div>
        ) : (
          <section className="my-8">
            <h2 className="text-3xl font-bold pl-12 mt-12 mb-4">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-8 bg-b6895b">
              {news.map((newsItem, index) => (
                <div key={newsItem.id} className="news-card">
                  {/* Render individual news item content here */}
                  <Link
                    to={newsItem.url}
                    className="headline-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className=" p-4 rounded-md shadow-md ">
                      <h3 className="cursor-pointer text-lg font-semibold mb-2">
                        {newsItem.headLine}
                      </h3>
                      <p className="text-gray-500">{newsItem.source}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Display league cards */}
        <h2 className="text-3xl font-bold pl-12 mt-12 mb-4">Leagues</h2>
        <main className="grid grid-cols-5 gap-4 px-8 my-8 bg-transparent">
          {leagues.map((league) => (
            <Card
              key={league.id}
              league={league}
              url={url}
              fetchLeagues={fetchLeagues}
            />
          ))}
        </main>

        {/* Display forum cards */}
        <h2 className="text-3xl font-bold pl-12 mt-12 mb-4">Forums</h2>
        <main className="grid grid-cols-2 gap-4 px-8 my-8 bg-transparent">
          {forums.map((forum) => (
            <ForumCard
              key={forum.id}
              forum={forum}
              url={url}
              fetchForums={fetchForums}
            />
          ))}
        </main>

        {/* Pagination */}
        {/* <div className="flex justify-center items-center my-4">
          <button
            className="btn btn-outline mx-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ borderColor: "#b6895b" }}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPage}
          </span>
          <button
            className="btn btn-outline mx-1"
            disabled={currentPage === totalPage} // Disable if already on the last page
            onClick={() => handlePageChange(currentPage + 1)}
            style={{ borderColor: "#b6895b" }}
          >
            Next
          </button>
        </div> */}
      </div>
    </>
  );
}
