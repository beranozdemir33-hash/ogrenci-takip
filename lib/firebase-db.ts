import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    addDoc
} from "firebase/firestore";
import { StorageAdapter, Student, Lesson, Payment } from "./adapter";

// Collection Refs
const studentsRef = collection(db, "students");
const lessonsRef = collection(db, "lessons");
const paymentsRef = collection(db, "payments");

// Helper to remove undefined fields because Firestore hates them
const sanitize = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
};

export const firestoreAdapter: StorageAdapter = {
    // Students
    getStudents: async (): Promise<Student[]> => {
        const snapshot = await getDocs(studentsRef);
        return snapshot.docs.map((doc) => ({ id: doc.data().id, ...doc.data() } as Student));
    },
    getStudentById: async (id: number): Promise<Student | null> => {
        const q = query(studentsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].data().id, ...snapshot.docs[0].data() } as Student;
    },
    createStudent: async (data): Promise<Student> => {
        // Generate an ID based on existing max ID for compatibility
        const allSnapshot = await getDocs(studentsRef);
        const maxId = allSnapshot.empty ? 0 : Math.max(...allSnapshot.docs.map(d => d.data().id || 0));
        const newId = maxId + 1;

        const newStudent: Student = {
            id: newId,
            ...data,
            // Default empty string for optional fields if undefined, or let sanitize handle it
            image: data.image || "",
            grade: data.grade || "",
            price: (data.price === null || data.price === undefined) ? 0 : data.price,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const sanitized = sanitize(newStudent);
        console.log("Sanitized Student Data:", JSON.stringify(sanitized, null, 2));
        
        // Add to Firestore, letting Firestore generate the Document ID, but storing our ID field
        await addDoc(studentsRef, sanitized);
        return newStudent;
    },
    updateStudent: async (id, data): Promise<Student> => {
        const q = query(studentsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (snapshot.empty) throw new Error("Student not found");

        const docRef = snapshot.docs[0].ref;
        const updatedData = { ...data, updatedAt: new Date().toISOString() };
        await updateDoc(docRef, sanitize(updatedData));

        // Return merged data
        return { ...snapshot.docs[0].data(), ...updatedData } as Student;
    },
    deleteStudent: async (id: number): Promise<void> => {
        const q = query(studentsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            await deleteDoc(snapshot.docs[0].ref);

            // Cascade delete lessons and payments
            const lessonsQ = query(lessonsRef, where("studentId", "==", id));
            const lessonsSnap = await getDocs(lessonsQ);
            lessonsSnap.forEach(d => deleteDoc(d.ref));

            const paymentsQ = query(paymentsRef, where("studentId", "==", id));
            const paymentsSnap = await getDocs(paymentsQ);
            paymentsSnap.forEach(d => deleteDoc(d.ref));
        }
    },

    // Lessons
    getLessons: async (): Promise<Lesson[]> => {
        const snapshot = await getDocs(lessonsRef);
        return snapshot.docs.map((doc) => ({ id: doc.data().id, ...doc.data() } as Lesson));
    },
    getLessonsByStudent: async (studentId: number): Promise<Lesson[]> => {
        const q = query(lessonsRef, where("studentId", "==", studentId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.data().id, ...doc.data() } as Lesson));
    },
    createLesson: async (data): Promise<Lesson> => {
        const allSnapshot = await getDocs(lessonsRef);
        const maxId = allSnapshot.empty ? 0 : Math.max(...allSnapshot.docs.map(d => d.data().id || 0));
        const newId = maxId + 1;

        const newLesson: Lesson = {
            id: newId,
            ...data,
            topic: data.topic || "",
            homework: data.homework || "",
            teacher: data.teacher || ""
        };
        await addDoc(lessonsRef, sanitize(newLesson));
        return newLesson;
    },
    updateLesson: async (id, data): Promise<Lesson> => {
        const q = query(lessonsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (snapshot.empty) throw new Error("Lesson not found");

        const docRef = snapshot.docs[0].ref;
        await updateDoc(docRef, sanitize(data));
        return { ...snapshot.docs[0].data(), ...data } as Lesson;
    },
    deleteLesson: async (id: number): Promise<void> => {
        const q = query(lessonsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            await deleteDoc(snapshot.docs[0].ref);
        }
    },

    // Payments
    getPayments: async (): Promise<Payment[]> => {
        const snapshot = await getDocs(paymentsRef);
        return snapshot.docs.map((doc) => ({ id: doc.data().id, ...doc.data() } as Payment));
    },
    getPaymentsByStudent: async (studentId: number): Promise<Payment[]> => {
        const q = query(paymentsRef, where("studentId", "==", studentId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.data().id, ...doc.data() } as Payment));
    },
    createPayment: async (data): Promise<Payment> => {
        const allSnapshot = await getDocs(paymentsRef);
        const maxId = allSnapshot.empty ? 0 : Math.max(...allSnapshot.docs.map(d => d.data().id || 0));
        const newId = maxId + 1;

        const newPayment: Payment = {
            id: newId,
            ...data,
            subject: data.subject || ""
        };
        await addDoc(paymentsRef, sanitize(newPayment));
        return newPayment;
    },
    updatePayment: async (id, data): Promise<Payment> => {
        const q = query(paymentsRef, where("id", "==", id));
        const snapshot = await getDocs(q);
        if (snapshot.empty) throw new Error("Payment not found");

        const docRef = snapshot.docs[0].ref;
        await updateDoc(docRef, sanitize(data));
        return { ...snapshot.docs[0].data(), ...data } as Payment;
    }
};
