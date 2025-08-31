import { useNavigate } from "react-router-dom";
import useTaskManagerHooks from "../Store/Hooks";
import { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import Card from "../../../Components/Card";
import { Paginator } from "primereact/paginator";

function TaskLists() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [{ getAllTasks, deleteTask, handleStatusChange }, { taskList, taskCount }] =
    useTaskManagerHooks();
  const [searchText, setSearchText] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New status filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(0);
  const pageSize = 10;

  // Status options for dropdown
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" }
  ];

  useEffect(() => {
    loadTasks();
  }, [currentPage, globalFilter, statusFilter]); // Added statusFilter to dependencies

  const loadTasks = async () => {
    try {
      setLoading(true);
      // You'll need to modify your getAllTasks function to accept statusFilter parameter
      await getAllTasks(first, pageSize, globalFilter, statusFilter);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setGlobalFilter(searchText);
    setCurrentPage(1);
    setFirst(0);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchText(value);
    if (value === "") {
      setGlobalFilter("");
      setCurrentPage(1);
      setFirst(0);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
    setFirst(0);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setGlobalFilter("");
    setStatusFilter("");
    setCurrentPage(1);
    setFirst(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await deleteTask(Number(id));
        loadTasks();
      },
    });
  };

  const onStatusUpdate = async (id: number, status: string) => {
    try {
      confirmDialog({
        message: "Are you sure you want to update status of the task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          await handleStatusChange(Number(id), status);
          loadTasks();
        },
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <i className="pi pi-list text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Lists</h1>
                <p className="text-sm text-gray-600">
                  Manage and organize your tasks efficiently
                </p>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search and Filter Section */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search Input */}
                <div className="flex gap-2">
                  <div className="relative">
                    <InputText
                      value={searchText}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search tasks..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <Button
                    icon="pi pi-search"
                    onClick={handleSearchClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                    loading={loading}
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  <Dropdown
                    value={statusFilter}
                    options={statusOptions}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => handleStatusFilterChange(e.value)}
                    placeholder="Filter by Status"
                    className="w-48 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  {/* Clear Filters Button */}
                  {(globalFilter || statusFilter) && (
                    <Button
                      icon="pi pi-times"
                      onClick={handleClearFilters}
                      tooltip="Clear all filters"
                      tooltipOptions={{ position: 'bottom' }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  label="Add Task"
                  icon="pi pi-plus"
                  onClick={() => navigate("/tasks/create/add")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                />
                <Button
                  icon="pi pi-sync"
                  onClick={loadTasks}
                  tooltip="Refresh"
                  tooltipOptions={{ position: 'bottom' }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                  loading={loading}
                />
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(globalFilter || statusFilter) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {globalFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    <i className="pi pi-search text-xs"></i>
                    Search: "{globalFilter}"
                  </span>
                )}
                {statusFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    <i className="pi pi-filter text-xs"></i>
                    Status: {statusFilter}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ConfirmDialog />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <i className="pi pi-spin pi-spinner text-blue-600 text-2xl mb-4"></i>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            </div>
          ) : taskList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-inbox text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">
                {globalFilter || statusFilter
                  ? "Try adjusting your search criteria or clear the filters." 
                  : "Get started by creating your first task."
                }
              </p>
              {!(globalFilter || statusFilter) && (
                <Button
                  label="Create Task"
                  icon="pi pi-plus"
                  onClick={() => navigate("/tasks/create/add")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                />
              )}
              {(globalFilter || statusFilter) && (
                <Button
                  label="Clear Filters"
                  icon="pi pi-times"
                  onClick={handleClearFilters}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                />
              )}
            </div>
          ) : (
            <div className="p-6">
              <Card tasks={taskList} onDelete={handleDelete} handleStatusChange={onStatusUpdate} />
            </div>
          )}

          {/* Pagination */}
          {taskCount > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <Paginator
                first={first}
                rows={pageSize}
                totalRecords={taskCount}
                onPageChange={(e) => {
                  setFirst(e.first);
                  setCurrentPage(e.page + 1);
                }}
                className="flex justify-center"
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskLists;