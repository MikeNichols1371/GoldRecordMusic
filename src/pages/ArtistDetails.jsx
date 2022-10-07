import { useParams } from "react-router-dom"; 
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
    const { id: artistId } = useParams(); // Gives us access to the artist id in the url from route in App.jsx

  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery( artistId ); // Fetches the artist details from the API

    if( isFetchingArtistDetails ) return <Loader title = "Loading..." /> // If the data is still being fetched, show the loader
    if( error ) return <Error /> // If there is an error, show the error component
    return (
    <div className = "flex flex-col">
        <DetailsHeader artistId = { artistId } artistData = { artistData } />
      
        <RelatedSongs data = { Object.values( artistData?.songs ) } artistId = { artistId } 
            isPlaying = { isPlaying } activeSong = { activeSong } />
    </div> 
    );
} 


export default ArtistDetails;

