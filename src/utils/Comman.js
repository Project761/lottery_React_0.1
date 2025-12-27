export const ChangeArrayFormat = (data, value, Lable) => {
  const formattedArray = data.map(item => ({
    value: item[value],
    label: item[Lable]
  }));
  return formattedArray;
}

export const threeColVictimOffenseArray = (data, Id, Code, col3) => {
  const result = data?.map((sponsor) =>
    ({ value: sponsor[Id], label: sponsor[Code], id: sponsor[col3] })
  )
  return result
}

// export const onChangeDropdown = (event, setFormData, formData, fieldName) => {
//     // console.log(event);
//     if (event && event.value) {
//         setFormData({
//             ...formData,
//             [fieldName]: event.value
//         });
//     } else {
//         setFormData({
//             ...formData,
//             [fieldName]: null
//         });
//     }
// }

// utils/Comman.js
export const onChangeDropdown = (selectedOption, setFormData, formData, field) => {
  const value = selectedOption ? (selectedOption.value ?? selectedOption.Value ?? selectedOption) : null;
  setFormData(prev => ({ ...prev, [field]: value }));
};


export const selectValue = (states, itemID, field, text) => {
  const selectedItem = states.find((item) => String(item[itemID]) === String(field));
  if (selectedItem) {
    return {
      value: String(field),
      label: selectedItem[text],
    };
  }
}

// Valiation-Functions
export const upperCaseValue = (value) => {
  if (typeof value == 'string') {
    return value.toUpperCase();
  }
}

export const formatTextwithSpace = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  const limited = digitsOnly.slice(0, 14);
  const spaced = limited.replace(/(.{4})/g, '$1 ').trim();
  return spaced;
}

export const mobileNoValidation = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.slice(0, 10);
}

export const handleOnlyAlphabet = (e) => {
  const value = e;
  const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
  return filteredValue;
}

export const onlyDigitsWithLimit = (value, limit) => {
  let digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.slice(0, limit);
}