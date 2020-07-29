
export const retrieveTypes = ( payload ) => {
  let typeObj = {};

  payload.forEach( type =>  {
    typeObj = {
      ...typeObj,
     [ type.name.toLowerCase() ]: type.id
    }    
  });
  
  return typeObj;
}