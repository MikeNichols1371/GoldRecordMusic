import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import { SongCard, Loader, Error } from "../components";

const TopCharts = () => {
const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
const { data, isFetching, error } = useGetTopChartsQuery();

 if( isFetching ) return <Loader title = " Loading..." />
 if( error ) return <Error />

return (
    <div className = "flex flex-col">
        <h2 className = "text-white text-5xl font-bold text-left mt-4 mb-10">Top Charts</h2>

        <div className = "flex flex-wrap sm:justify-start justify-center gap-8">
            { data?.map( ( song, index ) => (
                <SongCard key = { song.key } song = { song } index = { index } 
                activeSong = { activeSong } isPlaying = { isPlaying } data = { data } />
            ) ) };
        </div>
    </div>
    )
}

export default TopCharts;
