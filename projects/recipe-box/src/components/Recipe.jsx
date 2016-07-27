var Recipe = React.createClass({
    render: function () {
        let ingredientList = [];
        for (let i = 0; i < this.props.ingredients.length; i++) {
            ingredientList.push(<li key={i}>{this.props.ingredients[i]}</li>);
        }

        return (

            <div className="panel panel-primary">
                <div className="panel-heading" id={"recipe-" + this.props.recipeIndex + "-heading"}>
                    <h4 className="panel-title">
                        <a role="button" 
                           className="collapsed" 
                           data-toggle="collapse" 
                           data-parent="#recipe-list" 
                           href={"#recipe-" + this.props.recipeIndex + "-ingredients"} 
                           aria-expanded="false" 
                           aria-controls={"recipe-" + this.props.recipeIndex + "-ingredients"}>
                            {this.props.recipeName}
                        </a>
                    </h4>
                </div>
                <div id={"recipe-" + this.props.recipeIndex + "-ingredients"} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"recipe-" + this.props.recipeIndex + "-heading"}>
                    <div className="panel-body">
                        <ul>
                            {ingredientList}
                        </ul>
                        <div className="recipe-buttons pull-right">
                            <a className="btn btn-default" data-toggle="modal" data-target="#recipe-form" onClick={this.editRecipe}>Edit</a>
                            <a className="btn btn-danger" onClick={this.deleteRecipe}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    editRecipe: function () {
        this.props.onEdit(this.props.recipeIndex);
    },

    deleteRecipe: function () {
        this.props.onDelete(this.props.recipeIndex);
    }
});