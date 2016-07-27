"use strict";

var RecipeForm = React.createClass({
    displayName: "RecipeForm",

    render: function render() {

        var formTitle = this.props.recipeIndex === -1 ? "Add Recipe" : "Edit Recipe";

        return React.createElement(
            "div",
            { className: "modal fade", id: "recipe-form", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
            React.createElement(
                "div",
                { className: "modal-dialog", role: "document" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "×"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "modal-title", id: "myModalLabel" },
                            formTitle
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { htmlFor: "recipe-name" },
                                "Recipe Name"
                            ),
                            React.createElement("input", { type: "text", id: "recipe-name", className: "form-control", onChange: this.changeName, value: this.state.recipe.name }),
                            React.createElement("br", null)
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { htmlFor: "recipe-ingredients" },
                                "Ingredients ",
                                React.createElement("i", { className: "fa fa-question-circle", "aria-hidden": "true", "data-toggle": "tooltip", "data-placement": "top", title: "Separate multiple ingredients, one per line." })
                            ),
                            React.createElement("textarea", { id: "recipe-ingredients", className: "form-control", onChange: this.changeIngredients, value: this.state.recipe.ingredients.join('\n') })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: this.saveRecipe },
                            "Save"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                            "Close"
                        )
                    )
                )
            )
        );
    },

    saveRecipe: function saveRecipe() {
        var recipeIndex = this.props.recipeIndex === -1 ? this.props.recipes.length : this.props.recipeIndex;
        this.props.updateRecipe(recipeIndex, this.state.recipe);
    },

    getRecipe: function getRecipe(theProps) {
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

    getInitialState: function getInitialState() {
        return this.getRecipe(this.props);
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState(this.getRecipe(newProps));
    },

    changeName: function changeName(e) {
        this.setState({
            recipe: {
                name: e.target.value,
                ingredients: this.state.recipe.ingredients
            }
        });
    },

    changeIngredients: function changeIngredients(e) {
        var newIngredients = e.target.value.split('\n');
        this.setState({
            recipe: {
                name: this.state.recipe.name,
                ingredients: newIngredients
            }
        });
    }
});
"use strict";

var Recipe = React.createClass({
    displayName: "Recipe",

    render: function render() {
        var ingredientList = [];
        for (var i = 0; i < this.props.ingredients.length; i++) {
            ingredientList.push(React.createElement(
                "li",
                { key: i },
                this.props.ingredients[i]
            ));
        }

        return React.createElement(
            "div",
            { className: "panel panel-primary" },
            React.createElement(
                "div",
                { className: "panel-heading", id: "recipe-" + this.props.recipeIndex + "-heading" },
                React.createElement(
                    "h4",
                    { className: "panel-title" },
                    React.createElement(
                        "a",
                        { role: "button",
                            className: "collapsed",
                            "data-toggle": "collapse",
                            "data-parent": "#recipe-list",
                            href: "#recipe-" + this.props.recipeIndex + "-ingredients",
                            "aria-expanded": "false",
                            "aria-controls": "recipe-" + this.props.recipeIndex + "-ingredients" },
                        this.props.recipeName
                    )
                )
            ),
            React.createElement(
                "div",
                { id: "recipe-" + this.props.recipeIndex + "-ingredients", className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": "recipe-" + this.props.recipeIndex + "-heading" },
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "ul",
                        null,
                        ingredientList
                    ),
                    React.createElement(
                        "div",
                        { className: "recipe-buttons pull-right" },
                        React.createElement(
                            "a",
                            { className: "btn btn-default", "data-toggle": "modal", "data-target": "#recipe-form", onClick: this.editRecipe },
                            "Edit"
                        ),
                        React.createElement(
                            "a",
                            { className: "btn btn-danger", onClick: this.deleteRecipe },
                            "Delete"
                        )
                    )
                )
            )
        );
    },

    editRecipe: function editRecipe() {
        this.props.onEdit(this.props.recipeIndex);
    },

    deleteRecipe: function deleteRecipe() {
        this.props.onDelete(this.props.recipeIndex);
    }
});
"use strict";

var RecipeList = React.createClass({
    displayName: "RecipeList",

    render: function render() {

        var recipeElements = [];
        for (var i = 0; i < this.props.recipes.length; i++) {
            recipeElements.push(React.createElement(Recipe, { key: i,
                recipeIndex: i,
                recipeName: this.props.recipes[i].name,
                ingredients: this.props.recipes[i].ingredients,
                onEdit: this.props.onEdit,
                onDelete: this.props.onDelete
            }));
        }

        return React.createElement(
            "div",
            { id: "recipe-list", className: "panel-group" },
            recipeElements
        );
    }
});
"use strict";

var RecipeBox = React.createClass({
    displayName: "RecipeBox",

    render: function render() {
        return React.createElement(
            "div",
            { id: "recipe-box", className: "container" },
            React.createElement(
                "div",
                { className: "text-center" },
                React.createElement(
                    "h1",
                    null,
                    "Recipe Box"
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-xs-12" },
                    React.createElement(RecipeList, { recipes: this.state.recipes, onEdit: this.editRecipe, onDelete: this.deleteRecipe })
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-12" },
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn-primary btn-lg pull-right", onClick: this.addRecipe, "data-toggle": "modal", "data-target": "#recipe-form" },
                        "Add Recipe"
                    )
                )
            ),
            React.createElement(RecipeForm, { recipes: this.state.recipes,
                recipeIndex: this.state.recipeIndex,
                updateRecipe: this.updateRecipe })
        );
    },

    addRecipe: function addRecipe() {
        this.setState({
            recipeIndex: -1
        });
    },

    editRecipe: function editRecipe(recipeNumber) {
        this.setState({
            recipeIndex: recipeNumber
        });
    },

    updateRecipe: function updateRecipe(recipeNumber, recipe) {
        var updatedRecipes = this.state.recipes;
        updatedRecipes[recipeNumber] = recipe;
        this.setState({
            recipes: updatedRecipes
        });
        this.saveToLocalStorage();
    },

    deleteRecipe: function deleteRecipe(recipeIndex) {
        var newRecipes = this.state.recipes;
        newRecipes.splice(recipeIndex, 1);
        var newRecipeIndex = newRecipes.length - 1;
        this.setState({
            recipes: newRecipes,
            recipeIndex: newRecipeIndex
        });
        this.saveToLocalStorage();
    },

    getInitialState: function getInitialState() {
        if (!localStorage.getItem('recipes')) {
            this.populateStorage();
        }

        return {
            recipes: JSON.parse(localStorage.getItem('recipes')),
            recipeIndex: 0,
            addingRecipe: false
        };
    },

    saveToLocalStorage: function saveToLocalStorage() {
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    },

    populateStorage: function populateStorage() {
        var recipes = [{
            name: "Front End Development Certification",
            ingredients: ["HTML5 and CSS", "Responsive Design with Bootstrap", "Gear up for Success", "jQuery", "Basic Front End Development Projects", "Basic JavaScript", "Object Oriented and Functional Programming", "Basic Algorithm Scripting", "JSON APIs and Ajax", "Intermediate Front End Development Projects", "Intermediate Algorithm Scripting", "Advanced Algorithm Scripting", "Advanced Front End Development Projects"]
        }, {
            name: "Data Visualization Certification",
            ingredients: ["Sass", "React", "React Projects", "D3.js", "Data Visualization Projects"]
        }, {
            name: "Back End Development Certification",
            ingredients: ["Automated Testing and Debugging", "Git", "Node.js and Express.js", "MongoDB", "API Projects", "Dynamic Web Application Projects"]
        }, {
            name: "Full Stack Development Certification",
            ingredients: ["Greenfield Nonprofit Project #1", "Greenfield Nonprofit Project #2", "Legacy Code Nonprofit Project #1", "Legacy Code Nonprofit Project #2"]
        }];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
});

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('app'));
'use strict';

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});