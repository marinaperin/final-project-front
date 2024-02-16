import { useLocation } from "react-router-dom";

export default function useQuery() {
  const search = useLocation().search;
  const param = search.substring(search.indexOf("=")+1);
  return param;
}
