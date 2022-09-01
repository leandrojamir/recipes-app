import { useEffect } from 'react';

function useResponseFilter(api, func, recipes) {
  useEffect(() => {
    const apiRecipes = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        const filterRecipes = data[recipes];
        if (filterRecipes !== 0) {
          func([...filterRecipes]);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    apiRecipes();
  }, []);
}

export default useResponseFilter;
