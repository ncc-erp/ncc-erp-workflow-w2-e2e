export const API = {
  createNewRequest: "api/app/workflow-instance/new-instance",
  approveTask: "api/app/task/approve",
  rejectTask: /api\/app\/task\/.*\/reject/,
  changeWorkflowStatus: "api/app/workflow-definition/change-workflow-status",
  listAll: "api/app/workflow-definition/list-all",
  workflowInputDefinition: "api/app/external-resource/workflow-input-definition-property-types",
  saveWorkflowInput: "api/app/workflow-definition/save-workflow-input-definition",
  deleteWorkflow: /api\/app\/workflow-definition\/.*/,
};
