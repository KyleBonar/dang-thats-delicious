import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { Link } from "./Link";
import { fakeLinks } from "../../utils/testUtils/testUtils";

const mockLinks = fakeLinks();

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link to="#">""</Link>);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    mockLinks.forEach(mockLink => {
      let wrapper = enzyme.render(
        <MemoryRouter>
          <Link to={mockLink.to} target={mockLink.target}>
            {mockLink.text}
          </Link>
        </MemoryRouter>
      );
      expect(wrapper.text()).toEqual(mockLink.text);
    });
  });
});
