export enum Status {
  INPROGRESS = 'Inprogress',
  COMPLETED = 'Completed',
}

export enum ApprovalStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum ApprovalAction {
  ADD = 'Add',
  EDIT = 'Edit',
  COMPLETE = 'Complete',
  INCOMPLETE = 'InComplete'
}

export const CourseDescCharLength = {
  MAXXCHARLEN: 6000
}

export const CourseApproval = {
  EmailFrom: process.env.FROM_EMAIL,
  EmailTo: process.env.TO_EMAIL,
};

export enum CourseStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export enum CourseAction {
  AddedCourse = 'Added Course',
  EditedCourse = 'Edited Course',
  AddedSession = 'Added Session',
  EditedSession = 'Edited Session'
}

export const AdminEmail = {
  ADDRESS: process.env.ADMIN_EMAIL
}
