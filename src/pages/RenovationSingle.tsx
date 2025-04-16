import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { fetchRenovationSingleThunk } from '../redux/thunks/renovationThunks';
import { fetchStagesThunk } from '../redux/thunks/stagesThunks';


const RenovationSingle = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { singleData, status } = useSelector((state: RootState) => state.renovation);
    const { data, stagesStatus } = useSelector((state: RootState) => state.stage);
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

    if (stagesStatus === 'loading') {
        return <p>Loading Stages...</p>;
    }

    if (stagesStatus === 'failed') {
        return <p>Failed to load Stages.</p>;
    }



    return (
        <div>
            {singleData?.service?.name}
            {data.map(() => (<a>a</a>))}
        </div>
    )
}

export default RenovationSingle