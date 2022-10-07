import { Link } from 'react-router-dom';


const DetailsHeader = ( { artistId, artistData, songData } ) => {
  const artistInfo = artistData?.artists[ artistId ]?.attributes; 

  return (
  <div className ="relative w-full flex flex-col">
    <div className = "w-full sm:h-48 h-28"/>
    <div className = "absolute inset-0 flex items-center justify-center">
      <img alt="art"
      // Check if were on the artist details page or the song details page and return the appropriate image
      src = { artistId ? artistInfo?.artwork?.url.replace( '{ w }', '500').replace( '{ h }', '500') : ( songData?.images?.coverart ) } 
      className = "sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-2xl shadow-black" />
      <div className = "ml-5">
        { /* Check if were on the artist details page or the song details page and return the appropriate title */ }
        <p className = "text-white font-bold sm:text-3xl text-2xl"> { artistId ? artistInfo?.name : songData?.title } </p>
        { /* Make sure were on the song details page and return the appropriate subtitle */ }
         { !artistId && 
         ( <Link to = { `/artists/${ songData?.artists[ 0 ].adamid }` }>
          <p  className = "text-white text-base mt-2"> { songData?.subtitle } </p>
          </Link> ) } 
          { /* Check if were on the artist details page or the song details page and return the appropriate genre */ }
          <p className = "text-white text-base mt-2">
            { artistId ? artistInfo?.genreNames[ 0 ] : songData?.genres?.primary }
          </p>
      </div>
    </div>
    <div className = "w-full sm:h-44 h-24" />
  </div>
);
}

export default DetailsHeader;
