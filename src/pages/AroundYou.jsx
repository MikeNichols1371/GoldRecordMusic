import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

import { SongCard, Loader, Error } from "../components";

const AroundYou = () => {
const [ country, setCountry ] = useState( "" );
const [ loading, setLoading ] = useState( true );
const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
const { data, isFetching, error } = useGetSongsByCountryQuery( country );


// Get user country from geo.ipify.org and recall it everytime country changes
useEffect( () => {
    axios.get( `https://geo.ipify.org/api/v2/country?apiKey=at_xXcCJQxhOaQfRT6swr0kJHvgjvOp1` )
    .then( ( response ) =>  setCountry( response?.data?.location?.country ) )
    .catch( ( err ) => console.log( err ) )
    .finally( () => setLoading( false ) );
 }, [ country ] );

 if( isFetching && loading ) return <Loader title = " Loading..." />
 if( error && country != "" ) return <Error />

return (
    <div className = "flex flex-col">
        <h2 className = "text-white text-5xl font-bold text-left mt-4 mb-10">Top Songs In The <span> { country } </span></h2>

        <div className = "flex flex-wrap sm:justify-start justify-center gap-8">
            { data?.map( ( song, index ) => (
                <SongCard key = { song.key } song = { song } index = { index } 
                activeSong = { activeSong } isPlaying = { isPlaying } data = { data } />
            ) ) };
        </div>
    </div>
    )
}

export default AroundYou;
