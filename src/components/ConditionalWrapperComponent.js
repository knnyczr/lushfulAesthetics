import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";

export default function ConditionalWrapperComponent({
  condition,
  wrap,
  children,
}) {
  return condition ? wrap(children) : children;
}
