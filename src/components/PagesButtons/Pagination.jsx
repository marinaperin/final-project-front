import { Link } from "react-router-dom";

export default function ({ pages, resource }) {
  const pagesArray = [];

  for (let i = 1; i < pages +1; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="pages-btn">
      {pagesArray.map((p) => {
        return (
          <button key={`page ${p}`}>
            <Link to={`/${resource}?page=${p}`}>{p}</Link>
          </button>
        );
      })}
    </div>
  );
}
