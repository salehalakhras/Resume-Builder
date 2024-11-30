import { ResumeData } from '@/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface resumeState {
    darkMode: boolean;
    currentResume: number;
    resumes: ResumeData[];
}

const initialState: resumeState = {
    darkMode: false,
    currentResume: 0,
    resumes: [
        {
            id: Date.now().toString(),
            name: 'My Resume',
            personalInformation: {
                fullName: '',
                title: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
                summary: ''
            },
            experiences: [],
            education: [],
            projects: [],
            skills: [],
            certifications: [],
            languages: [],
        }
    ],
};

export const resumeSlice = createSlice({
    name: 'resumes',
    initialState,
    reducers: {
        addResume: (state, action: PayloadAction<ResumeData>) => {
            state.resumes.push(action.payload);
        },
        updateResume: (state, action: PayloadAction<ResumeData>) => {
            const index = state.resumes.findIndex((resume) => resume.id === action.payload.id);
            if (index !== -1) {
                state.resumes[index] = action.payload;
            }
        },
        deleteResume: (state, action: PayloadAction<string>) => {
            state.resumes = state.resumes.filter((resume) => resume.id !== action.payload);
        },
        changeResume: (state, action: PayloadAction<number>) => {
            state.currentResume = action.payload;
        },
        loadResumes: (state, action: PayloadAction<ResumeData[]>) => {
            state.resumes = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.startsWith('resumes/'),
            (state) => {
                localStorage.setItem('resumes', JSON.stringify(state.resumes));
                localStorage.setItem('currentResume', JSON.stringify(state.currentResume));
                localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
            }
        );
    },
});

export const loadResumes = createAction<ResumeData[]>('resumes/loadResumes');
export const initializeApp = createAction('yourApp/initialize');

export const { addResume, updateResume, deleteResume, changeResume } = resumeSlice.actions;

export default resumeSlice.reducer;