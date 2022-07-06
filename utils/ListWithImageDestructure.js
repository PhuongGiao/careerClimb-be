exports.ImageListDestructure = (data) => {
  let key;
  let key0;
  let key1;
  let key2;

  return (ListWithImageDestructure = data
    .reduce((acc, val) => {
      key0 = Object.keys(val).filter((val) => val.includes("Image"));
      key1 = Object.keys(val).filter((val) => val.includes("video"));
      key2 = Object.keys(val).filter((val) => val.includes("VideoThumb"));
      key = [...key0, ...key1, ...key2];
      return [
        ...acc,
        {
          ...val,
          Image: key0.map((value) => val[value]).filter((val) => val !== null),
          Video: key1.map((value) => val[value]).filter((val) => val !== null),
          VideoThumb: key2
            .map((value) => val[value])
            .filter((val) => val !== null),
        },
      ];
    }, [])
    .map((item) => {
      key.map((key) => {
        return delete item[key];
      });
      return item;
    }));
};
