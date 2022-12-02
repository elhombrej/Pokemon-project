const initialState = {
    pokemons: [],
    pokemonsAuxNoFilter: [],
    types: [],
    pokemonDetail: [],
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
          pokemonsAuxNoFilter: action.payload
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
            pokemons: action.payload === 'all' ? 
            state.allPokemonsCF : 
            filterCreated
          }  

          case 'FILTER_TYPES':
            console.log(action.payload)
            const allPokemonsForTypes = state.pokemonsAuxNoFilter;
            const filterTypes = allPokemonsForTypes.filter(
              element => 
              {if(element.types.find(type=>type.name == action.payload)){
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
           return {
              ...state,
              pokemons: action.payload,
          };

          case "GET_POKEMON_DETAIL":
            return {
               ...state,
               pokemonDetail: action.payload,
           };

        default: return {...state};
        
      }
    };

export default rootReducer;
