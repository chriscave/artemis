import React from "react";
import DefaultComponent from "../DefaultComponent";

export default {
  title: "DefaultComponent",
  component: DefaultComponent,
};

const Template = (args) => <DefaultComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
