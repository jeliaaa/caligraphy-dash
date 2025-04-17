import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { fetchRenovationSingleThunk } from '../redux/thunks/renovationThunks';
import { fetchStagesThunk } from '../redux/thunks/stagesThunks';
import Progress from '../ReusableComponents/Progress';
import karkasi from "../assets/karkasi.jpeg"


const RenovationSingle = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { singleData, status } = useSelector((state: RootState) => state.renovation);
    // const { data, stagesStatus } = useSelector((state: RootState) => state.stage);
    const { track } = useParams();
    useEffect(() => {
        if (track) {
            dispatch(fetchRenovationSingleThunk(track));
        }
    }, [dispatch, track]);

    useEffect(() => {
        if (singleData) {
            dispatch(fetchStagesThunk(singleData?.service.id))
        }
    }, [dispatch, singleData])


    if (status === 'loading') {
        return <p>Loading renovation...</p>;
    }

    if (status === 'failed') {
        return <p>Failed to load renovation.</p>;
    }

    return (
        <div
            style={{ backgroundImage: `url(${karkasi})` }}
            className="w-full relative p-5 h-screen flex flex-col items-center gap-y-4 bg-cover bg-center"
        >
            <div className="flex w-full flex-col md:flex-row items-center md:justify-between">
                <Link to="/app" className="bg-main-color text-white flex gap-x-3 p-5 items-center rounded-md">
                    <svg className="w-[30px] h-[30px] rotate-180 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                    <span className="text-lg m-0">back</span>
                </Link>
                <h1 className="text-center font-bold mt-2 bg-white px-10 text-3xl py-5 rounded-md shadow-md">
                    myProject {singleData?.id !== 0 && `: ${singleData?.id}`}
                </h1>
            </div>

            <div className="mt-10 p-5 bg-white rounded-2xl shadow-lg w-full">
                <h2 className="text-2xl font-bold mb-4">{singleData?.track}</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex flex-col">
                            <p>address : {singleData?.address}</p>
                            <p>supervisor : {singleData?.supervisor?.firstname} {singleData?.supervisor?.lastname}</p>
                            <p>services : {singleData?.service?.name}</p>
                        </div>
                        <span className="font-bold">progress:</span>
                        <div className="w-full flex flex-col gap-2 justify-start items-start">
                            <div className="flex justify-between w-full">
                                <p className="font-bold text-main-color">{singleData?.progress}%</p>
                                <p className="font-bold text-main-color">100%</p>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-4">
                                <div className="bg-main-color h-full rounded-full" style={{ width: `${singleData?.progress}%` }} />
                            </div>

                            <Progress serviceId={singleData?.service?.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenovationSingle