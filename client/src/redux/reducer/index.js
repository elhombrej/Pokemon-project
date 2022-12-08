const initialState = {
    pokemons: [],
    pokemonsAuxNoFilter: [],
    types: [],
    pokemonDetail: [],
    backgroundStyle:true,
    cardSize:true,
    loadingStatus: true
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
      case "GET_POKEMONS":
        if(action.payload !== 'error'){
        return {
          ...state,
          pokemons: action.payload,
          pokemonsAuxNoFilter: action.payload,
          loadingStatus:true
        }
        };
        
        case "GET_TYPES":
          return {
            ...state,
            types: action.payload,
          };

        case 'FILTER_CREATED':
          const allPokemonsCF = state.pokemonsAuxNoFilter;
          const filterCreated = action.payload === 'created' ? 
          allPokemonsCF.filter(element => element.createdInDb) : 
          allPokemonsCF.filter(element=> !element.createdInDb);
          return{
            ...state,
            pokemons: action.payload === 'all'? 
            allPokemonsCF :
            filterCreated
          }  

          case 'FILTER_TYPES':
            const allPokemonsForTypes = state.pokemonsAuxNoFilter;
            const filterTypes = allPokemonsForTypes.filter(element => 
              {if(element.types.find(type=>type.name === action.payload)){
                return element
              }
            }
              )
            return{
              ...state,
              pokemons: filterTypes
            }  

        case 'ORDER_BY_NAME':
          let sortedArrayNames = action.payload === 'asc' ?
          state.pokemons.sort(function(a,b){
            if (a.name > b.name){
              return 1;
            }
            if (b.name > a.name){
              return -1;
            }
            return 0;
          }) :
          state.pokemons.sort(function(a,b){
            if (a.name > b.name){
              return -1;
            }
            if (b.name > a.name){
              return 1;
            }
            return 0;
          })
          return{
            ...state,
            pokemons:sortedArrayNames
          }

      case 'ORDER_BY_ATTACK':
        let sortedArrayAttack = action.payload === 'asc' ?
        state.pokemons.sort(function(a,b){
          if (a.attack > b.attack){
            return 1;
          }
          if (b.attack > a.attack){
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function(a,b){
          if (a.attack > b.attack){
            return -1;
          }
          if (b.attack > a.attack){
            return 1;
          }
          return 0;
        })
        return{
          ...state,
          pokemons:sortedArrayAttack
        }

        case 'POST_POKEMON':
          return{
            ...state
          }
        
         case "GET_POKEMON_BY_NAME":
        if(action.payload!=='error')
        {return{
              ...state,
              pokemons: [action.payload],
              loadingStatus: true
            }
        }else{
        return{
          ...state,
          pokemons: state.pokemonsAuxNoFilter,
          loadingStatus: true
        }}
          ;

          case "GET_POKEMON_DETAIL":
            return {
               ...state,
               pokemonDetail: action.payload,
           };

           case "BACKGROUND_STYLE":
            const dayNight = state.backgroundStyle;
            return{
              ...state,
              backgroundStyle: !dayNight
            }

            case "CARD_SIZE":
              const size = state.cardSize;
              size ?
              alert('Symmetrical Size Pokemons!'):
              alert('Height Size Pokemons')
              return{
                ...state,
                cardSize: !size
              }
            
            case "LOADING":
              const load = state.loadingStatus;
              return{...state, loadingStatus: !load}
  

        default: return {...state};
        
      }
    };

export default rootReducer;
