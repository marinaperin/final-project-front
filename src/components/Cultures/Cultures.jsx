import { Link, Outlet, useNavigate } from "react-router-dom";
import "./cultures.scss";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useQuery from "../../hooks/useQuery";
import Loader from "../Error & Loader/Loader";
import ErrorMsg from "../Error & Loader/ErrorMsg";
import Pagination from "../PagesButtons/Pagination";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [cultures, setCultures] = useState();
  const [showedCultures, setShowedCultures] = useState();
  const [error, setError] = useState(false);
  const [selVal, setSelVal] = useState();
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/cultures?page=${query ? query : 1}`)
      .then((res) => {
        setCultures(res.data.results);
        setShowedCultures(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [query]);

console.log(query);

  return (
    <>
      <main className="main-page">
        {error && <ErrorMsg />}
        {!error && !cultures && <Loader />}
        {!error && cultures && (
          <>
            <header>
              <h1>Cultures</h1>
              <div className="cultures-info">
                {data && !filteredData && (
                  <p>
                    {data.total_results}{" "}
                    {data.total_results === 1 ? "result" : "results"} in{" "}
                    {data.total_pages}{" "}
                    {data.total_pages === 1 ? "page" : "pages"}
                  </p>
                )}
                {filteredData && (
                  <p>
                    {filteredData.total_results}{" "}
                    {filteredData.total_results === 1 ? "result" : "results"} in{" "}
                    {filteredData.total_pages}{" "}
                    {filteredData.total_pages === 1 ? "page" : "pages"}
                  </p>
                )}
               {(!query || query === '1') && <p className="select-p">
                  <span>
                    Filter by continent <IoIosArrowDown />
                  </span>
                  <select
                    name=""
                    id=""
                    onClick={() => {
                      setShowedCultures(cultures);
                      setFilteredData();
                      setSelVal('');
                    }}
                    value={selVal}
                    onChange={(e) => {
                      setSelVal(e.target.value);
                      if (e.target.value === "") {
                        setShowedCultures(cultures);
                      } else {
                        const filtered = cultures.filter(
                          (c) => c.continent === e.target.value
                        );
                        let total_results = 0;
                        filtered.forEach((c) => {
                          total_results++;
                        });
                        setFilteredData({
                          total_results: total_results,
                          total_pages: 1,
                        });
                        setShowedCultures(filtered);
                      }
                    }}
                  >
                    <option value="">Choose</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="South America">South America</option>
                  </select>
                </p>}
              </div>
              <Pagination
                resource="cultures"
                pages={
                  filteredData ? filteredData.total_pages : data.total_pages
                }
              />
            </header>
            <section className="resources-grid">
              {showedCultures.map((c, i) => {
                return (
                  <div key={`${c.name} + ${i}`} className="resource-card">
                    <Link to={`culture/${c._id}`}>
                      <div>
                        <h3>{c.name}</h3>
                        <div className="intro-card">
                          <p>{c.country}</p>
                          <p>Items: {c.total_creatures}</p>
                        </div>
                      </div>
                      <div className="lower-card">
                        <figure>
                          <img src={c.img} alt={c.name} />
                        </figure>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
}
