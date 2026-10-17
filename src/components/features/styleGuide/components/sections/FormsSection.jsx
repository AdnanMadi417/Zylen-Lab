import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InputField,
  PasswordField,
  TextareaField,
  SelectField,
  SearchableSelect,
  MultiSelect,
  RadioField,
  CheckBoxGroup,
  ToggleInput,
  SearchInput,
} from "components/form";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";
import useDemoForm from "../../hooks/useDemoForm";

const FormsSection = () => {
  const { t } = useTranslation();
  const s = (k) => t(`styleGuide.forms.${k}`);
  const [search, setSearch] = useState("");

  const text = useDemoForm({ name: "", email: "" }, {});
  const errorForm = useDemoForm({ email: "not-an-email" }, { email: s("error_email") });
  const choice = useDemoForm({ gender: "female", notify: true, interests: [], city: "", skills: [], branch: "" });

  const cities = [
    { value: "kl", label: s("city_kl") },
    { value: "penang", label: s("city_penang") },
    { value: "johor", label: s("city_johor") },
  ];

  return (
    <GuideSection id="forms" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="InputField · PasswordField · TextareaField"
        description={s("text_desc")}
        code={`
const [formData, setFormData] = useState({});
const updateFormData = (field, v) => setFormData((p) => ({ ...p, [field]: v }));

<InputField
  label="Full name"
  field="name"
  formData={formData}
  errors={errors}
  updateFormData={updateFormData}
  rules={[{ required: true }, { minLength: 3 }]}
/>`}
      >
        <div className="grid gap-x-6 md:grid-cols-2">
          <InputField
            label={s("label_name")}
            field="name"
            placeholder={s("ph_name")}
            {...text}
            rules={[{ required: true }, { minLength: 3 }]}
          />
          <InputField
            label={s("label_email")}
            field="email"
            type="email"
            placeholder="name@example.com"
            {...text}
            rules={[{ required: true }, { email: true }]}
          />
          <PasswordField label={s("label_password")} field="password" {...text} />
          <InputField
            label={s("label_email_error")}
            field="email"
            type="email"
            {...errorForm}
          />
          <div className="md:col-span-2">
            <TextareaField label={s("label_message")} field="message" rows={3} placeholder={s("ph_message")} required={false} {...text} />
          </div>
        </div>
        <p className="text-xs text-slate-400">{s("validation_hint")}</p>
      </ComponentShowcase>

      <ComponentShowcase
        title="SelectField · SearchableSelect · MultiSelect"
        description={s("select_desc")}
        code={`
<SelectField label="City" field="city" options={[{ value: "kl", label: "Kuala Lumpur" }]} {...form} />
<SearchableSelect label="Branch" field="branch" options={options} {...form} />
<MultiSelect label="Skills" field="skills" options={options} {...form} />`}
      >
        <div className="grid gap-x-6 md:grid-cols-3">
          <SelectField label={s("label_city")} field="city" options={cities} {...choice} />
          <SearchableSelect label={s("label_branch")} field="branch" options={cities} {...choice} />
          <MultiSelect
            label={s("label_skills")}
            field="skills"
            options={[
              { value: "teaching", label: s("skill_teaching") },
              { value: "medical", label: s("skill_medical") },
              { value: "design", label: s("skill_design") },
              { value: "translation", label: s("skill_translation") },
            ]}
            {...choice}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="RadioField · CheckBoxGroup · ToggleInput"
        description={s("choice_desc")}
        code={`
<RadioField label="Gender" field="gender" options={[{ value: "male", label: "Male" }]} {...form} />
<CheckBoxGroup label="Interests" field="interests" options={[{ id: 1, name: "Education" }]} {...form} />
<ToggleInput label="Email notifications" field="notify" {...form} />`}
      >
        <div className="grid gap-x-6 md:grid-cols-2">
          <RadioField
            label={s("label_gender")}
            field="gender"
            options={[
              { value: "male", label: s("male") },
              { value: "female", label: s("female") },
            ]}
            {...choice}
          />
          <ToggleInput label={s("label_notify")} field="notify" hint={s("notify_hint")} {...choice} />
          <div className="md:col-span-2">
            <CheckBoxGroup
              label={s("label_interests")}
              field="interests"
              options={[
                { id: 1, name: s("interest_education") },
                { id: 2, name: s("interest_health") },
                { id: 3, name: s("interest_relief") },
              ]}
              {...choice}
            />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="SearchInput"
        description={s("search_desc")}
        code={`<SearchInput value={query} onChange={setQuery} placeholder="Search projects…" />`}
      >
        <div className="max-w-sm">
          <SearchInput value={search} onChange={setSearch} placeholder={s("ph_search")} />
        </div>
      </ComponentShowcase>
    </GuideSection>
  );
};

export default FormsSection;
