// import client from "apolloClient";
// import gql from "graphql-tag";
import React from "react";
import Search from "../../components/layout/Search";

class SearchContainer extends React.Component<
  { full?: boolean },
  { results; loading: boolean }
> {
  constructor(props) {
    super(props);

    this.state = { results: null, loading: false };
  }

  clearSearch = () => {
    this.setState({ results: null });
  };

  onSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = e.currentTarget.value;

      if (!value) {
        return this.setState({ results: null });
      }

      this.setState({ loading: true });

      //   client
      //     .query({
      //       query: gql(queries.search),
      //       variables: {
      //         value,
      //       },
      //     })
      //     .then(({ data, loading }) => {
      //       if (!loading && data.search) {
      //         this.setState({ results: data.search, loading: false });
      //       }
      //     });
    }
  };

  render() {
    return (
      <Search
        onSearch={this.onSearch}
        results={this.state.results}
        loading={this.state.loading}
        clearSearch={this.clearSearch}
        full={this.props.full}
      />
    );
  }
}

export default SearchContainer;
