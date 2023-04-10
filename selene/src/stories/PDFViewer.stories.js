import React from "react";
import PDFViewer from "../PDFViewer";

export default {
  title: "PDFViewer",
  component: PDFViewer,
};

const Template = (args) => <PDFViewer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
