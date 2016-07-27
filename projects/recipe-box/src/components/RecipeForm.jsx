var RecipeForm = React.createClass({
    render: function () {

        let formTitle = (this.props.recipeIndex === -1) ? "Add Recipe" : "Edit Recipe";

        return (
            <div className="modal fade" id="recipe-form" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{formTitle}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="recipe-name">Recipe Name</label>
                                <input type="text" id="recipe-name" className="form-control" onChange={this.changeName} value={this.state.recipe.name}></input><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipe-ingredients">
                                    Ingredients <i className="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Separate multiple ingredients, one per line."></i>
                                </label>
                                <textarea id="recipe-ingredients" className="form-control" onChange={this.changeIngredients} value={this.state.recipe.ingredients.join('\n')}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveRecipe}>Save</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    saveRecipe: function () {
        let recipeIndex = (this.props.recipeIndex === -1) ? this.props.recipes.length : this.props.recipeIndex;
        this.props.updateRecipe(recipeIndex, this.state.recipe);
    },

    getRecipe: function (theProps) {
        if (theProps.recipeIndex === -1) {
            return {
                recipe: {
                    name: "New Recipe",
                    ingredients: []
                }
            };
        } else {
            return {
                recipe: {
                    name: theProps.recipes[theProps.recipeIndex].name,
                    ingredients: theProps.recipes[theProps.recipeIndex].ingredients
                }
            };
        }
    },

    getInitialState: function () {
        return this.getRecipe(this.props);
    },

    componentWillReceiveProps: function (newProps) {
        this.setState(this.getRecipe(newProps));
    },

    changeName: function (e) {
        this.setState({
            recipe: {
                name: e.target.value,
                ingredients: this.state.recipe.ingredients
            }
        });
    },

    changeIngredients: function (e) {
        let newIngredients = e.target.value.split('\n');
        this.setState({
            recipe: {
                name: this.state.recipe.name,
                ingredients: newIngredients
            }
        });
    }
});