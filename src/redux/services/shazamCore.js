import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    export const shazamCoreAPI = createApi( { 
        reducerPath: 'shazamCoreAPI',
        baseQuery: fetchBaseQuery( { baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: ( headers ) => { 
            headers.set( 'x-rapidapi-key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY );

            return headers;
        } 
    } ),
        endpoints: ( builder ) => ( { 
            getTopCharts: builder.query( { query: () => '/charts/world' } ),
            getSongsByGenre: builder.query( { query: ( genreCode ) => `/charts/genre-world?genre_code=${ genreCode }` } ),
            // Destructure song id from data then dynamically pass it to the url to return song details get url path at https://rapidapi.com/tipsters/api/shazam-core/ track details
            getSongDetails: builder.query( { query: ( { songid } ) => `/tracks/details?track_id=${ songid }` } ),
            getRelatedSongs: builder.query ( { query: ( { songid } ) => `/tracks/related?track_id=${ songid }` } ),
            getArtistDetails: builder.query ( { query: ( artistId ) => `/artists/details?artist_id=${ artistId }` } ),
            getSongsByCountry: builder.query( { query: ( countryCode ) => `/charts/country?country_code=${ countryCode }` } ),
            getSongsBySearch: builder.query( { query: ( searchTerm ) => `/search/multi?search_type=SONGS_ARTISTS&query=${ searchTerm }` } )
        } ),
    } );  

    export const { useGetTopChartsQuery, useGetSongsByGenreQuery, useGetSongDetailsQuery, 
        useGetRelatedSongsQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsBySearchQuery } = shazamCoreAPI;