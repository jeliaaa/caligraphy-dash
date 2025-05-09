import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchRenovationsThunk } from "../redux/thunks/renovationThunks";
// import karkasi from "../assets/karkasi.jpeg"
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const { user, isAuthenticated } = useAuth();
  const [time, setTime] = useState(getCurrentTime());
  const dispatch = useDispatch<AppDispatch>()
  const { data, status } = useSelector((state: RootState) => state.renovation);
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchRenovationsThunk());
  }, [dispatch])

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      nav('/login')
    }
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, nav]);
  if (status === 'loading') {
    return <p>პროექტების ჩატვირთვა...</p>;
  }

  if (status === 'failed') {
    return <p>პროექტები არ მოიძებნა.</p>;
  }


  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between gap-8 items-center px-10 bg-gray-300 h-[10dvh]">
        <span className="text-2xl">{user?.email}</span>
        <div className="gap-5 flex ">
          <span className="text-black text-2xl">{user?.firstname} {user?.lastname}</span>
          <span className="w-fit text-black text-2xl">{time}</span>
        </div>
      </div>
      <div className="w-full p-7">
        <div className="flex flex-wrap gap-x-5">
          {data.map((renovation) => (
            <Link to={`/renovation/${renovation.track}`} key={renovation.id} className="w-[400px] rounded-md h-fit flex flex-col">
              {/* <img src={karkasi} alt="..." className="w-full rounded-t-md" /> */}
              <div className="w-full flex flex-col rounded-b-md gap-y-3 p-5 text-2xl items-center shadow-2xl">
                <span className="font-bold">პროექტის კოდი: {renovation.track}</span>
                <span>მისამართი: {renovation.address}</span>
                <span>მომხმარებელი: {renovation.customer.firstname} {renovation.customer.lastname}</span>
                <span className="text-red-400">დაწყების თარიღი: {renovation.start_date}</span>
                <span className="text-green-400">ბოლო ვადა: {renovation.end_date}</span>
                <span>პროგრესი: {renovation.progress} %</span>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${renovation.progress}%` }}
                  /> 

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main