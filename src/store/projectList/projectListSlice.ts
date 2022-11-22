import { createSlice } from "@reduxjs/toolkit";

interface State {
  isShowCreateProjectModal: boolean;
}
const initialState: State = {
  isShowCreateProjectModal: false,
};
export const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.isShowCreateProjectModal = true;
    },
    closeProjectModal(state) {
      state.isShowCreateProjectModal = false;
    },
  },
});
export const projectListActions = projectListSlice.actions;
