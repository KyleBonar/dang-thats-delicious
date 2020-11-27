import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import RegisterUser from "./RegisterUser";
import {
  casual,
  ITERATION_SIZE,
  fakeStore,
  simulateInputChange,
  wait,
  generateValidPassword,
  generateInValidPassword
} from "../../utils/testUtils/testUtils";
import { IRegisterUser } from "../../redux/users/types";

// mock Next's router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush
    };
  }
}));

const mockRegisterPayload = () => ({
  type: "USER_LOGGED_IN"
});

jest.mock("../../redux/users/actions", () => ({
  register: ({ credentials }: { credentials: IRegisterUser }) => {
    return mockRegisterPayload();
  }
}));

describe("<RegisterUser />", () => {
  // defaults
  const _pageTitle = "Register";
  const MIN_PASSWORD_LENGTH = 8;
  const MIN_DISPLAYNAME_LENGTH = 6;

  // mock scrollTo
  window.scrollTo = jest.fn();

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
          <RegisterUser />
        </Provider>
      );
    });
  });

  afterEach(async () => {
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];

      // clear all inputs
      wrapper.find("TextInput input").forEach(input => {
        input.simulate("change", { target: { value: "" } });
      });

      // Make sure flashmessage is closed
      const button = wrapper.find("FlashMessage Button button");
      if (!button.exists()) continue;

      // close flashmessage
      button.simulate("click");

      // give pause for any rerenderings
      await wait();
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").exists()).toBeTruthy();
    });
  });

  it("passes the expected page title to the PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").text()).toEqual(_pageTitle);
    });
  });

  it("renders a form element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").text()).toBeTruthy();
    });
  });

  it("renders 5 TextInput components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").length).toEqual(5);
    });
  });

  it("renders an email TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='email']").exists()).toBeTruthy();
    });
  });

  it("renders a confirmEmail TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper.find("TextInput[id='confirmEmail']").exists()
      ).toBeTruthy();
    });
  });

  it("renders a password TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='password']").exists()).toBeTruthy();
    });
  });

  it("renders a confirmPassword TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper.find("TextInput[id='confirmPassword']").exists()
      ).toBeTruthy();
    });
  });

  it("renders a displayName TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='displayName']").exists()).toBeTruthy();
    });
  });

  it("renders a Link component for Terms and Conditions", () => {
    wrappers.forEach(wrapper => {
      const component = wrapper.find("Link");

      expect(component.exists()).toBeTruthy();
      expect(component.text()).toContain("Terms and Conditions");
      expect(component.prop("href")).toEqual("/tac");
    });
  });

  it("renders FlashMessage component on submission if email fields do not match", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      // add email and slighty different email
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email + "1"
      );

      // make sure component isn't found OR doesn't have children
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible (has children)
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if password fields do not match", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      // add same email to email fields
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );

      // add password and slightly different password
      const _pw = generateValidPassword();
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw + "1"
      );

      // make no flashmessage visible
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if password fields are too short", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      // add same email to email fields
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );

      // add password and slightly different password
      const _pw = generateInValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw
      );

      // make sure that no flashmessage visible
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if displayName field is shorter than minimum allowed", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];
      // Add valid inputs
      const _email = casual.email;
      const _pw = generateValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw
      );

      // Add string that is too short
      const _displayName = generateInValidPassword(MIN_DISPLAYNAME_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='displayName']").first(),
        "displayName",
        _displayName
      );

      // make sure that no flashmessage visible
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("uses redux action emitter on valid submission", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];
      // Add valid inputs
      const _email = casual.email;
      const _pw = generateValidPassword(MIN_PASSWORD_LENGTH);
      const _displayName = generateValidPassword(MIN_DISPLAYNAME_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='displayName']").first(),
        "displayName",
        _displayName
      );

      // const store = mockStores[i];
      const actionsBefore = mockStores[i].getActions();
      //console.log(actions);
      expect(actionsBefore).toEqual([]);
      // submit form
      wrapper.find("form").first().simulate("submit");

      await wait(100);

      const actionsAfter = mockStores[i].getActions();
      expect(actionsAfter).toEqual([mockRegisterPayload()]);
    }
  });
});
