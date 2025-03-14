import { Dimensions } from 'react-native'

export const cardBorderColor = '#8c958890'
export const cardBackgroundColor = '#312736'

export const LOCAL_STORAGE_KEYS = {
  Tasks: 'tasks',
  Streak: 'streak',
  UserData: 'user_data',
  TotalTaskCompleted: 'total_task_completed',
  TodayTaskCompleted: 'today_task_completed',
  Exam: 'exam',
  VisionBoard: 'vision_board',
}

export const tasks = [
  {
    id: 1,
    name: 'Task planner',
    subTasks: [],
    completionStatus: 0.3,
    createdOn: '2023-02-02T03:00:00Z',
  },
  {
    id: 2,
    name: 'Complete mathematics syllabus',
    subTasks: [],
    completionStatus: 0.9,
    createdOn: '2023-01-02T03:00:00Z',
  },
  {
    id: 3,
    name: 'Task 1',
    subTasks: [],
    completionStatus: 0.07,
    createdOn: '2023-01-02T03:00:00Z',
  },
  {
    id: 4,
    name: 'Task 2',
    subTasks: [],
    completionStatus: 0.19,
    createdOn: '2023-01-02T03:00:00Z',
  },
  {
    id: 5,
    name: 'Task 1',
    subTasks: [],
    completionStatus: 0.67,
    createdOn: '2023-01-02T03:00:00Z',
  },
  {
    id: 6,
    name: 'Task 2',
    subTasks: [],
    completionStatus: 0.9,
    createdOn: '2023-01-02T03:00:00Z',
  },
  { id: 7, name: 'Task 1', subTasks: [], completionStatus: 0.71 },
  { id: 8, name: 'Task 2', subTasks: [], completionStatus: 0.49 },
  { id: 9, name: 'Task 1', subTasks: [], completionStatus: 0.7 },
  { id: 10, name: 'Task 2', subTasks: [], completionStatus: 0.29 },
]

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } =
  Dimensions.get('window')
