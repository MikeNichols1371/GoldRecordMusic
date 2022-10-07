import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants'
import { selectGenreListId  } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';


const Home = () =>  {
    const dispatch = useDispatch();
    // Pull player function from the state playerSlice.js
    const { activeSong, isPlaying, genreListId } = useSelector( ( state ) => state.player );
    // Get query from shazamCore.js
    const { data, isFetching, error } = useGetSongsByGenreQuery( genreListId || "POP" );
    
    if ( isFetching ) return <Loader title = "Loading Songs...  "/>;
    if ( error ) return <Error title = "Error Fetching Songs" />;
    // Dynamic title for genre based on genreListId
    const genreTitle = genres.find( ( { value } ) => value === genreListId )?.title; 

    return (
        // Discover title and drop down genre selector
    <div className = "flex flex-col">
        <div className = "w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className = "font-bold text-5xl text-white text-left">Discover { genreTitle } </h2>
            { /* Drop down genre selector */ }
            <select
                onChange = { ( e ) => dispatch( selectGenreListId( e.target.value ) ) } // Modifys the state of the genre from the store
                value = { genreListId || "Pop" } // Sets the default value of the drop down to the genreListId"}
                className = "bg-black text-white p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    { /* Option needs a key since were mapping over genre see constants.js for genres array with titles and values */}
                    { genres.map( ( genre ) => <option key = { genre.value } value = { genre.value }>{ genre.title }</option>) }
            </select>
        </div>
        { /* Song cards */ }
        <div className = "flex flex-wrap sm:justify-start justify-center gap-8">
            { data?.map( ( song, index  ) => 
            <SongCard key = { song.key } song = { song } index = { index } isPlaying = { isPlaying} activeSong = { activeSong } data = { data } />) }
        </div>
    </div>
    )
}

export default Home;
