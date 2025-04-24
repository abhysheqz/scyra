"use client";

import React from "react";
import { useTopLoader } from "nextjs-toploader";
import Button from "./button";

const Component = () => {
  const loader = useTopLoader();

  return (
    <div className="grid grid-cols-2 gap-5">
      <Button onClick={() => loader.start()}>Start Loader</Button>
      <Button onClick={() => loader.setProgress(0.5)}>Set 50% Progress</Button>
      <Button onClick={() => loader.done()}>Complete Loader</Button>
    </div>
  );
};

export default Component;
