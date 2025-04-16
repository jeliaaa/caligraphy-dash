import { useParams } from 'react-router-dom'


const RenovationSingle = () => {
    const { track } = useParams();
    return (
        <div>
            {track}
        </div>
    )
}

export default RenovationSingle