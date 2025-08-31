import { useNavigate, useParams } from "react-router-dom";
import useTaskManagerHooks from "../Store/Hooks";
import { useEffect, useState } from "react";
import type { Task } from "../Store/Types";
import Form from "./Form";

function View() {
  const navigate = useNavigate();
  const { id, mode } = useParams<{ id: string; mode: string }>();
  const [{ getTaskById, addTask, updateTask }] =
    useTaskManagerHooks();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Task>({
    title: "",
    description: "",
    status: "Pending",
    duedate: new Date(),
  });

  useEffect(() => {
    if (id && id !== "add") {
      loadTask();
    } else {
      setLoading(false);
    }
  }, []);

  const loadTask = async () => {
    try {
      setLoading(true);
      const task = await getTaskById(Number(id));
      if (task) {
        setInitialValues(task);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Task) => {
    try {
      setLoading(true);
      if (mode === "create") {
        await addTask(values);
        navigate(`/tasks`);
      } else if (mode === "edit" && id) {
        await updateTask(Number(id), {
          title: values.title,
          description: values.description,
          status: values.status,
          duedate: values.duedate,
        });
        navigate(`/tasks`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <Form
      initialValues={initialValues}
      mode={mode as "create" | "edit" | "view"}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/tasks')}
    />
  );
}

export default View;
