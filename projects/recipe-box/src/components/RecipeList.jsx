var RecipeList = React.createClass({
    render: function () {

        let recipeElements = [];
        for (let i = 0; i < this.props.recipes.length; i++) {
            recipeElements.push(
                <Recipe key={i} 
                        recipeIndex={i} 
                        recipeName={this.props.recipes[i].name} 
                        ingredients={this.props.recipes[i].ingredients} 
                        onEdit={this.props.onEdit} 
                        onDelete={this.props.onDelete} 
                        >
                </Recipe>
            );
        }

        return (
            <div id="recipe-list" className="panel-group">
                    {recipeElements}
            </div>
        );
    }
});