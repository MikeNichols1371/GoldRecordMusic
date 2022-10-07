import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import  'swiper/css';
import  'swiper/css/free-mode';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

// Create card to display top charts
const TopChartCard = ( { song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick } ) => (
  <div className = "w-full flex flex-row items-center py-2 p-4 rounder-lg cursor-pointer mb-2">
    <h3 className = "text-white font-bold text-base mr-2"> { index + 1 } </h3> { /* Display song numbers add one to index so we dont start at 0 */ }
    <div className = "flex-1 flex flex-row justify-between items-center">
      <img alt = { song?.title } src = { song?.images?.coverart } className = "w-20 h-20 object-cover rounded-lg" />
      <div className = "flex flex-1 flex-col justify-center mx-3">
        <Link to = {`/songs/${song?.key}`}>
          <p className = "text-lg font-bold text-white"> { song?.title } </p>
        </Link>
        <Link to = { `/artists/${ song?.artists[ 0 ]?.adamid }` }>
        <p className = "text-sm font-normal text-white mt-1"> { song?.subtitle } </p>
        </Link>
      </div>
    </div>
    <PlayPause song = { song } index = { index } 
        isPlaying = { isPlaying } activeSong = { activeSong } 
        handlePause = { handlePauseClick  } handlePlay = { handlePlayClick } />
  </div>
)
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
  const { data } = useGetTopChartsQuery(); // List of top 50 songs on world charts
  const divRef = useRef( null );
  const topPlays = data?.slice( 0, 5); // Top 5 songs
  
// Scrolls to the top of the page when the page loads 
  useEffect( () => {
    divRef.current.scrollIntoView( { behavior: 'smooth', block: 'center' } );
  } ); 
  const handlePauseClick = () => {
    dispatch( playPause( false ) ); // Dispatch changes the playPause state to false, pausing the song
  } 
  const handlePlayClick = ( song, index ) => {
    dispatch( setActiveSong( { song, index, data } ) ); // Dispatch changes the activeSong state to the song that was clicked
    dispatch( playPause( true ) ); // Dispatch changes the playPause state to true, playing the song
  }

  return ( 
    <div ref = { divRef } className = "xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      { /* Top charts section */ }
      <div className = "w-full flex flex-col"> 
        <div className = "flex flex-row justify-between items-center">
          <h2 className = "text-white font-bold text-2xl">Top Charts</h2>
          <Link to = "/top-charts">
            <p className = "text-white text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className = "flex flex-col mt-4 gap-1">
          { topPlays?.map( ( song, index ) => ( 
            <TopChartCard key = { song.key }  song = { song } index = { index } 
              isPlaying = { isPlaying } activeSong = { activeSong } 
              handlePauseClick = { handlePauseClick } handlePlayClick = { () => handlePlayClick( song, index ) } /> // Wrap handlePlayClick in callback function or the top songs come back undefined 
          ) ) }
        </div>
      </div>
      { /* Top artists section */ }
      <div className = "w-full flex flex-col mt-6">
        <div className = "flex flex-row justify-between items-center">
          <h2 className = "text-white font-bold text-2xl">Top Artists</h2>
          <Link to = "/top-artists">
            <p className = "text-white text-base cursor-pointer">See More</p>
          </Link>
        </div>
        { /* Swiper gives us swiping capabilities more info at https://swiperjs.com/react */ }
        <Swiper slidesPerView = "auto" spaceBetween = { 15 } freeMode 
           centeredSlides centeredSlidesBounds 
           modules = { [ FreeMode ] } className = "mt-4">
            {topPlays?.map( ( song, index ) => (
              <SwiperSlide key = { song?.key} className = "shadow-lg rounded-full animate-slideright" style = {  { width: '25%', heigh: 'auto'}}>
                <Link to = { `/artist/${ song?.artists[ 0 ]?.adamid }` }>
                  <img src =  { song?.images?.background } alt = "name" className = "w-full rounded-full object.cover" />
                </Link>
              </SwiperSlide>))};
        </Swiper>
      </div>
    </div>

    
  )
}

export default TopPlay;
