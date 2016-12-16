import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.article = {
      term: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newArticle = {};
    newArticle[event.target.id] = event.target.value;
    this.setarticle(newArticle);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("CLICK");
    console.log(this.article.term);
    this.props.setTerm(this.article.term);
    this.setarticle({ term: "" });
  }

  render() {

    return (

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Location</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the article.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                type="text"
                className="form-control text-center"
                id="term"
                value={this.article.term}
                onChange={this.handleChange}
                required
              />
              <br />

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;