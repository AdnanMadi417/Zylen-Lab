import React, { useState } from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
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
import ImageUploadField from "components/form/upload/ImageUploadField";
import { MdCloudUpload, MdDeleteOutline, MdInsertDriveFile, MdOpenInNew, MdErrorOutline } from "react-icons/md";

/**
 * Document upload states, matching StorageDocumentField's markup. The real
 * field uploads to storage on selection, so its states are drawn statically.
 */
const DocumentStates = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.forms.${k}`);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-all hover:border-brand-500/75 hover:bg-brand-500/10">
        <MdCloudUpload className="mb-2 h-8 w-8 text-slate-400" />
        <p className="text-sm text-slate-500">
          {t("common.drag_drop_prefix")} <span className="font-semibold text-brand-800">{t("common.browse")}</span>
        </p>
        <p className="mt-1 text-xs text-slate-400" dir="ltr">PDF, DOCX · 10 MB</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-800">
              <MdInsertDriveFile className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900" dir="ltr">{s("doc_name")}</p>
              <span className="inline-flex items-center gap-1 text-xs text-brand-800">
                {t("common.open")} <MdOpenInNew className="h-3 w-3" />
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">{t("common.replace")}</span>
            <span className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500">
              <MdDeleteOutline className="h-3.5 w-3.5" /> {t("common.remove")}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
            <MdErrorOutline className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-red-600" dir="ltr">{s("doc_error_name")}</p>
            <p className="text-xs text-red-500">{s("doc_error")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormsSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.forms.${k}`);
  const [search, setSearch] = useState("");
  const [photo, setPhoto] = useState(null);

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

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase
          title="ImageUploadField"
          description={s("image_upload_desc")}
          code={`<StorageImageField label="Profile photo" field="photo" folder="avatars" {...form} />`}
        >
          <ImageUploadField
            label={s("label_photo")}
            field="photo"
            simpleFile={photo}
            onSimpleFileChange={setPhoto}
            onSimpleRemove={() => setPhoto(null)}
            errors={{}}
          />
        </ComponentShowcase>
        <ComponentShowcase
          title="StorageDocumentField"
          description={s("doc_upload_desc")}
          code={`<StorageDocumentField label="Contract" field="contract" folder="documents" {...form} />`}
        >
          <DocumentStates />
        </ComponentShowcase>
      </div>
    </GuideSection>
  );
};

export default FormsSection;
