import type { Task } from "../Pages/TaskManager/Store/Types";
import moment from "moment";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

interface CardProps {
  tasks: Task[];
  onDelete?: (id: number) => void;
  handleStatusChange: (id: number, status: string) => void;
}

function Card({ tasks, onDelete, handleStatusChange }: CardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return "pi pi-check-circle";
      case "In Progress":
        return "pi pi-clock";
      case "Pending ":
        return "pi pi-pause";
      default:
        return "pi pi-circle";
    }
  };

  const getPriorityColor = (duedate: string | Date) => {
    const due = moment(duedate);
    const now = moment();
    const diffDays = due.diff(now, "days");

    if (diffDays < 0) return "text-red-600"; // Overdue
    if (diffDays <= 1) return "text-orange-600"; // Due soon
    if (diffDays <= 3) return "text-yellow-600"; // Due this week
    return "text-gray-600"; // Normal
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task: Task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      task.status
                    )}`}
                  >
                    <i className={`${getStatusIcon(task.status)} text-xs`}></i>
                    {task.status}
                  </span>
                </div>
              </div>

              {/* Action Menu */}
              <div className="flex items-center gap-1 ml-2">
                <Button
                  icon="pi pi-eye"
                  onClick={() => navigate(`/tasks/view/${task.id}`)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  tooltip="View task"
                  tooltipOptions={{ position: "top" }}
                />
                <Button
                  icon="pi pi-pencil"
                  onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  tooltip="Edit task"
                  tooltipOptions={{ position: "top" }}
                />
                {onDelete && (
                  <Button
                    icon="pi pi-trash"
                    onClick={() => onDelete(Number(task.id))}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                    tooltip="Delete task"
                    tooltipOptions={{ position: "top" }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Description */}
            {task.description && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {task.description}
                </p>
              </div>
            )}

            {/* Due Date */}
            <div className="flex items-center gap-2">
              <i
                className={`pi pi-calendar text-sm ${getPriorityColor(
                  task.duedate
                )}`}
              ></i>
              <span
                className={`text-sm font-medium ${getPriorityColor(
                  task.duedate
                )}`}
              >
                {`Due Date: ${moment(task.duedate).format("DD/MM/YYYY")}`}
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {task.status === "Pending" && (
                <button
                  title="Start Work"
                  onClick={() => handleStatusChange(Number(task.id), "In Progress")}
                  className="bg-green-600 hover:bg-green-700 text-white text-s font-bold px-3 py-1.5 rounded-md transition-colors duration-200"
                >
                  Start Work
                  </button>
              )}
              {task.status === "In Progress" && (
                <button
                  title="Complete Work"
                  onClick={() => handleStatusChange(Number(task.id), "Completed")}
                  className=" bg-green-600 hover:bg-green-700 text-white text-s font-bold px-3 py-1.5 rounded-md transition-colors duration-200"
                >
                  Complete Work
                </button>
              )}
              {task.status === "Completed" && (
                <span className="text-green-600">
                  Hurray {task.title} is completed!
                </span>
              )}
  
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
