export const changeCategory = (
  e,
  categories,
  setAttributeFormDB,
  setCategoryChoosen
) => {
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find(
    (cat) => cat.name === highLevelCategory
  );
  if (highLevelCategory && highLevelCategory.attrs) {
    setAttributeFormDB(highLevelCategoryAllData.attrs);
  } else {
    setAttributeFormDB([]);
  }
  setCategoryChoosen(e.target.value);
};

export const setValueForAttrFormDBselectForm = (
  e,
  attributeFormDB,
  attrVal
) => {
  // console.log(e.target.value)
  if (e.target.value !== "Choose attribute") {
    var selectedAttr = attributeFormDB.find(
      (item) => item.key === e.target.value
    );
    // console.log(selectedAttr)
    let valuesForAttrKeys = attrVal.current;
    if (selectedAttr && selectedAttr.value.length > 0) {
      while (valuesForAttrKeys.options.length) {
        valuesForAttrKeys.remove(0);
      }
      valuesForAttrKeys.options.add(new Option("Choose attribute value"));
      selectedAttr.value.map((item) => {
        valuesForAttrKeys.add(new Option(item));
        return "";
      });
    }
  }
};
