import * as React from "react";
import {
  StyledFormContainer,
  StyledFrom,
  StyledDropDown,
  StyledInput,
  StyledButton
} from "./FilterBarStyle";
import { connect } from "react-redux";
import { MyThunkDispatch, AppState } from "../../../../redux/configureStore";

export interface FilterBarProps {
  onSubmit: ({
    type,
    order,
    limit,
    srch
  }: {
    type: string;
    order: string;
    limit: string;
    srch: string;
  }) => void;
  typeFromPath?: string;
  orderFromPath?: string;
  limitFromPath?: number;
  srchFromPath?: string;
  types?: { options: string[]; selected: string };
  order?: { options: string[]; selected: string };
}

export interface FilterBarState {
  types: { options: string[]; selected: string };
  order: { options: string[]; selected: string };
  limit: { options: string[]; selected: string };
  srch: string;
  [key: string]: { options: string[]; selected: string } | string;
}

class FilterBar extends React.PureComponent<FilterBarProps, FilterBarState> {
  public constructor(props: FilterBarProps) {
    super(props);

    this.state = {
      types: { options: [], selected: this.props.typeFromPath || "" },
      order: { options: [], selected: this.props.orderFromPath || "" },
      limit: {
        options: ["5", "10", "15", "25", "50"],
        selected: this.props.limitFromPath
          ? this.props.limitFromPath.toString()
          : "15"
      },
      srch: ""
    };
  }

  public componentWillMount() {
    // Grab info from props -- make sure we have it
    const { types, order } = this.props;
    if (!types || !order) {
      return;
    }

    // Find srch if we have one or assign default val
    const srch = this.props.srchFromPath || "";

    // Assign to state
    this.setState({ ...this.state, types, order, srch });
  }

  public componentWillReceiveProps(props: FilterBarProps) {
    // Grab info from props -- make sure we have it
    const { types, order } = props;
    if (!types || !order) {
      return;
    }

    // Find srch if we have one or assign default val
    const srch = props.srchFromPath || "";

    this.setState({ ...this.state, types, order, srch });
  }

  public render() {
    const { types, order, limit, srch } = this.state;

    return (
      <StyledFormContainer>
        {types && order ? (
          <StyledFrom onSubmit={this.onSubmit}>
            <StyledDropDown
              showLabel={true}
              label={"Type"}
              name={"types"}
              options={types.options}
              onSelect={this.onDropDownChange}
              selectedValue={types.selected}
            />

            <StyledDropDown
              showLabel={true}
              label={"Order"}
              name={"order"}
              options={order.options}
              onSelect={this.onDropDownChange}
              selectedValue={order.selected}
            />

            <StyledDropDown
              showLabel={true}
              label={"Limit"}
              name={"limit"}
              options={limit.options}
              onSelect={this.onDropDownChange}
              selectedValue={limit.selected}
            />

            <StyledInput
              showLabel={true}
              label={"Name like..."}
              value={srch}
              onChange={this.onTextChange}
              name={"srch"}
            />

            <StyledButton type={"submit"}>Filter</StyledButton>
          </StyledFrom>
        ) : (
          "Loading..."
        )}
      </StyledFormContainer>
    );
  }

  private onSubmit = (event: React.FormEvent): void => {
    // prevent default to stop form submission
    event.preventDefault();

    // Lift values to parent
    this.props.onSubmit({
      type: this.state.types.selected,
      order: this.state.order.selected,
      limit: this.state.limit.selected,
      srch: this.state.srch
    });
  };

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  private onDropDownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    event.preventDefault();

    const { name, value }: { name: string; value: string } = event.target;

    // Make sure we are dealing with object
    const dropdownObj = this.state[name];
    if (typeof dropdownObj !== "object") return;

    this.setState({
      ...this.state,
      [name]: { ...dropdownObj, selected: value }
    });
  };
}

function mapStateToProps(
  state: AppState,
  myProps: FilterBarProps
): FilterBarProps {
  // Grab submit
  const { onSubmit } = myProps;

  // Make sure we have types
  const { types } = state.sauces;

  if (types.length === 0 || !types) {
    return { onSubmit };
  }

  // Make sure we have orders
  const { orders } = state.sauces;
  if (orders.length === 0 || !orders) {
    return { onSubmit };
  }

  // Figure out which option should be selected. Do some massaging too.
  let typeFromPath = myProps.typeFromPath || types[0];
  typeFromPath = typeFromPath.toLowerCase();
  let orderFromPath = myProps.orderFromPath || orders[0];
  orderFromPath = orderFromPath.toLowerCase();

  // Find srch if we have one or assign default val
  const srchFromPath = myProps.srchFromPath || "";

  return {
    types: { options: types, selected: typeFromPath },
    order: { options: orders, selected: orderFromPath },
    onSubmit,
    orderFromPath,
    typeFromPath,
    srchFromPath
  };
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
