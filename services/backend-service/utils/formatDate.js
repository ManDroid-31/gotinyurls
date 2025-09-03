import { format } from "date-fns";

export const toLocalDate = (date) => {
  return date ? format(date, "yyyy-MM-dd") : undefined;
};
