"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdEdit, MdDelete, MdSave, MdArrowForward } from "react-icons/md";
import { NodeField } from "./NodeComponents";

export const SaveSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [pipelineName, setPipelineName] = useState("");
  const [pipelineDescription, setPipelineDescription] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [hideWarnings, setHideWarnings] = useState(false);
  const [hideHelperText, setHideHelperText] = useState(false);

  const isFormValid = pipelineName && pipelineDescription;

  const handleAddUser = () => {
    if (username) {
      setUsers([...users, { username, permissions: "edit" }]);
      setUsername("");
    }
  };

  const handleDeleteUser = (userToDelete) => {
    setUsers(users.filter((user) => user.username !== userToDelete));
  };

  const handlePermissionChange = (username, newPermission) => {
    setUsers(
      users.map((user) =>
        user.username === username
          ? { ...user, permissions: newPermission }
          : user
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[320px] bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Navigation */}
            <div className="border-b">
              <div className="flex items-center px-4 h-14">
                <button onClick={onClose} className="mr-4">
                  <MdArrowForward className="w-5 h-5" />
                </button>
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`py-1 flex items-center gap-2 text-sm transition-colors ${
                      activeTab === "edit"
                        ? "text-[#6466E9] border-b-2 border-[#6466E9] -mb-[1px]"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Edit Information
                  </button>
                  <button
                    onClick={() => setActiveTab("run")}
                    className={`py-1 text-sm transition-colors ${
                      activeTab === "run"
                        ? "text-[#6466E9] border-b-2 border-[#6466E9] -mb-[1px]"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Run Pipeline
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col h-[calc(100%-3.5rem)]">
              <h2 className="text-xl font-semibold mb-6">Pipeline Info</h2>

              {/* Form */}
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <NodeField
                    label="Pipeline Name"
                    value={pipelineName}
                    onChange={(e) => setPipelineName(e.target.value)}
                    multiline={false}
                    containerClassName={
                      !pipelineName
                        ? "focus-within:ring-2 focus-within:ring-red-500"
                        : ""
                    }
                  />
                  {!pipelineName && (
                    <p className="text-red-500 text-xs mt-1">
                      Your pipeline needs a name
                    </p>
                  )}
                </div>

                <div>
                  <NodeField
                    label="Pipeline Description"
                    value={pipelineDescription}
                    onChange={(e) => setPipelineDescription(e.target.value)}
                    containerClassName={
                      !pipelineDescription
                        ? "focus-within:ring-2 focus-within:ring-red-500"
                        : ""
                    }
                  />
                  {!pipelineDescription && (
                    <p className="text-red-500 text-xs mt-1">
                      Your pipeline needs a description
                    </p>
                  )}
                </div>

                {/* User Permissions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    Shared User Permissions
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <button
                      onClick={handleAddUser}
                      disabled={!username}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        username
                          ? "bg-[#6466E9] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      Add
                    </button>
                  </div>

                  {/* Users Table */}
                  <div>
                    <div className="grid grid-cols-[1fr,90px,40px] gap-2 px-4 py-2 text-xs font-medium text-gray-500">
                      <div>USERNAME</div>
                      <div>PERMISSIONS</div>
                      <div className="text-center">DELETE</div>
                    </div>
                    <div className="border rounded-md">
                      {users.map((user) => (
                        <div
                          key={user.username}
                          className="grid grid-cols-[1fr,90px,40px] gap-2 items-center p-3 border-b last:border-b-0"
                        >
                          <span className="text-sm truncate">
                            {user.username}
                          </span>
                          <select
                            value={user.permissions}
                            onChange={(e) =>
                              handlePermissionChange(
                                user.username,
                                e.target.value
                              )
                            }
                            className="text-xs border rounded-md px-1 py-1 w-full"
                          >
                            <option value="edit">Edit</option>
                            <option value="view">View</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user.username)}
                            className="text-gray-500 hover:text-red-500 flex justify-center"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hide Warnings</span>
                  <button
                    onClick={() => setHideWarnings(!hideWarnings)}
                    className={`w-8 h-4 rounded-full transition-colors ${
                      hideWarnings ? "bg-[#6466E9]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      animate={{ x: hideWarnings ? 16 : 2 }}
                      className="w-3 h-3 bg-white rounded-full shadow-sm mt-0.5"
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hide Helper Text</span>
                  <button
                    onClick={() => setHideHelperText(!hideHelperText)}
                    className={`w-8 h-4 rounded-full transition-colors ${
                      hideHelperText ? "bg-[#6466E9]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      animate={{ x: hideHelperText ? 16 : 2 }}
                      className="w-3 h-3 bg-white rounded-full shadow-sm mt-0.5"
                    />
                  </button>
                </div>
              </div>
              <button
                disabled={!isFormValid}
                className={`w-full py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-[#6466E9] text-white hover:bg-[#5355D9]"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <MdSave className="w-4 h-4" />
                Save
              </button>
              <button
                disabled={!isFormValid}
                className={`w-full py-2 mt-2 rounded-md text-sm font-medium border ${
                  isFormValid
                    ? "text-[#6466E9] border-[#6466E9] hover:bg-[#6466E9] hover:text-white"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                Deploy As
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
