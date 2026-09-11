import type {PropsWithChildren} from "react";

export function PageContainer({children}: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">{children}</div>;
}
