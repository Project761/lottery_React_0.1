export const ChangeArrayFormat = (data, Lable, value) => {
    const formattedArray = data.map(item => ({
        label: item[Lable],
        value: item[value]
    }));
    return formattedArray;
}

export const onChangeDropdown = (event, setFormData, formData, fieldName) => {
    // console.log(event);
    if (event && event.value) {
        setFormData({
            ...formData,
            [fieldName]: event.value
        });
    } else {
        setFormData({
            ...formData,
            [fieldName]: null
        });
    }
}