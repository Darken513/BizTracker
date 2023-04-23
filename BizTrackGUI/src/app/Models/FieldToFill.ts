export class FieldToFill {
  fieldName: string;
  label: string;
  value: string;
  constructor(fieldName: string, label: string, value: string) {
    this.fieldName = fieldName;
    this.label = label;
    this.value = value;
  }
}