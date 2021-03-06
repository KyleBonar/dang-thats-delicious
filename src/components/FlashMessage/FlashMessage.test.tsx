import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import FlashMessage, { FlashMessageProps } from "./FlashMessage";

const mockFlashMessage = (): FlashMessageProps => ({
  className: casual.random_element([undefined, casual.string]),
  type: casual.random_element([undefined, "success", "warning", "alert"]),
  isVisible: casual.boolean,
  slug: casual.random_element([undefined, casual.url]),
  slugText: casual.random_element([undefined, casual.name]),
  text: casual.random_element([undefined, casual.string]),
  children: casual.random_element([undefined, casual.string])
});

const mockFlashMessages = new Array(ITERATION_SIZE)
  .fill(null)
  .map(mockFlashMessage);

describe("<FlashMessage />", () => {
  it("renders", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders no children if not visible", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.mount(<FlashMessage {...fakeProps} />);

      if (fakeProps.isVisible) return;

      expect(wrapper.find("FlashMessage").last().children()).toEqual({});
    });
  });

  it("renders children if visible", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.mount(<FlashMessage {...fakeProps} />);

      if (!fakeProps.isVisible) return;

      expect(wrapper.find("FlashMessage").last().prop("children")).toEqual(
        fakeProps.children
      );
    });
  });

  it("renders link if slug and slugText are provided", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      if (!fakeProps.isVisible || !fakeProps.slug || !fakeProps.slugText)
        return;

      expect(wrapper.find("Link")).toBeTruthy();
    });
  });

  it("does not render link if either slug or slugText are null", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      if (!fakeProps.isVisible && fakeProps.slug && fakeProps.slugText) return;

      expect(wrapper.find("Link")).toEqual({});
    });
  });

  it("renders text if provided and children is falsey and is visible", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      if (fakeProps.isVisible && !fakeProps.children && fakeProps.text) {
        // console.log(wrapper.text());
        expect(wrapper.text()).toContain(fakeProps.text);
      }
    });
  });
});
