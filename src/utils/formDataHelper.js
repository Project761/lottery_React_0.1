export const buildFormData = (data, file) => {
    const fd = new FormData();

    fd.append("Data", JSON.stringify(data));

    if(file instanceof File){
        fd.append("files", file);
    }
    return fd;
};
