import React from "react";
import { Composition, registerRoot } from "remotion";
import BrandIntroComposition from "../components/remotion/BrandIntroComposition";
const Root = () => (
  <Composition
    id="AreesanBrand"
    component={BrandIntroComposition}
    durationInFrames={240}
    fps={30}
    width={1280}
    height={720}
  />
);
registerRoot(Root);
