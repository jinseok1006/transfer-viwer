export interface InterviewPost {
  department: string;
  year?: number;
  isYearPrivate: boolean;
  grade: number;
  score: "early4" | "late4" | "early3" | "mid3" | "late3" | "less3" | "private";
  hasTakenCourse: boolean;
  content: string;
}


export interface DepartmentLink {
  [department: string]: string[];
}