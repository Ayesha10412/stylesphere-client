import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreadCrumbState {
    items: Array<{ label: string; href?: string }>;
}

const initialState: BreadCrumbState = {
    items: [],
};

const breadCrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setBreadCrumbs(state, action: PayloadAction<Array<{ label: string; href?: string }>>) {
            state.items = action.payload;
        },
    },
});

export const { setBreadCrumbs } = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;