export const buildFormData = (data, file) => {
    const fd = new FormData();

    const payload = { ...data };
    delete payload.PaymentAttachement;

    fd.append("Data", JSON.stringify(payload));

    if(file instanceof File){
        fd.append("Files", file);
    }
    return fd;
};