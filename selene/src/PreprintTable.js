const { useMemo } = require("react");

import React from "react";
import { useTable } from "react-table";

const data = useMemo(
  () => [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "Another row",
      col2: "With a columns",
    },
  ],
  []
);

const columns = useMemo();
