export const helper = {
  getInitials: (nameString) => {
    const fullName = nameString.split(" ");
    const firstLetter = fullName[0].charAt(0);
    const secondLetter = fullName?.[1]?.charAt(0) || "";
    return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
  },
};
