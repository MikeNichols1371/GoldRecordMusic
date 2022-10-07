import  { Link }  from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ( { song, index, isPlaying, activeSong, data } ) =>{
  const dispatch = useDispatch(); // Allows us to make changes to the state

  const handlePauseClick = () => {
    dispatch( playPause( false ) ); // Dispatch changes the playPause state to false, pausing the song
  } 
  const handlePlayClick = () => {
    dispatch( setActiveSong( { song, index, data } ) ); // Dispatch changes the activeSong state to the song that was clicked
    dispatch( playPause( true ) ); // Dispatch changes the playPause state to true, playing the song
  }
 return (
  <div className = "flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className = "relative w-full h-56 group">
      <div className= { `absolute inset-0 justify-center items-center bg-black bg-opacity-40 group-hover:flex 
      ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70'  : 'hidden' }` } >
      <PlayPause song = { song } handlePause = { handlePauseClick } handlePlay = { handlePlayClick } isPlaying = { isPlaying } activeSong =  { activeSong } /> 
      </div>
      <img alt = "song_img" src = { song.images?.coverart } className = "w-full h-full object-cover rounded-lg" />
    </div>
    <div className = "flex flex-col mt-4">
      <p className = "text-white font-semibold text-lg truncate"> { /* Truncate gives the ... if song title is longer than space in box*/}
        <Link to = {`/songs/${song?.key}`}>
          {song.title}
        </Link>
      </p> 
      <p className = "text-white text-sm truncate mt-1">
        <Link to = { song.artists ? `/artists/${song?.artists[ 0 ]?.adamid}` : '/top-artists'  }>
          {song.subtitle}
        </Link>
      </p>
    </div>
  </div>
);
 };
export default SongCard;
