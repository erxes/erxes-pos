import React from "react";
import SearchInput from "modules/orders/components/SearchInput";
import { router } from "modules/common/utils";
import { withRouter } from "react-router-dom";
import { IRouterProps } from "types";
import { ProductSearch } from "../styles";

type Props = {
  productsQuery: any;
} & IRouterProps;

class SearchContainer extends React.Component<Props> {
  clearSearch = () => {
    router.setParams(this.props.history, { searchValue: "" });
    this.props.productsQuery.refetch();
  };

  onSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const searchValue = e.currentTarget.value;

      router.setParams(this.props.history, { searchValue });
      this.props.productsQuery.refetch({ variables: { searchValue } });
    }
  };

  render() {
    return (
      <ProductSearch>
        <SearchInput
          onSearch={this.onSearch}
          clearSearch={this.clearSearch}
          placeholder="Search"
        />
      </ProductSearch>
    );
  }
}

export default withRouter<Props>(SearchContainer);
