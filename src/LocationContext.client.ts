import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Location {
  selectedId: string | null;
  isEditing: boolean;
  searchText: string;
}

export const LocationContext = createContext<
  [Location, Dispatch<SetStateAction<Location>>] | null
>(null);

export const useLocation = () => {
  return useContext(LocationContext);
};
