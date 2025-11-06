export const ChangeArrayFormat = (data, Lable, value) => {
  const formattedArray = data.map(item => ({
    label: item[Lable],
    value: item[value]
  }));
  return formattedArray;
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

export const upperCaseValue = (value) => {
  if (typeof value == 'string') {
    return value.toUpperCase();
  }
}

export const formatTextwithSpace = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  const limited = digitsOnly.slice(0, 12);
  const spaced = limited.replace(/(.{4})/g, '$1 ').trim();
  return spaced;
}