var RecipeBox = React.createClass({
    render: function () {
        return (
            <div id="recipe-box" className="container">
                <div className="text-center">
                    <h1>Recipe Box</h1>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <RecipeList recipes={this.state.recipes} onEdit={this.editRecipe} onDelete={this.deleteRecipe}></RecipeList>
                    </div>
                    <div className="col-xs-12">
                        <button type="button" className="btn btn-primary btn-lg pull-right" onClick={this.addRecipe} data-toggle="modal" data-target="#recipe-form">
                            Add Recipe
                        </button>
                    </div>
                </div>
                <RecipeForm recipes={this.state.recipes}  
                                    recipeIndex={this.state.recipeIndex} 
                                    updateRecipe={this.updateRecipe}></RecipeForm>
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p>
                            <small>
                                Built by <a href="http://www.zackward.net">Zack Ward</a>. 
                                Hosted on <a href="https://github.com/ZackWard/zackward.github.io/tree/master/projects/recipe-box"><i className="fa fa-github"></i> GitHub</a>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    },

    addRecipe: function () { 
        this.setState({
            recipeIndex: -1
        });
    },

    editRecipe: function (recipeNumber) {
        this.setState({
            recipeIndex: recipeNumber
        });
    },

    updateRecipe: function (recipeNumber, recipe) {
        let updatedRecipes = this.state.recipes;
        updatedRecipes[recipeNumber] = recipe;
        this.setState({
            recipes: updatedRecipes
        });
        this.saveToLocalStorage();
    },

    deleteRecipe: function (recipeIndex) {
        let newRecipes = this.state.recipes;
        newRecipes.splice(recipeIndex, 1);
        let newRecipeIndex = newRecipes.length - 1;
        this.setState({
            recipes: newRecipes,
            recipeIndex: newRecipeIndex
        });
        this.saveToLocalStorage();
    },

    getInitialState: function () {
        if (!localStorage.getItem('recipes')) {
            this.populateStorage();
        } 

        return {
            recipes: JSON.parse(localStorage.getItem('recipes')),
            recipeIndex: 0,
            addingRecipe: false
        };
    },

    saveToLocalStorage: function () {
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    },

    populateStorage: function () {
        let recipes = [
            {
                name: "Front End Development Certification",
                ingredients: [
                    "HTML5 and CSS",
                    "Responsive Design with Bootstrap",
                    "Gear up for Success",
                    "jQuery",
                    "Basic Front End Development Projects",
                    "Basic JavaScript",
                    "Object Oriented and Functional Programming",
                    "Basic Algorithm Scripting",
                    "JSON APIs and Ajax",
                    "Intermediate Front End Development Projects",
                    "Intermediate Algorithm Scripting",
                    "Advanced Algorithm Scripting",
                    "Advanced Front End Development Projects"
                ]
            },
            {
                name: "Data Visualization Certification",
                ingredients: [
                    "Sass",
                    "React",
                    "React Projects",
                    "D3.js",
                    "Data Visualization Projects"
                ]
            },
            {
                name: "Back End Development Certification",
                ingredients: [
                    "Automated Testing and Debugging",
                    "Git",
                    "Node.js and Express.js",
                    "MongoDB",
                    "API Projects",
                    "Dynamic Web Application Projects"
                ]
            },
            {
                name: "Full Stack Development Certification",
                ingredients: [
                    "Greenfield Nonprofit Project #1",
                    "Greenfield Nonprofit Project #2",
                    "Legacy Code Nonprofit Project #1",
                    "Legacy Code Nonprofit Project #2"
                ]
            }
        ];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
});

ReactDOM.render(
    <RecipeBox />,
    document.getElementById('app')
);