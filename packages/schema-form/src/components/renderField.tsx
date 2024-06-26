import React from "react";
import { JSONSchema7 } from "json-schema";
import {
  StringSchema,
  NumberSchema,
  BooleanSchema,
  BaseObjectSchema,
  BaseArraySchema,
  CustomFields,
  SchemaDefinitions,
  BaseNumberSchema,
  BaseBooleanSchema,
  BaseStringSchema,
} from "./types";
import { resolveRef } from "../utils/resolveRef";
import {
  StringField,
  NumberField,
  BooleanField,
  ObjectField,
  ArrayField,
} from "./index";

// Utility function to render form fields based on JSON Schema
export const renderField = (
  schema: JSONSchema7,
  path: string[],
  definitions: SchemaDefinitions,
  customFields?: CustomFields
): React.ReactNode => {
  schema = resolveRef(schema, definitions);

  switch (schema.type) {
    case "string":
      return customFields?.StringField ? (
        <customFields.StringField schema={schema as StringSchema} path={path} />
      ) : (
        <StringField schema={schema as BaseStringSchema} path={path} />
      );
    case "integer":
    case "number":
      return customFields?.NumberField ? (
        <customFields.NumberField schema={schema as NumberSchema} path={path} />
      ) : (
        <NumberField schema={schema as BaseNumberSchema} path={path} />
      );
    case "boolean":
      return customFields?.BooleanField ? (
        <customFields.BooleanField
          schema={schema as BooleanSchema}
          path={path}
        />
      ) : (
        <BooleanField schema={schema as BaseBooleanSchema} path={path} />
      );
    case "null":
      return <input type="text" value="null" disabled />;
    case "object":
      return customFields?.ObjectField ? (
        <customFields.ObjectField
          schema={schema as BaseObjectSchema}
          path={path}
          definitions={definitions}
          customFields={customFields}
        />
      ) : (
        <ObjectField
          schema={schema as BaseObjectSchema}
          path={path}
          definitions={definitions}
          customFields={customFields}
        />
      );
    case "array":
      return customFields?.ArrayField ? (
        <customFields.ArrayField
          schema={schema as BaseArraySchema}
          path={path}
          definitions={definitions}
          customFields={customFields}
        />
      ) : (
        <ArrayField
          schema={schema as BaseArraySchema}
          path={path}
          definitions={definitions}
          customFields={customFields}
        />
      );
    default:
      return null;
  }
};
