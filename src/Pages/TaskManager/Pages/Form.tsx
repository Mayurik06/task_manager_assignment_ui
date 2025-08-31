import React from "react";
import type { Task } from "../Store/Types";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import taskSchema from "../Store/Schema";
import { Calendar } from "primereact/calendar";

// Add PrimeReact CSS imports at the top of your file or in your main CSS file
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/primereact.min.css";

interface FormProps {
  initialValues: Task;
  onSubmit: (values: Task, formikHelpers: any) => void;
  mode: "create" | "edit" | "view";
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  mode,
  onCancel,
}) => {
  const isViewMode = mode === "view";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {mode} Task
        </h2>
        <p className="text-gray-600 mt-1">
          {mode === "create" && "Create a new task"}
          {mode === "edit" && "Edit task details"}
          {mode === "view" && "View task information"}
        </p>
      </div>

      <Formik
        validationSchema={taskSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <FormikForm className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isViewMode
                    ? "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                } ${
                  errors.title && touched.title
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                placeholder={isViewMode ? "" : "Enter task title"}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1 flex items-center"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isViewMode}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
                  isViewMode
                    ? "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                } ${
                  errors.description && touched.description
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                placeholder={
                  isViewMode ? "" : "Enter task description (optional)"
                }
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <Field
                id="status"
                name="status"
                as="select"
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isViewMode
                    ? "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                } ${
                  errors.status && touched.status
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
              >
                <option value="Pending">📋 Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Due Date Field - FIXED VERSION */}
            <div className="space-y-2">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <div className="relative">
                <Calendar
                  id="duedate"
                  name="duedate"
                  value={values.duedate ? new Date(values.duedate) : null}
                  onChange={(e) => {
                    console.log('Selected date:', e.value);
                    setFieldValue('duedate', e.value);
                    setFieldTouched('duedate', true);
                  }}
                  placeholder="Select a due date"
                  disabled={isViewMode}
                  showIcon
                  dateFormat="dd/mm/yy"
                  className="w-full"
                  inputClassName={`w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isViewMode
                      ? "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                      : "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                  } ${
                    errors.duedate && touched.duedate
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  style={{
                    width: '100%'
                  }}
                  inputStyle={{
                    width: '100%',
                    padding: '8px 12px',
                    border: `1px solid ${
                      errors.duedate && touched.duedate 
                        ? '#ef4444' 
                        : isViewMode 
                          ? '#d1d5db' 
                          : '#d1d5db'
                    }`,
                    borderRadius: '6px',
                    backgroundColor: isViewMode ? '#f9fafb' : '#ffffff',
                    color: isViewMode ? '#6b7280' : '#111827',
                    cursor: isViewMode ? 'not-allowed' : 'pointer'
                  }}
                />
              </div>
              <ErrorMessage
                name="duedate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              {!isViewMode && (
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mode === "create" ? "Create Task" : "Update Task"}
                </button>
              )}
              <button
                type="button"
                onClick={onCancel}
                className={`${
                  isViewMode ? "flex-1" : "flex-1 sm:flex-none sm:px-6"
                } bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
              >
                {isViewMode ? "Close" : "Cancel"}
              </button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;