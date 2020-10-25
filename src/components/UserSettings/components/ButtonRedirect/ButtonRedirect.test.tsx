import * as React from "react";
import * as enzyme from "enzyme";

import ButtonRedirect, { IButtonRedirectProps } from "./ButtonRedirect";
import { casual, ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

const fakeButtonRedirect = (): IButtonRedirectProps => ({
  name: casual.string,
  href: casual.url
});

const mockButtonRedirects = new Array(ITERATION_SIZE)
  .fill(null)
  .map(fakeButtonRedirect);

describe("<ButtonRedirect />", () => {
  it("renders", () => {
    mockButtonRedirects.forEach(mockButtonRedirect => {
      const wrapper = enzyme.shallow(
        <ButtonRedirect {...mockButtonRedirect} />
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockButtonRedirects.forEach(mockButtonRedirect => {
      const wrapper = enzyme.shallow(
        <ButtonRedirect {...mockButtonRedirect} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders h4 tag", () => {
    mockButtonRedirects.forEach(mockButtonRedirect => {
      const wrapper = enzyme.shallow(
        <ButtonRedirect {...mockButtonRedirect} />
      );

      expect(wrapper.find("h4").exists()).toBeTruthy();
    });
  });

  it("renders expected name in h4 tag", () => {
    mockButtonRedirects.forEach(mockButtonRedirect => {
      const wrapper = enzyme.shallow(
        <ButtonRedirect {...mockButtonRedirect} />
      );

      expect(wrapper.find("h4").text()).toEqual(mockButtonRedirect.name);
    });
  });

  it("renders a Link component", () => {
    mockButtonRedirects.forEach(mockButtonRedirect => {
      const wrapper = enzyme.shallow(
        <ButtonRedirect {...mockButtonRedirect} />
      );

      expect(wrapper.find("Link").exists()).toBeTruthy();
    });
  });
});
