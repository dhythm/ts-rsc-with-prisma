import { FC, PropsWithChildren, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack";
import { LocationContext, Location } from "./LocationContext.client";

export const Root: FC<PropsWithChildren> = () => {
  const [location, setLocation] = useState<Location>({
    selectedId: null,
    isEditing: false,
    searchText: "",
  });

  return (
    <LocationContext.Provider value={[location, setLocation]}>
      <Container />
    </LocationContext.Provider>
  );
};

const chunk = createFromFetch(fetch("/rsc"));

const Container: FC = () => {
  return chunk.readRoot();
};
