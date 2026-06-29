export interface DoctorType {
    DoctorID: number;
    FullName: string;
    Specialty: string;
    Phone: string;
    Email: string;
    ImageUrl: string | null;
}

export interface TestType {
    TestTypeID: number;
    TestName: string;
    TotalQuestions: number;
    Description?: string;     
    NormalRange?: string;     
    isRecommended?: boolean;  
}

export interface UserInfoType {
    token: string;
    user: {
        id: number;
        name: string;
    };
    stats: {
        totalTests: number | null;
        lastScore: number | null;
    };
}


export interface RawTestResult {
    TestResultID: number;
    ResultValue: number;
    ResultDate: string;
    TestName: string;
}

export interface EnrichedTestResult extends RawTestResult {
    maxScore: number;
    percentage: number;
    testTypeId: number | null;
}

export interface Question {
  QuestionID: number;
  QuestionText: string;
}
export interface TestData {
  TestName?: string;
  Description?: string;
  questions?: Question[];

  test_details?: {
    id: number;
    name: string;
    description: string;
  };
  questions_data?: {
    questions: Question[];
  };
}
export interface LocationState {
    testId?: string | number;
    testName?: string;
    score?: number;
    maxScore?: number;
}