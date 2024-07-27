import React from "react";
import { FormProps } from "./types";
import { BaseFieldTemplates, BaseFormTemplate, FormProvider } from "..";

export const Form: React.FC<FormProps> = ({
  schema,
  initialData = {},
  onSubmit,
  onError,
  fieldTemplates = BaseFieldTemplates,
  formTemplate: FormTemplate = BaseFormTemplate,
}) => {
  return (
    <FormProvider schema={schema} initialData={initialData}>
      <FormTemplate
        onSubmit={onSubmit}
        onError={onError}
        fieldTemplates={fieldTemplates}
      />
    </FormProvider>
  );
};
