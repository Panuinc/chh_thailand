import { useState, useRef, useCallback } from "react";

export function useFormHandler(initialData = {}, onSubmitHandler) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    (field) => (eOrValue) => {
      const value =
        typeof eOrValue === "string" ? eOrValue : eOrValue?.target?.value ?? "";

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formRef.current) return;
      await onSubmitHandler(formRef.current, formData, setErrors);
    },
    [formData, onSubmitHandler]
  );

  return {
    formRef,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
}
