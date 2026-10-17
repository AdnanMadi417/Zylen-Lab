import { useState, useCallback } from "react";

/**
 * Minimal form state for the style guide demos — satisfies the shared
 * `{ formData, errors, updateFormData }` contract every form/ field expects.
 */
const useDemoForm = (initial = {}, initialErrors = {}) => {
  const [formData, setFormData] = useState(initial);

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { formData, errors: initialErrors, updateFormData };
};

export default useDemoForm;
