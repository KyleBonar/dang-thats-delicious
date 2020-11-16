import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

import UserSettings from "./UserSettings";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";
import { MockStoreEnhanced } from "redux-mock-store";

jest.mock("../../utils/hooks/useIsEmailConfirmed/useIsEmailConfirmed", () => {
  return {
    useIsEmailConfirmed: {
      loading: false,
      isEmailConfirmed: true,
      error: {},
      getEmailConfirmed: () => {}
    }
  };
});

describe("<UserSettings />", () => {
  // May need to refer to these later so initializing out here
  let wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={mockStores[ind]}>
          <UserSettings />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });
});
