import { useNavigate } from "react-router-dom";



const ArtistCard = ( { track } ) => {
  const navigate = useNavigate(); // Allows us to navigate to a specific route

  return (
    <div className = "flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer"
    onClick = { () => navigate(  `/artists/${ track?.artists[ 0 ].adamid }`  ) } >
        <img src={ track?.images?.coverart } alt="artist" className = "w-full h-56 rounded-lg " />
        <p className = " text-white font-semibold text-lg mt-4 truncate">{ track?.subtitle } </p>
     </div>
  )
};

export default ArtistCard;
