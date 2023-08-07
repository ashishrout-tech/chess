import * as React from "react";

export const Header = ({ text }: { text: string }) => {
  return (
    <div className=" text-pink-700 text-center">
      <h1>
        {text}
      </h1>
    </div>
  )
};
