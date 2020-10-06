import * as React from "react";
import * as enzyme from "enzyme";

import LoggedOutBar from "./LoggedOutBar";

describe("<LoggedOutBar />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders two Link components", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper.find("Link").length).toEqual(2);
  });

  it("first link is for registration", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper.find("Link").first().prop("href")).toContain("register");
  });

  it("last link is for login", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper.find("Link").last().prop("href")).toContain("login");
  });
});
