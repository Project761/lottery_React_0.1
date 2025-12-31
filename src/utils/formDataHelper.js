export const buildFormData = (data) => {
  const fd = new FormData();

  const payload = { ...data };

  delete payload.ApplicationFeeAttachment;
  delete payload.PaymentAttachement;
  delete payload.IncomeDetailsAttachment;

  fd.append("Data", JSON.stringify(payload));

  if (data.ApplicationFeeAttachment instanceof File) {
    fd.append("ApplicationFeeAttachment", data.ApplicationFeeAttachment);
  }

  if (data.PaymentAttachement instanceof File) {
    fd.append("Files", data.PaymentAttachement);
  }

  if (data.IncomeDetailsAttachment instanceof File) {
    fd.append("IncomeDetailsAttachment", data.IncomeDetailsAttachment);
  }

  return fd;
};
