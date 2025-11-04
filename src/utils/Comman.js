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
