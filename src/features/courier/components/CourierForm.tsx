import BaseForm, { Field } from "../../../components/forms/BaseForm";

interface ICourierForm {
  formData: Record<string, string | number | File>;
  handleFormSubmit: (
    updatedData: Record<string, string | number | File>
  ) => void;
}

const CourierForm = ({ formData, handleFormSubmit }: ICourierForm) => {
  const fields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
    },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    { name: "pid", label: "PID", type: "number", required: true },
    {
      name: "vehicle",
      label: "Vehicle",
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
    {
      name: "profileImage",
      label: "Profile Image",
      type: "file",
    },
  ] as Field[];

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleFormSubmit}
      defaultValues={
        formData as unknown as Record<string, string | number | File>
      }
      sx={{ padding: "1rem 0", marginLeft: 0 }}
    />
  );
};

export default CourierForm;
