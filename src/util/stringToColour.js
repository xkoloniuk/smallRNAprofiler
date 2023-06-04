const stringToColour = function (str = "some replacement") {
  //stackoverflow
  // console.log("Target for colour fn is: " + str);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & (0xff - 5);
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default stringToColour;
