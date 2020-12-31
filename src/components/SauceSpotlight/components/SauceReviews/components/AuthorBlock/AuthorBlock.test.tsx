import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import AuthorBlock from "./AuthorBlock";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";
import { Provider } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";

describe("<AuthorBlock />", () => {
  let wrappers: any = [];
  let mockStores: any = [];

  beforeAll(() => {
    // Loop until we have many instances AuthorBlock component with an actual review prop
    while (mockStores.length !== ITERATION_SIZE) {
      // 1) Generate fake store
      const mockStore = fakeStore();
      const reduxState = mockStore.getState() as AppState;

      // 2) Grab random review from redux
      const { byReviewID } = reduxState.reviews;
      if (!byReviewID) continue;
      if (Object.keys(byReviewID).length === 0) continue;
      const review = casual.random_value(byReviewID);

      // 3) Add to our collectors
      mockStores.push(mockStore);
      wrappers.push(
        enzyme.mount(
          <Provider store={mockStore}>
            <AuthorBlock {...review} />
          </Provider>
        )
      );
    }
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
