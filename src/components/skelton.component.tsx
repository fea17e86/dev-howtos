import React from "react";
import RLSkeleton from "react-loading-skeleton";

export namespace Skeleton {
  export function Component() {
    return (
      <>
        <RLSkeleton width="100%" />
        <RLSkeleton width="80%" />
        <RLSkeleton width="100%" />
        <RLSkeleton width="50%" />
      </>
    );
  }
}
