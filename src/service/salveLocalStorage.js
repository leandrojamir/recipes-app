import useLocalStorage from '../hook/useLocalStorage';

function SalveDoneRecipes(recipe) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const dateFormatter = new Intl.DateTimeFormat('pt-BR');
  console.log(doneRecipes);

  const salve = () => {
    setDoneRecipes([]);
    const done = {
      id: recipe?.idMeal || recipe?.idDrink,
      type: 'food',
      nationality: recipe?.strArea || '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      doneDate: dateFormatter.format(new Date()),
      tags: recipe?.strTags,
    };
    setDoneRecipes([
      done,
    ]);
  };

  salve();

  console.log('done', done);
  console.log('doneRecipes', doneRecipes);
}

export default SalveDoneRecipes;
