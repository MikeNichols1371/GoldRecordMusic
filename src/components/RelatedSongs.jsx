import SongBar from './SongBar';

const RelatedSongs = ( {  data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick } ) => (
  <div className = "flex flex-col">
    <h1 className = "text-white text-2xl font-bold">Related Songs: </h1>
    <div className = "w-full flex flex-col mt-6">
      { data?.map( ( song, index ) => (
        <SongBar key = { `${ song.key }-${ artistId }-${ index }` } song = { song } index = { index } 
          artistId = { artistId } isPlaying = { isPlaying } activeSong = { activeSong }
           handlePauseClick = { handlePauseClick } handlePlayClick = { handlePlayClick } />
      ) ) }
    </div>
  </div>
);

export default RelatedSongs;
