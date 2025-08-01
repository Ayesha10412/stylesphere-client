import axios from "axios";
const axiosPublic = axios.create({
  baseURL: import.meta.env.url,
});
export default function useAxiosPublic() {
  return axiosPublic;
}
