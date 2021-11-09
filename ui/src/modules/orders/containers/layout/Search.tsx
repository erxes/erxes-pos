import client from "apolloClient";
import gql from "graphql-tag";
import React from "react";
import { queries } from '../../graphql/index';
import SearchInput from "modules/orders/components/SearchInput";
import OrderItem from "modules/orders/components/drawer/OrderItem";
import { Orders } from "modules/orders/styles";

type Props = {
  options: any;
}

type State = {
  results;
  loading: boolean;
}

export default class SearchContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { results: [], loading: false };
  }

  clearSearch = () => {
    this.setState({ results: [] });
  };

  onSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const searchValue = e.currentTarget.value;

      if (!searchValue) {
        return this.setState({ results: [] });
      }

      this.setState({ loading: true });

      client
        .query({
          query: gql(queries.orders),
          variables: { searchValue },
        })
        .then(({ data, loading }) => {
          if (!loading && data.orders) {
            this.setState({ results: data.orders, loading: false });
          }
        });
    }
  };

  render() {
    const { results = [] } = this.state;

    return (
      <>
        <SearchInput
          onSearch={this.onSearch}
          clearSearch={this.clearSearch}
          placeholder="Search"
        />
        <Orders>
          {results.map((order) => <OrderItem order={order} options={this.props.options} key={order._id} />)}
        </Orders>
      </>
    );
  }
}
