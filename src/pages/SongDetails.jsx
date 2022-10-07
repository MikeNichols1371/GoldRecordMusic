import { useParams } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
    const { songid, id: artistId } = useParams(); // Gives us access to the song id and artist id in the url from route in App.jsx

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery( { songid } ); // Fetches the song details from the API
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery( { songid } ); // Fetches the related songs from the API

    const handlePauseClick = () => {
        dispatch( playPause( false ) ); // Dispatch changes the playPause state to false, pausing the song
      } 
      const handlePlayClick = ( song, index ) => {
        dispatch( setActiveSong( { song, index, data } ) ); // Dispatch changes the activeSong state to the song that was clicked
        dispatch( playPause( true ) ); // Dispatch changes the playPause state to true, playing the song
      }

    if( isFetchingSongDetails || isFetchingRelatedSongs ) return <Loader title = "Loading..." /> // If the data is still being fetched, show the loader
    if( error ) return <Error /> // If there is an error, show the error component
    return (
    <div className = "flex flex-col">
        <DetailsHeader artistId = { artistId } songData = { songData } />
        <div className = "mb-10">
            <h2 className = "text-2xl text-white font-bold pt-4">Lyrics: </h2>
            <div className = "mt-5 text-white">
                { /* Displays the lyrics of the song if they exist else display No lyrics available */ }
                { (songData?.sections[ 1 ].type === "LYRICS") ? 
                   ( songData?.sections[ 1 ].text.map( ( line, index )  => (
                    <p key={ `lyrics-${ line }-${ index }` } className = " text-white text-base my-1"> { line } </p>
                    ) ) )
                    : <p className = " text-white text-base my-1"> No lyrics available </p>
                }
            </div>
        </div>
        <RelatedSongs data = { data } artistId = { artistId } isPlaying = { isPlaying } activeSong = { activeSong } 
            handlePlayClick = { handlePlayClick } handlePauseClick = { handlePauseClick } />
    </div> 
    );
} 





export default SongDetails;
