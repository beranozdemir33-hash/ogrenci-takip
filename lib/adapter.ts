
export interface Student {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
    grade?: string;
    price?: number;
    createdAt: string; // ISO Date string
    updatedAt: string;
}

export interface Lesson {
    id: number;
    studentId: number;
    date: string; // ISO Date string (YYYY-MM-DD)
    time: string; // "14:00 - 15:00"
    subject: string;
    topic?: string;
    homework?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    teacher?: string; // Optional for now
}

export interface Payment {
    id: number;
    studentId: number;
    amount: number;
    date: string; // ISO Date string
    status: 'pending' | 'completed' | 'overdue';
    subject?: string;
}

export interface StorageAdapter {
    // Students
    getStudents(): Promise<Student[]>;
    getStudentById(id: number): Promise<Student | null>;
    createStudent(data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student>;
    updateStudent(id: number, data: Partial<Student>): Promise<Student>;
    deleteStudent(id: number): Promise<void>;

    // Lessons
    getLessons(): Promise<Lesson[]>;
    getLessonsByStudent(studentId: number): Promise<Lesson[]>;
    createLesson(data: Omit<Lesson, 'id'>): Promise<Lesson>;
    updateLesson(id: number, data: Partial<Lesson>): Promise<Lesson>;
    deleteLesson(id: number): Promise<void>;

    // Payments
    getPayments(): Promise<Payment[]>;
    getPaymentsByStudent(studentId: number): Promise<Payment[]>;
    createPayment(data: Omit<Payment, 'id'>): Promise<Payment>;
    updatePayment(id: number, data: Partial<Payment>): Promise<Payment>;
}
