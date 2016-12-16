import React from "react";

// Import sub-components
import Form from "./children/Form";
import Results from "./children/Results";

// Helper Function
import helpers from "./utils/helpers";

class Main extends React.Component {

  constructor(props) {

    super(props);

    this.article = {
      searchTerm: "",
      results: ""
    };

    this.setTerm = this.setTerm.bind(this);
  }

  componentDidUpdate(prevProps, prevarticle) {

    if (prevarticle.searchTerm !== this.article.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.article.searchTerm).then((data) => {
        if (data !== this.article.results) {
          console.log(data);

          this.setArticle({ results: data });
        }
      });
    }
  }

  setTerm(term) {
    this.setArticle({
      searchTerm: term
    });
  }

  render() {

    return (

      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center">
              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.article.results} />

          </div>

        </div>

      </div>
    );
  }
}

// Export the componen back for use in other files
export default Main;