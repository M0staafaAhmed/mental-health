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
    Description: string;
    NormalRange: string;
    TotalQuestions: number;
    isRecommended: boolean;
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
    }
}